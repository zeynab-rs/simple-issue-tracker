import { Routes } from '@angular/router';
import { IssuesPage } from './pages/issues-page/issues-page';
import { IssueFormPage } from './pages/issue-form-page/issue-form-page';

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
  {
    path: 'issues/new',
    component: IssueFormPage,
  },
  {
    path: 'issues/:id',
    component: IssueFormPage,
  },
];