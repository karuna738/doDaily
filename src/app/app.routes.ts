import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SettingsComponent } from './features/settings/settings.component';

import { TasksComponent } from './features/tasks/tasks.component';
import { NewTaskComponent } from './features/tasks/new-task/new-task.component';
import { TaskDetailComponent } from './features/tasks/task-detail/task-detail.component';

import { ProjectsComponent } from './features/projects/projects.component';
import { NewProjectComponent } from './features/projects/new-project/new-project.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';

import { MessagesComponent } from './features/messages/messages.component';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // 🔐 AUTH LAYOUT
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  // 🧩 MAIN APP LAYOUT
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'messages', component: MessagesComponent },

      {
        path: 'tasks',
        children: [
          { path: '', component: TasksComponent },
          { path: 'new', component: NewTaskComponent },
          { path: ':id', component: TaskDetailComponent },
        ],
      },

      {
        path: 'projects',
        children: [
          { path: '', component: ProjectsComponent },
          { path: 'new', component: NewProjectComponent },
          { path: ':id', component: ProjectDetailComponent },
        ],
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
