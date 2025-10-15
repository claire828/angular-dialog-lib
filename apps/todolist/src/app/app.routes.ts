import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    title: 'TodoList with SignalStore',
    path: '1',
    loadComponent: () => import('lib-todolist').then((m) => m.TodolistComponent),
  },
  {
    title: 'TodoList with RXResource',
    path: '2',
    loadComponent: () => import('lib-todolist').then((m) => m.TodolistHttpResourceComponent),
  }
];
