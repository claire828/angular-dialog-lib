import { createAction, props } from "@ngrx/store";
import { TaskEntity } from "../models";

const PREFIX = '[TodolistEntity]';

export const loadTodolistEntities = createAction(`${PREFIX} Load TodolistEntities`);
export const loadTodolistEntitiesSuccess = createAction(
  `${PREFIX} Load TodolistEntities Success`,
  props<{ entities: TaskEntity[] }>()
);
export const loadTodolistEntitiesFailure = createAction(
  `${PREFIX} Load TodolistEntities Failure`,
  props<{ error: unknown }>()
);

export const addTodolistEntity = createAction(
  `${PREFIX} Add TodolistEntity`,
  props<{ entity: TaskEntity }>()
);

export const updateTodolistEntity = createAction(
  `${PREFIX} Update TodolistEntity`,
  props<{ entity: TaskEntity }>()
);
export const deleteEntity = createAction(
  `${PREFIX} Delete TodolistEntity`,
  props<{ id: string }>()
)
