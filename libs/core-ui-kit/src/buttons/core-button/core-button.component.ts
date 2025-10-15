import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'core-button',
  imports: [CommonModule],
  template: `
    <button
      [class]="[
        'rounded font-medium transition-all duration-300 border',
        sizeClasses,
        disabled ? 'opacity-50 cursor-not-allowed' : modeClasses
      ].join(' ')"
      [disabled]="disabled"
    >
      {{ label }}
    </button>
  `,
  standalone: true,
})
export class CoreButtonComponent {
  @Input() label = 'Button';
  @Input() color: 'blue' | 'red' | 'green' | 'gray' = 'blue';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() mode: 'default' | 'border' = 'default'; // New input to switch between modes

  get sizeClasses(): string {
    switch (this.size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  }

  get modeClasses(): string {
    if (this.mode === 'border') {
      return this.borderModeClasses;
    }
    return this.defaultModeClasses;
  }

  private get defaultModeClasses(): string {
    switch (this.color) {
      case 'red':
        return 'bg-red-800 text-white hover:bg-transparent hover:border-red-800 hover:text-red-800';
      case 'green':
        return 'bg-green-800 text-white hover:bg-transparent hover:border-green-800 hover:text-green-800';
      case 'gray':
        return 'bg-gray-500 text-white hover:bg-transparent hover:border-gray-500 hover:text-gray-500';
      default:
        return 'bg-blue-500 text-white hover:bg-transparent hover:border-blue-500 hover:text-blue-500';
    }
  }

  private get borderModeClasses(): string {
    switch (this.color) {
      case 'red':
        return 'border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white hover:border-transparent';
      case 'green':
        return 'border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white hover:border-transparent';
      case 'gray':
        return 'border-gray-500 text-gray-500 bg-transparent hover:bg-gray-500 hover:text-white hover:border-transparent';
      default:
        return 'border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white hover:border-transparent';
    }
  }
}
