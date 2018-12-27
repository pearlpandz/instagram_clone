import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private http : Http) { }
  
  resettoken(token,password) {
    return this.http.post('http://localhost:3000/mailreset/'+token ,password);
  }
}
