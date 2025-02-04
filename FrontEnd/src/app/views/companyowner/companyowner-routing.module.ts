import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyOwnerComponent } from './companyowner.component';
import { ListDevicesComponent } from '../shared/list-devices/list-devices.component';
import { CompanyOwnerAuthorization } from '../../guards/companyowner-authorization.guard';
import { ImportDevicesComponent } from './import-devices/import-devices.component';
import { AddRoleComponent } from '../shared/add-role/add-role.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyOwnerComponent,
    children: [
      {
        path: 'company',
        canActivate: [CompanyOwnerAuthorization], 
        loadChildren: () =>import('./company/company.module').then((m) => m.CompanyModule)      
      },
      {
        path: 'devices',
        component: ListDevicesComponent,
        canActivate: [CompanyOwnerAuthorization], 
      },
      {
        path: 'importer',
        component: ImportDevicesComponent,
        canActivate: [CompanyOwnerAuthorization], 
      },
      {
        path: 'homeowner',
        component: AddRoleComponent,
        canActivate: [CompanyOwnerAuthorization], 
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'company'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyOwnerRoutingModule {}
