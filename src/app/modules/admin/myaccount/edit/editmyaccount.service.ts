import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AdminEditMyAccountInitialData,
  AdminMyAccountEditResponse,
  AdminEditMyAccountPersonalDetailsRequest,
  AdminEditMyEmailAndPasswordRequest,
} from './editmyaccount-request-response';


@Injectable({
  providedIn: 'root'
})
export class AdmineditmyaccountService {
  EDIT_MY_ACCOUNT_GET_INITIAL_DATA_URL = '/is/admin/myaccount/getinitialdata';
  EDIT_MY_PERSONAL_DETAILS_ACCOUNT_URL = '/is/admin/myaccount/editmyaccount/personal_details';
  EDIT_MY_EMAIL_AND_PASSWORD_ACCOUNT_URL = '/is/admin/myaccount/editmyaccount/email_and_password';

  constructor(private http: HttpClient) {

  }

  getInitialData(email: string): Observable<AdminEditMyAccountInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(
      this.EDIT_MY_ACCOUNT_GET_INITIAL_DATA_URL, email, httpOptions).pipe(map(
        (response: AdminEditMyAccountInitialData) => {
          return response;
        }
      ));
  }


  editMyPersonalDetails(adminEditMyAccountPersonalDetailsRequest: AdminEditMyAccountPersonalDetailsRequest):
    Observable<AdminMyAccountEditResponse> {
    const body = JSON.stringify(adminEditMyAccountPersonalDetailsRequest);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.EDIT_MY_PERSONAL_DETAILS_ACCOUNT_URL, body, httpOptions).pipe(map(
        (response: AdminMyAccountEditResponse) => {
          return response;
        }
      ));
  }

  editMyEmailAndPassword(adminEditMyEmailAndPasswordRequest: AdminEditMyEmailAndPasswordRequest):
    Observable<AdminMyAccountEditResponse> {
    const body = JSON.stringify(adminEditMyEmailAndPasswordRequest);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.EDIT_MY_EMAIL_AND_PASSWORD_ACCOUNT_URL, body, httpOptions).pipe(map(
        (response: AdminMyAccountEditResponse) => {
          return response;
        }
      ));
  }
}
