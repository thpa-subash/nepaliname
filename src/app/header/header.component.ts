import { ServiceService } from './../Service/service.service';
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
  constructor(
    private oauthService: OAuthService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {}
  logout() {
    this.oauthService.logOut();
  }
  changeTheme(data) {
    this.serviceService.changeTheme(data);
    this.switchValue = !this.switchValue;
  }
}
