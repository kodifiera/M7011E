import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';




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

  validToken = 'false';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(credentials:any): Observable<any> {
    console.log("hrj")
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
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(userKey) || '{}');
  }

  isTokenExp(): boolean {
    const token = localStorage.getItem(tokenKey)
    if (token != null && token!= '{}') {
      if(!this.jwtHelper.isTokenExpired(token)) {
        return false;
      }
    } 
    return true;
  }
  
  logout(): void {
    localStorage.clear();
  }
}

