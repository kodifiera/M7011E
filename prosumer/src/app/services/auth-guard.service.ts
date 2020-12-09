import { Injectable } from '@angular/core';
import {Router, CanActivate, } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate() {
    if(!this.authService.isTokenExp()) {
      return true;
    }
    else {
      this.router.navigate(['register']);
      return false;
    }
  }

  
}
  
