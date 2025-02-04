import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../services/notification.service';
import { ListNotificationsData } from '../../../models/ListNotificationsData';
import { Notification } from '../../../models/Notification';
import { DeviceService } from '../../../services/devices/device.service';
import { ListSupportedDevices } from '../../../models/ListSupportedDevices';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  filterDateCreation: Date | undefined;
  filterDeviceType: string | undefined;
  filterWasRead: boolean | undefined;
  filterWasUnread: boolean | undefined;
  loading: boolean = false;

  displayedColumns: string[] = [
    'homeAlias',
    'deviceName',
    'deviceType',
    'event',
    'date',
    'wasRead',
    'actions',
  ];

  tableData: Notification[] = [];
  isDataLoaded: boolean = false;

  supportedDevices: ListSupportedDevices[] = [];

  private _snackBar = inject(MatSnackBar);

  constructor(
    private notificationService: NotificationService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.loadSupportedDevices();
    this.loadNotifications();
  }

  showLoading(): void {
    this.loading = true;
  }

  hideLoading(): void {
    this.loading = false;
  }

  loadSupportedDevices() {
    this.showLoading();
    this.deviceService.listSupportedDevices().subscribe(
      (data) => {
        this.supportedDevices = data;
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

  loadNotifications() {
    const input: ListNotificationsData = {
      dateCreated: this.filterDateCreation?.toDateString(),
      deviceType: this.filterDeviceType,
      wasRead: this.filterWasRead,
    };

    this.showLoading();
    this.notificationService.getUserNotifications(input).subscribe(
      (data) => {
        this.tableData = data;
        this.isDataLoaded = true;
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

  markAsRead(notificationId: number) {
    this.showLoading();
    this.notificationService.markAsRead(notificationId).subscribe(
      () => {
        this.loadNotifications();
      },
      (error) => {
        this._snackBar.open(error.error.errorMessage, 'Close', {
          duration: 1000,
        });
        this.hideLoading();
      }
    );
  }

  onFilterDeviceTypeChange(filterText: string): void {
    this.filterDeviceType = filterText;
    this.loadNotifications();
  }

  onFilterReadChange(type: 'read' | 'unread', isChecked: boolean): void {
    if (type === 'read') {
      this.filterWasRead = isChecked;
      if (isChecked) {
        this.filterWasUnread = false;
      }
    } else {
      this.filterWasUnread = isChecked;
      if (isChecked) {
        this.filterWasRead = false;
      }
    }
    if (!this.filterWasRead && !this.filterWasUnread) {
      this.filterWasRead = undefined;
      this.filterWasUnread = undefined;
    }
    this.loadNotifications();
  }

  onFilterDateChange(date: Date): void {
    this.filterDateCreation = date;
    this.loadNotifications();
  }

  clearFilters(): void {
    this.filterDateCreation = undefined;
    this.filterDeviceType = undefined;
    this.filterWasRead = undefined;
    this.filterWasUnread = undefined;
    this.loadNotifications();
  }
}