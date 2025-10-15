# Angular Signal-Based State Management Best Practices

This guide provides clear recommendations for organizing API calls and state management in Angular applications using the latest signal-based patterns.

## 🧠 Summary

| Pattern                                | Use When...                                                           |
| -------------------------------------- | --------------------------------------------------------------------- |
| `HttpResource` in component            | For basic `fetch` and UI-only state                                   |
| `HttpResource` inside `signalStore`    | For `derived` or `computed` state based on remote data                |
| `HttpClient` inside `withMethods`      | For full control over `fetch, patch, delete, and manual state update` |
| Combining `HttpResource + signalStore` | ✅ Possible — just keep ownership boundaries clear                    |

## Core Concepts At a Glance

| Tool           | Primary Purpose                      | Best For                                                |
| -------------- | ------------------------------------ | ------------------------------------------------------- |
| `signalStore`  | Centralized state management         | Application-wide state with complex updates             |
| `HttpClient`   | Raw HTTP requests                    | Direct API calls with manual state handling             |
| `HttpResource` | Declarative, auto-managed HTTP state | Simple data fetching with built-in loading/error states |
| `resource()`   | Generalized reactive resource        | Custom data sources with manual triggers                |
| `rxResource()` | RxJS-integrated reactive resource    | Projects heavily using Observable patterns              |

## Common Patterns and When to Use Them

### Pattern 1: HttpClient in signalStore (Recommended for Most Cases)

**✅ Best when:**

- You need full control over state updates
- Clear relationship between API calls and state changes
- Standard CRUD operations

```typescript
// Example using HttpClient directly in store methods (with proper injection)
export const TodoStore = signalStore(
  withState({ todos: [], loading: false, error: null }),

  // Inject dependencies via withProps
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

      // Other methods with similar patterns
    };
  })
);
```

### Pattern 2: Dedicated API Service + signalStore

**✅ Best when:**

- Reusable API logic across multiple stores/components
- Complex API operations with shared behavior
- Better separation of concerns

