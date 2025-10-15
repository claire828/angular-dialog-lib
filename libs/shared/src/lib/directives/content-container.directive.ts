import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[sharedContentContainer]',
})
export class ContentContainerDirective {
  constructor(private viewContainerRef: ViewContainerRef) { }

  // TODO: 改成新的
  @Input() set sharedContentContainer(
    contentFactory: (viewContainerRef: ViewContainerRef) => void
  ) {
    contentFactory(this.viewContainerRef);
  }
}
