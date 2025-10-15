import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DecorateOverlayRef, DIALOG_COMPONENT_PROVIDER, DialogComponentConfig } from 'dialog';

@Component({
  selector: 'web-features-mock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mock">
      <p>mock works!</p>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class WebFeatureMockComponent {
  constructor(
    private ref: DecorateOverlayRef,
    @Inject(DIALOG_COMPONENT_PROVIDER) public config: DialogComponentConfig
  ) {}
}
