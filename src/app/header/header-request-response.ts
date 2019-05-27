
export class HeaderInitialData {

    public constructor(
        public image: ImageDetails,
        public flags: Flag[],
        public eventsShowPublicStatus: boolean) {

    }
}

export class ImageDetails {

    public constructor(
        public id: number,
        public name: string,
        public fileName: string) {

    }
}

export class Flag {

    public constructor( public urlFlag: string,
        public languageCode: string, public title: string ) {

    }
}

export class Base64Image {

    public constructor(
        public base64String: string) {
    }
}


