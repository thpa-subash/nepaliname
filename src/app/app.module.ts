import { AuthInterceptorInterceptor } from './Interceptor/auth-interceptor.interceptor';
import { AuthService } from './Service/auth.service';
import { AuthGuard } from './Guard/auth.guard';
import { ZorroModule } from './zorro/zorro.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientJsonpModule,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AddNamesComponent } from './Admin/add-names/add-names.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './Admin/login/login.component';
import {
  AuthModule,
  OidcConfigService,
  OidcSecurityService,
  OpenIdConfiguration,
  LogLevel,
} from 'angular-auth-oidc-client';

// oidc config
export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://id.nepalinames.com',
      redirectUrl: window.location.origin + '/home',
      postLogoutRedirectUri: window.location.origin,
      clientId: 'js',
      scope: 'openid profile',
      responseType: 'code',
      silentRenew: true,
      silentRenewUrl: window.location.origin + '/home',
      logLevel: LogLevel.Debug,
    });
}
//setting for nz-icons
registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    AddNamesComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ZorroModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    AuthModule.forRoot(),
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
