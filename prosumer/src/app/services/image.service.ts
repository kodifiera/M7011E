import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

const baseUrl = 'http://localhost:4001/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public upload(image: File): Observable<any> {
    var formData: any = new FormData();
    let user  = this.auth.getUser();
    formData.append('image', image);
    console.log(formData)
    return this.http.post(baseUrl+'users/:'+ user + '/upload_image', formData);
  }
  
}
