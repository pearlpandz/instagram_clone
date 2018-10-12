import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { PostService } from './../services/post.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
declare var jquery:any;
declare var $ :any;
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
  // variable declaration
  model: any = {}; //to create object
  
  location: any; //to crate object.location
  lat: number;
  lon: number;

  postdata: Array<any> = [];

  constructor(
    // private router: Router,
    private PostService: PostService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => { 
      // console.log("Got position", position.coords);
      this.lat = position.coords.latitude; 
      this.lon = position.coords.longitude;
    

      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.lat+","+this.lon+"&result_type=locality&key=AIzaSyAom1PVwNn8gAvSl18fSKRI1Jlu-JOH5fQ").subscribe(data => {
        var dummy = data['results'][0]['formatted_address'];
        this.location = dummy;
        // console.log(this.location);
      });
    });

    this.getpost();

  }

  

  postSubmit(newPost: any) {
    console.log(newPost.value);
    this.http.post('http://localhost:3000/post', newPost.value).subscribe(data => {
      // console.log(data['id']);
      $("#write-post").hide();
      $(".modal-backdrop").remove();
		});
  }

  getpost() {
    this.http.post('http://localhost:3000/getpost','')
    .map((data: any) => data)
    .subscribe(data =>  {
      this.postdata = data;    
      console.log(this.postdata);
		});
  }

}
