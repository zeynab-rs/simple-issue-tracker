import { Routes } from '@angular/router';
import { IssuesPage } from './pages/issues-page/issues-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'issues',
    pathMatch: 'full',
  },
  {
    path: 'issues',
    component: IssuesPage,
  },
];