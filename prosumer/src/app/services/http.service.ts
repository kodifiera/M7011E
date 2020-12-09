import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getWind() {
    return this.http.get(`${this.url}/wind` )
  }
}
