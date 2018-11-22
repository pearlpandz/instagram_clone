import { Component, OnInit,  ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {HeaderService} from './header.service';
import { Http, Response } from '@angular/http';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Router } from "@angular/router";
import {Observable} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //
  name: any;
 
  list = [];
  
  
  //

   


  private sub: any;
  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private headerservice: HeaderService,
    private http : Http,
    private router : Router
  ) { }

  ngOnInit() {

   this.name = this.cookieService.get('name');
    //  console.log('current',this.name)
  
    //   console.log('checl', this.name);
    //  this.searchuser(this.name);

  }
  valueChanged(name: any){
// console.log(name.value);
  this.http.post('http://localhost:3000/search/'  + name.value, '').map(res => res.json()).subscribe( response => {
    
      this.list = response['data'];
    // this.searchres = response as this.list['data']
     console.log(this.list );

  })
  this.router.navigateByUrl(name.value).then(e => {
    if (e) {
      console.log("Navigation is successful!");
    } else {
      console.log("Navigation has failed!");
    }
  });
  
  }
 
}