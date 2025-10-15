import { withDevtools, withGlitchTracking } from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import {
  removeEntities,
  removeEntity,
  setEntities,
  setEntity,
  updateEntities,
  updateEntity,
  withEntities
} from '@ngrx/signals/entities';
import { TaskEntity } from '../models';
import { TodolistState } from '../models/todolist.state';

const initialState: TodolistState = {
  selectedIds: [],
}

export const TodolistSignalStore = signalStore(
  withDevtools('todolistLocal', withGlitchTracking()),
  withState(initialState),
  // withCallState() is a helper function that adds a call state to the store
  withEntities<TaskEntity>(),
  withProps(() => {
    const httpClient = inject(HttpClient);
    const url = 'http://localhost:3000/tasks';
    return { httpClient, url };
  }),
  withMethods(
    (store) => ({
      fetchAllTask: async () => {
        const data = await fetch(store.url);
        if (!data.ok) {
          throw Error('error');
        }
        return await data.json() as TaskEntity[];
      },
      addTodo(todo: TaskEntity): void {
        // If the entity collection has an entity with the same ID, it is not overridden and no error is thrown.
        store.httpClient.post(store.url, todo).subscribe(() => {
          patchState(store, setEntity(todo));
        });
      },
      setTodos(todos: TaskEntity[]): void {
        patchState(store, setEntities(todos)); // Adds or replaces an entity in the collection.//
      },
      updateTodoName(updateTodo: TaskEntity): void {
        store.httpClient.patch(`${store.url}/${updateTodo.id}`, updateTodo).subscribe(() => {
          patchState(store, updateEntity({
            id: updateTodo.id,
            changes: (todo) => ({ ...todo, name: updateTodo.name })
          }));
        })
      },
      deleteTodo(todo: TaskEntity): void {
        store.httpClient.delete(`${store.url}/${todo.id}`).subscribe(() => {
          patchState(store, (state) => {
            return {
              ...removeEntity(todo.id)(state),
              selectedIds: state.selectedIds.filter((selectedId) => selectedId !== todo.id),
            };
          });
        });
      },
      removeEmptyTodos(): void {
        patchState(store, removeEntities(({ name }) => !name));
      },
      completeAllTodos(completed: boolean): void {
        patchState(store, updateEntities({
          ids: store.selectedIds(),
          changes: { completed }
        }));
      },
      addSelected(id: string): void {
        patchState(store, {
          selectedIds: [...store.selectedIds(), id]
        });
      },
      removeSelected(id: string): void {
        patchState(store, {
          selectedIds: [...store.selectedIds().filter((selectedId) => selectedId !== id)]
        });
      },

    }),

  ),
  withHooks({
    onInit(store) {
      store.fetchAllTask().then(tasks => {
        store.setTodos(tasks);
      }).catch(error => {
        console.error('Failed to fetch tasks:', error);
      });
    }
  }),
);
