import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeDeviceService } from '../../../../services/homedevice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateHomeDeviceName } from '../../../../models/UpdateHomeDeviceName';
import { HomeDevice } from '../../../../models/HomeDevice';

@Component({
  selector: 'app-change-homedevice-name',
  templateUrl: './change-homedevice-name.component.html',
  styleUrls: ['./change-homedevice-name.component.css'],
})
export class ChangeHomeDeviceNameComponent {
  newName: string = '';

  private _snackBar = inject(MatSnackBar);

  constructor(
    private homeDeviceService: HomeDeviceService,
    private dialogRef: MatDialogRef<ChangeHomeDeviceNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { homeDevice: HomeDevice }
  ) {}

  confirm(): void {
    const updateDeviceName = new UpdateHomeDeviceName(
      this.data.homeDevice.hardwareId,
      this.newName
    );

    this.homeDeviceService.updateHomeDeviceName(updateDeviceName).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      (error) =>
        this._snackBar.open(error.error.errorMessage, 'Close', {
          duration: 1000,
        })
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
