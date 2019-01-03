import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

declare var jquery:any;
declare var $;

import { 
  AuthService, 
  SocialUser, 
  FacebookLoginProvider } from "angular4-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('userLogin') formValues;
 maildata;
  cookieEmail = '';
  cookieToken = '';
  cookieName = '';
  cookieProfilepic= '';
  cookieid=''
  
  password;
  toast;
  user: SocialUser;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
    private http: HttpClient,
    private auth: AuthService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  
      
    this.cookieEmail = this.cookieService.get('email');
    this.cookieToken = this.cookieService.get('token');
    this.cookieName = this.cookieService.get('name');
    this.cookieProfilepic = this.cookieService.get('profilepic');
 
   

  }

  Submit(userdata: any) {
    let datas;
    let email_regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   
   
    let  input = $("#name-or-email").val();
    if(email_regex.test(input)){
        // console.log("thisis email" ,input)
        // input.("name", "email");
      // $('#name-or-email').attr( 'name','email')
      datas=[{
        email:input,
        password: userdata.value.password
      }]
      // console.log('chkingemail', datas)

    } else{
      // console.log("name",input);
       // input.("name", "email");
      //  $('#name-or-email').attr( 'name','name')
       datas=[{
        name:input,
        password: userdata.value.password
      }]
      // console.log('chkingname', datas)
    }
    // console.log('hihihihi', userdata.value.password);
    this.http.post('http://localhost:3000/userlogin', datas[0]).map(data => data).subscribe(data => {

      // console.log(data);
      this.cookieService.set('email', data['email']);
      this.cookieService.set('token', data['token']);
      this.cookieService.set('boolen', 'true');
      this.cookieService.set('name', data['name']);
      this.cookieService.set('profilepic', data['profilepic']);
      this.cookieService.set('id', data['id']);
      this.cookieService.set('verified', data['verified']);

      this.cookieEmail = this.cookieService.get('email');
      this.cookieToken = this.cookieService.get('token');
      this.cookieName = this.cookieService.get('name');
      this.cookieProfilepic = this.cookieService.get('profilepic');
      this.cookieid = this.cookieService.get('id');
 
   

   console.log('status chkjkkkk', data);
      if(data[ 'mailsuccess']== false){
// console.log("not a user in our site please singup", data)
this.toastrService.error(" Thanks Please Check Your Mail for Login ");
      }
      else if(data['success'] == false){
        // console.log(data)
        this.toastrService.error("User not found Please singup");
       }else if( data['passsuccess'] == false){
        //  console.log(data)
        this.toastrService.error("err chk ur email or password");
       }else{
        //  console.log(data)
        this.toastrService.success('Have a great day!', 'Welcome !')
        this.router.navigate(['/home']);
       }
     
    });
  }

  signInWithFB(): void {
    this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.auth.authState.subscribe((user) => { 
      this.user = user; 
     });
    //  console.log(this.user, '<===this.user');
     let newUser = {
      name : this.user.name,
      email: this.user.email,
      profilepic: this.user.photoUrl,
      provider: this.user.provider,
     }

    //  console.log(newUser);

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
      
        console.log("loin",data);

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
