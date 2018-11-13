import { Component, OnInit } from '@angular/core';
import { ProfileService  } from "../edit-profile/edit.service";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

   current_user ;
   current_id;
  constructor(
  private profileservices : ProfileService ,
  private cookieservice :  CookieService
    ) { }
  profile : {}
  ngOnInit() {
    this.current_user = this.cookieservice.get('name');
    this.current_id = this.cookieservice.get('id');
     this.edituser( this.current_user);
  }
  edituser(name){
    console.log('currentusrename', name);
  //  let names = { name : uname };
   this.profileservices.getProfile(name)
  .subscribe(response => {
      this.profile = response;
      console.log('mmsc' , this.profile ); 
      }
   
      )
   
      console.log('hisc' , this.profile ); 

}
}