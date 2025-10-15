# Dialog 使用手冊

這份文件給「使用者」或「應用開發者」看，專注於如何在專案中使用 DialogService，包含 API、範例、常見情境與教學。

---

## 這個 Dialog 能解決什麼問題？

- 彈窗內容彈性：可用純文字、Angular 元件或自訂內容
- 父子元件雙向資料流：父元件可傳資料給 Dialog，Dialog 也能回傳資料/事件給父元件
- 注入/溝通方式：利用 Angular DI 與 RxJS Observable 實現雙向溝通
- 彈窗樣式：預設支援 Tailwind，彈窗外觀可自訂
- 進階彈窗行為：可自訂 provider、token、overlay 策略

---

## 快速上手

```typescript
import { DialogService, MOCK_CONFIG } from 'dialog';

// 開啟預設 Dialog
const ref = dialogService.openDefaultDialog(MOCK_CONFIG);
ref.event$.subscribe((event) => {
  // 處理 Enter/Cancel/BackdropClick 等事件
});

// 開啟動態元件 Dialog
const config: DialogComponentConfig = {
  injectorID: 'unique-id',
  componentRef: () => MyCustomComponent,
  overlayConfig: DEFAULT_OVERLAY_CONFIG,
  data: { foo: 'bar' },
};
const ref2 = dialogService.openComponentDialog(config);
```

---

## Dialog 配置與 API

| API                                          | 參數                                                           | 回傳型別                            | 用法說明                                                                                                                                                                     | 回傳型別說明                                                                                              |
| -------------------------------------------- | -------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `openDefaultDialog(config)`                  | `config: DefaultDialogConfig`                                  | `DecorateOverlayRef`                | 顯示簡單訊息、確認框等靜態內容。<br>回傳 `DecorateOverlayRef`，可用於關閉 dialog、監聽事件、取得 overlay 狀態。                                                              | Dialog 實例參考，可 close() 關閉、event$ 監聽事件、sendEvent() 回傳資料（型別為 void）。                  |
| `openComponentDialog<T>(config, providers?)` | `config: DialogComponentConfig`<br>`providers?: ProviderTypes` | `DecorateOverlayRef<T>`             | 顯示自訂 Angular 元件，支援複雜互動、表單、Wizard 等。<br>回傳 `DecorateOverlayRef<T>`，T 為 dialog 回傳型別，可用於型別安全地傳遞事件資料、關閉 dialog、取得 overlay 狀態。 | Dialog 實例參考，T 為回傳型別。可 close() 關閉、event$ 監聽型別安全事件、sendEvent(payload: T) 回傳資料。 |
| `DecorateOverlayRef<T>.event$`               | 無                                                             | `Observable<DialogEventPayload<T>>` | 事件流 Observable，父元件訂閱取得 dialog 互動事件與資料。<br>型別安全，`event.data` 型別自動推論為 T。                                                                       | 型別安全的事件流，event.type 判斷事件型別，event.data 型別自動推論為 T。                                  |
| `DialogEvent`                                | 無                                                             | `{ Enter, Cancel, BackdropClick }`  | 事件型別 enum，用於判斷 dialog 互動（送出、取消、點擊遮罩等）。                                                                                                              | 事件型別 enum，可用於 event.type 判斷。                                                                   |

---

### 如何取得 DecorateOverlayRef<T>.event$

DialogService.openDefaultDialog/openComponentDialog 會回傳 DecorateOverlayRef 實例，直接 ref.event$ 取得事件流：

```typescript
const ref = dialogService.openComponentDialog<MyPayload>(config);
ref.event$.subscribe((event) => {
  if (event.type === DialogEvent.Enter) {
    // event.data 型別自動推論為 MyPayload
    console.log(event.data);
  }
});
```

---

## 父子元件資料傳遞

### Dialog 回傳資料給父元件

Dialog 內部可用 `DecorateOverlayRef.sendEvent` 回傳資料，父元件用 `event$` 監聽：

```typescript
// Dialog 內部
submit() {
  this.ref.sendEvent({ type: DialogEvent.Enter, data: this.inputValue });
}

// 父元件
ref.event$.subscribe(event => {
  if (event.type === DialogEvent.Enter) {
    console.log('User input:', event.data);
  }
});
```

### 父元件傳資料給 Dialog

- 透過 config 的 `data` 欄位或自訂 provider 注入
- 動態元件可直接 inject 取得

---

## 進階用法：自訂 Token 與全生命週期

1. 父元件呼叫 openComponentDialog 並傳入 config/providers
2. DialogService 建立 overlay 並注入 provider
3. DialogComponent 取得注入資料
4. 動態元件可用 DecorateOverlayRef 傳遞事件/資料
5. 父元件訂閱 event$ 取得結果

#### 範例

```typescript
// 定義自訂 Token
export const MY_DIALOG_DATA = new InjectionToken<string>('MY_DIALOG_DATA');

// 傳入 provider
const providers = [{ provide: MY_DIALOG_DATA, useValue: { foo: 'bar' } }];
const ref = dialogService.openComponentDialog(config, providers);

// Dialog 內注入
constructor(@Inject(MY_DIALOG_DATA) public data: any) {}
```

---

## 小結

- 資料注入：用 config.data、@Inject(DIALOG_COMPONENT_PROVIDER)、自訂 InjectionToken
- 型別安全回傳：DecorateOverlayRef<T>、openComponentDialog<T>()、event$ 全程型別推論
- 傳入/回傳型別可分離，DialogComponent 可同時取得注入資料與型別安全回傳通道
