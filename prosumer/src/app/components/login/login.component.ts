import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("gettoken: " +this.authService.getToken())
    if(this.authService.getToken()!= '{}') {
      this.isLoggedIn = true;
    }
    console.log("is logged in: " + this.isLoggedIn);
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data=> {
        this.authService.setToken(data.accessToken);
        this.authService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err=> {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    
  }
  reloadPage(): void {
    window.location.reload();
  }

}
