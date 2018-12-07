import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  constructor(private http: HttpClient) { }
  getexplore() {
    return this.http.post('http://localhost:3000/explore','');
  }
  explorepostafter(id) {
    return this.http.post(`http://localhost:3000/explorepostafter` ,id);
  }
  explorepostprevious(id) {
    return this.http.post(`http://localhost:3000/explorepostprevious` ,id);
  }
}
