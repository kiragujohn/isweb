
export class UserTransfer {
  public constructor(public userId: number,
      public firstName: string,
      public lastName: string,
      public fullName: string,
      public mobile: string,
      public email: string) {

  }
}

export class EditMyAccountInitialData {

  public constructor(
      public user: UserTransfer) {

  }
}


export class MyAccountEditResponse {
  public constructor(public saved: boolean, public error: string) {

  }
}


export class EditMyAccountPersonalDetailsRequest {

  public constructor(
      public userId: number,
      public firstName: string,
      public lastName: string,
      public mobile: string) {

  }
}

export class EditMyEmailAndPasswordRequest {

  public constructor(
      public userId: number,
      public email: string,
      public currentPassword: string,
      public password: string) {

  }
}

