import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmineditmyaccountService } from './editmyaccount.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../../services/user/user.service';
import {
  AdminEditMyAccountInitialData,
  AdminMyAccountEditResponse,
  AdminEditMyAccountPersonalDetailsRequest,
  AdminEditMyEmailAndPasswordRequest,
} from './editmyaccount-request-response';
import { ConfigService } from '../../../../services/config/config.service';


@Component({
  selector: 'app-editmyaccount',
  templateUrl: './editmyaccount.component.html'
})

export class AdmineditmyaccountComponent implements OnInit {

  error;
  status;
  adminEditMyAccountInitialData: AdminEditMyAccountInitialData;
  organisationName: string;
  dashboardUrl: string;
  userId: number;
  invalidPasswordMatch: boolean;
  emailAlreadyExists: boolean;
  notSaved: boolean;
  saved: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private admineditmyaccountService: AdmineditmyaccountService,
    public configService: ConfigService,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    // const email = this.userService.loggedInEmail;
    // this.admineditmyaccountService.getInitialData(email).subscribe(
    //   (adminEditMyAccountInitialData: AdminEditMyAccountInitialData) => {
    //     this.adminEditMyAccountInitialData = adminEditMyAccountInitialData;
    //     this.userId = adminEditMyAccountInitialData.user.userId;
    //     console.log('user id =' + this.userId);
    //   },
    // );
  }

  // saves edit
  onSubmitPersonalDetails(form: NgForm) {
    const firstname = form.value['firstName'];
    const lastname = form.value['lastName'];
    const mobile = form.value['mobile'];
    const adminEditMyAccountPersonalDetailsRequest =
      new AdminEditMyAccountPersonalDetailsRequest(this.userId, firstname, lastname, mobile);

    this.admineditmyaccountService.editMyPersonalDetails(adminEditMyAccountPersonalDetailsRequest).subscribe(
      (response: AdminMyAccountEditResponse) => {
        if (response.saved) {
          this.successSaved();
        } else {
          this.errorEmailExistsAlready();
        }
      }
    );
  }

  private successSaved(): void {
    this.saved = true;
    this.notSaved = false;
    this.invalidPasswordMatch = false;
    this.emailAlreadyExists = false;
  }

  private errorEmailExistsAlready(): void {
    this.saved = false;
    this.notSaved = true;
    this.emailAlreadyExists = true;
    this.invalidPasswordMatch = false;
  }

  userAlreadyExists() {
    this.saved = false;
    this.notSaved = true;
    this.emailAlreadyExists = true;
    this.invalidPasswordMatch = false;
  }

  invalidPassword() {
    this.saved = false;
    this.notSaved = true;
    this.invalidPasswordMatch = true;
    this.emailAlreadyExists = false;
  }

  onSubmitEmailAndPassword(form: NgForm) {
    const userId = this.userId;
    const email = form.value['email'];
    const currentPassword = form.value['currentPassword'];
    const password = form.value['password'];

    const adminEditMyEmailAndPasswordRequest =
      new AdminEditMyEmailAndPasswordRequest(userId, email, currentPassword, password);

    this.admineditmyaccountService.editMyEmailAndPassword(adminEditMyEmailAndPasswordRequest).subscribe(
      (response: AdminMyAccountEditResponse) => {
        if (response.saved) {
          this.successSaved();
        } else if (response.error === 'email') {
          this.userAlreadyExists();
        } else if (response.error === 'password') {
          this.invalidPassword();
        }
        if (response.saved) {
          this.successSaved();
        } else {
          this.errorEmailExistsAlready();
        }
      }
    );
  }

  updateStatusAndError() {
    this.status = '';
    this.error = '';
  }

  navigateBack() {
    this.router.navigate([this.dashboardUrl]);
  }

}

