import { Component } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'todo-angular';

  public tasks : any = [];

  constructor (private _taskService : TaskService){
    this._taskService.getTasks().subscribe(data =>{
      this.tasks = data;
      console.log(this.tasks)
    });
  }
}
