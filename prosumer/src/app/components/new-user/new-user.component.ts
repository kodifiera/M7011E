import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  isSuccessfull = false;
  isSignUpFailed = false;
  errorMessage = '';
  form: any = {}
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessfull = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage =err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
