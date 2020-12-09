import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  validToken: any;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate() {
    this.checkToken();
    
    if(this.validToken == 'true') {
      return true;
    }
    this.router.navigate(['/register']);
    return false;
  }

  checkToken() {
    this.authService.isTokenExpired().subscribe(( data:any) => {
      this.validToken = JSON.stringify(data)
    }, error => console.log('Not authorized', error));
    
  }
}
  
