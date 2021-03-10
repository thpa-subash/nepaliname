import { AuthService } from './../Service/auth.service';
import { Injectable, Injector } from '@angular/core';

import {
  OAuthService,
  JwksValidationHandler,
  OAuthErrorEvent,
} from 'angular-oauth2-oidc';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  private secureRoutes = ['https://id.nepalinames.com'];

  constructor(
    private authService: AuthService,
    private injector: Injector,
    private oauthService: OAuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this.oauthService.getAccessToken();

    // if (token == '') {
    //   let tokenValue = 'Bearer ' + token;
    //   request = request.clone({
    //     setHeaders: { Authorization: tokenValue },
    //   });
    // }
    return next.handle(request);
    // let requestToForward = request;

    // if (this.oidcSecurityService === undefined) {
    //   this.oidcSecurityService = this.injector.get(OidcSecurityService);
    // }
    // if (this.oidcSecurityService !== undefined) {
    //   let token = this.oidcSecurityService.getToken();
    //   if (token !== '') {
    //     let tokenValue = 'Bearer ' + token;
    //     requestToForward = request.clone({
    //       setHeaders: { Authorization: tokenValue },
    //     });
    //   }
    // } else {
    //   console.debug('OidcSecurityService undefined: NO auth header!');
    // }

    // return next.handle(requestToForward);
    // console.log(request);
    // const token = this.authService.token;
    // console.log(token);
    // if (token) {
    //   request = request.clone({
    //     headers: request.headers.set('Authorization', 'Bearer ' + token),
    //   });
    // }
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json'),
    //   });
    // }
    // if (!request.headers.has('Access-Control-Allow-Origin')) {
    //   request = request.clone({
    //     headers: request.headers.set('Access-Control-Allow-Origin', '*'),
    //   });
    // }
    // if (!token) {
    //   return next.handle(request);
    // }

    // request = request.clone({
    //   headers: request.headers
    //     .set('Authorization', 'Bearer ' + token)
    //     .set('Content-Type', 'application/json'),
    // });

    // return next.handle(request);
  }
}
