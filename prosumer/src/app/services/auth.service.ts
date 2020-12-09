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

  validToken: any;

  constructor(private http: HttpClient ) { }

  login(credentials:any): Observable<any> {
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
    //jwtHelper.decodeToken(localStorage.getItem(tokenKey) || '{}')
    return localStorage.getItem(tokenKey) || '{}';
  }

  setToken(token: string): void {
    
    localStorage.removeItem(tokenKey);
    localStorage.setItem(tokenKey, token);
    console.log(localStorage.getItem(tokenKey))
  }

  saveUser(user: any): void {
    localStorage.removeItem(userKey);
    localStorage.setItem(userKey, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(userKey) || '{}');
  }


  isTokenExpired() {
    console.log("verify");
    return this.http.get(baseUrl + 'users/verify_auth_token');
    //return this.http.get(baseUrl + '')

  }

  logout(): void {
    console.log("clear");
    localStorage.clear();
  }

  

}

