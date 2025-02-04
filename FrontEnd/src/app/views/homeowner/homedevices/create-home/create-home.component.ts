import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from '../../../../services/home.service';
import { HomeData } from '../../../../models/HomeData';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-home',
  templateUrl: './create-home.component.html',
  styleUrls: ['./create-home.component.css'],
})
export class CreateHomeComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;
  fileName: string = '';

  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private dialogRef: MatDialogRef<CreateHomeComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      alias: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      maxMembers: ['', Validators.required],
    });
  }

  associate(): void {
    if (this.form.valid) {
      const homeData = new HomeData(
        this.form.value.alias,
        this.form.value.street,
        this.form.value.number,
        this.form.value.latitude,
        this.form.value.longitude,
        this.form.value.maxMembers
      );

      this.homeService.createHome(homeData).subscribe(
        () => {
          this._snackBar.open('Home associated successfully!', 'Close', {
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
