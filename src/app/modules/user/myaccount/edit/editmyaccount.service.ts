import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  EditMyAccountInitialData,
  MyAccountEditResponse,
  EditMyAccountPersonalDetailsRequest,
  EditMyEmailAndPasswordRequest,
} from './editmyaccount-request-response';


@Injectable({
  providedIn: 'root'
})
export class EditmyaccountService {
  EDIT_MY_ACCOUNT_GET_INITIAL_DATA_URL = '/is/user/myaccount/getinitialdata';
  EDIT_MY_PERSONAL_DETAILS_ACCOUNT_URL = '/isuser/myaccount/editmyaccount/personal_details';
  EDIT_MY_EMAIL_AND_PASSWORD_ACCOUNT_URL = '/is/user/myaccount/editmyaccount/email_and_password';

  constructor(private http: HttpClient) {

  }

  getInitialData(email: string): Observable<EditMyAccountInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(
      this.EDIT_MY_ACCOUNT_GET_INITIAL_DATA_URL, email, httpOptions).pipe(map(
        (response: EditMyAccountInitialData) => {
          return response;
        }
      ));
  }


  editMyPersonalDetails(editMyAccountPersonalDetailsRequest: EditMyAccountPersonalDetailsRequest):
    Observable<MyAccountEditResponse> {
    const body = JSON.stringify(editMyAccountPersonalDetailsRequest);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.EDIT_MY_PERSONAL_DETAILS_ACCOUNT_URL, body, httpOptions).pipe(map(
        (response: MyAccountEditResponse) => {
          return response;
        }
      ));
  }

  editMyEmailAndPassword(editMyEmailAndPasswordRequest: EditMyEmailAndPasswordRequest):
    Observable<MyAccountEditResponse> {
    const body = JSON.stringify(editMyEmailAndPasswordRequest);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.EDIT_MY_EMAIL_AND_PASSWORD_ACCOUNT_URL, body, httpOptions).pipe(map(
        (response: MyAccountEditResponse) => {
          return response;
        }
      ));
  }
}
