import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeOwnerComponent } from './homeowner.component';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '../../components/navigation/navigation.module';
import { MembersComponent } from './members/members.component';
import { CreateHomeUserComponent } from './members/add-member/add-member.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HomeOwnerRoutingModule } from './homeowner-routing.module';
import { ListDevicesModule } from '../shared/list-devices/list-devices.module';
import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from '../../components/paginator/paginator.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddRoomComponent } from './homedevices/add-room/add-room.component';
import { AddHomedeviceRoomComponent } from './homedevices/add-homedevice-room/add-homedevice-room.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Importa el módulo

import {
  MatNativeDateModule,
  MatOption,
  MatOptionModule,
} from '@angular/material/core';
import { NotificationsComponent } from './notifications/notifications.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { FilterModule } from '../../components/filter/filter.module';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeOwnerComponent,
    MembersComponent,
    CreateHomeUserComponent,
    AddRoomComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavigationModule,
    HomeOwnerRoutingModule,
    ListDevicesModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    PaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatOptionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
})
export class HomeOwnerModule {}
