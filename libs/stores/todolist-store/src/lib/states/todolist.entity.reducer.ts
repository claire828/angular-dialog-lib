import { createReducer, on } from "@ngrx/store";
import { initialState } from "./todolist.entity.state";
import { addTodolistEntity, loadTodolistEntitiesSuccess, deleteEntity, updateTodolistEntity } from "./todolist.entity.actions";
import { todolistEntityAdapter } from "./todolist.entity.adaptor";

export const todolistEntityReducer = createReducer(
  initialState,
  on(loadTodolistEntitiesSuccess, (state, { entities }) => todolistEntityAdapter.setAll(entities, state)),
  on(addTodolistEntity, (state, { entity }) => todolistEntityAdapter.addOne(entity, state)),
  on(updateTodolistEntity, (state, { entity }) => todolistEntityAdapter.updateOne({ id: entity.id, changes: entity }, state)),
  on(deleteEntity, (state, { id }) => todolistEntityAdapter.removeOne(id, state)),
)
