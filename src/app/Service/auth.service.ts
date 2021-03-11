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

  names(): Observable<any[]> {
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
  postName(post): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    return this.http.post<any[]>(
      'https://www.nepalinames.com/api/names/',
      post
    );
  }
  update(id, post): Observable<any> {
    return this.http.put<any[]>(
      'https://www.nepalinames.com/api/names/' + id,
      JSON.stringify(post)
    );
  }
}
