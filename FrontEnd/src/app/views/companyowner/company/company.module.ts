import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CompanyComponent } from './company.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from '../../../components/paginator/paginator.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UpdateHomeAliasComponent } from '../../homeowner/homedevices/update-home-alias/update-home-alias.component';
import { UpdateModelValidatorComponent } from './update-model-validator/update-model-validator.component';
import { ViewPhotosDialogComponent } from '../../../components/view-photos-dialog/view-photos-dialog.component';

@NgModule({
  declarations: [
    CompanyComponent,
    CreateCompanyComponent,
    CreateDeviceComponent,
    UpdateModelValidatorComponent,
  ],
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
    MatProgressBarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    PaginatorModule,
  ],
})
export class CompanyModule {}
