import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService) {}
  get isLoggedIn() {
    // console.log(this.oidcSecurityService.isAuthenticated$);
    return this.oidcSecurityService.isAuthenticated$;
  }

  get token() {
    return this.oidcSecurityService.getToken();
  }

  get userData() {
    // debugger;
    console.log('user data' + this.oidcSecurityService.userData$);
    return this.oidcSecurityService.userData$;
  }
  // check the user is authenticate or not
  checkAuth() {
    return this.oidcSecurityService.checkAuth();
  }

  doLogin() {
    console.log(this.oidcSecurityService.authorize());
    return of(this.oidcSecurityService.authorize());
  }

  signOut() {
    this.oidcSecurityService.logoff();
  }
}
