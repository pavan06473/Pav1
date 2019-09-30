import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  @ViewChild('addForm') addNewTaskForm: NgForm;
  newTask: Task;
  taskToEdit: Task;
  taskAdded = false;
  private mode = 'add';
  private taskId: string;


  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.taskService.getTask(this.taskId).subscribe(response => {
          this.taskToEdit = response.data;
        });

      } else {
        this.mode = 'add';
        this.taskId = null;
      }
    });
  }

  onSaveTask() {
    if (this.addNewTaskForm.invalid) { return; }

    if (this.mode === 'add') {
      const taskpriority =
        (this.addNewTaskForm.value.task_priority === null) ? 15 : this.addNewTaskForm.value.task_priority;
      this.newTask = new Task(null,
        this.addNewTaskForm.value.parent_task,
        this.addNewTaskForm.value.task,
        this.addNewTaskForm.value.start_date,
        this.addNewTaskForm.value.end_date,
        taskpriority, null, null, 'Init');

      this.taskService.addTask(this.newTask);

    } else {
      this.taskToEdit.task = this.addNewTaskForm.value.task;
      this.taskToEdit.parentId = this.addNewTaskForm.value.parent_task;
      this.taskToEdit.startDate = this.addNewTaskForm.value.start_date;
      this.taskToEdit.endDate = this.addNewTaskForm.value.end_date;
      this.taskToEdit.priority = this.addNewTaskForm.value.task_priority;

      this.taskService.updateTask(this.taskToEdit);
    }



    this.addNewTaskForm.reset();
    this.taskAdded = true;
    this.router.navigate(['/view_task']);
  }

  onReset() {
    this.addNewTaskForm.reset();
  }

}
