import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user/user.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class HasPermissionGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isLoggedIn = this.userService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['home'], { queryParams: { redirectTo: state.url } });
      return false;
    }

    const authorities = this.userService.getAuthorities();
    const needAuthorities = next.data['authorities'] as Array<string>;
    let hasPermission = true;

    for (const needAuthority of needAuthorities) {
      if (!authorities.includes(needAuthority)) {
        this.router.navigate(['home'], { queryParams: { redirectTo: state.url } });
        hasPermission = false;
      }
    }
    return hasPermission;
  }
}
