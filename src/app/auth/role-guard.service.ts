import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthserviceService } from './authservice.service';
import decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    public auth: AuthserviceService, 
    public router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this.cookieService.get('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
