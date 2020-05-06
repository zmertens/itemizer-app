import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {  
  private itemsSubject = new BehaviorSubject<Item[]>(null);
  items: Item[] = [];
  readonly url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  createItem(item: Item, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token.toString() }),
    };

    return this.http.post(
      this.url + '/items',
      { description: item['description'], price: item['price'] },
      httpOptions
    );
  }

  getItems(token: String): Observable<void | Item[]> {
    const header = new HttpHeaders({ Authorization: token.toString() });
    return this.http.get(this.url + '/items', { headers: header }).pipe(
      map((items: Item[]) => {
        if (items.length !== this.items.length) {
          // Using the spread operator we only copy and append unique items
          this.items.push(...items);
          this.itemsSubject.next(this.items.slice());
          console.log(this.items);
        }
        return items;
      }),
      catchError(() => {
        throw new Error(`Could not get items from: ${this.url}`);
      })
    );
  }

  updateItem(item: Item, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token.toString() }),
      params: item['_id'],
    };

    return this.http.patch(
      this.url + '/items/:id',
      { description: item['description'], price: item['price'] },
      httpOptions
    );
  }

  deleteItem(item: Item, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token.toString() }),
      params: item['_id'],
    };

    return this.http.delete(this.url + '/items/:id', httpOptions);
  }
}
