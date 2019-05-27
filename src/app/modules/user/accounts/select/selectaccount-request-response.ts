
export class UserSelectAccountInitialData {

    public constructor(public accounts: Account[]) {

    }
}

export class Account {

    public constructor(
        public id: number,
        public accountNumber: number,
        public accountType: string,
        public active: boolean) {

    }
}

export class AccountDeleteResponse {

    public constructor(
        public deleted: boolean,
        public error: string) {

    }
  }
