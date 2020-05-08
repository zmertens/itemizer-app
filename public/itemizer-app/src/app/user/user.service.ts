import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ItemService } from '../items/item.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  user = new BehaviorSubject<User>(null);

  readonly url = environment.serverUrl;

  constructor(private http: HttpClient, private itemService: ItemService) {}

  /**
   * When creating a new user, post an <any> object - The client User model
   *  does not have a password key which is what the backend expects.
   * @param name
   * @param userEmail 
   * @param password 
   */
  createUser(
    name: String,
    userEmail: String,
    password: String
  ): Observable<User> {
    return this.http.post<any>(
      this.url + '/users',
      { name: name, email: userEmail, password: password}
    ).pipe(catchError(this.handleError), tap(responseData =>
      this.handleAuthentication(responseData.name, responseData.email, responseData.token)
    ));
  }

  loginUser(userEmail, password): Observable<User> {
    return this.http.post<User>(this.url + '/users/login', {
      email: userEmail,
      password: password,
    }).pipe(catchError(this.handleError), tap(responseData =>
      this.handleAuthentication(responseData.name, responseData.email, responseData.token)
    ));
  }

  logoutUser(token: String): Observable<void | User> {
    const header = new HttpHeaders({ Authorization: token.toString() });
    return this.http
      .post<User>(this.url + '/users/logout', {}, { headers: header })
      .pipe(
        map((responseData) => {
          this.itemService.items = [];
          this.user.next(null);
          localStorage.setItem('authToken', '');
          // Response is normally empty
          return responseData;
        }),
        catchError((err) => {
          throw new Error('Failed to log out user: ' + err);
        })
      );
  }

  private handleAuthentication(name: String, email: String, token: String) {
    let newUser = new User(name, email, token);
    this.user.next(newUser);
    localStorage.setItem('authToken', token.toString());
  }

  private handleError(err: HttpErrorResponse) {
    const errorMessage = 'Error: Invalid login or signup!!';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage)
  }
}
