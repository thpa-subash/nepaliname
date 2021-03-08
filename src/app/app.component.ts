import { AuthService } from './Service/auth.service';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
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
  constructor(private oauthService: OAuthService) {
    oauthService.events.subscribe((e) =>
      e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e)
    );

    // Load information from Auth0 (could also be configured manually)
    oauthService
      .loadDiscoveryDocument()

      // See if the hash fragment contains tokens (when user got redirected back)
      .then(() => oauthService.tryLogin())

      // If we're still not logged in yet, try with a silent refresh:
      .then(() => {
        if (!oauthService.hasValidAccessToken()) {
          return oauthService.silentRefresh();
        }
      })

      // Get username, if possible.
      .then(() => {
        if (oauthService.getIdentityClaims()) {
          this.username = oauthService.getIdentityClaims()['name'];
        }
      });

    oauthService.setupAutomaticSilentRefresh();
  }
  ngOnInit() {
    console.log(this.oauthService.hasValidAccessToken());
  }
  login() {
    this.oauthService.initImplicitFlow();
  }
  logout() {
    this.oauthService.logOut();
  }
  refresh() {
    this.oauthService.silentRefresh();
  }
}
