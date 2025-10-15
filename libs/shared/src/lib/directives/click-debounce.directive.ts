import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { SubSink } from 'subsink';
import { WebEvent } from '../events';

@Directive({
  standalone: true,
  selector: '[sharedClickDebounce]',
})
export class ClickDebounceDirective implements OnDestroy {
  // TODO: 改成新的
  @Output() monorepoClickDebounce = new EventEmitter();
  private subSink = new SubSink();

  constructor(elemRef: ElementRef) {
    // 這個是傳入pointEvent, 如果要MouseEvent做其他對應動作，就專注使用HostListener
    this.subSink.sink = fromEvent(elemRef.nativeElement, WebEvent.Mouse.Type.Click)
      .pipe(debounceTime(300))
      .subscribe((x) => this.monorepoClickDebounce.emit(x));
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
