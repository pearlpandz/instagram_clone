import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { HttpClient } from '@angular/common/http';
import { ExploreService } from './explore.service'
import { HomeService } from '../home/home.service';
import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from '../profile/profile.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  request : any;
  exploredata: any;
  modalposts: any;
  comments = [];
  _id: string;
  likeinfo = [];
  likestatus;
  current_id: any;
  post_id: any;
  current_user: any;
  count_like: number;
  next_id : any;
  prev_id : any;
  usersexplore : any;
  following : any;
   info : any;
   buttonfollowing : boolean= true;
   buttonfollow: boolean =  false;
   partiindex: any;
  @ViewChild('comment_msg') el: ElementRef
  constructor(private profileservice: ProfileService,
    private https: HttpClient, private explore: ExploreService, private cookieService: CookieService,
    private homes: HomeService) { }
  ngOnInit() {
    this.getexplore();
    this.current_user = this.cookieService.get('name');
    this.current_id = this.cookieService.get('id');
    this.getexploreuser();
  }
  getexplore() {
    this.explore.getexplore().map(request => request).subscribe(request => {
      this.exploredata = request['data'];
    });
  }
  popup(data, i) {
    console.log(data);
    this.post_id = data._id;
    this.modalposts = data;
  }
  checklikeid(array, target) {
    // console.log("array", array)
    // console.log('target', target);
    if (array !== '' && array !== undefined) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == target) {
          //  console.log(array, target);
          // console.log('true'); 
          return true;
        }
      }
    }
    //  console.log('false');
    return false;
  }
  like(post_id, current_userid) {
    this.likeinfo = [{
      post_id: post_id,
      current_userid: this.current_id
    }];
    console.log("checkck", post_id, current_userid)
    var count = parseInt($('#' + post_id).find(".likecount").html());
    console.log("fgsfagsfagfs", post_id)
    console.log("id", $('#' + post_id));
    if ($('#' + post_id).find('.heart').hasClass('like')) {
      this.homes.likePost(this.likeinfo[0])
        .map((data: any) => data)
        .subscribe(data => {
          console.log("dislike", data);
          console.log("count", data.data.likecount);
          this.count_like = data.data.likecount;
          $('#' + post_id).find(".heart").removeClass("like");
          $('#' + post_id).find(".likecount").html(data.data.likecount);
        });
    }
    else {
      this.homes.likePost(this.likeinfo[0])
        .map((data: any) => data)
        .subscribe(data => {
          console.log("like", data);
          console.log("count", data.likecount);
          this.count_like = data.likecount;
          $('#' + post_id).find(".heart").addClass("like");
          $('#' + post_id).find(".likecount").text(data.likecount);
        });
    }
  }
  commentpost1(postid, comment, commented_name) {
    let commentpost = {
      post_id: postid,
      comment: comment,
      commented_id: this.current_user,
    };

    // console.log(commentpost);

    this.homes.commentpost(commentpost)
      .map((data: any) => data)
      .subscribe(data => {
        if (data) {          // console.log('-------------', data.data.comments);
          this.comments = data.data.comments;
          this.el.nativeElement.value = "";
          this.modalposts = data.data;
          console.log(this.modalposts);
        }
        else {
          console.log(data, 'error')
        }
      });
  }
  deletecomment(postid, comment_id) {
    let deletecomment = {
      post_id: postid,
      comment_id: comment_id
    }
    this.profileservice.deletemodalcomment(deletecomment)
      .map((data: any) => data.json())
      .subscribe(data => {
        if (data) {
          this.modalposts = data.data;
        }
        else {
          console.log('else', data);
        }
      });
  }
  getexploreprevpost (prevId,i) {
    this.prev_id = {
      "id" : prevId
    }
    this.explore.explorepostprevious(this.prev_id).map(response => response).subscribe(result =>{
      console.log('prev',result);
      this.modalposts = result;
    }) 
  }
  getexplorenextpost (nextId,i) {
    this.next_id = {
      "id" : nextId
    }
    this.explore.explorepostafter(this.next_id).map(response => response).subscribe(result =>{
      console.log('next',result);
      this.modalposts = result;
    })
  }
  getexploreuser () { 
    this.request = {
      user_id : this.current_id
    }
    console.log(this.current_id);
    this.explore.getrecentusers(this.request).map( result => result ).subscribe( result => {
      this.usersexplore = result;
          });
  }
  followers(current_userid, follower_id,i) {
    this.info = [{
      user_id: follower_id,
      follower_id: current_userid
    }];
    this.profileservice.follows(this.info[0]).map(response => response.json()).subscribe(response => {
      this.following = response.sucess;
      this.partiindex = i;
      if(this.following){
        this.buttonfollowing = false;
        this.buttonfollow = true;
      } else {
        this.buttonfollow = false;
        this.buttonfollowing = true;
      }
    })
  }
  popup_close() {
    this.getexplore();
  }
}
