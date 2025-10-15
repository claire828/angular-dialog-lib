# HttpResource與signalStore使用時機

Created time: May 2, 2025 2:20 PM
ID: 40
Select: Concept
summary: ✅ HttpResource：用於簡單的資料讀取，無需額外狀態管理。
✅ signalStore + HttpClient：適用於複雜狀態、CRUD 操作及需要手動控制的情境。
✅ signalStore + HttpResource：在需要自動反應式資料載入與狀態轉換時使用，但需注意狀態歸屬清晰。
✅ API Service 層：當多個 store 或 component 需要共用 API 邏輯時，將 API 邏輯抽象成服務層以提高可維護

tags: Signal Dependency

## **📌 主要觀點**

- **HttpResource**：適用於簡單的資料讀取需求，提供自動處理載入狀態與錯誤的功能。
- **signalStore**：適用於需要集中管理應用狀態、共享狀態或進行複雜狀態計算的情境。
- **結合使用**：在某些情境下，將 HttpResource 納入 signalStore 中，可以提高靈活性和可維護性。
  | **模式** | **適用情境** |
  | ---------------------------------- | ---------------------------------------------- |
  | HttpResource 於 Component 中使用 | 用於簡單的資料讀取與 UI 狀態管理 |
  | HttpResource 於 signalStore 中使用 | 當需要從遠端資料派生出複雜的 UI 狀態時使用 |
  | HttpClient 於 withMethods 中使用 | 需要完全控制 fetch、patch、delete 等操作時使用 |
  | 結合 HttpResource + signalStore | ✅ 可行 — 只需清晰劃分狀態擁有權與責任範圍 |

## **🛠️ 核心工具比較**

| **工具**     | **主要用途**                 | **最適用情境**                        |
| ------------ | ---------------------------- | ------------------------------------- |
| signalStore  | 集中式狀態管理               | 複雜的應用程式狀態管理與更新          |
| HttpClient   | 原始 HTTP 請求               | 需要手動處理狀態的 API 呼叫           |
| HttpResource | 宣告式、自動管理的 HTTP 狀態 | 簡單的資料讀取，內建載入/錯誤狀態管理 |
| resource()   | 一般化的反應式資源           | 自訂資料來源與手動觸發的資料操作      |
| rxResource() | 整合 RxJS 的反應式資源       | 需要 RxJS 模式的專案                  |

---

# **🔄 常見模式與使用建議 :**

<aside>
<img src="https://www.notion.so/icons/notification_red.svg" alt="https://www.notion.so/icons/notification_red.svg" width="40px" />

### **1: HttpClient於signalStore中使用（推薦大多數情境）**

**✅ 適用情境：**

- 需要完全控制狀態更新
- API 呼叫與狀態變更之間有清晰的關聯
- 標準的 CRUD 操作

```tsx
// 使用 HttpClient 於 store 方法中（正確注入方式）
export const TodoStore = signalStore(
  withState({ todos: [], loading: false, error: null }),

  // 透過 withProps 注入依賴
  withProps(() => {
    const http = inject(HttpClient);
    return { http };
  }),

  withMethods((store, props) => {
    return {
      loadTodos() {
        store.patchState({ loading: true, error: null });

        props.http
          .get<Todo[]>('/api/todos')
          .pipe(finalize(() => store.patchState({ loading: false })))
          .subscribe({
            next: (todos) => store.patchState({ todos }),
            error: (error) => store.patchState({ error: error.message }),
          });
      },

      // 其他方法遵循類似模式
    };
  })
);
```

</aside>

<aside>
<img src="https://www.notion.so/icons/notification_red.svg" alt="https://www.notion.so/icons/notification_red.svg" width="40px" />

## **2：專用 API 服務 +  signalStore (原專案模式)**

**✅ 適用情境：**

- 多個 store 或 component 需要重複使用 API 邏輯
- 複雜的 API 操作需共享行為
- 更好的關注點分離

