import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDevicesComponent } from './list-devices.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CompanyRoutingModule } from '../../companyowner/company/company-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from '../../../components/paginator/paginator.module';
import { FilterModule } from '../../../components/filter/filter.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ListDevicesComponent],
  imports: [
    CommonModule,
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
    MatProgressBarModule
  ],
  exports: [ListDevicesComponent]
})
export class ListDevicesModule {}