import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoleComponent } from './add-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { F } from '@angular/cdk/keycodes';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [AddRoleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatButtonModule,
  ],
  exports: [AddRoleComponent]
})
export class AddRoleModule { }
