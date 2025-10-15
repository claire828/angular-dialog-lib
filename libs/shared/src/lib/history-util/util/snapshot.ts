export class Snapshot<T> {
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  public getState(): T {
    return this.data;
  }
}
