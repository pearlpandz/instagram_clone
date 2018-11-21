import { Component, OnInit,  ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {HeaderService} from './header.service';
import { Http, Response } from '@angular/http';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import {Observable} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //
  
  
  
  //
  name: any;
 searchres: {};
  myuser : {};
   list  = [];
  arrayOfStrings = ['this', 'is', 'list', 'of', 'string', 'element'];

  private sub: any;
  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private headerservice: HeaderService,
    private http : Http,
  ) { }

  ngOnInit() {

   this.name = this.cookieService.get('name');
    //  console.log('current',this.name)
  
    //   console.log('checl', this.name);
    //  this.searchuser(this.name);

  }
  valueChanged(name: any){
  this.http.post('http://localhost:3000/search/' + name, '').map(res => res.json()).subscribe( response => {
    
      this.list = response['data'];
    // this.searchres = response as this.list['data']
     console.log(this.list );

  })
  
  
  }
  
}