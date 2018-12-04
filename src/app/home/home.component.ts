// import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/Rx';
// service calling
import { HomeService } from './home.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('newPost') formValues;
  pageStart: number = 0;
  pageEnd: number = 2;
  current: number = 0;
  i: number = 0;
  // variable declaration
  homeName = '';
  homePic = '';
  homeEmail = '';
  model: any = {}; //to create object
  location: any; //to create object.location
  newPost: any = [];
  lat: number;
  lon: number;
  datapost: any;
  commentlist: number;
  postdata: Array<any> = [];
  postlist: Array<any> = [];
  selectedFile: Array<File> = [];
  fd = new FormData();
  urls = new Array<string>();
  post_ids: any;
  post_create: any;

  username;
  userpic;
  userid;
  homeUserid;
  showMore: boolean = true;
  likeinfo = [];
  limit: number;
  likecount;
  likestatus;
  blockids = [];
  skip: number = 0;
  constructor(
    private http: HttpClient,
    private homeService: HomeService, //home service for {create post, get post}
    private cookieService: CookieService,
    private spinner: NgxSpinnerService
  ) {
  }
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
  count_like: number;
  skipdata: any;
  ngOnInit() {
    this.homeName = this.cookieService.get('name');
    this.homeEmail = this.cookieService.get('email');
    this.homePic = this.cookieService.get('profilepic');
    // console.log(this.homePic);
    this.homeUserid = this.cookieService.get('id');
    //  console.log('apic',  this.homePic);

    navigator.geolocation.getCurrentPosition((position) => {
      // console.log("Got position", position.coords);
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;


      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.lon + "&result_type=locality&key=AIzaSyAom1PVwNn8gAvSl18fSKRI1Jlu-JOH5fQ").subscribe(data => {
        var dummy = data['results'][0]['formatted_address'];
        this.location = dummy;
        // console.log(this.location);
      });
    });

    this.username = this.cookieService.get('name');
    // console.log(this.userid);
    this.userpic = this.cookieService.get('profilepic')
    // console.log('cvbnm,',this.userpic);
    this.userid = this.cookieService.get('id');
    // console.log(this.userid);
    this.getblockids(this.homeUserid);
    this.getpost();

  }

  onFileSelected(event: any) {

    this.selectedFile = <Array<File>>event.target.files;
    // for (var i = 0; i < this.selectedFile.length; i++) {
    //   this.fd.append('sampleFile', this.selectedFile[i], this.selectedFile[i].name[0]);
    // }
  }

  readUrl(event: any) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  remove(index) {
    let array = [];

    for (let i = 0; i < this.selectedFile.length; i++) {
      array.push(this.selectedFile[i]);
    }

    array.splice(index, 1);
    this.urls.splice(index, 1);
    this.selectedFile = array;
    // console.log(this.selectedFile);

    for (let i = 0; i < this.selectedFile.length; i++) {
      this.fd.append('sampleFile', this.selectedFile[i], this.selectedFile[i].name[0]);
    }



  }

  // post data submitted -> first save data, then image upload
  postSubmit(newPost: any) {
    this.homeService.createPost(newPost.value).subscribe(data => {
      if (!data['id']) {
        console.log("something went wrong");
      }
      else {

        for (var i = 0; i < this.selectedFile.length; i++) {
          this.fd.append('sampleFile', this.selectedFile[i], this.selectedFile[i].name[0]);
        }
        console.log(this.selectedFile);
        this.fd.append('_id', data['id']);
        this.homeService.uploadPostImg(this.fd).subscribe(data => {
          //  this.getpost();
          console.log('data', data);
          // this.postdata.push(data);
          this.postdata.splice(0, 0, data);
          console.log('push data', this.postdata);

          $("#write-post").hide();
          $("#write-post").modal('toggle');
          this.formValues.resetForm();
          this.urls = [''];
          console.log('selected',this.selectedFile);
          console.log('fd',this.fd);
          $('.preview-img img').html("");
          $('.removeimage').val("");
          $(this).find('form').trigger('reset');
        });
      }
    });
  }
  // get post
  getpost(): any {
    this.skipdata = {
      skip: this.skip
    }
    this.homeService.getPost(this.skipdata)
      .map((data: any) => data)
      .subscribe(data => {
        console.log('before push', data.data);
        for (var i in data.data) {
          this.postdata.push(data.data[i]);
        }
        console.log('afterpush', this.postdata)
        this.post_create = data.data.createdat;
        this.skip = data.skip;
      });
  }

  like(post_id, current_userid) {
    this.likeinfo = [{
      post_id: post_id.value,
      current_userid: current_userid.value
    }];
    console.log($('#' + post_id.value).find('#heart'));
    console.log($('#' + post_id.value).find('#heart').hasClass('like'));

    if ($('#' + post_id.value).find('.heart').hasClass('like')) {
      this.homeService.likePost(this.likeinfo[0])
        .map((data: any) => data)
        .subscribe(data => {
          this.count_like = data.data.likecount;
          $('#' + post_id.value).find(".heart").removeClass("like");
          $('#' + post_id.value).find(".likecount").html(data.data.likecount);
        });
    }
    else {
      this.homeService.likePost(this.likeinfo[0])
        .map((data: any) => data)
        .subscribe(data => {
          this.count_like = data.likecount;
          $('#' + post_id.value).find(".heart").addClass("like");
          $('#' + post_id.value).find(".likecount").text(data.likecount);
        });
    }
  }

  checklikeid(array, target) {
    // console.log("him working")
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return true;
      }
    }
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
  isNotEqual(postuser, currentuser) {
    if (postuser == currentuser) {
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
    };

    this.homeService.deletecomment(deletecomment)
      .map((data: any) => data)
      .subscribe(data => {

        this.commentlist = data.data.comments.length;
        for (var i in this.postdata) {
          if (this.postdata[i]._id == data.data._id) {
            this.spinner.show();
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.postdata[i] = data.data;
              this.spinner.hide();
            }, 9000);
          }
        }
        /* if (data) {
          this.getpost();
        }
        else {
          this.getpost();
        } */
      });
  }

  commentpost(postid, comment, commented_name) {
    let commentpost = {
      post_id: postid,
      comment: comment,
      commented_id: commented_name
    };

    this.homeService.commentpost(commentpost)
      .map((data: any) => data)
      .subscribe(data => {
        this.commentlist = data.data.comments.length;
        this.datapost = data.data;
        for (var i in this.postdata) {
          if (this.postdata[i]._id == this.datapost._id) {
            this.postdata[i] = this.datapost;
          }
        }

        /*  this.datapost.forEach((key) => {
          console.log(key);
         }) */
        // this.postdata = data.response;
        /*  if (data) {
           this.commentlist = data.length;
           this.getpost();
           // console.log(data);
          
         }
         else {
           console.log('error')
           this.getpost();
         } */
      });

  }

  blockuser(userid, blockid) {
    let userinfo = {
      userid: userid,
      blockid: blockid
    };

    //console.log(userinfo);

    this.homeService.blockuser(userinfo)
      .map((data: any) => data)
      .subscribe(data => {
        if (data) {
          // console.log(data); 
          $('#' + data).toggleClass('active');
          this.getblockids(this.homeUserid);
          this.getpost();
        }
        else {
          console.log('data is empty');
        }
      });
  }

  getblockids(userid) {
    let userinfo = {
      userid: userid
    };
    this.homeService.getblockids(userinfo)
      .map((data: any) => data)
      .subscribe(data => {
        if (data) {
          this.blockids = data;
          // console.log(this.blockids);        
        }
        else {
          console.log('data is empty');
        }
      });
  }
  modalclick(id) {
    // alert(id)
    $('#' + id).toggleClass('active');
  }

  close() {
    $('.mymodal').removeClass('active');
  }
  loadmore(commentpost_id) {
    //$(this).find('.commentmore').toggle();
    console.log(commentpost_id);
    $('#' + commentpost_id).find('.commentmore').toggle(500, function () {
      this.pageEnd = this.commentlist;
      this.showMore = false;
    });
  }
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      this.getpost();
    }
  }

}