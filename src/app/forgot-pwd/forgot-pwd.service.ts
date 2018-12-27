import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ForgotPwdService {

  constructor( private http: Http) { }


  forgotpwds(email) {
    return this.http.post('http://localhost:3000/mail', email, '');
  }
}
