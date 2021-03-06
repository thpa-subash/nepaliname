import { authConfig } from './../auth.config';
import { Names } from './../Model/names';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import {
  OAuthService,
  JwksValidationHandler,
  OAuthErrorEvent,
} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  validUser = new BehaviorSubject('');
  constructor(
    public http: HttpClient,
    private router: Router,
    private oauthService: OAuthService
  ) {
    console.log(this.validUser);
  }

  names(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ): Observable<Names[]> {
    //control data received from the server
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('search', `${search}`)
      .append('sortOrder', `${sortOrder}`);
    //ends
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    // request.setRequestHeader('Content-type', 'application/json');
    headers = headers.set('Accept', 'application/octet-stream');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    const httpOptions = {
      headers: headers,
    };
    console.log(params);

    return this.http.get<Names[]>('https://www.nepalinames.com/api/names', {
      params,
    });
  }
  postName(post): Observable<any[]> {
    console.log(post);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    return this.http.post<any[]>('https://www.nepalinames.com/api/names', post);
  }
  update(id, post): Observable<any> {
    return this.http.put<any[]>(
      'https://www.nepalinames.com/api/names/' + id,
      JSON.stringify(post)
    );
  }

  //check user is valid or not
  ValidUser(data) {
    console.log('from service' + data);
    this.validUser.next(data);
  }
}
