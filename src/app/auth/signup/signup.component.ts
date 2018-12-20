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
  cookieName: string;
  cookieProfilepic: string;
  toastrService: any;
  errorUsername : any;
  errorUseremail : any;
  name;
  email;
  password;
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
     //uniquename
  uniquenames(name: any){
// console.log('success', name.value) ;
  this.http.post('http://localhost:3000/uniquename', {name: name.value, field: 'name'} ).subscribe(data =>{
    this.errorUsername = data['success'];
    // console.log(this.errorUsername);
    
  })
}
uniqueemail(email:any){
  this.http.post('http://localhost:3000/uniquename', {name: email.value, field: 'email'} ).subscribe(data =>{
    this.errorUseremail = data['success'];
})}
  Submit(newUser: any) {
    this.http.post('http://localhost:3000/adduser', newUser.value).subscribe(data => {
     
      if(data['success']){
        console.log(data);

        this.toastmsgsService.showSuccess();
        this.cookieService.set( 'email', data['email'] );
        this.cookieService.set( 'token', data['token'] );
        this.cookieService.set( 'name', data['name'] );
        this.cookieService.set('profilepic', data['profilepic']);
        this.cookieService.set('id', data['id']);
  
        this.cookieEmail = this.cookieService.get('email'); 
        this.cookieToken = this.cookieService.get('token');
        if(this.cookieEmail){
          this.router.navigate(['/home']);
        }else{
          this.router.navigate(['/signup']);
        }
      }else{

        console.log(data);
      }
    //    console.log('token', this.cookieToken);

    //  console.log('USEREID', this.cookieService.get('id'))
    //    console.log('hi datat', data);
      
		});
  }

  signInWithFB(): void {
    this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.auth.authState.subscribe((user) => { 
      this.user = user; 
      //  console.log('sign in with fb',this.user);
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

    this.http.post('http://localhost:3000/socialuser', newUser).subscribe(data => {
     if(data) {
      //  console.log(data);
      this.cookieService.set('email',data['email']); 
      this.cookieService.set('token', data['token']);
      this.cookieService.set('boolen', 'true');
      this.cookieService.set('name', data['name']);
      this.cookieService.set('profilepic', data['profilepic']);
      this.cookieService.set('id', data['id']);

      this.cookieEmail = this.cookieService.get('email');
      this.cookieToken = this.cookieService.get('token');

      // console.log('login page cookie set token',this.cookieToken);

      this.cookieName = this.cookieService.get('name');
      this.cookieProfilepic = this.cookieService.get('profilepic');
      
      //  console.log(data);

      if(this.cookieEmail){
        this.router.navigate(['/home']);
        this.toastrService.success('Have a great day!','Welcome Back!');
      }
     }
     else {
       console.log('data not retrive');
     }
    })
  }



}
