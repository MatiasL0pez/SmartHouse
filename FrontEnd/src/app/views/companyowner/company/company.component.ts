import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../../../services/company.service';
import { DeviceService } from '../../../services/devices/device.service';
import { Device } from '../../../models/Device';
import { ListDevicesData } from '../../../models/ListDevicesData';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { ListCompanyDevicesData } from '../../../models/ListCompanyDevicesData';
import { UpdateModelValidatorComponent } from './update-model-validator/update-model-validator.component';
import { ViewPhotosDialogComponent } from '../../../components/view-photos-dialog/view-photos-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  emptyTableMessage: string = 'Company has no devices associated.';
  displayedColumns: string[] = ['name', 'model', 'description', 'mainPhoto', 'photos'];

  company: any | undefined;
  tableData: Device[] = [];
  isDataLoaded: boolean = false;
  totalRecords: number = 100;
  private _snackBar = inject(MatSnackBar);

  currentPage: number = 1;
  totalPages: number = 10;
  totalResults: number = 100;
  resultsPerPage: number = 10;
  
  loading: boolean = false;

  constructor(
    private companyService: CompanyService,
    private deviceService: DeviceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCompany();
  }

  private loadCompany(): void {
    this.isDataLoaded = false;
    this.showLoading();
    this.companyService.getCompany().subscribe((data) => {
      this.company = data;
      console.log(data);
      if (!this.company) {
        this.createCompany();
        this.hideLoading();
      } else {
        this.loadDevices(this.company.rut);
        this.hideLoading();
      }
    });
  }

  private loadDevices(companyRut: string): void {
    this.showLoading();
    const deviceFilter = new ListCompanyDevicesData(this.currentPage, this.resultsPerPage, companyRut);
    this.deviceService.listCompanyDevices(deviceFilter).subscribe(
      (data) => {
        this.tableData = data.results;
        this.isDataLoaded = true;
        this.totalResults = data.total;
        this.totalPages = Math.ceil(this.totalResults / this.resultsPerPage);
        this.hideLoading();
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', { duration: 1000 });
        this.hideLoading();
      }
    );
  }

  openCreateDeviceDialog(): void {
    const dialogRef = this.dialog.open(CreateDeviceComponent, {
      maxHeight: '90vh',
      data: { companyId: this.company.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.loadDevices(this.company.rut);
      }
    });
  }
  
  createCompany(): void {
    const dialogRef = this.dialog.open(CreateCompanyComponent,
      {disableClose: true}
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.loadCompany(); 
      }
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadDevices(this.company.rut);
  }

  showLoading(): void {
    this.loading = true;
  }

  hideLoading(): void {
    this.loading = false;
  }

  openViewPhotosDialog(device: Device): void {
    const dialogRef = this.dialog.open(ViewPhotosDialogComponent, {
      data: {
        deviceName: device.name,
        photos: device.photos
      },
    });
  }

  openUpdateModelValidatorDialog(): void {
    const dialogRef = this.dialog.open(UpdateModelValidatorComponent, {
      maxWidth: '400px',
      data: { companyId: this.company.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCompany();
      }
    });
  }
}
