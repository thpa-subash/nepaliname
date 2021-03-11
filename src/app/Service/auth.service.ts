import { Names } from './../Model/names';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {}

  public names(): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    console.log(this.http.get<any[]>('https://www.nepalinames.com/api/names/'));
    return this.http.get<any[]>(
      'https://www.nepalinames.com/api/names/',
      httpOptions
    );
  }
}
