
export class UserTransfer {
  public constructor(public userId: number,
      public firstName: string,
      public lastName: string,
      public fullName: string,
      public mobile: string,
      public email: string) {

  }
}

export class AdminEditMyAccountInitialData {

  public constructor(
      public user: UserTransfer) {

  }
}


export class AdminMyAccountEditResponse {
  public constructor(public saved: boolean, public error: string) {

  }
}


export class AdminEditMyAccountPersonalDetailsRequest {

  public constructor(
      public userId: number,
      public firstName: string,
      public lastName: string,
      public mobile: string) {

  }
}

export class AdminEditMyEmailAndPasswordRequest {

  public constructor(
      public userId: number,
      public email: string,
      public currentPassword: string,
      public password: string) {

  }
}

