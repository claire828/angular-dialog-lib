# Dialog User Guide

This document is for users and application developers, focusing on how to use DialogService in your project, including API, examples, common scenarios, and tutorials.

---

## What problems does this Dialog solve?

- Flexible dialog content: supports plain text, Angular components, or custom content
- Bidirectional parent-child data flow: parent can pass data to Dialog, Dialog can return data/events to parent
- Injection/communication: uses Angular DI and RxJS Observable for two-way communication
- Dialog styling: built-in Tailwind support, customizable appearance
- Advanced dialog behaviors: custom providers, tokens, overlay strategies

---

## Quick Start

```typescript
import { DialogService, MOCK_CONFIG } from 'dialog';

// Open default Dialog
const ref = dialogService.openDefaultDialog(MOCK_CONFIG);
ref.event$.subscribe((event) => {
  // Handle Enter/Cancel/BackdropClick events
});

// Open dynamic component Dialog
const config: DialogComponentConfig = {
  injectorID: 'unique-id',
  componentRef: () => MyCustomComponent,
  overlayConfig: DEFAULT_OVERLAY_CONFIG,
  data: { foo: 'bar' },
};
const ref2 = dialogService.openComponentDialog(config);
```

---

## Dialog Configuration & API

| API                                          | Parameters                                                     | Return Type                         | Description                                                                                                                                                                         | Return Type Details                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `openDefaultDialog(config)`                  | `config: DefaultDialogConfig`                                  | `DecorateOverlayRef`                | Shows simple messages, confirmation boxes, etc. Returns `DecorateOverlayRef` for closing dialog, listening to events, and getting overlay state.                                    | Dialog instance reference, can close(), listen to event$, sendEvent() (type void).                           |
| `openComponentDialog<T>(config, providers?)` | `config: DialogComponentConfig`<br>`providers?: ProviderTypes` | `DecorateOverlayRef<T>`             | Shows custom Angular component, supports complex interactions, forms, wizards, etc. Returns `DecorateOverlayRef<T>`, T is the dialog return type, for type-safe event/data passing. | Dialog instance reference, T is return type. Can close(), listen to type-safe event$, sendEvent(payload: T). |
| `DecorateOverlayRef<T>.event$`               | None                                                           | `Observable<DialogEventPayload<T>>` | Event stream Observable, parent subscribes to get dialog interaction events and data. Type-safe, `event.data` is automatically inferred as T.                                       | Type-safe event stream, event.type for event type, event.data is inferred as T.                              |
| `DialogEvent`                                | None                                                           | `{ Enter, Cancel, BackdropClick }`  | Event type enum, used to determine dialog interactions (submit, cancel, backdrop click, etc.).                                                                                      | Event type enum, used for event.type.                                                                        |

---

### How to get DecorateOverlayRef<T>.event$

DialogService.openDefaultDialog/openComponentDialog returns a DecorateOverlayRef instance, directly use ref.event$ to get the event stream:

```typescript
const ref = dialogService.openComponentDialog<MyPayload>(config);
ref.event$.subscribe((event) => {
  if (event.type === DialogEvent.Enter) {
    // event.data is automatically inferred as MyPayload
    console.log(event.data);
  }
});
```

---

## Parent-Child Data Passing

### Dialog returns data to parent

Inside Dialog, use `DecorateOverlayRef.sendEvent` to return data, parent listens with `event$`:

```typescript
// Inside Dialog
submit() {
  this.ref.sendEvent({ type: DialogEvent.Enter, data: this.inputValue });
}

// Parent
ref.event$.subscribe(event => {
  if (event.type === DialogEvent.Enter) {
    console.log('User input:', event.data);
  }
});
```

### Parent passes data to Dialog

- Use config's `data` field or custom provider injection
- Dynamic component can inject and access directly

---

## Advanced Usage: Custom Token & Full Lifecycle

1. Parent calls openComponentDialog with config/providers
2. DialogService creates overlay and injects provider
3. DialogComponent gets injected data
4. Dynamic component can use DecorateOverlayRef to pass events/data
5. Parent subscribes to event$ for results

#### Example

```typescript
// Define custom Token
export const MY_DIALOG_DATA = new InjectionToken<string>('MY_DIALOG_DATA');

// Pass in provider
const providers = [{ provide: MY_DIALOG_DATA, useValue: { foo: 'bar' } }];
const ref = dialogService.openComponentDialog(config, providers);

// Inject in Dialog
constructor(@Inject(MY_DIALOG_DATA) public data: any) {}
```

---

## Summary

- Data injection: use config.data, @Inject(DIALOG_COMPONENT_PROVIDER), or custom InjectionToken
- Type-safe return: DecorateOverlayRef<T>, openComponentDialog<T>(), event$ with full type inference
- Input/output types can be separated, DialogComponent can access injected data and type-safe return channel
