import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export const tokenKey = 'auth-token';
const baseUrl = 'http://localhost:4001/';
const httpOpt = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient  ) { }

  login(credentials:any): Observable<any> {
    return this.http.post(baseUrl+'users/login', {
      email: credentials.email,
      password: credentials.password
    }, httpOpt);
  }

  register(user: any): Observable<any> {
    return this.http.post(baseUrl+'users/register', {
      email: user.email,
      password: user.password
    }, httpOpt);
  }
  
  getToken(): string {
    return localStorage.getItem(tokenKey) || '{}';
  }

  setToken(token: string): void {
    localStorage.setItem(tokenKey, token);
  }

  isTokenExpired(token?: string): boolean{
    if(!token) token = this.getToken();
    if(!token) return true;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  

}

