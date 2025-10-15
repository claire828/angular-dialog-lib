import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreButtonComponent } from 'core-ui-kit'; // Ensure this import matches the alias in tsconfig

@Component({
  selector: 'lib-todolist-footer',
  standalone: true,
  imports: [CommonModule, CoreButtonComponent],
  template: `<footer class="mt-4 flex justify-between text-sm">
    <core-button [color]="'gray'" [label]="'Select All'"></core-button>

    @if (this.showCompletedArea()) {
      <div class="flex gap-2">
        <core-button
          [color]="'green'"
          [mode]='"border"'
          [label]="'Complete'"
          (click)="completeAllTodos()"
        />
        <core-button
          [color]="'gray'"
          [mode]='"border"'
          [label]="'Incomplete'"
          (click)="incompleteAllTodos()"
        />
      </div>
    }
  </footer>`,
})
export class TodolistFooterComponent {
  public completeTodos = output<boolean>();
  public showCompletedArea = input.required<boolean>();

  public completeAllTodos(): void {
    this.completeTodos.emit(true);
  }

  public incompleteAllTodos(): void {
    this.completeTodos.emit(false);
  }
}
