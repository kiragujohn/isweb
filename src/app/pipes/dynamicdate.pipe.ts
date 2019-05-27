import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
    name: 'date',
    pure: false
})
export class DynamicDatePipe implements PipeTransform {
    // https://thorsten-hans.com/i18n-in-angular-apps-c0ed022c8a02
    constructor(private _translateService: TranslateService) {

    }

    public transform(value: any, pattern: string = 'mediumDate'): any {
        const ngPipe = new DatePipe(this._translateService.currentLang);
        return ngPipe.transform(value, pattern);
    }

}
