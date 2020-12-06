import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export const tokenKey = 'auth-token';
export const userKey = 'auth-user'
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
    console.log("login");
    console.log(credentials)
    return this.http.post(baseUrl+'users/login', {
      email: credentials.email,
      password: credentials.password,
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
    localStorage.removeItem(tokenKey);
    localStorage.setItem(tokenKey, token);
  }

  saveUser(user: any): void {
    localStorage.removeItem(userKey);
    localStorage.setItem(userKey, JSON.stringify(user));
    console.log ("save user: " + user);
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(userKey) || '{}');
  }
  isTokenExpired(token?: string): boolean{
    if(!token) token = this.getToken();
    if(!token) return true;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  

}

