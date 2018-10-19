import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cookieEmail;
  cookieBoolen;
  constructor(
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.cookieEmail = this.cookieService.get('email'); 
    this.cookieBoolen = this.cookieService.get('boolen');
    console.log('cookieBoolen-->',this.cookieBoolen);
  }

    
}
