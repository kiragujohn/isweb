import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {

  dashboardUrls: any;

  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit() {

  }

  isLoggedIn() {
    this.dashboardUrls = this.userService.dashboardUrls;
    if (this.userService.authorities === undefined) {
      return false;
    }
    return this.userService.isLoggedIn();
  }
}
