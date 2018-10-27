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
    // console.log();
    return this.http.post('http://localhost:3000/getpost', '');
  }

  likePost(likeinfo){
    // console.log(likeinfo);
    return this.http.post('http://localhost:3000/likepost', likeinfo);
  }

  commentpost(commentpost){
    return this.http.post('http://localhost:3000/commentpost', commentpost);
  }

  deletecomment(deletecomment){
    return this.http.post('http://localhost:3000/deletecomment', deletecomment);
  }

  getblockids(userinfo){
    return this.http.post('http://localhost:3000/getblockids', userinfo);
  }

  blockuser(userinfo){
    return this.http.post('http://localhost:3000/blockuser', userinfo);
  }

}
