import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastmsgsService } from './../../common/toastmsgs.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { 
  AuthService, 
  SocialUser, 
  FacebookLoginProvider } from "angular4-social-login";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  cookieEmail = '';
  cookieToken = '';
  user: SocialUser; 

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private toastmsgsService: ToastmsgsService,
    private auth: AuthService
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

  signInWithFB(): void {
    this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.auth.authState.subscribe((user) => { 
      this.user = user; 
       console.log('sign in with fb',this.user);
     });

     let newUser = {
      name : this.user.name,
      email: this.user.email,
      profilepic: this.user.photoUrl,
      provider: this.user.provider,
      firstname: this.user.firstName,
      lastname: this.user.lastName
     }

     console.log(newUser);

    // this.http.post('http://localhost:3000/adduser', newUser).subscribe(data => {
     
    // })
  }



}
