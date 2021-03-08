import { AuthService } from './../Service/auth.service';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private oauthService: OAuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.oauthService.hasValidIdToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    // this.router.navigate(['/']);
    // return true;
    //} else {
    //window.alert("You don't have permission to view this page");
    // this.router.navigate(['login']);

    // }
  }
}
