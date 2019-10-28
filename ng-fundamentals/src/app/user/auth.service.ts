import {Injectable} from '@angular/core';
import {UserModel} from "../events/shared/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class AuthService {
  currentUser: UserModel;

  constructor(private http: HttpClient) {
  }

  loginUser(username: string, password: string) {
    // let loginInfo = {username: username, password: password};
    let user = {userName: username};
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.post('/api/user/login', user, options)
      .pipe(tap(data => this.currentUser = <UserModel>data)) // need to set current user without subscribing here
      .pipe(catchError(() => of(false))); // in case of error, just return an observable of false
  }

  isAuthentificated() {
    return !!this.currentUser;
  }

  updateUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.put('/api/user/update', this.currentUser, options);
   }

  // should sent a get request to the server, which will handle whether the current user is logged in of not
  checkAuthentificationStatus() {
    this.http.get('/api/user/status').subscribe(user => {
      if(user instanceof Object) {
        this.currentUser = <UserModel>user;
      }
    })
  }
}
