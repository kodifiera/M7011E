import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    console.log("gettoken: " +this.auth.getToken())
    if(this.auth.getToken()!= '{}') {
      this.isLoggedIn = true;
    }  }

  logOut(): void {
    this.auth.logout();
    window.location.reload();

  }

}
