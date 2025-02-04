import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeOwnerComponent } from './homeowner.component';
import { MembersComponent } from './members/members.component';
import { HomeOwnerAuthorization } from '../../guards/homeowner-authorization.guard';
import { AdministratorAuthorization } from '../../guards/administrator-authorization.guard';
import { CompanyOwnerAuthorization } from '../../guards/companyowner-authorization.guard';
import { NotificationsComponent } from './notifications/notifications.component';
import { ListDevicesComponent } from '../shared/list-devices/list-devices.component';

const routes: Routes = [
  {
    path: '',
    component: HomeOwnerComponent,
    children: [
      {
        path: 'homedevices',
        canActivate: [HomeOwnerAuthorization],
        loadChildren: () =>
          import('./homedevices/homedevices.module').then((m) => m.HomeModule),
      },
      {
        path: 'homeusers',
        component: MembersComponent,
        canActivate: [HomeOwnerAuthorization],
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [HomeOwnerAuthorization],
      },
      {
        path: 'administrator',
        canActivate: [AdministratorAuthorization],
        loadChildren: () =>
          import('../administrator/administrator.module').then(
            (m) => m.AdministratorModule
          ),
      },
      {
        path: 'companyowner',
        canActivate: [CompanyOwnerAuthorization],
        loadChildren: () =>
          import('../companyowner/companyowner.module').then(
            (m) => m.CompanyOwnerModule
          ),
      },
      {
        path: 'devices',
        component: ListDevicesComponent,
        canActivate: [HomeOwnerAuthorization],
      },
      {
        path: 'homesasmember',
        canActivate: [HomeOwnerAuthorization],
        loadChildren: () =>
          import('./homesasmember/homesasmember.module').then(
            (m) => m.HomesAsMemberModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeOwnerRoutingModule {}
