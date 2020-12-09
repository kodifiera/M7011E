import { Injectable } from '@angular/core';
import {Router, CanActivate, } from '@angular/router';
import { AuthService } from './auth.service'; 


@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate() {
    if(this.authService.isTokenExp()) {
      return true;
    }
    else {
      this.router.navigate(['simulator']);
      return false;
    }
  }

  
}