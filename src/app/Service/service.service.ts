import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  OAuthService,
  JwksValidationHandler,
  OAuthErrorEvent,
} from 'angular-oauth2-oidc';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  getNames() {}
  private presentThemeSubject = new BehaviorSubject('theme-light');

  presentTheme$: Observable<string> = this.presentThemeSubject.asObservable();
  changeTheme(theme) {
    this.presentThemeSubject.next(theme);
  }
}
