import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'core-checkbox',
  imports: [CommonModule],
  template: `<div class="flex items-center">
    <!-- Hidden Checkbox -->
    <input
      type="checkbox"
      class="peer hidden"
      [id]="uniqId"
      [checked]="checked"
      (change)="checkedChangeHandler()"
    />

    <!-- Label -->
    <label
      [for]="uniqId"
      class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border transition-all duration-200 ease-in-out"
      [ngClass]="[
        checked ? 'text-white' : 'bg-transparent',
        checked ? bgColorClass : borderColorClass
      ]"
    >
      <!-- Arrow Icon -->
      <svg
        *ngIf="checked"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </label>
  </div>`,
  standalone: true,
})
export class CoreCheckboxComponent {
  @Input() checked = false;
  @Input() uniqId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  @Input() color: 'black' | 'blue' | 'red' | 'green' | 'gray' = 'black'; // Input for color
  @Output() checkedChange = new EventEmitter<boolean>();

  get bgColorClass(): string {
    switch (this.color) {
      case 'blue':
        return 'bg-blue-500 border-blue-500';
      case 'red':
        return 'bg-red-500 border-red-500';
      case 'green':
        return 'bg-green-500 border-green-500';
      case 'gray':
        return 'bg-gray-500 border-gray-500';
      default:
        return 'bg-black border-black';
    }
  }

  get borderColorClass(): string {
    switch (this.color) {
      case 'blue':
        return 'border-blue-500';
      case 'red':
        return 'border-red-500';
      case 'green':
        return 'border-green-500';
      case 'gray':
        return 'border-gray-500';
      default:
        return 'border-black';
    }
  }

  checkedChangeHandler(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