```tsx
// API 服務：可重用的邏輯
@Injectable({ providedIn: 'root' })
export class TodoApiService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>('/api/todos');
  }

  // 其他 API 方法
}

// Store 使用 API 服務
export const TodoStore = signalStore(
  withState({ todos: [], loading: false, error: null }),

  // 透過 withProps 注入 API 服務
  withProps(() => {
    const api = inject(TodoApiService);
    return { api };
  }),

  withMethods((store, props) => {
    return {
      loadTodos() {
        store.patchState({ loading: true, error: null });

        props.api
          .getTodos()
          .pipe(finalize(() => store.patchState({ loading: false })))
          .subscribe({
            next: (todos) => store.patchState({ todos }),
            error: (error) => store.patchState({ error: error.message }),
          });
      },
    };
  })
);
```

</aside>

<aside>
<img src="https://www.notion.so/icons/notification_red.svg" alt="https://www.notion.so/icons/notification_red.svg" width="40px" />

## **3：HttpResource於 Component 中使用**

**✅ 適用情境：**

- 主要是讀取資料，且資料變動不頻繁
- 不需要集中管理狀態
- 快速實現，減少樣板程式碼

```tsx
@Component({
  template: `
    <div *ngIf="todosResource.loading()">載入中...</div>
    <div *ngIf="todosResource.error()">錯誤：{{ todosResource.error() }}</div>
    <ul *ngIf="todosResource.result()">
      <li *ngFor="let todo of todosResource.result()">{{ todo.title }}</li>
    </ul>
  `,
})
export class TodoListComponent {
  todosResource = httpResource<Todo[]>('/api/todos');

  refresh() {
    this.todosResource.reload();
  }
}
```

</aside>

---

# **⚠️ 澄清：HttpResource與signalStore的關係**

<aside>
<img src="https://www.notion.so/icons/notification_red.svg" alt="https://www.notion.so/icons/notification_red.svg" width="40px" />

雖然 HttpResource 和 signalStore 技術上是兼容的，但在許多實際情境中，您可能不需要同時使用兩者：

- **HttpResource** 提供了反應式的 HTTP 請求，並內建狀態追蹤
- **signalStore** 提供了組織和更新應用程式狀態的框架

**何時結合使用：**

- 當您希望在 store 中使用 HttpResource 的自動反應性來獲取資料
- 當 store 需要從多個 HttpResource 中轉換或組合資料
- 當您清楚地劃分了狀態的擁有權和責任範圍

**潛在的缺點：**

- 混合使用不同的狀態管理方法可能會導致對真實資料來源的混淆

## 範例：UsersStore 使用 httpResource 來獲取使用者資料，並根據 sortOrder 進行排序

```tsx
const usersResource = httpResource(() => http.get<User[]>('/api/users'));

export const UsersStore = signalStore(
  withState(() => ({
    sortOrder: signal<'asc' | 'desc'>('asc'),
  })),

  withComputed(() => ({
    sortedUsers: computed(() => {
      const users = usersResource.data() ?? [];
      const sort = get(sortOrder());
      return [...users].sort((a, b) =>
        sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    }),
  }))
);
```

</aside>

<aside>
<img src="https://www.notion.so/icons/notification_red.svg" alt="https://www.notion.so/icons/notification_red.svg" width="40px" />

# **✅ 何時使用HttpResource**

- **簡單的資料讀取需求**：當您只需要從 API 讀取資料，且不需要對資料進行修改或複雜的處理時。
- **需要自動處理載入狀態與錯誤**：HttpResource 內建了 isLoading 和 error 等狀態，方便在 UI 中顯示載入指示或錯誤訊息。
- **需要根據參數自動重新載入資料**：當資料需要根據某些參數（例如搜尋關鍵字）自動重新載入時，HttpResource 可以與 signal 結合，自動觸發資料重新載入。

### Example

```tsx
import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  template: `
    <input [(ngModel)]="searchQuery" placeholder="搜尋待辦事項" />
    <ul>
      <li *ngFor="let todo of todosResource.value()">
        {{ todo.title }}
      </li>
    </ul>
  `,
})
export class TodoListComponent {
  // searchQuery 是一個 signal，用來儲存使用者輸入的搜尋關鍵字。
  searchQuery = signal('');

  // 是一個 httpResource，根據 searchQuery 的值動態生成 API URL。
  todosResource = httpResource(() => {
    const query = this.searchQuery();
    // 當 searchQuery 改變時，httpResource 會自動重新載入資料。
    return query ? `/api/todos?search=${query}` : '/api/todos';
  });
}
```

