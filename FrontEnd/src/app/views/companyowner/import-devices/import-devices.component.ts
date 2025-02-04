import { Component, inject } from '@angular/core';
import { ImportService } from '../../../services/import.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportDevicesData } from '../../../models/ImportDevicesData';

@Component({
  selector: 'app-import-devices',
  templateUrl: './import-devices.component.html',
  styleUrls: ['./import-devices.component.css']
})
export class ImportDevicesComponent {
  importerTypes:string[] = [];
  importing: boolean = false;
  loading: boolean = false;

  private _snackBar = inject(MatSnackBar);

  form!: FormGroup;

  constructor(private fb: FormBuilder, private importService: ImportService) { }

  ngOnInit() {
    this.form = this.fb.group({
      fileToUpload: ['', Validators.required],
      selectedImporterType: ['', Validators.required]
    });

    this.loadImporterTypes();
  }

  loadImporterTypes() {
    this.showLoading();
    this.importService.getImporterTypes().subscribe(
      (data) => {
        this.importerTypes = data;
        this.hideLoading();
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', {
          duration: 1000,
        });
        this.hideLoading();
      }
    );
  }

  showLoading(): void {
    this.loading = true;
  }

  hideLoading(): void {
    this.loading = false;
  }

  import() {
    if (this.form.invalid) return;

    const input: ImportDevicesData = {
      fileName: this.form.value.fileToUpload,
      importerType: this.form.value.selectedImporterType
    };

    this.showLoading();
    this.importService.importDevices(input).subscribe(
      (response) => {
        this._snackBar.open('Import successful!', 'Close', {
          duration: 3000,
        });
        this.form.reset();
        this.hideLoading();
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage || 'Import failed', 'Close', {
          duration: 3000,
        });
        this.hideLoading();
      }
    );
  }
}