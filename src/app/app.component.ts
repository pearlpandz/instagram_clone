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
    // console.log('cookieBoolen-->',this.cookieBoolen);
  }

  isLoginPage(): boolean {
    this.cookieEmail = this.cookieService.get('email');
    
    // console.log('cookie', this.cookieEmail);
    
    if( (!this.cookieEmail) || (this.cookieEmail == 'undefined')   ) {
      return false;
    }
    return true;
  }

    
}
