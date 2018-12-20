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

  editusers(id) {
    return this.http.post('http://localhost:3000/updateuser' ,id, '');
  }
//   uniquenames(name: any){
//     // console.log('success', name.value) ;
//    return   this.http.post('http://localhost:3000/uniquename', {name: name.value, field: 'name'} );
      
//   }
//     uniqueemail(email:any){
//    return   this.http.post('http://localhost:3000/uniquename', {name: email.value, field: 'email'} );
//         // this.errorUseremail = data['success'];
// }
 passwordchange(pass){
   return this.http.post('http://localhost:3000/changepassword' ,pass, '');
 } 

 Disableaccount(id){
  return this.http.post('http://localhost:3000/disable',id, '');
 }



}