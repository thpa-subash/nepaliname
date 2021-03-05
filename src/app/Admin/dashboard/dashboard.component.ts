import { AuthService } from './../../Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  OidcClientNotification,
  OidcSecurityService,
  PublicConfiguration,
} from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userData$: Observable<any>;
  secretData$: Observable<any>;
  isAuthenticated$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.userData$ = this.authService.userData;
    this.isAuthenticated$ = this.authService.isLoggedIn;
    console.log('wher am i ??????????????????????????????');
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
