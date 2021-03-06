import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})


export class ProfileService {

  constructor(
    private http: Http
  ) { }
  getProfile(name) {
    return this.http.post(`http://localhost:3000/` + name, '');
  }
  postafter(data) {
    return this.http.post(`http://localhost:3000/singlepostafter` ,data);
  }
  postbefore(id) {
    return this.http.post(`http://localhost:3000/singlepostprevious` ,id);
  }
  deletemodalcomment(deletecomment){
    return this.http.post('http://localhost:3000/deletecomment', deletecomment);
  }
  follows(ids){
    return this.http.post('http://localhost:3000/follows', ids);
  }
  followercheck(ids){
    return this.http.post('http://localhost:3000/followcheck', ids);
  }
  followerlist(userid){
    return this.http.post('http://localhost:3000/followerlist', {"id":userid});
  }

  followinglist(userid){
    return this.http.post('http://localhost:3000/followinglist', {"id":userid});
  }

  deleteprofilepic(id){
    return this.http.post('http://localhost:3000/deleteimage', id);
  }

}
