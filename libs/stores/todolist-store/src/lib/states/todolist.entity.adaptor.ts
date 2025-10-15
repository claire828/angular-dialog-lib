import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { TaskEntity } from "../models";

export const todolistEntityAdapter: EntityAdapter<TaskEntity> =
  createEntityAdapter<TaskEntity>({
    selectId: (task: TaskEntity) => task.id,
    sortComparer: (a: TaskEntity, b: TaskEntity) => a.name.localeCompare(b.name)
  })
