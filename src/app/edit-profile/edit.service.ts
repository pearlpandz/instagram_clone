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
 
  getdetails(name) {
    return this.http.post(`http://localhost:3000/` + name, '');
  }

  editusers(name) {
    return this.http.post('http://localhost:3000/updateuser' ,name , '');
  }
  uniquenames(name: any){
    // console.log('success', name.value) ;
   return   this.http.post('http://localhost:3000/uniquename', {name: name.value, field: 'name'} );
        // this.errorUsername = data['success'];
        // console.log(this.errorUsername);
  }
    uniqueemail(email:any){
   return   this.http.post('http://localhost:3000/uniquename', {name: email.value, field: 'email'} );
        // this.errorUseremail = data['success'];
}
}