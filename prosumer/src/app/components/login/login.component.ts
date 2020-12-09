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
  email = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getToken()!= '{}') {
      console.log(this.authService.getUser())
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    console.log("hej")
    this.authService.login(this.form).subscribe(
      data=> {
        this.authService.setToken(data.access_token);
        console.log("set token")
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
