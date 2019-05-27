import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AdminEditUserInitialData,
  SaveResponse
} from './edituser-request-response';


@Injectable({
  providedIn: 'root'
})
export class AdminedituserService {

  ADMIN_EDIT_USER_GET_INITIAL_DATA_URL = '/is/admin/user/edit/getinitialdata';
  ADMIN_EDIT_SAVE_USER_URL = '/is/admin/user/edit/save';

  constructor(private http: HttpClient) { }

  getInitialData(sellerId: number): Observable<AdminEditUserInitialData> {
    const body = JSON.stringify(sellerId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(
      this.ADMIN_EDIT_USER_GET_INITIAL_DATA_URL, body, httpOptions).pipe(map(
        (response: AdminEditUserInitialData) => {
          return response;
        }
      ));
  }

  save(saveSellerDataRequestFormData: FormData):
    Observable<SaveResponse> {

    const httpOptions = {
    };

    return this.http.post(this.ADMIN_EDIT_SAVE_USER_URL,
      saveSellerDataRequestFormData, httpOptions).pipe(map(
        (response: SaveResponse) => {
          return response;
        }
      ));
  }
}
