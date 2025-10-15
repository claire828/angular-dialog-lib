import { Snapshot } from './snapshot';

export class Editor<T> {
  private data: T = {} as unknown as T;

  public add(payload: T): void {
    this.data = payload;
  }

  public getData(): T {
    return this.data;
  }

  public createSnapshot(): Snapshot<T> {
    return new Snapshot<T>(this.data);
  }

  public restoreFromSnapshot(snapshot: Snapshot<T>): void {
    this.data = snapshot.getState();
  }
}
