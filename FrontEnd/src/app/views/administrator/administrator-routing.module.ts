import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { AdministratorAuthorization } from '../../guards/administrator-authorization.guard';
import { ListDevicesComponent } from '../shared/list-devices/list-devices.component';
import { CompaniesComponent } from './companies/companies.component';
import { UsersComponent } from './users/users.component';
import { AddRoleComponent } from '../shared/add-role/add-role.component';

export const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      {
        path: 'companies',
        component: CompaniesComponent,
        canActivate: [AdministratorAuthorization],
      },
      {
        path: 'devices',
        component: ListDevicesComponent,
        canActivate: [AdministratorAuthorization],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdministratorAuthorization],
      },
      {
        path: 'homeowner',
        component: AddRoleComponent,
        canActivate: [AdministratorAuthorization],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'companies',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
