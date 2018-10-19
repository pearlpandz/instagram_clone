import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cookieEmail = '';
  cookieToken = '';
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cookieEmail = this.cookieService.get('email'); 
    this.cookieToken = this.cookieService.get('token');
    console.log(this.cookieEmail, this.cookieToken);
    if(this.cookieEmail) {
      this.router.navigate(['/home']);
    }
  }

}
