export class Task {
  public taskId: string;
  public parentId: string;
  public task: string;
  public startDate: Date;
  public endDate: Date;
  public priority: number;

  public projectId: string;
  public status: string;
  

  constructor(id: number, parentId: string, task: string, startDate: Date, endDate: Date, priority: number, taskId: string, projectId: string, status: string) {
    this.task = task;
    this.parentId = parentId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.priority = priority;
    this.taskId = taskId;
    this.projectId = projectId;
    this.status = status;
  }
}
