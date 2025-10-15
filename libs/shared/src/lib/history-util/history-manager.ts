import { WritableSignal, computed, signal } from '@angular/core';
import { Editor, History } from './index';

export interface HistoryStruct<T> {
  state: T;
  hasPrev: boolean;
  hasNext: boolean;
}

export class HistoryManager<T> {
  public resultSignal = computed<HistoryStruct<T | undefined>>(() => {
    return {
      state: this.stateSignal(),
      hasPrev: this.history.hasPrev(),
      hasNext: this.history.hasNext(),
    };
  });
  public hasBeenEditedYet = computed(() => this.history.hasNext() || this.history.hasPrev());
  private stateSignal: WritableSignal<T | undefined> = signal(undefined);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public currentState = this.stateSignal.asReadonly();
  private editor: Editor<T> = new Editor<T>();
  private history: History<T> = new History<T>();

  constructor(defaultState: T) {
    this.write(defaultState);
  }

  public get defaultData(): T | undefined {
    return this.history.defaultSnapshotData;
  }

  public write(data: T): void {
    this.editor.add(data);
    const snapshot = this.editor.createSnapshot();
    this.history.push(snapshot);
    this.stateSignal.set(this.editor.getData());
  }

  public redo(): void {
    const nextSnapshot = this.history.goToNext();
    if (nextSnapshot) {
      this.editor.restoreFromSnapshot(nextSnapshot);
      this.stateSignal.set(this.editor.getData());
    }
  }

  public undo(): void {
    const previousSnapshot = this.history.goToPrev();
    if (previousSnapshot) {
      this.editor.restoreFromSnapshot(previousSnapshot);
      this.stateSignal.set(this.editor.getData());
    }
  }

  public setUndoLimitNum(num: number): void {
    this.history.setLimit(num);
  }
}
