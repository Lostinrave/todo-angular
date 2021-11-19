import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  /*
  TODO:
    deleteUser()
    resetForm() - funkcija isvalyti formos reiksmes
    Validacija - required ir kiti patikrinimai
  */

  public users: User[] = [];

  // Kintamasis irasyti naujai sukuriamo userio duomenis
  public newUser: User = {
    'name': '',
    'email': ''
  }

  // Standartinis avatar, kuris naudojamas jei vartotojas neturi nuotraukos
  public defaultAvatar: string = "assets/img/default-avatar.png";

  public hideForm : boolean = true;

  // @Output() newItemEvent = new EventEmitter();

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  toggleCreateForm() {
    this.hideForm = !this.hideForm;
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
          this.getUsers();
      });
    }
  }

  deleteUser(user: User) {
    console.log('User Will be deleted:');
    console.log(user);
    this._userService.deleteUser(user).subscribe(data => {
      console.log(data);
      // Po sekmingo istrynimo atnaujiname tasks duomenis
      this.getUsers();
    });
  }


}