import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfimationDialogComponent } from './confimation-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ConfimationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [ConfimationDialogComponent]
})
export class ConfirmationDialogModule { }
