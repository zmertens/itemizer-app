import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // items = new BehaviorSubject<>(null);
  readonly url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getItems(): Observable<Object> {
    return this.http.get(this.url + '/items');
  }

  loginUser(userEmail, password): Observable<Object> {
    return this.http.post(this.url + '/users/login',
      {email: userEmail, password: password})
  }
}
