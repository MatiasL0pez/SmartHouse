import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeDevice } from '../../../../models/HomeDevice';
import { HomeDeviceService } from '../../../../services/homedevice.service';
import { AssociateHomeDeviceToRoomData } from '../../../../models/AssociateHomeDeviceToRoomData';

@Component({
  selector: 'app-add-homedevice-room-as-member',
  templateUrl: './add-homedevice-room-as-member.component.html',
  styleUrls: ['./add-homedevice-room-as-member.component.css'],
})
export class AddHomedeviceRoomAsMemberComponent {
  form!: FormGroup;
  roomId: number;
  homeId: number;

  homeDevices: HomeDevice[] = [];

  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private homeDeviceService: HomeDeviceService,
    private dialogRef: MatDialogRef<AddHomedeviceRoomAsMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: number; homeId: number }
  ) {
    this.roomId = data.roomId;
    this.homeId = data.homeId;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      homeDevice: ['', Validators.required],
    });
    this.loadHomeDevices(this.homeId);
  }

  private loadHomeDevices(homeId: number): void {
    this.homeDeviceService.listHomeDevices(homeId).subscribe(
      (data) => {
        this.homeDevices = data;
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', {
          duration: 1000,
        });
      }
    );
  }

  addHomeDeviceRoom() {
    if (this.form.valid) {
      const input = new AssociateHomeDeviceToRoomData(
        this.form.value.homeDevice,
        this.roomId
      );

      this.homeDeviceService.associateHomeDeviceToRoom(input).subscribe(
        (data) => {
          this._snackBar.open(
            'Home device associated to room successfully!',
            'Close',
            {
              duration: 1000,
            }
          );
          this.dialogRef.close(true);
        },
        (error) => {
          this._snackBar.open(error.error.errorMessage, 'Close', {
            duration: 1000,
          });
        }
      );
    } else {
      this._snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 1000,
      });
    }
  }
}
