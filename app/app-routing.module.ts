import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './task/addtask/addtask.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add_task', component: AddtaskComponent },
  { path: 'view_task', component: TaskListComponent },
  { path: 'edit_task/:taskId', component: AddtaskComponent },
  { path: 'add_user', component: UserComponent },
  { path: 'edit_user/:userId', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
