import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { TouchSequence } from 'selenium-webdriver';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cookieEmail;
  constructor(
    private profileservice: ProfileService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService
  ) { }
 name: '';
 email: '';
 followercount: '';
 following: '';
 pic:'';

  names: number;
  private sub: any;
  
  profile = {};
  ngOnInit() {

    // this.profileName = this.cookieService.get('name');
    // this.profileEmail = this.cookieService.get('email');
    // this.profilePic = this.cookieService.get('profilepic');
    // console.log(this.profilePic);
      this.sub = this.route.params.subscribe(params => {
      this.names = params['name'];
   //   console.log('checl', this.names);
    });

    this.getProfile(this.names);

  }
 getProfile(names) {
    // tslint:disable-next-line:prefer-const
    let name = { username: names };

    this.profileservice.getProfile(names) 
    .map(response => response.json())
    .subscribe(response => {
      this.profile = response;
      this.name = response['name'];
      this.pic = response['profilepic'];
      this.email= response['email'];
      //this.followercount
      //this.followingcount
    }
    )
  }


 logout() {
    this.cookieEmail = this.cookieService.get('email');
    if (this.cookieEmail) {
      this.cookieService.deleteAll();
      $('#log-out').modal('toggle');
      this.router.navigate(['/login']);
      this.toastrService.success('You Successfully logged out.', 'Thanks for coming!');
    }

  }

};
