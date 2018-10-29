import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastmsgsService } from './../../common/toastmsgs.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  cookieEmail = '';
  cookieToken = '';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private toastmsgsService: ToastmsgsService
  ) { }

  ngOnInit() {
    //check cookieEmail
    this.cookieEmail = this.cookieService.get('email'); 
    this.cookieToken = this.cookieService.get('token');
    // console.log(this.cookieEmail, this.cookieToken);
    if(this.cookieEmail) {
      this.router.navigate(['/home']);
    }
  }

  Submit(newUser: any) {
    this.http.post('http://localhost:3000/adduser', newUser.value).subscribe(data => {
      // console.log(data);
      this.toastmsgsService.showSuccess();
      this.cookieService.set( 'email', data['email'] );
      this.cookieService.set( 'token', data['token'] );
      this.cookieService.set( 'name', data['name'] );
      this.cookieService.set('profilepic', data['profilepic']);
      this.cookieService.set('id', data['id']);

      this.cookieEmail = this.cookieService.get('email'); 
      this.cookieToken = this.cookieService.get('token');
    //  console.log('USEREID', this.cookieService.get('id'))
      // console.log('hi datat', data);
      if(this.cookieEmail){
        this.router.navigate(['/home']);
      }
		});
  }



}
