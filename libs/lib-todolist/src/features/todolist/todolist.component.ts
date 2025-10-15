import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreButtonComponent } from 'core-ui-kit'; // Ensure this import matches the alias in tsconfig
import * as uuid from 'uuid';
import { TodolistSignalStore } from '../../stores';
import { TodolistFooterComponent } from '../../uis/todolist-footer/todolist-footer.component';
import { TaskComponentComponent } from '../task-component/task-component.component';


@Component({
  selector: 'todolist',
  imports: [CommonModule, FormsModule, TaskComponentComponent, TodolistFooterComponent, CoreButtonComponent],
  providers: [TodolistSignalStore],
  template: `<section class="mx-auto mt-10 max-w-lg rounded-md bg-white p-4 shadow-md">
  <header class="mb-4 text-2xl font-bold text-gray-700">TodoList with SignalStore</header>

  <!-- Add Task Section -->
  <section class="mb-4 flex items-center gap-2">
    <input
      [(ngModel)]="taskModel"
      type="text"
      placeholder="Add a new task"
      class="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      (keydown.enter)="addTaskHandler()"
    />
    <core-button [label]="'Add Task'" (click)="addTaskHandler()" />
  </section>

  <!-- Task List Section -->
  <section>
    @if (store.entities().length > 0) {
      <div class="space-y-2">
        @for (task of store.entities(); track $index) {
          <lib-task-component [task]="task" />
        }
      </div>
    } @else {
      <p class="text-center text-gray-500">No tasks available. Add your first task!</p>
    }
  </section>

  <lib-todolist-footer [showCompletedArea]="!!store.selectedIds().length" (completeTodos)="completeHandler($event)" />
</section>
`,
})
export class TodolistComponent {
  protected store = inject(TodolistSignalStore);
  protected taskModel = model<string>('');

  protected addTaskHandler(): void {
    if (this.taskModel().length === 0 || this.taskModel().trim() === '') {
      return;
    }
    this.store.addTodo({
      id: uuid.v4(),
      name: this.taskModel(),
      completed: false,
      ts: new Date().getTime().toString()
    });
    this.taskModel.set('');

  }

  protected completeHandler(completed: boolean): void {
    this.store.completeAllTodos(completed);
  }
}
