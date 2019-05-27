import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageDetails, HeaderInitialData } from './header-request-response';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {

  constructor(private http: HttpClient) {

  }
}
