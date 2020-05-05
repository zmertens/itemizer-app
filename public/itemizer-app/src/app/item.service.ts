import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items = new BehaviorSubject<Item[]>(null);
  readonly url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  createItem(item: Item, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: token.toString()}),
    }
  
    return this.http.post(this.url + '/items',
      { description: item['description'], price: item['price'] },
      httpOptions);
      // .pipe(tap((item: Item) => console.log(`item: ${JSON.stringify(item)}`)), catchError(null));
  }

  getItems(token: String) {
    const header = new HttpHeaders({Authorization: token.toString()})
    return this.http.get(this.url + '/items', { headers: header});
      // .pipe(tap((item: Item) => console.log(`item: ${JSON.stringify(item)}`)), catchError(null));
  }

  updateItem(item: Item, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: token.toString()}),
      params: item['_id']
    }
  
    return this.http.patch(this.url + '/items/:id',
      { description: item['description'], price: item['price'] },
      httpOptions);
      // .pipe(tap((item: Item) => console.log(`item: ${JSON.stringify(item)}`)), catchError(null));
  }

  deleteItem(item: Item, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: token.toString()}),
      params: item['_id']
    }
  
    return this.http.delete(this.url + '/items/:id', httpOptions);
      // .pipe(tap((item: Item) => console.log(`item: ${JSON.stringify(item)}`)), catchError(null));
  }

}
