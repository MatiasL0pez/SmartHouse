import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FilterComponent],
  imports: [
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [FilterComponent]
})
export class FilterModule { }
