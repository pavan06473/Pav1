import { User } from './user.model';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class UserService {
  private tasks: User[] = [];
  private tasksUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getTasks() {
    this.http.get<{message: string, tasks: any}>( BACKEND_URL + 'tasks')
      .pipe(map((taskData) => {
        return taskData.tasks(task => {
          return {
            id: task.taskId,
            parentId: task.parentId,
            taskName: task.taskName,
            startDate: task.startDate,
            endDate: task.endDate,
            priority: task.priority,
            taskId: task.taskId
          };
        });
      }))
      .subscribe((mappedTask) => {
        this.tasks = mappedTask;
        this.tasksUpdated.next([...this.tasks]);
    });
  }

  getTask(taskId: number) {
    return this.http
    .get<{_id: number, taskName: string, parentId: string, startDate: string, endDate: string, priority: number, taskId: number, __v: any}>
    (BACKEND_URL + 'tasks/' + taskId);
  }

  addTask(task: User) {
    this.http.post<{message: string}>(BACKEND_URL + 'tasks', task)
      .subscribe((resData) => {
        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  updateTask(task: User) {
    this.http.put(BACKEND_URL + 'tasks', task)
      .subscribe(response => {
        const updatedTasks = [...this.tasks];
        const oldTaskIndex = updatedTasks.findIndex(t => t.userId === task.userId);
        updatedTasks[oldTaskIndex] = task;
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  deleteTask(taskId: number) {
    this.http.delete(BACKEND_URL + 'tasks/' + taskId)
    .subscribe(() => {
      const updatedTasks = this.tasks.filter(task => task.userId !== taskId);
      this.tasks = updatedTasks;
      this.tasksUpdated.next([...this.tasks]);
    });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

}
