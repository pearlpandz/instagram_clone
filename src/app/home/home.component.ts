import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { PostService } from './../services/post.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // variable declaration
    model: any = {}; //to create object
    image: string; //to create object.names
    location: string; //to crate object.location

    // for image upload
    selectedFile : File =  null ;

  constructor(
    // private router: Router,
    private PostService: PostService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  postSubmit(newPost: any) {
    // console.log(newPost.value);
    this.http.post('http://localhost:3000/post', newPost.value).subscribe(data => {
      alert(data);
			console.log(data['id']);
		});
  }
}
