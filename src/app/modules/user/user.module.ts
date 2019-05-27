import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUploadModule } from 'angular2-image-upload';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../../modules/shared/shared.module';
import { UserroutingModule } from './user.routing.module';
import { UserdashboardComponent } from './dashboard/userdashboard.component';
import { UsereditmyaccountComponent } from './myaccount/edit/editmyaccount.component';
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    CollapseModule,
    UserroutingModule,
    TranslateModule.forChild(),
    CollapseModule.forRoot(),
    ImageUploadModule,
    TabsModule,
    SharedModule
  ],
  declarations: [UserdashboardComponent,
    UsereditmyaccountComponent],

  providers: []
})
export class UserModule { }
