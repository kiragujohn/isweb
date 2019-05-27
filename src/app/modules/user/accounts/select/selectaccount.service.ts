import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSelectAccountInitialData, AccountDeleteResponse } from './selectaccount-request-response';

@Injectable({
  providedIn: 'root'
})
export class UserselectaccountService {

  GET_ACCOUNT_INITIAL_DATA_URL = '/is/user/account/select/getinitialdata';
  DELETE_ACCOUNT_URL = '/is/user/account/delete';

  constructor(private http: HttpClient) {

  }

  getInitialData(): Observable<UserSelectAccountInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_ACCOUNT_INITIAL_DATA_URL, httpOptions).pipe(map(
      (response: UserSelectAccountInitialData) => {
        return response;
      }
    ));
  }

  delete(userIdToDelete: number): Observable<AccountDeleteResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.DELETE_ACCOUNT_URL, userIdToDelete, httpOptions).pipe(map(
        (response: AccountDeleteResponse) => {
          return response;
        }
      ));
  }
}
