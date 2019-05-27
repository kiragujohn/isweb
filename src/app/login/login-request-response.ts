export class LoginInitialData {
    public constructor(
        public userId: number,
        public firstName: string,
        public memberOrganisationTypeTransfer: MemberOrganisationTypeTransfer[],
        public membershipExpiredStatus: boolean) {

    }
}

export class MemberOrganisationTypeTransfer {

    public constructor(
        public id: number,
        public active: boolean) {

    }
}

export class Currency {

    public constructor(public id: number, public name: string) {

    }
}

export class MembershipDuration {

    public constructor(
        public id: number,
         public name: string,
        public durationInMonths: number) {

    }
}
