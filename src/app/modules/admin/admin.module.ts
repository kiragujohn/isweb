import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUploadModule } from 'angular2-image-upload';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../../modules/shared/shared.module';
import { AdminroutingModule } from './admin.routing.module';
import { AdmindashboardComponent } from './dashboard/admindashboard.component';
import { AdduserComponent} from './user/add/adduser.component';
import { SelectuserComponent } from './user/select/selectuser.component';
import { EdituserComponent } from './user/edit/edituser.component';
import { AdmineditmyaccountComponent } from './myaccount/edit/editmyaccount.component';
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    CollapseModule,
    AdminroutingModule,
    TranslateModule.forChild(),
    CollapseModule.forRoot(),
    ImageUploadModule,
    TabsModule,
    SharedModule
  ],
  declarations: [AdmindashboardComponent,
    AdmineditmyaccountComponent,
    AdduserComponent,
    SelectuserComponent,
    EdituserComponent
  ],

  providers: []
})
export class AdminModule { }
