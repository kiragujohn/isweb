import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdminEditUserInitialData,
  SaveResponse, AdminEditUserRequest
} from './edituser-request-response';
import { AdminedituserService } from './edituser.service';
import { ConfigService } from '../../../../services/config/config.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html'
})

export class EdituserComponent implements OnInit {

  notSaved: boolean;
  saved: boolean;
  adminEditUserInitialData: AdminEditUserInitialData;
  userId: number;
  error: string;
  imagePath: any;
  imageAltOrTitle: string;
  addressTypeId: number;
  emailThatIsUsedAlready: string;
  emailExistsAlready: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private adminEditUserService: AdminedituserService,
    private router: Router,
    public configService: ConfigService) {

  }

  ngOnInit() {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('userId'));
    this.getEditUserInitialData(this.userId);
  }

  private getEditUserInitialData(userId: number): void {
    this.adminEditUserService.getInitialData(userId).subscribe(
      (adminEditUserInitialData: AdminEditUserInitialData) => {
        this.adminEditUserInitialData = adminEditUserInitialData;
      }
    );
  }

  private successSaved(): void {
    this.saved = true;
  }

  private getUserEditFormData(form: NgForm):
    [FormData, AdminEditUserRequest] {
    const userId = this.userId;
    const firstName = form.value['firstName'];
    const lastName = form.value['lastName'];
    const password = form.value['password'];
    const phone = form.value['phone'];
    const email = form.value['email'];
    const name = form.value['contactName'];
    const contactEmail = form.value['contactEmail'];
    const contactPhone = form.value['contactPhone'];
    const firstLine = form.value['firstLine'];
    const secondLine = form.value['secondLine'];
    const thirdLine = form.value['thirdLine'];
    const fourthLine = form.value['fourthLine'];
    const townOrCity = form.value['townOrCity'];
    const postCode = form.value['postCode'];
    const memberActive = form.value['memberActive'];
    const addressTypeId = this.addressTypeId;
    const countryId = form.value['countryId'];
    this.emailThatIsUsedAlready = email;

    const adminEditUserRequest: AdminEditUserRequest =
      new AdminEditUserRequest(userId, name, email, phone,
        firstName, lastName, contactEmail, contactPhone, firstLine, secondLine,
        thirdLine, fourthLine, townOrCity, postCode, memberActive, addressTypeId, countryId, password);

    const saveUserRequestFormData = new FormData();

    saveUserRequestFormData.append('userDetails',
      new Blob([JSON.stringify(adminEditUserRequest)], {
        type: 'application/json'
      }));

    return [saveUserRequestFormData, adminEditUserRequest];
  }


  private errorEmailExistsAlready(): void {
    this.saved = false;
    this.emailExistsAlready = true;
  }

  private forwardToEditMessenger(adminEditUserRequest: AdminEditUserRequest): void {
    const sellerId = adminEditUserRequest.userId;
    const url = '/admin/user/messenger/select/' + sellerId;
    this.router.navigate([url]);
  }


  saveFormBeforeClickingOnEditAdminLink(form: NgForm) {
    const data: [FormData, AdminEditUserRequest] = this.getUserEditFormData(form);
    const saveOrgRequestFormData: FormData = data[0];
    const adminEditUserRequest: AdminEditUserRequest = data[1];

    this.adminEditUserService.save(
      saveOrgRequestFormData).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.forwardToEditMessenger(adminEditUserRequest);
          } else {
            this.errorEmailExistsAlready();
          }
        },
    );
  }

  onSubmit(form: NgForm) {
    const data: [FormData, AdminEditUserRequest] =
      this.getUserEditFormData(form);

    const saveOrgRequestFormData: FormData = data[0];

    this.adminEditUserService.save(
      saveOrgRequestFormData).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            // this.successSaved();
            this.router.navigate(['admin/user/select']);
          } else {
            this.errorEmailExistsAlready();
          }
        },
    );
  }

  scroll(el) {
    this.saved = false;
    this.notSaved = false;
    el.scrollIntoView();
  }

}
