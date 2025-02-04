import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHomeComponent } from './create-home/create-home.component';
import { HomeDevicesRoutingModule } from './homedevices-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HomeDevicesComponent } from './homedevices.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ListDevicesModule } from '../../shared/list-devices/list-devices.module';
import { PaginatorModule } from '../../../components/paginator/paginator.module';
import { CdkTableModule } from '@angular/cdk/table';
import { AddHomedeviceRoomComponent } from './add-homedevice-room/add-homedevice-room.component';
import { AddHomeDeviceComponent } from './add-homedevice/add-homedevice.component';
import { ChangeHomeDeviceNameComponent } from './change-homedevice-name/change-homedevice-name.component';
import { UpdateHomeAliasComponent } from './update-home-alias/update-home-alias.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    HomeDevicesComponent,
    CreateHomeComponent,
    AddHomedeviceRoomComponent,
    AddHomeDeviceComponent,
    ChangeHomeDeviceNameComponent,
    UpdateHomeAliasComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    HomeDevicesRoutingModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    PaginatorModule,
    CdkTableModule,
    ListDevicesModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  exports: [AddHomedeviceRoomComponent],
})
export class HomeModule {}
