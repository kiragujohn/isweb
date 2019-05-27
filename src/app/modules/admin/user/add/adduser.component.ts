import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user/user.service';
import {
  AddressType,
  AdminAddUserInitialData,
  Country,
  SaveResponse,
  AdminAddUserRequest,
} from './adduser-request-response';
import { AdminadduserService } from './adduser.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html'
})

export class AdduserComponent implements OnInit {
  countrysMap = {};
  addressTypesMap = {};
  selectedCountryId: number;
  selectedAddressTypeId: number;
  firstAddress: AddressType;
  firstCountry: Country;
  countries: Country[];
  addressTypes: AddressType[];
  adminAddUserInitialData: AdminAddUserInitialData;
  saved = false;
  error: string;
  emailThatIsUsedAlready: string;
  emailExistsAlready: boolean;

  constructor(private adminAddUserService: AdminadduserService,
    private router: Router) { }

  ngOnInit() {
    // this.getAddUserInitialData();
    // this.emailExistsAlready = false;
  }

  private successSaved(): void {
    this.saved = true;
  }

  private errorEmailExistsAlready(): void {
    this.saved = false;
    this.emailExistsAlready = true;
  }

  private getAddUserInitialData() {
    this.adminAddUserService.getInitialData().subscribe(
      (adminAddUserInitialData: AdminAddUserInitialData) => {
        this.adminAddUserInitialData = adminAddUserInitialData;
        this.addressTypes = this.adminAddUserInitialData.addressTypes;
        this.countries = this.adminAddUserInitialData.countries;
        this.firstCountry = this.adminAddUserInitialData.countries[0];
        this.firstAddress = this.adminAddUserInitialData.addressTypes[0];
        this.selectedAddressTypeId = this.firstAddress['id'];
        this.selectedCountryId = this.firstCountry['id'];

        for (const addressType of this.addressTypes) {
          this.addressTypesMap[addressType.id] = addressType;
        }

        for (const country of this.countries) {
          this.countrysMap[country.id] = country;
        }

      }
    );
  }

  onSubmit(form: NgForm) {
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
    const addressTypeId = form.value['addressTypeId'];
    const countryId = form.value['countryId'];
    this.emailThatIsUsedAlready = email;


    const adminAddUserRequest: AdminAddUserRequest =
      new AdminAddUserRequest(email, firstName, lastName,
        password, phone, name, contactEmail, contactPhone,
        firstLine, secondLine, thirdLine, fourthLine, townOrCity,
        postCode, addressTypeId, countryId);

    const saveUserRequestFormData = new FormData();

    saveUserRequestFormData.append('userDetails',
      new Blob([JSON.stringify(adminAddUserRequest)], {
        type: 'application/json'
      }));

    this.adminAddUserService.save(
      saveUserRequestFormData).subscribe(
        (response: SaveResponse) => {
          if (response.saved) {
            this.router.navigate(['admin/user/select']);
          } else {
            this.errorEmailExistsAlready();
          }
        }
      );
  }

  scroll(el) {
    this.saved = false;
    el.scrollIntoView();
  }

}
