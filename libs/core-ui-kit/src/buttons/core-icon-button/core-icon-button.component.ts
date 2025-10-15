import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

type ButtonColor = 'primary' | 'secondary' | 'accent' | 'blue' | 'red' | 'green' | 'gray';
type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Reusable icon button component with customizable styling.
 * Provides signal-based inputs for reactive updates and follows Angular best practices.
 * Features a plus icon with configurable colors, sizes, and disabled states.
 */
@Component({
  selector: 'core-icon-button',
  imports: [CommonModule],
  template: `
    <button
      (click)="onButtonClick()"
      [class]="buttonClasses()"
      [disabled]="disabled()"
      [attr.aria-label]="name()"
      class="cursor-pointer"
    >
      <svg
        [attr.width]="iconSize()"
        [attr.height]="iconSize()"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="mr-2"
        aria-hidden="true"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <span>{{ name() }}</span>
    </button>
  `,
  standalone: true,
})
export class CoreIconButtonComponent {
  /** Button display text */
  readonly name = input<string>('Add Source');

  /** Button color theme variant */
  readonly color = input<ButtonColor>('secondary');

  /** Button size variant */
  readonly size = input<ButtonSize>('medium');

  /** Whether the button is disabled */
  readonly disabled = input<boolean>(false);

  /** Emitted when button is clicked (only when not disabled) */
  readonly buttonClick = output<void>();

  /**
   * Computed icon size based on button size.
   * Returns appropriate pixel value for the SVG icon.
   */
  readonly iconSize = computed(() => {
    const sizeMap: Record<ButtonSize, number> = {
      small: 16,
      medium: 20,
      large: 24,
    };
    return sizeMap[this.size()];
  });

  /**
   * Computed complete CSS class string for the button element.
   * Combines base styling with size, color, and disabled state classes.
   */
  readonly buttonClasses = computed(() => {
    const baseClasses = 'flex items-center justify-center rounded-lg shadow transition-all duration-200';

    return [
      baseClasses,
      this.sizeClasses(),
      this.colorClasses(),
      this.disabledClasses(),
    ].join(' ');
  });

  /**
   * Computed CSS classes for button sizing and typography.
   * Provides responsive padding and text sizing based on size input.
   */
  private readonly sizeClasses = computed(() => {
    const sizeMap: Record<ButtonSize, string> = {
      small: 'px-2 py-1 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };
    return sizeMap[this.size()];
  });

  /**
   * Computed CSS classes for button color theming.
   * Includes background, text, and hover state colors.
   */
  private readonly colorClasses = computed(() => {
    const colorMap: Record<ButtonColor, string> = {
      primary: 'bg-white text-gray-800 hover:bg-gray-100',
      secondary: 'bg-yellow-100 text-gray-800 hover:bg-yellow-200',
      accent: 'bg-green-100 text-gray-800 hover:bg-green-200',
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      red: 'bg-red-100 text-red-800 hover:bg-red-200',
      green: 'bg-green-100 text-green-800 hover:bg-green-200',
      gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    };
    return colorMap[this.color()];
  });

  /**
   * Computed CSS classes for disabled state styling.
   * Applies opacity reduction and cursor changes when disabled.
   */
  private readonly disabledClasses = computed(() =>
    this.disabled()
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer hover:shadow-md'
  );

  /**
   * Handles button click events.
   * Only emits click event when button is not disabled.
   */
  onButtonClick(): void {
    if (this.disabled()) {
      return;
    }

    this.buttonClick.emit();
  }
}
