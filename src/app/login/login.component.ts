import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../services/auth/authentication.service';
import { UserService } from '../services/user/user.service';
import { LoginService } from './login.service';
import { LoginInitialData } from './login-request-response';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../services/config/config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  mydata: LoginInitialData;
  model: any = {};
  errorService: string;
  loading = false;
  error = '';
  dashboardUrl: any;
  errorYouDontHavePermissions: string;
  incorrectUserNameOrPassword: string;
  redirectUrl: string;
  authorities;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private userService: UserService,
    public configService: ConfigService,
    private translateService: TranslateService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit() {
    this.userService.clearAccessToken();
    this.authorities = this.userService.authorities;
  }

  private navigateAfterSuccess(email: string) {
    const roles: string[] = this.userService.getAuthorities();
    this.userService.getUserDashboardUrl();
    const userDashboard = this.userService.dashboardUrls;

    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else if (userDashboard[0] === '/guest/dashboard') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate([userDashboard[0]]);
    }
  }


  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        result => {
          this.loading = false;
          if (result) {
            this.userService.login(result);
            this.authorities = this.userService.authorities;

            if (this.authorities === undefined) {
              this.errorYouDontHavePermissions = 'You do not have permissions';
            } else {
              const email = this.model.username;
              this.userService.loggedInEmail = email;
              this.navigateAfterSuccess(email);

            }
          } else {
            this.incorrectUserNameOrPassword = 'Incorrect username or password';
          }
        },
        (error: Error) => {
          this.error = error.message;
          this.loading = false;
        }
      );
  }
}
