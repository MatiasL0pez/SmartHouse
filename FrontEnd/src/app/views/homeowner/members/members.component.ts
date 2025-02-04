import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from '../../../services/home.service';
import { HomeUserService } from '../../../services/homeuser.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ListMembers } from '../../../models/ListMembers';
import { ChangePermissions } from '../../../models/ChangePermissions';
import { CreateHomeUserComponent } from './add-member/add-member.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  homes: any[] = [];
  selectedHome: any | undefined;
  showHomeList: boolean = false;
  loading: boolean = false;

  displayedColumns: string[] = [
    'fullName',
    'email',
    'photo',
    'canModifyNameDevices',
    'canAssociateDevices',
    'canListDevices',
    'notify',
  ];
  home: any | undefined;
  tableData: ListMembers[] = [];
  isDataLoaded: boolean = false;
  homeId: number | undefined;

  private _snackBar = inject(MatSnackBar);

  constructor(
    private homeService: HomeService,
    private homeUserService: HomeUserService,
    private dialog: MatDialog,
    private route: ActivatedRoute
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
    this.homeService.getHomes().subscribe((data) => {
      this.homes = data;
      if (this.homes && this.homes.length > 0) {
        this.selectedHome = this.homes[0];
        this.loadHome(this.selectedHome.id);
      }
    });
    this.hideLoading();
  }

  private loadHome(homeId: number): void {
    this.isDataLoaded = false;
    this.homeService.getHome(homeId).subscribe((data) => {
      this.home = data;
      this.loadMembers(this.home.id);
    });
  }

  toggleHomeList(): void {
    this.showHomeList = !this.showHomeList;
  }

  selectHome(home: any): void {
    this.selectedHome = home;
    this.showHomeList = false;
    this.loadHome(home.id);
  }

  private loadMembers(homeId: number): void {
    this.homeService.listHomeMembers(homeId).subscribe(
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

  openCreateHomeUserDialog(): void {
    const dialogRef = this.dialog.open(CreateHomeUserComponent, {
      data: { homeId: this.home.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMembers(this.home.id);
      }
    });
  }

  updatePermission(
    email: string,
    isChecked: boolean,
    permissionType:
      | 'notifyUpdate'
      | 'canAssociateDevicesUpdate'
      | 'canListDevicesUpdate'
      | 'canModifyNameDevices'
  ): void {
    const currentMember = this.tableData.find(
      (member) => member.email === email
    );
    if (!currentMember) return;

    const permissions = new ChangePermissions(
      this.home.id,
      email,
      permissionType === 'notifyUpdate'
        ? isChecked
        : currentMember.notify ?? false,
      permissionType === 'canAssociateDevicesUpdate'
        ? isChecked
        : currentMember.canAssociateDevices ?? false,
      permissionType === 'canListDevicesUpdate'
        ? isChecked
        : currentMember.canListDevices ?? false,
      permissionType === 'canModifyNameDevices'
        ? isChecked
        : currentMember.canModifyNameDevices ?? false
    );

    this.homeUserService.updatePermissions(this.home.id, permissions).subscribe(
      () => this.loadMembers(this.home.id),
      (error) => {
        this.loadMembers(this.home.id);
        this._snackBar.open(error.error.errorMessage, 'Close', {
          duration: 1000,
        });
      }
    );
  }
}