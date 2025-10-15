import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreButtonComponent, CoreCheckboxComponent } from 'core-ui-kit'; // Ensure this import matches the alias in tsconfig
import { TaskEntity, TodolistSignalStore } from '../../stores';

@Component({
  selector: 'lib-task-component',
  standalone: true,
  imports: [CommonModule, FormsModule, CoreCheckboxComponent, CoreButtonComponent],
  templateUrl: './task-component.component.html',
})
export class TaskComponentComponent {
  public updateTask = output<TaskEntity>();
  public task = input.required<TaskEntity>();
  public isEditing = signal(false);
  public editNameModel = model<string>('');
  protected store = inject(TodolistSignalStore);
  protected selected = computed(() => this.store.selectedIds().includes(this.task().id));
  onUpdateTask() {
    this.updateTask.emit(this.task());
  }
  public onDeleteTask() {
    this.store.deleteTodo(this.task());
  }

  enableEdit() {
    this.editNameModel.set(this.task().name);
    this.isEditing.set(true);
  }

  saveEdit() {
    if (!this.isEditing()) {
      return;
    }
    this.isEditing.set(false);
    const updatedTask = {
      ...this.task(),
      name: this.editNameModel()
    };
    this.store.updateTodoName(updatedTask);
  }

  public selectChanged(isSelected: boolean) {
    if (isSelected) {
      this.store.addSelected(this.task().id);
      return;
    }
    this.store.removeSelected(this.task().id);
  }

}
