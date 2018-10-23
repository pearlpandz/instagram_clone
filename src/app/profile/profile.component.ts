import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
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
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService
  ) { }
  profileName = '';
  profileEmail = '';
  profilePic = '';
  ngOnInit() {

    this.profileName = this.cookieService.get('name');
    this.profileEmail = this.cookieService.get('email');
    this.profilePic = this.cookieService.get('profilepic');
    console.log(this.profilePic);


  }

  logout() {
    this.cookieEmail = this.cookieService.get('email');
    if (this.cookieEmail) {
      this.cookieService.deleteAll();
      $("#log-out").modal('toggle');
      this.router.navigate(['/login']);
      this.toastrService.success('You Successfully logged out.', 'Thanks for coming!');
    }

  }

}
