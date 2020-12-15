import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url:string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  //get all simulator info
  getSimulatorInfo() {
    return this.http.get(`${this.url}/all` )
  }
}
