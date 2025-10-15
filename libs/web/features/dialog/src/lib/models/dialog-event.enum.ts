export enum DialogEvent {
  Enter = "Enter",
  Cancel = "Cancel",
  BackdropClick = "BackdropClick",
}

export interface DialogEventPayload<T = any> {
  type: DialogEvent;
  data?: T;
}
