import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '../../components/navigation/navigation.module';
import { AdministratorComponent } from './administrator.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { ListDevicesModule } from '../shared/list-devices/list-devices.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from '../../components/paginator/paginator.module';
import { FilterModule } from '../../components/filter/filter.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanyRoutingModule } from '../companyowner/company/company-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CompaniesComponent } from './companies/companies.component';
import { UsersComponent } from './users/users.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddRoleModule } from '../shared/add-role/add-role.module';

@NgModule({
  declarations: [AdministratorComponent, CompaniesComponent, UsersComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    AddRoleModule,
    AdministratorRoutingModule,
    ListDevicesModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    CompanyRoutingModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    PaginatorModule,
    FilterModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  exports: [AdministratorComponent],
})
export class AdministratorModule {}