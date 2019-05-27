
export class AdminAddUserInitialData {

  public constructor(
    public addressTypes: AddressType[],
    public countries: Country[]
    ) {

  }
}

export class User {

  public constructor(public id: number,
    public name: string, public status: string) {

  }
}

export class Country {

  public constructor(public id: number, public name: string) {

  }
}

export class AddressType {

  public constructor(public id: number, public name: string) {

  }
}

export class SaveResponse {

  public constructor(public saved: boolean, public error: string) {

  }
}

export class AdminAddUserRequest {

  public constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public phone: string,
    public name: string,
    public contactEmail: string,
    public contactPhone: string,
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


