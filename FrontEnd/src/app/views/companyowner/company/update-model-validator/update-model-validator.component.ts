import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../../../../services/devices/device.service';
import { UpdatedCompanyValidatorData } from '../../../../models/UpdatedCompanyValidatorData';

@Component({
  selector: 'app-update-model-validator',
  templateUrl: './update-model-validator.component.html',
  styleUrls: ['./update-model-validator.component.css']
})
export class UpdateModelValidatorComponent implements OnInit {
  modelValidators: string[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private deviceService: DeviceService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateModelValidatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { companyId: number }
  ) {
    this.form = this.fb.group({
      modelValidator: ['']
    });
  }

  ngOnInit(): void {
    this.loadModelValidators();
  }

  submit(): void {
    const selectedModelValidator = this.form.get('modelValidator')?.value || '';

    const input = new UpdatedCompanyValidatorData(
      this.data.companyId,
      selectedModelValidator
    );

    this.companyService.updateModelValidator(input).subscribe(
      () => {
        this._snackBar.open('Model validator updated successfully!', 'Close', {
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
  }

  loadModelValidators(): void {
    this.deviceService.getModelsValidators().subscribe((data) => {
      this.modelValidators = data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
