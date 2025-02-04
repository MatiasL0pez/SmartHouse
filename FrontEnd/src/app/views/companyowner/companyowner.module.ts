import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyOwnerComponent } from './companyowner.component';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '../../components/navigation/navigation.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CompanyOwnerRoutingModule } from './companyowner-routing.module';
import { ListDevicesModule } from '../shared/list-devices/list-devices.module';
import { MatTableModule } from '@angular/material/table';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PaginatorModule } from '../../components/paginator/paginator.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ImportDevicesModule } from './import-devices/import-devices.module';
import { AddRoleModule } from '../shared/add-role/add-role.module';
import { ViewPhotosDialogComponent } from '../../components/view-photos-dialog/view-photos-dialog.component';

@NgModule({
  declarations: [CompanyOwnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    CompanyOwnerRoutingModule,
    ListDevicesModule,
    AddRoleModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    PaginatorModule,
    MatProgressBarModule,
    ImportDevicesModule,
  ],
})
export class CompanyOwnerModule {}
