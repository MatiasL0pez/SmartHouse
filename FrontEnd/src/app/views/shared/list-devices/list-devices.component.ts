import { Component, inject, OnInit } from '@angular/core';
import { Device } from '../../../models/Device';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../../../services/devices/device.service';
import { ListDevicesData } from '../../../models/ListDevicesData';
import { ListSupportedDevices } from '../../../models/ListSupportedDevices';
import { UpdateModelValidatorComponent } from '../../companyowner/company/update-model-validator/update-model-validator.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewPhotosDialogComponent } from '../../../components/view-photos-dialog/view-photos-dialog.component';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.css']
})
export class ListDevicesComponent  implements OnInit{ 
  displayedColumnsSupportedDevices: string[] = ['deviceType'];
  tableDataSupportedDevices: ListSupportedDevices[] = [];
  isDataLoadedSupportedDevices: boolean = false;
  totalRecordsSupportedDevices: number = 10;

  displayedColumnsAllDevices: string[] = ['name', 'model', 'companyName', 'mainPhoto', 'photos'];
  tableDataAllDevices: Device[] = [];
  isDataLoadedAllDevices: boolean = false;

  currentPage: number = 1;
  totalPages: number = 10;
  totalResults: number = 100;
  resultsPerPage: number = 10;

  filterText: string = '';

  private _snackBar = inject(MatSnackBar);

  loading: boolean = false;

  constructor(
    private deviceService: DeviceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDevices();
    this.loadSupportedDevices();
  }

  private loadDevices(): void {
    this.showLoading();
    const deviceFilter = new ListDevicesData(this.currentPage, this.resultsPerPage, this.filterText);
    this.deviceService.listDevices(deviceFilter).subscribe(
      (data) => {
        this.tableDataAllDevices = data.results;
        this.isDataLoadedAllDevices = true;
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

  private loadSupportedDevices(): void {
    this.showLoading();
    this.deviceService.listSupportedDevices().subscribe(
      (data) => {
        this.tableDataSupportedDevices = data;
        this.isDataLoadedSupportedDevices = true;
        this.totalRecordsSupportedDevices = data.length;
        this.hideLoading();
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', { duration: 1000 });
        this.hideLoading();
      }
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadDevices();
  }

  onFilterChange(filterText: string): void {
    this.filterText = filterText;
    this.loadDevices();
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
}

