import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Api uzklausos kelias
  private apiUrl : string = 'http://localhost:3000/users';

  constructor(private http : HttpClient) {

  }

  // Funkcija gauti visiems useriams
  getUsers(): Observable<User[]> {
    let uri = this.apiUrl;
    return this.http.get<User[]>(uri);
  }

  getUser(id : any) {
    let uri = this.apiUrl;

    uri += "/" + id;
    return this.http.get(uri);
  }

  createUser(user : User) {
    let uri = this.apiUrl;

    let body = user;

    return this.http.post(uri, body);
  }

  deleteUser(user: User) {
    let uri = this.apiUrl + "/" + user.id;


    // Kreipdamisei DELETE metodu i: http://localhost:3000/users/id
    // Istrininame irasa duombazeje
    return this.http.delete(uri);
  }
}