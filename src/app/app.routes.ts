import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
