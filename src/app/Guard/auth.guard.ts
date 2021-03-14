import { AuthService } from './../Service/auth.service';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private oauthService: OAuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.oauthService.hasValidAccessToken() ||
      this.oauthService.hasValidIdToken()
    ) {
      console.log('hellos');
      return true;
    } else {
      console.log('falses');
      this.router.navigate(['/']);
      return false;
    }
  }
}
