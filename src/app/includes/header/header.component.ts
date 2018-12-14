import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HeaderService } from './header.service';
import { Http, Response } from '@angular/http';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AutocompleteModule } from 'ng2-input-autocomplete';
declare var jquery: any;
declare var $: any;
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
    private http: Http,
    private router: Router
  ) { }
names;
  ngOnInit() {

    this.name = this.cookieService.get('name');

   
    // this.sub = this.route.params.subscribe(params => {
    //   this.name = params['name'];
    //     console.log('checl', this.names);
  

    // });
    this.getall();
  }
  
  getall() {
    this.http.get('http://localhost:3000/findall').map(res => res.json()).subscribe(responses => {
    
    })
  }
  lists = [];
  liststatus:boolean;

  valueChanged(name: any){

    if(name.value){

    // console.log('input value', name.value);
    this.http.post('http://localhost:3000/search/' + name.value, '')
    
    .map(res => res.json())
    .subscribe( response => {
    $('.filter-select').addClass('show');
    this.lists = response['data'];
    // this.searchres = response as this.list['data']
    //  console.log(this.lists );
    if(this.lists.length > 0) {
    this.liststatus = true;
    }
    else {
    this.liststatus = false;
    }
    })
    }
    else {
    $('.filter-select').removeClass('show');
    }
    }
    
}