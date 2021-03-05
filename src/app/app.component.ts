import { AuthService } from './Service/auth.service';
import { Component } from '@angular/core';
import {
  OidcClientNotification,
  OidcSecurityService,
  PublicConfiguration,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
    private authService: AuthService,
    public oidcSecurityService: OidcSecurityService
  ) {}
  ngOnInit() {}
}
