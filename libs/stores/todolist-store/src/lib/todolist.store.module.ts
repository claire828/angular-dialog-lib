
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { todolistEntityReducer } from './states/todolist.entity.reducer';
import { TODOLIST_FEATURE_NAME } from './states/todolist.entity.selector';

@NgModule({
  imports: [
    StoreModule.forFeature(TODOLIST_FEATURE_NAME, todolistEntityReducer),
  ],
})
export class MyEntityStoreModule { }


// options2: using standalone component
/*
bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ myEntity: myEntityReducer }),
  ],
});
*/
