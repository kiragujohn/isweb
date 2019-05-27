
export class AdminUserSelectInitialData {

    public constructor(public users: UserTransfer[]) {

    }
}

export class UserTransfer {

    public constructor(
        public id: number,
        public name: string,
        public email: string) {

    }
}

export class UserDeleteResponse {

    public constructor(
        public deleted: boolean,
        public error: string) {

    }
  }