---

## Pitfall: 無rxjs強大的優化流

httpResource 本身並不直接支援 debounceTime、distinctUntilChanged 或 switchMap。然而，您可以透過將 signal 轉換為 Observable，來手動應用這些操作符，再將結果轉回 signal，以實現類似的行為。

```tsx
import { signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export class MyComponent {
  // 使用 signal 儲存搜尋關鍵字
  searchQuery = signal('');

  // 將 signal 轉換為 Observable，並應用 debounceTime 和 distinctUntilChanged
  debouncedQuery$ = toObservable(this.searchQuery).pipe(debounceTime(300), distinctUntilChanged());

  // 將處理過的 Observable 轉回 signal
  query = toSignal(this.debouncedQuery$);

  // 使用處理過的 signal 作為 httpResource 的參數
  searchResults = httpResource(() => {
    const query = this.query();
    return query ? `https://api.example.com/search?q=${query}` : undefined;
  });
}
```

</aside>

<aside>
<img src="https://www.notion.so/icons/notification_red.svg" alt="https://www.notion.so/icons/notification_red.svg" width="40px" />

# **✅ 何時使用signalStore**

- **需要集中管理應用狀態**：例如表單資料、使用者設定等。
- **需要多個元件共享狀態**：signalStore 提供單一來源，避免狀態同步問題。
- **需要對狀態進行複雜的計算或轉換**：使用 withComputed 進行處理。
- **需要處理資料修改（新增、更新、刪除）**：建議使用 HttpClient 或 ApiService。

### **✅**SignalStor + RxResouce **的優點**：

- **自動取消請求**：當參數變動時，會自動取消先前的請求，避免不必要的網路流量。
- **內建錯誤處理**：提供 loading、error 等狀態，方便在 UI 上顯示相應的提示。
- **簡化邏輯**：將資料請求與狀態管理邏輯集中在一起，減少樣板程式碼。

### **⚠️ 注意事項：**

- rxResource 會自動處理請求的取消與重新發送，但請確保 request 的變動能夠觸發資料的重新載入。
- 在使用 rxResource 時，建議將其放在 withMethods 中，以保持邏輯的集中與清晰。

---

### Example

```tsx
import { rxResource } from '@angular/core/rxjs-interop';
import { signalStore, withState, withMethods } from '@ngrx/signals';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { TodoService } from './todo.service';