```typescript
// API service for reusable logic
@Injectable({ providedIn: 'root' })
export class TodoApiService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>('/api/todos');
  }

  // Other API methods
}

// Store utilizing the API service
export const TodoStore = signalStore(
  withState({ todos: [], loading: false, error: null }),

  // Inject the API service via withProps
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

### Pattern 3: HttpResource in Components

**✅ Best when:**

- Read-mostly data with simple auto-refresh needs
- Component-scoped state that doesn't need central management
- Quick implementation without boilerplate

```typescript
@Component({
  template: `
    <div *ngIf="todosResource.loading()">Loading...</div>
    <div *ngIf="todosResource.error()">Error: {{ todosResource.error() }}</div>
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

## Clarification: HttpResource vs. signalStore

Contrary to some misconceptions, HttpResource and signalStore **can work well together** in certain scenarios, but they serve different purposes:

- **HttpResource** provides reactive signal-based HTTP requests with built-in state tracking
- **signalStore** provides a framework for organizing and updating application state

**When to combine them:**

- Use HttpResource in a store when you want automatic reactivity for fetching data
- The store can transform or combine data from multiple HttpResources
- You're clear about which part owns what state

**Potential drawback:**

- Mixing state management approaches can lead to confusion about the source of truth

## Practical Considerations: HttpResource and signalStore

While technically compatible, in many practical scenarios you might not need both HttpResource and signalStore together:

### When to Use Just HttpResource

```typescript
// Simple component with HttpResource only - perfect for read-mostly data
@Component({
  selector: 'user-profile',
  template: `
    <div *ngIf="profile.loading()">Loading...</div>
    <div *ngIf="profile.result() as user">
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
    </div>
  `,
})
export class UserProfileComponent {
  profile = httpResource<User>('/api/me');
}
```

**This approach is sufficient when:**

- You're just displaying data directly without complex transformations
- The data is scoped to a single component
- You don't need to coordinate with other state sources
- You're primarily reading data with minimal write operations

### When to Use Just signalStore + HttpClient

```typescript
// Using signalStore with HttpClient for full state management
export const UserStore = signalStore(
  withState({ user: null, loading: false, error: null }),
  withProps(() => ({ http: inject(HttpClient) })),
  withMethods((store, props) => ({
    loadUser() {
      store.patchState({ loading: true });
      props.http.get<User>('/api/me').subscribe({
        next: (user) => store.patchState({ user, loading: false }),
        error: (error) => store.patchState({ error, loading: false }),
      });
    },
  }))
);
```

**This approach is better when:**

- You need full control over state transitions
- The data requires consistent transformation before storage
- Complex state dependencies exist
- You're doing frequent write operations

### When Combining Makes Sense

The combination is valuable in specific scenarios:

1. When you need HttpResource's automatic reactivity + signalStore's custom state
2. For dashboard-like UIs that need both raw API data and UI state
3. When you're transitioning a codebase and need to maintain compatibility

Keep in mind that using both increases complexity and cognitive load. Choose the simpler option when possible.

## Advanced Patterns

### resource() for Custom Data Sources

```typescript
export const TodoStore = signalStore(
  withState({ todos: [] }),
  withMethods((store) => {
    const todosResource = resource(() => {
      return fetch('/api/todos').then((res) => res.json());
    });

    return {
      loadTodos() {
        todosResource().then((todos) => {
          store.patchState({ todos });
        });
      },
    };
  })
);
```

### rxResource() for RxJS Integration

Ideal for apps already heavily using RxJS patterns.

### ✅ When Combining Works Well

You **can** use `HttpResource` inside `signalStore` if:

- Your store **derives additional state** (e.g. sorting, filtering, computed signals) from fetched data.
- You want to **coordinate multiple `HttpResource`s** or **transform external state** into derived store state.
- You're using `signalStore` as a **facade layer**, keeping your UI reactive while offloading API fetch state to `HttpResource`.

## Example 1: HttpResource and signalStore Working Together

```ts
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

## Example 2: HttpResource and signalStore Working Together (Reload)

雖然 HttpResource 和 signalStore 可以獨立使用，但在某些情境
下，結合使用可以帶來更大的靈活性。例如：

• `需要根據多個參數載入資料`：當資料的載入需要依賴多個參數時，可以將這些參數作為 signal，並在 signalStore 中使用 `withComputed` 進行處理，然後`傳遞給 HttpResource`。

• 需要`手動觸發資料重新載入`：HttpResource 提供了 `reload` 方法，讓您可以在需要時手動觸發資料重新載入。

```ts
export const TodoStore = signalStore(
  withState(() => ({
    filter: signal('all'),
  })),
  withProps(() => ({
    todosResource: httpResource(() => ({
      url: '/api/todos',
      params: { filter: store.filter() },
    })),
  })),
  withComputed(({ todosResource }) => ({
    todos: computed(() => todosResource.data()),
  })),
  withMethods((store) => ({
    reloadTodos: () => store.todosResource.reload(),
  }))
);
```

### Benefits of This Approach

1. **Clear Separation of Concerns**:

   - `TaskResourceService` - Handles all HTTP communication via HttpResource
   - `TaskUtils` - Pure utility functions for data operations
   - `TaskDashboardStore` - Manages UI state and computed views of data
   - Component - Focuses purely on template and user interaction

2. **Better Maintainability**:

   - Each part can be tested independently
   - Pure functions are easy to test without mocking
   - Resource service encapsulates all fetch/update logic

3. **More Reusable**:

   - Utility functions can be used anywhere in the application
   - Resource service can be injected in multiple components
   - Store pattern is consistent and predictable

4. **More Scalable**:
   - Easy to add new filtering or sorting options
   - Clear pattern for adding new data operations
   - Simple to extend with new features

This approach demonstrates how HttpResource and signalStore can work together in a clean, maintainable architecture where each has a clear responsibility.

## Summary of Recommendations

1. **Start with HttpClient in signalStore** for most cases
2. **Extract to API services** when reusing API logic
3. **Use HttpResource in components** for simple, scoped data fetching
4. **Consider advanced patterns** only when needed for specific use cases

Mixing approaches is valid when done with intention and clear ownership of state.
