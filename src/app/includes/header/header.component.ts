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

  ngOnInit() {

    this.name = this.cookieService.get('name');
    this.getall();
  }
  getall() {
    this.http.get('http://localhost:3000/findall').map(res => res.json()).subscribe(responses => {
      this.searcharray = responses;
      console.log('alldata', this.searcharray);

    })
  }

  selectedItem: any = '';
  inputChanged: any = '';
  searcharray: any = '';
  config2: any = { 'placeholder': 'search', 'sourceField': ['name'] };

  onSelect(item: any) {
    window.location.reload();
    this.selectedItem = item;
    this.router.navigateByUrl(item.name).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  onInputChangedEvent(val: string) {

    this.inputChanged = val;
  }

}