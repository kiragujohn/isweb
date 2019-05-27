import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../login/login.service';
import { UserService } from '../services/user/user.service';
import { HeaderService } from './header.service';
import { ImageDetails, HeaderInitialData, Flag } from './header-request-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  error: string;
  email;
  dashboardUrls: any;
  collapse = true;
  eventsShowPublicStatus: boolean;
  firstName: string;

  constructor(private userService: UserService,
    private headerService: HeaderService,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.userService.clearAccessToken();
  }

  isLoggedIn() {
    this.email = this.userService.loggedInEmail;
    this.dashboardUrls = this.userService.dashboardUrls;
    this.firstName = this.loginService.firstName;
    if (this.userService.authorities === undefined) {
      return false;
    }
    return this.userService.isLoggedIn();
  }

  hasPermission(permission: string) {
    return this.userService.hasPermission(permission);
  }
}
