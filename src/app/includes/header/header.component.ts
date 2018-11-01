import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: any;
  private sub: any;
  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

   this.name = this.cookieService.get('name');
    //  console.log('current',this.name)
  
    //   console.log('checl', this.name);
    
  }

}
