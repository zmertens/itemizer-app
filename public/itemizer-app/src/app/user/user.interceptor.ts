import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authToken = localStorage.getItem('authToken');
    if (authToken !== '') {
      const finalAuthToken = 'Bearer ' + authToken;
      const modifiedReq = request.clone({
        headers: new HttpHeaders({
          Authorization: finalAuthToken,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      });
      return next.handle(modifiedReq);
    } else {
      return next.handle(request);
    }
  }
}
