import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-features-mock-no-injector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full h-[100px] flex items-center justify-center">
      <p>WebFeatureMockNoInjectorComponent!</p>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class WebFeatureMockNoInjectorComponent {
  constructor() {

  }
}
