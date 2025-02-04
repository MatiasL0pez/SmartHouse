import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from '../../../../services/home.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-home-alias',
  templateUrl: './update-home-alias.component.html',
  styleUrls: ['./update-home-alias.component.css'],
})
export class UpdateHomeAliasComponent implements OnInit {
  form!: FormGroup;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private dialogRef: MatDialogRef<UpdateHomeAliasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { homeId: number }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      alias: ['', Validators.required],
    });
  }

  updateAlias(): void {
    if (this.form.valid) {
      const updateHomeAliasData = {
        alias: this.form.value.alias,
        homeId: this.data.homeId,
      };

      this.homeService
        .updateAlias(this.data.homeId, updateHomeAliasData)
        .subscribe(
          (data) => {
            this._snackBar.open('Home alias updated!', 'Close', {
              duration: 1000,
            });
            this.dialogRef.close(this.form.value.alias);
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
