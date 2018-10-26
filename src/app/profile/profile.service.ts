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

}
