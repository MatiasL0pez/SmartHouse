import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeDeviceService } from '../../../services/homedevice.service';
import { HomeDevice } from '../../../models/HomeDevice';
import { RoomService } from '../../../services/room.service';
import { ListHomeRooms } from '../../../models/ListHomeRooms';
import { HomeUserService } from '../../../services/homeuser.service';
import { AddRoomAsMemberComponent } from './add-room-as-member/add-room-as-member.component';
import { AddHomedeviceRoomAsMemberComponent } from './add-homedevice-room-as-member/add-homedevice-room-as-member.component';
import { AddHomeDeviceAsMemberComponent } from './add-homedevice-as-member/add-homedevice-as-member.component';
import { ChangeHomeDeviceNameAsMemberComponent } from './change-homedevice-name-as-member/change-homedevice-name-as-member.component';
import { UpdateHomeAliasAsMemberComponent } from './update-home-alias-as-member/update-home-alias-as-member.component';

@Component({
  selector: 'app-homesasmember',
  templateUrl: './homesasmember.component.html',
  styleUrls: ['./homesasmember.component.css'],
})
export class HomesAsMemberComponent implements OnInit {
  homes: any[] = [];
  selectedHome: any | undefined;
  showHomeList: boolean = false;
  loading: boolean = false;

  displayedDevicesColumns: string[] = [
    'name',
    'deviceName',
    'model',
    'mainPhoto',
    'isOnline',
    'roomName',
    'status',
  ];
  devicesTableData: HomeDevice[] = [];
  isDevicesDataLoaded: boolean = false;

