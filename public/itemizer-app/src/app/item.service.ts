import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Item } from 'item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items = new BehaviorSubject<Observable<Item>>(null);
  readonly url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getItems(token: String): Observable<Item> {
    const header = new HttpHeaders({Authorization: token.toString()})
    this.items.next(this.http.get(this.url + '/items', { headers: header}))
    return this.items.getValue()
  }

  loginUser(userEmail, password): Observable<Object> {
    return this.http.post(this.url + '/users/login',
      {email: userEmail, password: password})
  }
}
