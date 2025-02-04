import { Component, inject, Inject, OnInit } from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateRoomData } from '../../../../models/CreateRoomData';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room-as-member',
  templateUrl: './add-room-as-member.component.html',
  styleUrls: ['./add-room-as-member.component.css'],
})
export class AddRoomAsMemberComponent implements OnInit {
  form!: FormGroup;
  homeId: number;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<AddRoomAsMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { homeId: number }
  ) {
    this.homeId = data.homeId;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  addRoom() {
    if (this.form.valid) {
      const roomData = new CreateRoomData(this.form.value.name, this.homeId);

      this.roomService.createRoom(roomData).subscribe(
        (data) => {
          this._snackBar.open('Room created successfully!', 'Close', {
            duration: 1000,
          });
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