  displayedRoomsColumns: string[] = [
    'roomName',
    'homeDevicesNames',
    'addDevice',
  ];
  roomsTableData: ListHomeRooms[] = [];
  isRoomsDataLoaded: boolean = false;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private homeUserService: HomeUserService,
    private homeDeviceService: HomeDeviceService,
    private roomService: RoomService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadHomes();
  }

  showLoading(): void {
    this.loading = true;
  }

  hideLoading(): void {
    this.loading = false;
  }

  loadHomes(): void {
    this.showLoading();
    this.homeUserService.getHomesWhereUserIsAMember().subscribe((data) => {
      this.homes = data;
      if (this.homes && this.homes.length > 0) {
        this.selectedHome = this.homes[0];

        this.loadHomeDevices(this.selectedHome.id);
        this.loadHomeRooms(this.selectedHome.id);
      }
    });
    this.hideLoading();
  }

  toggleHomeList(): void {
    this.showHomeList = !this.showHomeList;
  }

  selectHome(home: any): void {
    this.selectedHome = home;
    this.showHomeList = false;
    this.loadHomeDevices(home.id);
    this.loadHomeRooms(home.id);
  }

  private loadHomeDevices(homeId: number): void {
    this.isDevicesDataLoaded = false;
    this.homeDeviceService.listHomeDevices(homeId).subscribe(
      (data) => {
        console.log(data);
        this.devicesTableData = data;
        this.isDevicesDataLoaded = true;
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

  private loadHomeRooms(homeId: number): void {
    this.isRoomsDataLoaded = false;
    this.roomService.getHomeRooms(homeId).subscribe(
      (data) => {
        this.roomsTableData = data;
        this.isRoomsDataLoaded = true;
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

  openAddDeviceDialog(): void {
    const dialogRef = this.dialog.open(AddHomeDeviceAsMemberComponent, {
      data: {
        homeId: this.selectedHome?.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open('Device added successfully!', 'Close', {
          duration: 2000,
        });
        this.loadHomeDevices(this.selectedHome?.id);
      }
    });
  }

  openAddRoomDialog(): void {
    const dialogRef = this.dialog.open(AddRoomAsMemberComponent, {
      data: { homeId: this.selectedHome?.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHomeRooms(this.selectedHome?.id);
      }
    });
  }

  openAddHomeDeviceToRoomDialog(roomId: number): void {
    const dialogRef = this.dialog.open(AddHomedeviceRoomAsMemberComponent, {
      data: {
        roomId: roomId,
        homeId: this.selectedHome?.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHomeRooms(this.selectedHome?.id);
        this.loadHomeDevices(this.selectedHome?.id);
      }
    });
  }

  changeName(homeDevice: HomeDevice): void {
    const dialogRef = this.dialog.open(ChangeHomeDeviceNameAsMemberComponent, {
      width: '400px',
      data: { homeDevice },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHomeDevices(this.selectedHome?.id);
        this._snackBar.open('Device name updated successfully!', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  toggleDeviceStatus(homeDevice: HomeDevice): void {
    switch (homeDevice.status) {
      case 'On':
        this.turnDeviceOff(homeDevice);
        break;
      case 'Off':
        this.turnDeviceOn(homeDevice);
        break;
      case 'Open':
        this.closeDevice(homeDevice);
        break;
      case 'Closed':
        this.openDevice(homeDevice);
        break;
      default:
        this._snackBar.open('No action available for this status', 'Close', {
          duration: 2000,
        });
    }
  }

  private turnDeviceOn(homeDevice: HomeDevice): void {
    this.homeDeviceService.toggleDeviceOn(homeDevice.hardwareId).subscribe({
      next: () => {
        this.loadHomeDevices(this.selectedHome?.id);
        this._snackBar.open('Light turned on', 'Close', { duration: 2000 });
      },
      error: (error: HttpErrorResponse) => {
        this._snackBar.open('Failed to turn on the light', 'Close', {
          duration: 2000,
        });
      },
    });
  }

  private turnDeviceOff(homeDevice: HomeDevice): void {
    this.homeDeviceService.toggleDeviceOff(homeDevice.hardwareId).subscribe({
      next: () => {
        this.loadHomeDevices(this.selectedHome?.id);
        this._snackBar.open('Light turned off', 'Close', { duration: 2000 });
      },
      error: (error: HttpErrorResponse) => {
        this._snackBar.open('Failed to turn off the light', 'Close', {
          duration: 2000,
        });
      },
    });
  }

  private openDevice(homeDevice: HomeDevice): void {
    this.homeDeviceService.toggleDeviceOpen(homeDevice.hardwareId).subscribe({
      next: () => {
        this.loadHomeDevices(this.selectedHome?.id);
        this._snackBar.open('Sensor opened', 'Close', { duration: 2000 });
      },
      error: (error: HttpErrorResponse) => {
        this._snackBar.open('Failed to open the sensor', 'Close', {
          duration: 2000,
        });
      },
    });
  }

  private closeDevice(homeDevice: HomeDevice): void {
    this.homeDeviceService.toggleDeviceClose(homeDevice.hardwareId).subscribe({
      next: () => {
        this.loadHomeDevices(this.selectedHome?.id);
        this._snackBar.open('Sensor closed', 'Close', { duration: 2000 });
      },
      error: (error: HttpErrorResponse) => {
        this._snackBar.open('Failed to close the sensor', 'Close', {
          duration: 2000,
        });
      },
    });
  }

  toggleDeviceOnlineStatus(homeDevice: HomeDevice): void {
    const toggleAction = homeDevice.isOnline
      ? this.homeDeviceService.toggleDeviceOffline(homeDevice.hardwareId)
      : this.homeDeviceService.toggleDeviceOnline(homeDevice.hardwareId);

    toggleAction.subscribe({
      next: (response) => {
        this._snackBar.open(response.notificationEvent, 'Close', {
          duration: 2000,
        });
        this.loadHomeDevices(this.selectedHome?.id);
      },
      error: () => {
        const actionText = homeDevice.isOnline ? 'offline' : 'online';
        this._snackBar.open(`Failed to set device ${actionText}`, 'Close', {
          duration: 2000,
        });
      },
    });
  }

  openUpdateAliasDialog(homeId: number): void {
    const dialogRef = this.dialog.open(UpdateHomeAliasAsMemberComponent, {
      data: { homeId: homeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open('Alias updated successfully', 'Close', {
          duration: 2000,
        });
        this.loadHomes();
      }
    });
  }
}