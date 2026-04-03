import { Routes } from '@angular/router';
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

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/new', component: NewTaskComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/new', component: NewProjectComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'messages', component: MessagesComponent }
];
