import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
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

  createItem(item: Item): Observable<Item> {
    return this.http
      .post<any>(this.url + '/items', {
        description: item.description,
        price: item.price,
      })
      .pipe(
        map((item: Item) => {
          this.items.push(item);
          this.itemsSubject.next(this.items.slice());
          return item;
        }),
        catchError(this.handleError)
      );
  }

  getItems(): Observable<void | Item[]> {
    return this.http.get(this.url + '/items').pipe(
      map((items: Item[]) => {
        // if (items.length !== this.items.length) {
        // Using the spread operator we only copy and append unique items
        this.items.push(...items);
        this.itemsSubject.next(this.items.slice());
        // }
        return items;
      }),
      catchError(this.handleError)
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http
      .patch<any>(this.url + `/items/${item['_id']}`, {
        description: item['description'],
        price: item['price'],
      })
      .pipe(
        map((item: Item) => {
          const foundItemIndex = this.items.findIndex((i) => i.id === item.id);
          if (foundItemIndex !== -1) {
            this.items[foundItemIndex] = item;
            this.itemsSubject.next(this.items.slice());
          }
          return item;
        }),
        catchError(this.handleError)
      );
  }

  deleteItem(itemId: Number): Observable<Item> {
    return this.http.delete<Item>(this.url + `/items/${itemId}`).pipe(
      map((item: Item) => {
        const foundItemIndex = this.items.findIndex((i) => i.id === itemId);
        if (foundItemIndex !== -1) {
          this.items.splice(foundItemIndex, 1);
          this.itemsSubject.next(this.items.slice());
        }

        return item;
      }),
      catchError(() => {
        throw new Error(itemId.toString());
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    const errorMessage = 'Error: Modifying items!!';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }
}
