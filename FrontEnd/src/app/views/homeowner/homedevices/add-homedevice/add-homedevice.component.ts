import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeDeviceService } from '../../../../services/homedevice.service';
import { DeviceService } from '../../../../services/devices/device.service';
import { Device } from '../../../../models/Device';
import { ListDevicesData } from '../../../../models/ListDevicesData';

@Component({
  selector: 'app-add-homedevice',
  templateUrl: './add-homedevice.component.html',
  styleUrls: ['./add-homedevice.component.css'],
})
export class AddHomeDeviceComponent implements OnInit {
  devices: Device[] = [];
  selectedDeviceId: number | null = null;
  deviceName: string = '';
  displayedColumns: string[] = [
    'name',
    'companyName',
    'model',
    'mainPhoto',
    'select',
  ];

  currentPage: number = 1;
  totalPages: number = 10;
  totalResults: number = 100;
  resultsPerPage: number = 10;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private homeDeviceService: HomeDeviceService,
    private deviceService: DeviceService,
    private dialogRef: MatDialogRef<AddHomeDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { homeId: number }
  ) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    const input: ListDevicesData = {
      page: this.currentPage,
      pageSize: this.resultsPerPage,
    };

    this.deviceService.listDevices(input).subscribe(
      (data) => {
        this.devices = data.results;
        this.totalResults = data.total;
        this.totalPages = Math.ceil(this.totalResults / this.resultsPerPage);
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', {
          duration: 1000,
        });
      }
    );
  }

  selectDevice(deviceId: number): void {
    this.selectedDeviceId = deviceId;
  }

  addDevice(): void {
    if (this.selectedDeviceId && this.deviceName) {
      const newDevice = {
        DeviceId: this.selectedDeviceId,
        Name: this.deviceName,
        HomeId: this.data.homeId,
      };

      console.log(this.data.homeId);

      this.homeDeviceService.createHomeDevice(newDevice).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          this._snackBar.open(error.error.errorMessage, 'Close', {
            duration: 1000,
          });
        }
      );
    } else {
      this._snackBar.open('Not valid inputs', 'Close', {
        duration: 1000,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadDevices();
  }
}
