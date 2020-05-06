import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ItemService } from './item.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new BehaviorSubject<User>(null);

  readonly url = environment.serverUrl;

  constructor(private http: HttpClient, private itemService: ItemService) {}

  createUser(
    name: String,
    userEmail: String,
    password: String
  ): Observable<User> {
    return this.http
      .post(this.url + '/users', {
        name: name,
        email: userEmail,
        password: password,
      })
      .pipe();
    // map((user) => {
    //   this.user.next(user)
    // }, catchError(error) => {
    //   console.error(error);
    // })
    // )
  }

  loginUser(userEmail, password): Observable<User> {
    return this.http.post(this.url + '/users/login', {
      email: userEmail,
      password: password,
    });
  }

  logoutUser(token: String): Observable<void | User> {
    const header = new HttpHeaders({ Authorization: token.toString() });
    return this.http
      .post(this.url + '/users/logout', {}, { headers: header })
      .pipe(
        map((user) => {
          console.log(`logging out user: ${JSON.stringify(user)}`);
          this.itemService.items = [];
        }),
        catchError(() => {
          throw new Error('Failed to log out user');
        })
      );
  }

  isLoggedIn(): Observable<User> {
    return this.user.asObservable();
  }
}
