import { Component, inject } from '@angular/core';
import { ListAccountsData } from '../../../models/ListAccountsData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { ListAccounts } from '../../../models/ListAccounts';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfimationDialogComponent } from '../../../components/confimation-dialog/confimation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  displayedColumns: string[] = ['name', 'surname', 'completeName', 'roles', 'creationDate', 'actions'];
  tableData: ListAccounts[] = [];
  isDataLoaded: boolean = false;

  currentPage: number = 1;
  totalPages: number = 10;
  totalResults: number = 100;
  resultsPerPage: number = 10;

  filterText: string = '';

  private _snackBar = inject(MatSnackBar);

  loading: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.showLoading();
    const input = new ListAccountsData(this.currentPage, this.resultsPerPage, this.filterText);
    this.userService.listAccounts(input).subscribe(
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

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadAccounts();
  }

  onFilterChange(filterText: string): void {
    this.filterText = filterText;
    this.loadAccounts();
  }

  onDelete(email: any): void {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this administrator?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteAdmin(email).subscribe(
          (data) => {
            this.loadAccounts();
            this._snackBar.open('Administrator deleted', 'Close', { duration: 1000 });
            this.hideLoading();
          },
          (error) => {
            this._snackBar.open(error.error.errorMessage, 'Close', { duration: 1000 });
            this.hideLoading();
          }
        );
      }
    });
  }

  isAdmin(roles: string): boolean {
    return roles.includes('Administrator');
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(RegisterAdminComponent, {
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.loadAccounts();
      }
    });
  }
  
  showLoading(): void {
    this.loading = true;
  }

  hideLoading(): void {
    this.loading = false;
  }
}
