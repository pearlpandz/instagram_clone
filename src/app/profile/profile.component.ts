import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { TouchSequence } from 'selenium-webdriver';
import { HomeService } from '../home/home.service';
import { CommentStmt } from '@angular/compiler';

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
    private toastrService: ToastrService,
    private homes: HomeService
  ) { }
 name: '';
 email: '';
 followercount: '';
 following: '';
 pic:'';
postcount: {};
 followersc : {};
 followingc: {};
  names: number;
  private sub: any;
// like: any;
  profile = {};
  userpost= [];
 
popcomment ={};
// popup variables

  sampleFile = [];
  likecount : any;
  description: any;
  location : any;
  profilepic: any;
 username : any;
 post_id: any;
 current_user: any;

  ngOnInit() {

    this.current_user = this.cookieService.get('name');
    // this.profileEmail = this.cookieService.get('email');
    // this.profilePic = this.cookieService.get('profilepic');
    // console.log(this.profilePic);
   
      this.sub = this.route.params.subscribe(params => {
      this.names = params['name'];
   //   console.log('checl', this.names);
    });
    // console.log(this.names);
    this.getProfile(this.names);
    
  }
 

 getProfile(names) {
  
  //  alert();
    // tslint:disable-next-line:prefer-const
    let name = { username: names };
    // console.log('name', name);
    this.profileservice.getProfile(names) 
    .map(response => response.json())
    .subscribe(response => {
      this.profile = response;
      this.name = response[0]['name'];
      this.pic = response[0]['profilepic'];
      this.email= response[0]['email'];
      this.followersc =response[0]['followers'].length;
      this.followingc = response[0] ['following'].length;
      this.userpost = response[1];
      this.postcount = response[1].length;
     
      // console.log( this.followersc);
     

      // console.log('profile data', this.profile);



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


  popup(data) {
   
   this.post_id =data._id;
    this.username = data.username;
    this.likecount = data.likecount;
    this.description = data.description;
    this.location  = data.location ;
    this.profilepic = data.profilepic;
    this.sampleFile= data.sampleFile;
   console.log('asdsddfs',data);
  }

  
  commentpost1(postid, comment, commented_name) {
    let commentpost = {
      post_id: postid,
      comment:comment,
      commented_id: this.current_user,
    };

    console.log(commentpost);
    
    this.homes.commentpost(commentpost)
    .map((data: any) => data)
    .subscribe(data =>  {
      if(data){
        console.log('-------------',data.comments);
      }
      else{
       console.log(data, 'error')
      }
		});

  }


};
