import { Component, OnInit, HostListener, Host } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({
  //       transform: 'translate3d(0,0,0)'
  //     })),
  //     state('out', style({
  //       transform: 'translate3d(100%, 0, 0)'
  //     })),
  //     transition('in => out', animate('400ms ease-in-out')),
  //     transition('out => in', animate('400ms ease-in-out'))
  //   ]),
  // ]
})
export class TodoListComponent implements OnInit {
  public tasks: Task[] = [];

 // Kitamasis kuris pasako ar atvaizduoti task details komponenta
 public showTaskDetails: boolean = false;

 // Pasirinkta uzduotis, kurios informacija tures buti atvaizduojama <app-task-details> komponente
 public selectedTask: Task | null = null;
 /* Klaviaturos mygtuku event listener pavyzdys */
 @HostListener('document:keydown', ['$event'])
 onKeyDownHandler(event: any) {
   /* event.key - grazina paspausto mygtuko koda */
   // console.log(event);
   console.log(event.keyCode);
   // Escape - keyCode yra 27
   if (event.keyCode === 27) {
     this.toggleTaskDetails(null, true);
   }
 }

 // Injectiname tasks service i komponenta
 constructor(
   private _taskService: TaskService,
   private _userService: UserService
   ) {
   this.getTasks();
 }

 ngOnInit(): void {
 }

 getTasks() {
  // Gauname duomenis is task Service
 //  this._taskService
 //    .getTasks()
 //    .subscribe((data: Task[]) => {
 //      this.tasks = data;
 //      console.log(this.tasks);
 //    });
 forkJoin([
  this._taskService.getTasks(),
  this._userService.getUsers()
 ])
 .pipe(
   map(([tasks, users])=>{
     return tasks.map(task =>{
       task.user = users.filter(user => user.id == task.user_id)[0];
       return task;
     });
   })
 )
 .subscribe((data: Task[]) => {
       this.tasks = data;
 })
}
 
//  menuState:string = 'out';

//  toggleMenu(){
//    this.menuState = this.menuState === 'out' ? 'in' : 'out';
//  }


 toggleTaskDetails(task: Task | null, close: boolean = false) {

   if ((this.selectedTask == task || this.showTaskDetails == false) || this.selectedTask == null) {
     this.showTaskDetails = !this.showTaskDetails;
   }

   /* Force close */
   if (close) {
     this.showTaskDetails = false;
   }

   this.selectedTask = task;

   /* Jei uzdaromas taskDetails komponentas, selectedTask nustatoma null reiksme */
   if (this.showTaskDetails == false) {
     this.selectedTask = null;
   }
 }


 toggleTask(task: Task) {
   /* Jei task.completed buvo true, tai pataps false */
   /* Jei task.completed buvo false, tai pataps true */
   task.completed = !task.completed;
   console.log(task);

   // Iskvieciame task service toggle task funkcija
   // atnaujinti duomenis duombazeje/serveryje
   this._taskService.toggleTask(task).subscribe((data: any) => {
     console.log(data);
   });
 }

 deleteTask(task: Task) {
   console.log('Task Will be deleted:');
   console.log(task);
   this._taskService.deleteTask(task).subscribe(data => {
     console.log(data);
     // Po sekmingo istrynimo atnaujiname tasks duomenis
     this.getTasks();
   });
 }

}