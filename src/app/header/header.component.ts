import { Component, OnInit } from '@angular/core';

import {
  OAuthService,
  JwksValidationHandler,
  OAuthErrorEvent,
} from 'angular-oauth2-oidc';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  switchValue = false;
  constructor(private oauthService: OAuthService) {}

  ngOnInit(): void {}
  logout() {
    this.oauthService.logOut();
  }
}
