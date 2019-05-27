import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginInitialData } from './login-request-response';

@Injectable({
    providedIn: 'root'
  })

export class LoginService {
    firstName: string;
    membershipTypeCount: number;
    GET_LOGIN_INITIAL_DATA_URL = '/is/login/getinitialdata';
    constructor(private http: HttpClient) { }

    getLoginInitialData(email: string): Observable<LoginInitialData> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.post(
            this.GET_LOGIN_INITIAL_DATA_URL, email, httpOptions).pipe(map(
                (response: LoginInitialData) => {
                    return response;
                }
            ));
    }
}