export const TodoStore = signalStore(
  withState({
    filter: '',
    todos: [],
    loading: false,
    error: null,
  }),

  withMethods((store) => {
    const todoService = inject(TodoService);

    // 使用 rxResource 來處理資料請求
    const todosResource = rxResource({
      request: store.filter,
      loader: (params) =>
        todoService.getTodos(params.request).pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((filter) => todoService.getTodos(filter))
        ),
    });

    return {
      loadTodos() {
        store.patchState({ loading: true, error: null });
        todosResource.load();
      },
      getTodos() {
        return todosResource.data();
      },
      isLoading() {
        return todosResource.loading();
      },
      hasError() {
        return todosResource.error();
      },
    };
  })
);
```

</aside>

---

# **🧩 結合使用的情境**

## **特定需求的最佳實現方式**

- **✅ httpClient**: 需要將資料儲存回 state 時的首選方式，可完全控制資料流程
- **✅ withProps**: 當您希望根據某些參數（例如搜尋關鍵字）自動重新載入資料時
- **✅ withComputed**: 適合用於 rxResource，當您需要使用 RxJS 操作符處理複雜的資料轉換
- **✅ withMethod / rxMethod**: 適合用於需要使用 RxJS 操作符來處理非同步流程的情境

## **進階模式：withComputed / withProps + Resource + rxMethod**

當您需要更複雜的資料處理和狀態管理時，可以組合使用多種技術：

- **集中管理應用狀態**：當您希望將資料取得與狀態管理集中處理時，可以在 signalStore 中使用 resource 或 rxResource
- **需要根據多個參數載入資料**：例如，根據多個搜尋條件載入資料時，可以在 signalStore 中使用 withComputed 來處理參數，然後傳遞給 resource 或 rxResource

### 綜合範例：整合多種技術的 TodoStore

```tsx
import { signalStore, withState, withComputed, withMethods, withProps } from '@ngrx/signals';
import { rxResource, resource } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, tap, pipe } from 'rxjs/operators';
import { from } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export const TodoStore = signalStore(
  // 基本狀態定義
  withState({
    filter: '',
    searchTerm: '',
    todos: [],
    loading: false,
    error: null,
  }),

  // 使用 withProps 定義基於參數的資源
  withProps((store) => ({
    // 使用 resource 處理簡單的資料載入
    todosResource: resource({
      request: store.searchTerm,
      loader: (term) => fetch(`/api/todos?search=${term}`).then((res) => res.json()),
    }),
  })),

  // 使用 withComputed 處理需要 RxJS 操作符的資料流
  withComputed(({ filter }) => ({
    // 使用 rxResource 處理需要 debounce 的資料流
    filteredTodos: rxResource({
      request: filter,
      loader: (term) =>
        from(fetch(`/api/todos?filter=${term}`).then((res) => res.json())).pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((data) => data)
        ),
    }),
  })),

  // 一般方法定義
  withMethods((store) => ({
    setFilter(newFilter: string) {
      store.patchState({ filter: newFilter });
    },

    setSearchTerm(term: string) {
      store.patchState({ searchTerm: term });
    },
  })),

  // 使用 rxMethod 處理複雜的非同步操作
  withMethods((store) => {
    const http = inject(HttpClient);

    return {
      // rxMethod 用於處理複雜的 RxJS 流程
      loadTodos: rxMethod<void>(
        pipe(
          switchMap(() => http.get<Todo[]>('/api/todos')),
          tap((todos) => store.patchState({ todos }))
        )
      ),

      // 組合使用 resource 和 rxMethod
      refreshAndFilter: rxMethod<string>(
        pipe(
          tap((filter) => store.setFilter(filter)),
          switchMap(() => store.filteredTodos.result$),
          tap((todos) => store.patchState({ todos }))
        )
      ),
    };
  })
);
```

這個綜合範例展示了如何在一個 store 中整合多種技術：

- **withState** 定義基本狀態
- **withProps** 使用 resource 處理簡單的資料載入
- **withComputed** 使用 rxResource 處理需要 RxJS 操作符的資料流
- **withMethods** (一般) 提供基本的狀態更新方法
- **withMethods** (rxMethod) 處理複雜的非同步操作

### **1. 根據多個參數載入資料( HttpResource in withProps )**

當資料的載入需要依賴多個參數時，可以將這些參數作為 signal，並在 signalStore 中使用 withComputed 進行處理，然後傳遞給 HttpResource。

```tsx
export const TodoStore = signalStore(
  withState(() => ({
    filter: signal('all'),
    searchTerm: signal(''),
  })),
  withProps((store) => ({
    todosResource: httpResource(() => ({
      url: '/api/todos',
      params: {
        filter: store.filter(),
        search: store.searchTerm(),
      },
    })),
  })),
  withComputed(({ todosResource }) => ({
    todos: computed(() => todosResource.data()),
  })),
  withMethods((store) => ({
    setFilter: (newFilter: string) => store.filter.set(newFilter),
    setSearchTerm: (term: string) => store.searchTerm.set(term),
  }))
);
```

### **2. 手動觸發資料重新載入 - reload()**

- HttpResource 提供了 reload() 方法，讓您可以在需要時手動觸發資料重新載入。

這在以下情境中特別有用：

- 使用者手動點擊「重新整理」按鈕。
- 在資料更新後，需要重新載入最新資料。

```tsx
withMethods((store) => ({
  reloadTodos: () => store.todosResource.reload(),
}));
```

# **🧠 總結**

---

| **#功能需求**        | **#建議使用工具**       |
| -------------------- | ----------------------- |
| 僅讀取資料           | HttpResource            |
| 資料修改             | ApiService + HttpClient |
| 複雜狀態管理         | signalStore             |
| 多元件共享狀態       | signalStore             |
| 根據參數自動重新載入 | HttpResource + signal   |
