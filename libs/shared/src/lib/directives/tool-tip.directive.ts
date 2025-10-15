import { Directive, ElementRef, HostListener, Renderer2, input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[sharedTooltip]',
})
export class TooltipDirective {
  tooltipText = input<string>();
  tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    const text = this.tooltipText();
    if (!text) {
      return;
    }

    // Create tooltip element
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(text)
    );

    // Add classes for styling
    this.renderer.addClass(this.tooltipElement, 'absolute');
    this.renderer.addClass(this.tooltipElement, 'bg-gray-800');
    this.renderer.addClass(this.tooltipElement, 'text-white');
    this.renderer.addClass(this.tooltipElement, 'text-sm');
    this.renderer.addClass(this.tooltipElement, 'rounded-md');
    this.renderer.addClass(this.tooltipElement, 'px-2');
    this.renderer.addClass(this.tooltipElement, 'py-1');
    this.renderer.addClass(this.tooltipElement, 'z-50');
    this.renderer.addClass(this.tooltipElement, 'whitespace-nowrap');
    this.renderer.addClass(this.tooltipElement, 'shadow-lg');

    // Position the tooltip
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.tooltipElement, 'top', `${hostPos.top - 0}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${hostPos.left}px`);

    // Add the tooltip element to the DOM
    const parent = this.el.nativeElement.parentElement;
    this.renderer.appendChild(parent, this.tooltipElement);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(
        this.el.nativeElement.parentElement,
        this.tooltipElement
      );
      this.tooltipElement = null;
    }
  }
}
