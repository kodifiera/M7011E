import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { tokenKey } from './auth.service';
import { Observable } from 'rxjs';
const tokenHeaderKey = 'Authorization';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token= localStorage.getItem(tokenKey);
    if(token!=null) {
      authReq = req.clone({headers: req.headers.set(tokenHeaderKey, 'Bearer' + token)});
    
    }
    return next.handle(authReq);
  }

}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
];
