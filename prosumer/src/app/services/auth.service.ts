import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


export const tokenKey = 'auth-token';
export const userKey = 'auth-user'
const baseUrl = 'http://localhost:4001/';
const httpOpt = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient ) { }

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

  isTokenExpired(): boolean{
    let token = localStorage.getItem(tokenKey) || '{}';
    //if(!token) return true;
    console.log(token);
    if (jwtHelper.isTokenExpired(token)) {
      return false;
    }
    return true;
  }

  logout(): void {
    console.log("clear");
    localStorage.clear();
  }

  

}

