import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat',
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.component').then((mod) => mod.ChatComponent),
    providers: [],
  },

];
