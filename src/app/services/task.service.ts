import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl : string = 'http://localhost:3000/tasks';

  constructor(private http : HttpClient) { }

  getTasks() : Observable<Task[]>{
    let uri = this.apiUrl;
    return this.http.get<Task[]>(uri);
  }
  //Pakeiciame task.completed reiksme serveryje
  toggleTask(task : Task){
    // let uri = this.apiUrl + "/" + task.id;
    let uri = `${this.apiUrl}/${task.id}`;
    console.log("Uzklausa:" + uri)
    //Perduodame URL ir body dali(objekta task : Task)
    return this.http.patch(uri, task)
  }

  createTask(){

  }

  updateTask(){
    
  }

  deleteTask(){
    
  }
}
