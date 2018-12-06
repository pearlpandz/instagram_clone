import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ToastrService, ToastrComponentlessModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { TouchSequence } from 'selenium-webdriver';
import { HomeService } from '../home/home.service';
import { CommentStmt } from '@angular/compiler';
import { OwlModule } from 'ngx-owl-carousel';
import 'hammerjs';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('comment_msg') el: ElementRef
  @Output() myEvent = new EventEmitter();
  cookieEmail;
  likeids = [];
  constructor(
    private profileservice: ProfileService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
    private homes: HomeService,
    private http: HttpClient,
  ) { }
  //

  ipostindex: number;
  dpostindex: number;
  //cookie variables
  profilepics: any;
  name: '';
  email: '';
  followercount: '';
  following: '';
  pic: '';
  postcount: any;
  followersc: {};
  followingc: {};
  names: number;
  private sub: any;
  getafterpostlist: any;
  getbeforepostlist: any;
  _id: any;
  // like: any;
  profile = {};
  userpost = [];
  slidepost = [];
  owlpost = [];
  modalpost = {};
  popcomment = {};
  selectedFile: File;
  //postts variable
  height: string = '400px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = true;
  autoPlay: boolean = false;
  PlayInterval: number = 100;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  // showDots: boolean = true;
  dotsPosition: string = 'center';
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = true;
  hideOnNoSlides: boolean = true;
  width: string = '100%';
  postids = [];
  j: any;
  // popup variables
  i: any;
  sampleFile = [];
  likecount: any;
  description: any;
  location: any;
  profilepic: any;
  username: any;
  post_id: any;
  current_user: any;
  comments = [];
  modelindex: any;
  //like variables
  count_like : number;
  likeinfo = [];
  likestatus;
  current_id: any;
  uploadData = new FormData();
  nextbuttonDisabled: boolean;
  prevbuttonDisabled: boolean;

  //counter values
  counterValue;
  nextshow: boolean = true;
  previousshow: boolean = true;
  ivar: any;
 
  selectedIndex;
  ngOnInit() {
    /*     this.nextbuttonDisabled = false;
        this.prevbuttonDisabled = true; */
    this.nextbuttonDisabled = true;
    this.prevbuttonDisabled = false;
    this.current_user = this.cookieService.get('name');
    this.current_id = this.cookieService.get('id');
    //console.log('current_id', this.current_id);
    // this.profileEmail = this.cookieService.get('email');
    this.profilepics = this.cookieService.get('profilepic');
    console.log(this.profilepics);

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
        // console.log(this.profile);
        this.name = response[0]['name'];
        this.pic = response[0]['profilepic'];
        this.cookieService.set('profilepic', response[0]['profilepic']);
        this.email = response[0]['email'];
        this.followersc = response[0]['followers'].length;
        this.followingc = response[0]['following'].length;
        this.userpost = response[1];
        this.postcount = response[1].length;
        this.slidepost = response[1];
        this.owlpost = response[1];
        //  console.log( this.slidepost );
        //         console.log( this.slidepost );
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

  popup(data, i) {
    console.log(data);

    this.ipostindex = i;
  
    console.log("index", this.ipostindex);
    // this. getnextpost(  this.current_id ,i)
    this.post_id = data._id;
    this.username = data.username;
    this.likecount = data.likecount;
    this.description = data.description;
    this.location = data.location;
    this.profilepic = data.profilepic;
    this.sampleFile = data.sampleFile;
    this.comments = data.comments;
    this.likeids = data.likeids;
    this.modalpost = data;
    //  this.modalpost = this.getbeforepostlist;
    console.log('popup', this.modalpost);
    if( this.ipostindex == 0){
      console.log( '1st',this.ipostindex == 0)
      this.prevbuttonDisabled = false;
      this.nextbuttonDisabled = true;
    }else if( this.ipostindex > 0 && this.ipostindex < this.postcount-1){
      console.log( '2st',this.ipostindex > 0 && this.ipostindex < this.postcount-1)
      this.prevbuttonDisabled = true;
      this.nextbuttonDisabled = true;
    }else {
     
      this.prevbuttonDisabled = true;
      this.nextbuttonDisabled = false;
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
        if (data) {
          // console.log('-------------', data.data.comments);
          this.comments = data.data.comments;
          this.el.nativeElement.value = "";
          this.getProfile(this.names);
          this.modalpost = data.data;
          console.log(this.modalpost);
        }
        else {

          console.log(data, 'error')

        }
      });

  }

  like(post_id, current_userid) {
    this.likeinfo = [{
      post_id: post_id,
      current_userid: this.current_id

    }];
   console.log("checkck", post_id, current_userid)

   
        /*         if ($("a").hasClass("like")) {
                  $("a").removeClass("like");
                  var count = $(".likecount").html();
                  count = parseInt(count)-1;
                  $( ".likecount" ).val(count );
                  $(".poplikecount").val(count);
                } else {
                  $("a").addClass("like");
                  var count = $(".likecount").html();
                  count = parseInt(count)+1;
                  $( ".likecount" ).val( count );
                  $(".poplikecount").val(count);
                } */
        var count = parseInt($('#' + post_id).find(".likecount").html());
        if ($('#' + post_id).find('.heart').hasClass('like')) {
          this.homes.likePost(this.likeinfo[0])
          .map((data: any) => data)
          .subscribe(data => {
            this.count_like = data.data.likecount;
            $('#' + post_id).find(".heart").removeClass("like");
            $('#' + post_id).find(".likecount").html(data.data.likecount);
            
          });
        }
        else {
          this.homes.likePost(this.likeinfo[0])
          .map((data: any) => data)
          .subscribe(data => {
          this.count_like = data.likecount;
          $('#' + post_id).find(".heart").addClass("like");
          $('#' + post_id).find(".likecount").text(data.likecount);
          });
        }
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

  //work reverse array, target
  arrayTarget(array, target) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == target) {

        return false;
      }
    }
    return true;
  }

  //work reverse equal check
  isNotEqual(post_id, current_userid) {
    if (post_id == current_userid) {
      return false;
    }
    return true;
  }


  isYourComment(commentuser, currentuser) {
    if (commentuser == currentuser) {
      return true;
    }
    return false;
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
          this.modalpost = data.data;
        }
        else {
          console.log('else', data);
        }
      });
  }
  onFileChanged(event) {
    this.uploadData.append('id', this.current_id);
    // console.log( 'hi calling');
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    // console.log(event.target.files[0]);
    this.uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    console.log('uploaddata', this.uploadData);
    // this.onUpload(this.uploadData);

    // console.log(this.current_id);

    // console.log('upload', this.uploadData);
    this.homes.uploadSingleImg(this.uploadData).subscribe(data => {
      // console.log(data);
      $('#change-photo').modal('toggle');
      this.getProfile(this.names);
    });
  }
  //get next post
  getnextpost(current_userid, postindex) {


    this.likeinfo = [{
      id: current_userid,
      indexid: this.ipostindex += 1,
    }];
    // console.log("total ", this.likeinfo);
    // console.log('index incre', this.ipostindex);

    this.profileservice.postafter(this.likeinfo[0]).map(afterpostlist => afterpostlist.json()).subscribe(afterpostlist => {
      this.getafterpostlist = afterpostlist;

      this.modalpost = this.getafterpostlist;
      console.log("buttoncall", this.likeinfo[0], this.modalpost);
      // console.log('else',afterpostlist.data);
      
    });
    if( this.ipostindex == 0){
      console.log( '1st',this.ipostindex == 0)
      this.prevbuttonDisabled = false;
      this.nextbuttonDisabled = true;
    }else if( this.ipostindex > 0 && this.ipostindex < this.postcount-1){
      console.log( '2st',this.ipostindex > 0 && this.ipostindex < this.postcount-1)
      this.prevbuttonDisabled = true;
      this.nextbuttonDisabled = true;
    }else {
      this.prevbuttonDisabled = true;
      this.nextbuttonDisabled = false;
    }
  }

  getprevpost(current_userid, postindex) {
    this.likeinfo = [{
      id: current_userid,
      indexid: this.ipostindex -= 1
    }];

    // console.log("buttoncall", this.likeinfo);
    this.profileservice.postafter(this.likeinfo[0]).map(beforepostlist => beforepostlist.json()).subscribe(beforepostlist => {
    this.getbeforepostlist = beforepostlist;

    this.modalpost = this.getbeforepostlist
  
     console.log("buttoncalld", this.likeinfo[0], this.modalpost)
     
     

    });
    if( this.ipostindex == 0){
      console.log( '1st',this.ipostindex == 0)
      this.prevbuttonDisabled = false;
      this.nextbuttonDisabled = true;
    }else if( this.ipostindex > 0 && this.ipostindex < this.postcount-1){
      console.log( '2st',this.ipostindex > 0 && this.ipostindex < this.postcount-1)
      this.prevbuttonDisabled = true;
      this.nextbuttonDisabled = true;
    }else {
      this.prevbuttonDisabled = true;
      this.nextbuttonDisabled = false;
    }
  }

  popup_close() {
    this.getProfile(this.names);
  }
  // get posts by  after id

};

