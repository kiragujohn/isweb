import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from './home.service';
import { UserService } from '../services/user/user.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  error: string;
  pastEvents: Event[];
  upcomingEvents: Event[];
  base64String: string;
  email: string;
  dashboardUrls: any;

  constructor(
    private homeService: HomeService,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit() {

  }

  isLoggedIn() {
    this.email = this.userService.loggedInEmail;
    this.dashboardUrls = this.userService.dashboardUrls;
    if (this.userService.authorities === undefined) {
      return false;
    }
    return this.userService.isLoggedIn();
  }
}
