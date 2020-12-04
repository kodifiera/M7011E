import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'localhost:4001/';
const httpOpt = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient  ) { }

  login(credentials:any): Observable<any> {
    return this.http.post(baseUrl+'users/register', {
      email: credentials.email,
      password: credentials.password
    }, httpOpt);
  }
  register(user: any): Observable<any> {
    return this.http.post(baseUrl+'users/login', {
      email: user.email,
      password: user.password
    }, httpOpt);
  }

}

