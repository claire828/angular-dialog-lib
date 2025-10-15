import { OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';
import { filter, Observable, Subject, takeUntil, tap } from 'rxjs';
import { DialogEvent, DialogEventPayload } from './models';

export class DecorateOverlayRef<T = any> {
  #eventEmitterSubject: Subject<DialogEventPayload<T>> = new Subject<DialogEventPayload<T>>();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public event$: Observable<DialogEventPayload<T>> = this.#eventEmitterSubject;
  #destroySubject: Subject<boolean> = new Subject<boolean>();
  #componentRef: ComponentRef<any> | undefined;

  constructor(private overlayRef: OverlayRef, private autoClose: boolean) {
    this.overlayRef.backdropClick().pipe(
      takeUntil(this.#destroySubject),
      tap(() => this.sendEvent(DialogEvent.BackdropClick)),
      filter(() => this.autoClose),
      tap(() => this.close())
    )
      .subscribe();

  }

  public updateInput<U>(input: string, value: U): void {
    if (this.#componentRef) {
      this.#componentRef.setInput(input, value);
    }
  }

  public attachPortal<U>(portal: ComponentPortal<U>): void {
    this.#componentRef = this.overlayRef.attach(portal);
  }

  public updatePosition(strategy: PositionStrategy): void {
    this.overlayRef.updatePositionStrategy(strategy);
    this.overlayRef.updatePosition();
  }

  public sendEvent(event: DialogEvent | DialogEventPayload<T>): void {
    if (typeof event === 'object' && 'type' in event) {
      this.#eventEmitterSubject.next(event as DialogEventPayload<T>);
    } else {
      this.#eventEmitterSubject.next({ type: event } as DialogEventPayload<T>);
    }
    if (this.autoClose) {
      this.close();
    }
  }

  public close(): void {
    this.overlayRef.dispose();
    this.#destroySubject.next(true);
  }

}
