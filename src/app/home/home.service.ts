import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
  ) { }
  
  createPost(postdata) {
    return this.http.post('http://localhost:3000/post', postdata);
  }

  uploadPostImg(postdata) {
    return this.http.post('http://localhost:3000/upload', postdata);
  }

  getPost() {
    return this.http.post('http://localhost:3000/getpost', '');
  }

}
