import { Directive, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { SubSink } from 'subsink';

@Directive({
  standalone: true,
  selector: '[sharedClickDebounceStopPropagation]',
})
export class ClickDebounceStopPropagationDirective implements OnDestroy {
  // TODO: 改成新的
  @Output() clickDebounceStopPropagation = new EventEmitter();
  private subSink = new SubSink();
  private click$ = new Subject<unknown>();

  constructor() {
    this.subSink.sink = this.click$
      .pipe(debounceTime(300))
      .subscribe((x) => this.clickDebounceStopPropagation.emit(x));
  }

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.click$.next(event);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
