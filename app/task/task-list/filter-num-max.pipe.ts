import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNumMax'
})
export class FilterNumMaxPipe implements PipeTransform {

  transform(tasks: any, filterPriority: number, propName: string): any {
    if (tasks.length === 0) {
      return false;
    }

    const filteredPriorityArray = [];
    for (const task of tasks) {
      if (task[propName] <= filterPriority) {
        filteredPriorityArray.push(task);
      }
    }
    return filteredPriorityArray;
  }
}
