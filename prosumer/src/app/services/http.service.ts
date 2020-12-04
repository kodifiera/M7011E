import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url:string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  //get temperature
  getTemperature() {
    return this.http.get(`${this.url}/temp` )
  }

  //get price
  getPrice() {
    return this.http.get(`${this.url}/price` )
  }


}
