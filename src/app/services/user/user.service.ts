import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TOKEN_NAME } from '../auth/auth-constants';
import { User } from './user-request';
import { UserTransfer } from './user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  GET_USER_TRANSFERS_URL = '/is/admin/users';
  GET_NON_ADMIN_USERS = '/is/admin/users/nonadminusers';
  accessToken: string;
  loggedInUserId: number;
  authorities: string[];
  loggedInEmail: string;
  dashboardUrls: string[] = [];
  dashboardTitles: string[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private jwtHelperService: JwtHelperService) {

  }

  login(accessToken: string): void {
    const decodedToken = this.jwtHelperService.decodeToken(accessToken);
    this.authorities = decodedToken.authorities;

    if (this.authorities !== undefined) {
      for (const authority of decodedToken.authorities) {
        console.log(authority);
      }
    }

    this.accessToken = accessToken;
    localStorage.setItem(TOKEN_NAME, accessToken);
  }


  clearAccessToken() {
    localStorage.removeItem(TOKEN_NAME);
  }

  isLoggedIn(): boolean {
    this.getUserDashboardUrl();
    return this.accessToken != null;
  }

  getAuthorities(): string[] {
    return this.authorities;
  }

  getUserDashboardUrl(): void {
    const roles: string[] = this.getAuthorities();

    if (roles !== undefined) {
      if (roles.indexOf('ADMIN') > -1) {

        this.dashboardUrls.push('/admin/dashboard');

      } else if (roles.indexOf('USER') > -1) {

        this.dashboardUrls.push('/user/dashboard');

      } else if (roles.indexOf('GUEST') > -1) {

        this.dashboardUrls.push('/home');

        } else if (this.dashboardUrls.length < 1) {
        this.dashboardUrls.push('/home');
      }
    }
  }

  getAccessToken(): string {
    return 'Bearer ' + localStorage.getItem('access_token');
  }

  hasPermission(permission: string): boolean {
    return this.authorities.some(el => el === permission);
  }

  getUserTransfers(): Observable<UserTransfer[]> {
    return this.http.get(this.GET_USER_TRANSFERS_URL).pipe(map(
      (response: UserTransfer[]) => {
        return response;
      }
    ));
  }

  getNonAdminUsers(): Observable<User[]> {
    return this.http.get(this.GET_NON_ADMIN_USERS).pipe(map(
      (response: User[]) => {
        return response;
      }
    ));
  }
}
