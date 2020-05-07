import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  createItem(item: Item, token: String): Observable<Item> {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token.toString() }),
    };

    return this.http.post<any>(
      this.url + '/items',
      { description: item.description, price: item.price },
      httpOptions
    ).pipe(map((item: Item) => {
      this.items.push(item);
      this.itemsSubject.next(this.items.slice());
      return item;
    }), catchError(this.handleError));
  }

  getItems(token: String): Observable<void | Item[]> {
    const header = new HttpHeaders({ Authorization: token.toString() });
    return this.http.get(this.url + '/items', { headers: header }).pipe(
      map((items: Item[]) => {
        if (items.length !== this.items.length) {
          // Using the spread operator we only copy and append unique items
          this.items.push(...items);
          this.itemsSubject.next(this.items.slice());
        }
        return items;
      }),
      catchError(() => {
        throw new Error(`Could not get items from: ${this.url}`);
      })
    );
  }

  updateItem(item: Item, token: String): Observable<Item> {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token.toString() }),
      params: item['_id'],
    };

    return this.http.patch<any>(
      this.url + '/items/:id',
      { description: item['description'], price: item['price'] },
      httpOptions
    ).pipe(map((item: Item) => {
      const foundItemIndex = this.items.findIndex((i) => i.id === item.id);
      if (foundItemIndex !== -1) {
        this.items[foundItemIndex].description = item.description;
        this.items[foundItemIndex].price = item.price;
        this.itemsSubject.next(this.items.slice());
      }
      
      return item;
    }), catchError(() => {
      throw new Error("Could not update item");
    }));
  }

  deleteItem(item: Item, token: String): Observable<Item> {
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: token.toString() }),
      params: item['_id'],
    };

    return this.http.delete<Item>(this.url + '/items/:id', httpOptions)
    .pipe(map((item: Item) => {
      const foundItemIndex = this.items.findIndex((i) => i.id === item.id);
      if (foundItemIndex !== -1) {
        delete this.items[foundItemIndex];
      }
      
      return item;
    }), catchError(() => {
      throw new Error("Could not update item");
    }));
  }

  private handleError(err: HttpErrorResponse) {
    const errorMessage = 'Error: Invalid login or signup!!';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage)
  }
}
