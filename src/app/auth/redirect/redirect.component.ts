import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService, Toast } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})

export class RedirectComponent implements OnInit {
toast;
verifyusertoken ;
verifyuseremail ;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
    private http: HttpClient,
    
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {  if(params['token']) {
      this.verifyusertoken= params['token'];
     this. verifyuseremail= params['email'];

    //  console.log( params['token']);
    //  console.log(params['email'])
          }});
          if(this.verifyusertoken == undefined && this.verifyuseremail ==  undefined){
            console.log("undefined")
         }else{
         this.confirmmail(this.verifyusertoken,this. verifyuseremail)
         }
         
  }
  confirmmail(token,mail){
  
    this.http.post('http://localhost:3000/confirmationemail/'+token+'/'+mail,'').map(data => data).subscribe(data =>{
     
    console.log(data);
    
      window.location.href = "/login"
      // this.router.navigate(['/login'])
    //    this.toast = data['msg'];
    // this.toastrService.success(this.toast);
    
    
      })
    }
}
