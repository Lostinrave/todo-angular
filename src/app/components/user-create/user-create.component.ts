import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public users: User[] = [];

  // Kintamasis irasyti naujai sukuriamo userio duomenis
  public newUser: User = {
    'name': '',
    'email': ''
  }

  @Output() newItemEvent = new EventEmitter(); 

  constructor(private _userService : UserService) { }

  ngOnInit(): void {
    this.getUsers
  }

  getUsers() {
    this._userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }


  addUser(form: NgForm) {
    console.log(this.newUser);
    if(form.valid){
      this._userService.createUser(this.newUser)
        .subscribe((data: any) => {
          alert("User succesfully added!");
          // Po sukurimo, nustatome tuscias reiksmes, formos kintamiesiems
          form.resetForm();
          this.newItemEvent.emit(data);
      });
    }
  }


}
