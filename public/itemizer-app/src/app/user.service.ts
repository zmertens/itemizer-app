import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<User>(null);

  readonly url = environment.serverUrl;

  constructor(private http: HttpClient) { }

  createUser(name: String, userEmail: String, password: String): Observable<User> {
    return this.http.post(this.url + '/users',
      {name: name, email: userEmail, password: password}).pipe();
        // map((user) => {
        //   this.user.next(user)
        // }, catchError(error) => {
        //   console.error(error);
        // })
      // )
  }

  loginUser(userEmail, password): Observable<User> {
    return this.http.post(this.url + '/users/login',
      {email: userEmail, password: password})
  }

  logoutUser(token: String): Observable<User> {
    console.log('logging out')
    const header = new HttpHeaders({Authorization: token.toString()})
    return this.http.post(this.url + '/users/logout', {}, { headers: header})
  }
}
