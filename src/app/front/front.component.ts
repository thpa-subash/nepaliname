import { Observable } from 'rxjs';
import { authConfig } from './../auth.config';
import { AuthService } from './../Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {
  OAuthService,
  JwksValidationHandler,
  OAuthErrorEvent,
} from 'angular-oauth2-oidc';
@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css'],
})
export class FrontComponent implements OnInit {
  validUser = true;
  get token() {
    console.log(this.oauthService.getAccessToken());
    return this.oauthService.getAccessToken();
  }
  get claims() {
    return this.oauthService.getIdentityClaims();
  }
  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private authService: AuthService
  ) {
    this.configureWithNewConfigApi();

    this.oauthService.setupAutomaticSilentRefresh();
  }
  private async configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    //.loadDiscoveryDocumentAndTryLogin(); it show the custom login forms
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // if (
    //   this.oauthService.hasValidIdToken() ||
    //   this.oauthService.hasValidAccessToken()
    // ) {
    //   this.router.navigate(['/home']);
    // }
  }

  ngOnInit(): void {}

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
