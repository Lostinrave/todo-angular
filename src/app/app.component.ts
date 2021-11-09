import { Component } from '@angular/core';
import { Task } from './interfaces/task';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'todo-angular';

  public tasks : Task[] = [];

  constructor (private _taskService : TaskService){
    this._taskService.getTasks().subscribe((data: Task[]) =>{
      this.tasks = data;
      console.log(this.tasks)
    });
  }
}
