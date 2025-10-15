import { createFeatureSelector } from "@ngrx/store";
import { TodolistEntityState } from "./todolist.entity.state";
import { todolistEntityAdapter } from "./todolist.entity.adaptor";

export const TODOLIST_FEATURE_NAME = 'todolistEntity';
export const selectTodolistState = createFeatureSelector<TodolistEntityState>(TODOLIST_FEATURE_NAME);

// built-in methods provided by NgRx’s EntityAdapter
// When you call myEntityAdapter.getSelectors(), it generates these selectors for you based on the state managed by the adapter.
export const {
  selectAll: selectAllTodolistEntities,
  selectEntities: selectEntitiesMap,
  selectIds: selectTodolistIds,
  selectTotal: selectTodolistTotal,
} = todolistEntityAdapter.getSelectors(selectTodolistState);
