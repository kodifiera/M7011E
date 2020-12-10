import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4001/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  public upload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(baseUrl+'', formData);
  }
  
}
