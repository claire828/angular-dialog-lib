import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todolistEntityReducer } from 'todolist-store';
import { appRoutes } from './app.routes';


// TODO: 這邊應該要改成從環境變數取得
const devMode = true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !devMode,
      connectInZone: true
    }),
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideStore({ todolistEntity: todolistEntityReducer }),
    provideHttpClient(withFetch(), withInterceptors([]))
  ],
};
