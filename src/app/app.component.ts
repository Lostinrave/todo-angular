import { Component } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-angular';
  constructor (private _taskService : TaskService){
    this._taskService.getTasks().subscribe(data =>{
      console.log(data);
    });
  }
}
