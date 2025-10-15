/* eslint-disable @typescript-eslint/member-ordering */
import { computed, signal } from '@angular/core';
import { Snapshot } from './snapshot';

export class History<T> {
  private currentIndex = signal<number>(-1);
  public hasPrev = computed(() => this.currentIndex() > 0);
  public hasNext = computed(() => this.currentIndex() < this.snapshots.length - 1);
  private snapshots: Snapshot<T>[];
  private numberOfUndo = 30;

  constructor(undoLimit: number = 30) {
    this.snapshots = [];
    this.setLimit(undoLimit);
  }

  public get hasDefault(): boolean {
    return !!this.snapshots.length;
  }

  public get defaultSnapshotData(): T | undefined {
    return this.snapshots[0]?.getState() || undefined;
  }

  public setLimit(limit: number): void {
    this.numberOfUndo = limit < 1 ? 1 : limit;
  }

  public push(memento: Snapshot<T>): void {
    const nextIndex = this.currentIndex() + 1;
    const isInUndoStep = nextIndex < this.snapshots.length;
    if (isInUndoStep) {
      this.snapshots = this.snapshots.splice(0, nextIndex);
    }
    const isOutOfLimitation = nextIndex > this.numberOfUndo;
    if (isOutOfLimitation) {
      const oldestItem = this.snapshots[1] ?? null;
      this.snapshots = this.snapshots.filter((snapshot) => snapshot !== oldestItem);
    } else {
      this.currentIndex.set(nextIndex);
    }
    this.snapshots.push(memento);
  }

  public goToPrev(): Snapshot<T> | undefined {
    if (this.hasPrev()) {
      this.currentIndex.update((index) => index - 1);
      return this.snapshots[this.currentIndex()];
    }
    return undefined;
  }

  public goToNext(): Snapshot<T> | undefined {
    if (this.hasNext()) {
      this.currentIndex.update((index) => index + 1);
      return this.snapshots[this.currentIndex()];
    }
    return undefined;
  }
}
