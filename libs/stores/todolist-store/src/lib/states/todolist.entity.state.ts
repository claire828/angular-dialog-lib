import { TaskEntity } from "../models";
import { EntityState } from '@ngrx/entity';

export interface TodolistEntityState extends EntityState<TaskEntity> {
  selected: string[];
}

export const initialState: TodolistEntityState = {
  ids: [],
  entities: {},
  selected: []
};


