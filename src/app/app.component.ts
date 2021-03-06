import { AuthService } from './Service/auth.service';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  OidcClientNotification,
  OidcSecurityService,
  PublicConfiguration,
} from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NepaliName';
  userData$: Observable<any>;
  secretData$: Observable<any>;
  isAuthenticated$: Observable<boolean>;
  isauth: false;
  isCollapsed = false;
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}
  ngOnInit() {
    this.userData$ = this.authService.userData;
    //check user is authenticated or not
    this.isAuthenticated$ = this.authService.isLoggedIn;

    this.secretData$ = this.httpClient
      .get('https://id.nepalinames.com')
      .pipe(catchError((error) => of(error)));
  }
  login() {
    this.authService.doLogin();
  }

  logout() {
    this.authService.signOut();
  }
}
