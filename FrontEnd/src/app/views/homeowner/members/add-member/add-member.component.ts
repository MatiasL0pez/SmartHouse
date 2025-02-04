import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeUserService } from '../../../../services/homeuser.service';
import { CreateHomeUserData } from '../../../../models/CreateHomeUserData';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class CreateHomeUserComponent implements OnInit {
  form!: FormGroup;
  homeId!: number;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private homeUserService: HomeUserService,
    public dialogRef: MatDialogRef<CreateHomeUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { homeId: number }
  ) {}

  ngOnInit(): void {
    this.homeId = this.data.homeId;
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  addHomeUser(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      const homeUserData = new CreateHomeUserData(
        formValues.email,
        this.homeId
      );

      this.homeUserService.createHomeUser(homeUserData).subscribe({
        next: () => {
          this.showSnackBar('Member added successfully');
          this.dialogRef.close(true);
        },
        error: (error) => this.showSnackBar(error.error.errorMessage),
      });
    } else {
      this.showSnackBar('Please complete all required fields');
    }
  }

  private showSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
