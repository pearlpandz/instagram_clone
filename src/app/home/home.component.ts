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
  newPost: any = [];
  lat: number;
  lon: number;

  postdata: Array<any> = [];
  selectedFile: Array<File> = [];
  fd = new FormData();
  urls = new Array<string>();

  post_create: any;

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

  onFileSelected(event: any) {
    
    this.selectedFile = <Array<File>>event.target.files;
    for (var i =0; i < this.selectedFile.length; i++) {
      this.fd.append('sampleFile', this.selectedFile[i], this.selectedFile[i].name[0]);
    }
    // console.log(this.fd);
  }

  readUrl(event:any) {
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


  postSubmit(newPost: any) {

    this.http.post('http://localhost:3000/post', newPost.value).subscribe(data => {
      if(!data['id']){
        console.log("something went wrong");
      }
      else {
        this.fd.append('_id',data['id']);
        
        // console.log(this.fd);
        
        this.http.post('http://localhost:3000/upload', this.fd).subscribe(data => {
          // console.log(data);
          this.getpost();
          $("#write-post").hide();
          $("#write-post").modal('toggle');
        });
      }
		});
  }

  


  // get post
  getpost() {
    this.http.post('http://localhost:3000/getpost','')
    .map((data: any) => data)
    .subscribe(data =>  {
      this.postdata = data;    
      this.post_create = data.createdat;
      // console.log(this.postdata);
		});
  }

}
