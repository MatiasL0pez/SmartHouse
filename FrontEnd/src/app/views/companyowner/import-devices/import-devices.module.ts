import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImportDevicesComponent } from './import-devices.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ImportDevicesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  exports: [ImportDevicesComponent]
})
export class ImportDevicesModule {}