import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AdminAddUserInitialData,
  SaveResponse,
} from './adduser-request-response';

@Injectable({
  providedIn: 'root'
})
export class AdminadduserService {

  ADMIN_ADD_USER_GET_INITIAL_DATA_URL = '/is/admin/user/add/getinitialdata';
  ADMIN_ADD_NEW_USER_URL = '/is/admin/user/add';

  constructor(private http: HttpClient) {

  }

  getInitialData(): Observable<AdminAddUserInitialData> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      this.ADMIN_ADD_USER_GET_INITIAL_DATA_URL, { headers }).pipe(map(
        (response: AdminAddUserInitialData) => {
          return response;
        }
      ));
  }

  save(saveUserDataRequestFormData: FormData):
    Observable<SaveResponse> {
    const headers = new HttpHeaders();

    return this.http.post(this.ADMIN_ADD_NEW_USER_URL,
      saveUserDataRequestFormData, { headers }).pipe(map(
        (response: SaveResponse) => {
          return response;
        }
      ));
  }
}
