import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HasPermissionGuard } from '../../guards/haspermission-guard';
import { AdmindashboardComponent } from './dashboard/admindashboard.component';
import { AdmineditmyaccountComponent } from './myaccount/edit/editmyaccount.component';
import { SelectuserComponent } from './user/select/selectuser.component';
import { AdduserComponent } from './user/add/adduser.component';
import { EdituserComponent } from './user/edit/edituser.component';

const orgRoutes: Routes = [
  {
    path: 'dashboard',
    component: AdmindashboardComponent,
    canActivate: [HasPermissionGuard],
    data: { authorities: ['ADMIN'] }
  },
  {
    path: 'myaccount', children: [
      {
        path: 'edit',
        component: AdmineditmyaccountComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['ADMIN'] }
      }
    ]
  },
  {
    path: 'user', children: [
      {
        path: 'select',
        component: SelectuserComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['ADMIN'] }
      },
      {
        path: 'add',
        component: AdduserComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['ADMIN'] }
      },
      {
        path: 'edit/:userId',
        component: EdituserComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['ADMIN'] }
      }
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(orgRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AdminroutingModule {

}
