import { authConfig } from './auth.config';
import { AuthService } from './Service/auth.service';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import {
  OAuthService,
  JwksValidationHandler,
  OAuthErrorEvent,
} from 'angular-oauth2-oidc';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username = '';

  get token() {
    return this.oauthService.getAccessToken();
  }
  get claims() {
    return this.oauthService.getIdentityClaims();
  }
  title = 'NepaliName';

  isCollapsed = false;
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private authService: AuthService
  ) {
    this.configureWithNewConfigApi();
    // const accessToken: string = this.oauthService.getAccessToken();
    // const tokens: string[] = accessToken.split('.');
    // const claims = JSON.parse(atob(tokens[1]));
    // console.log(claims);

    //return the roles user roles
    // return claims.realm_access.roles;
    this.oauthService.setupAutomaticSilentRefresh();
    console.log(this.oauthService.hasValidIdToken());
  }
  private async configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    //.loadDiscoveryDocumentAndLogin(); it show the custom login forms
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log(this.oauthService.hasValidIdToken());
    this.authService.ValidUser(this.oauthService.hasValidAccessToken());

    if (
      this.oauthService.hasValidIdToken() ||
      this.oauthService.hasValidAccessToken()
    ) {
      console.log(this.oauthService.hasValidIdToken());
      // this.authService.ValidUser(false);

      // this.router.navigate(['/home']);
    }
  }
  ngOnInit() {
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     console.log(evt);
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });
  }
  public login() {
    this.oauthService.initCodeFlow();
  }
  logout() {
    this.oauthService.logOut();
  }
  refresh() {
    this.oauthService.silentRefresh();
  }
  getNames() {
    console.log(this.authService.names().subscribe((data) => data));
  }
  public get name() {
    let claims = this.oauthService.getIdentityClaims();
    console.log('get names' + claims);
    if (!claims) return null;
    return claims;
  }
}
