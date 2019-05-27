import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminUserSelectInitialData, UserDeleteResponse } from './selectuser-request-response';

@Injectable({
  providedIn: 'root'
})
export class AdminselectuserService {

  GET_USER_INITIAL_DATA_URL = '/is/admin/user/select/getinitialdata';
  DELETE_USER_URL = '/is/admin/user/delete';

  constructor(private http: HttpClient) {

  }

  getInitialData(): Observable<AdminUserSelectInitialData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.GET_USER_INITIAL_DATA_URL, httpOptions).pipe(map(
      (response: AdminUserSelectInitialData) => {
        return response;
      }
    ));
  }

  delete(userIdToDelete: number): Observable<UserDeleteResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.DELETE_USER_URL, userIdToDelete, httpOptions).pipe(map(
        (response: UserDeleteResponse) => {
          return response;
        }
      ));
  }
}
