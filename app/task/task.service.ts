import { Task } from './task.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


const BACKEND_URL = environment.apiURL;

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) { }
  
  getTasks() {
    this.http.get<{ status: string, data: any }>(BACKEND_URL + 'tasks')
      .subscribe(response => {
        this.tasks = response.data;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTask(taskId: string) {
    return this.http.get<{ status: string, data: any }>(BACKEND_URL + 'tasks/' + taskId);
  }

  addTask(task: Task) {
    this.http.post<{message: string, data: any}>(BACKEND_URL + 'tasks', task)
      .subscribe((response) => {
        this.tasks.push(response.data);
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  updateTask(task: Task) {
    this.http.put(BACKEND_URL + 'tasks/' + task.taskId, JSON.stringify(task))
      .subscribe(response => {
        const updatedTasks = [...this.tasks];
        const oldTaskIndex = updatedTasks.findIndex(t => t.taskId === task.taskId);
        updatedTasks[oldTaskIndex] = task;
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  deleteTask(taskId: string) {
    this.http.delete(BACKEND_URL + 'tasks/' + taskId)
      .subscribe(() => {
        const updatedTasks = this.tasks.filter(task => task.taskId !== taskId);
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

}
