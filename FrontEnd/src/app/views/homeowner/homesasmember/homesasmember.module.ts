import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesAsMemberRoutingModule } from './homesasmember-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HomesAsMemberComponent } from './homesasmember.component';
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
import { AddRoomAsMemberComponent } from './add-room-as-member/add-room-as-member.component';
import { AddHomedeviceRoomAsMemberComponent } from './add-homedevice-room-as-member/add-homedevice-room-as-member.component';
import { AddHomeDeviceAsMemberComponent } from './add-homedevice-as-member/add-homedevice-as-member.component';
import { ChangeHomeDeviceNameAsMemberComponent } from './change-homedevice-name-as-member/change-homedevice-name-as-member.component';
import { UpdateHomeAliasAsMemberComponent } from './update-home-alias-as-member/update-home-alias-as-member.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    HomesAsMemberComponent,
    AddHomedeviceRoomAsMemberComponent,
    AddHomeDeviceAsMemberComponent,
    ChangeHomeDeviceNameAsMemberComponent,
    UpdateHomeAliasAsMemberComponent,
    AddRoomAsMemberComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    HomesAsMemberRoutingModule,
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
  exports: [AddHomedeviceRoomAsMemberComponent],
})
export class HomesAsMemberModule {}
