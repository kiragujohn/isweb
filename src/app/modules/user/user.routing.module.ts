import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HasPermissionGuard } from '../../guards/haspermission-guard';
import { UserdashboardComponent } from './dashboard/userdashboard.component';
import { UsereditmyaccountComponent } from './myaccount/edit/editmyaccount.component';

const orgRoutes: Routes = [
  {
    path: 'dashboard',
    component: UserdashboardComponent,
    canActivate: [HasPermissionGuard],
    data: { authorities: ['USER'] }
  },
  {
    path: 'myaccount', children: [
      {
        path: 'edit',
        component: UsereditmyaccountComponent,
        canActivate: [HasPermissionGuard],
        data: { authorities: ['USER'] }
      }
    ]
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
export class UserroutingModule {

}
