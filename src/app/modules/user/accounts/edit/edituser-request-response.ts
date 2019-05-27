
export class AdminEditUserInitialData {

  public constructor(
    public user: UserTransfer) {

  }
}

export class UserTransfer {

  public constructor(
    public id: number,
    public name: string,
    public active: boolean,
    public addressess: AddressTransfer[]) {

  }
}


export class AddressTransfer {

  public constructor(
    public firstLine: string,
    public secondLine: string,
    public thirdLine: string,
    public fourthLine: string,
    public townOrCity: string,
    public postCode: string,
    public addressTypeId: number,
    public countryId: number,
    public countries: CountryTransfer[],
    public contact: ContactTransfer) {

  }
}

export class ContactTransfer {

  public constructor(
    public email: string,
    public phone: string) {

  }
}

export class CountryTransfer {

  public constructor(
    public id: number,
    public name: string) {

  }
}

export class AddressType {

  public constructor(public id: number,
    public name: string) {

  }
}

export class Address {

  public constructor(
    public id: number, public firstLine: string,
    public secondLine: string, public thirdLine: string,
    public fourthLine: string, public townOrCity: string,
    public postCode: string, public addressTypeId: number,
    public countryId) {

  }
}

export class Country {

  public constructor(
    public id: number,
    public name: string) {

  }
}


export class User {

  public constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public description: string,
    public firstLine: string,
    public secondLine: string,
    public thirdLine: string,
    public fourthLine: string,
    public townOrCity: string,
    public postCode: string,
    public addressTypeId: number,
    public countryId: number) {
  }
}


export class Image {

  public constructor(
    public id: number,
    public name: string,
    public description: string,
    public show_name_if_possible: boolean,
    public show_description_if_possible: boolean) {
  }
}

export class AdminEditUserRequest {

  public constructor(
    public userId: number,
    public name: string,
    public email: string,
    public phone: string,
    public firstName: string,
    public lastName: string,
    public contactEmail: string,
    public contactPhone: string,
    public firstLine: string,
    public secondLine: string,
    public thirdLine: string,
    public fourthLine: string,
    public townOrCity: string,
    public postCode: string,
    public memberActive: boolean,
    public addressTypeId: number,
    public countryId: number,
    public password: string
  ) {
  }
}

export class SaveResponse {

  public constructor(public saved: boolean, public error: string) {

  }
}
