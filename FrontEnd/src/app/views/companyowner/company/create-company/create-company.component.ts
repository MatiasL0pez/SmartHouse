import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../../../../services/company.service';
import { Router } from '@angular/router';
import { CompanyData } from '../../../../models/CompanyData';
import { DeviceService } from '../../../../services/devices/device.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;
  fileName: string = '';

  private _snackBar = inject(MatSnackBar);
  
  modelValidators: string[] = [];

  constructor(
    private fb: FormBuilder, 
    private companyService: CompanyService, 
    private router : Router, 
    private dialogRef: MatDialogRef<CreateCompanyComponent>,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      rut: ['', Validators.required],
      modelValidator: ['', Validators.required],
      profilePhoto: ['', Validators.required],
    });
    this.loadModelValidators();
  }

  associate(): void {
    if (this.form.valid) {
      const companyData = new CompanyData(
        this.form.value.name,
        this.form.value.rut,
        this.form.value.profilePhoto,
        this.form.value.modelValidator
      );

      this.companyService.createCompany(companyData).subscribe(
        (data) => {
          this._snackBar.open('Company associated successfully!', 'Close', {
            duration: 1000,
          });
          this.closeAndRedirect();
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

  loadModelValidators(): void {
    this.deviceService.getModelsValidators().subscribe((data) => {
      this.modelValidators = data;
    });
  }

  private closeAndRedirect(): void {
    this.dialogRef.close(true);
    this.router.navigate(['/companyowner/company']);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
