import { Names } from './../Model/names';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {}
  public names(): Observable<any[]> {
    console.log(this.http.get<any[]>('https://www.nepalinames.com/api/names/'));
    return this.http.get<any[]>('https://www.nepalinames.com/api/names/');
  }
}
