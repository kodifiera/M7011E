import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate() {
    console.log("nejiw");
    if(!this.authService.isTokenExpired()) {
      return true;
    }
    console.log("is: " + this.authService.isTokenExpired());
    this.router.navigate(['/register']);
      return false;
  }
}
