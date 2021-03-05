import { AuthService } from './../Service/auth.service';
import { Injectable } from '@angular/core';
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
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    const token = this.authService.token;
    console.log(token);
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }
    if (!request.headers.has('Access-Control-Allow-Origin')) {
      request = request.clone({
        headers: request.headers.set('Access-Control-Allow-Origin', '*'),
      });
    }
    // if (!token) {
    //   return next.handle(request);
    // }

    // request = request.clone({
    //   headers: request.headers
    //     .set('Authorization', 'Bearer ' + token)
    //     .set('Content-Type', 'application/json'),
    // });

    return next.handle(request);
  }
}
