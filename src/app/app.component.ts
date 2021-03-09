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
    console.log(this.oauthService.getIdentityClaims());
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
  constructor(private router: Router, private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
    console.log(this.oauthService.loadUserProfile);
  }
  private async configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    if (
      this.oauthService.hasValidIdToken() ||
      this.oauthService.hasValidAccessToken()
    ) {
      this.router.navigate(['/home']);
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
}
