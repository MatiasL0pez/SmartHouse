import { Component, inject } from '@angular/core';
import { ListCompanies } from '../../../models/ListCompanies';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../../../services/company.service';
import { ListCompaniesData } from '../../../models/ListCompaniesData';

@Component({
  selector: 'app-companys',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  displayedColumns: string[] = ['companyName', 'emailOwner', 'fullNameOwner', 'companyRut'];
  tableData: ListCompanies[] = [];
  isDataLoaded: boolean = false;

  currentPage: number = 1;
  totalPages: number = 10;
  totalResults: number = 100;
  resultsPerPage: number = 10;

  filterText: string = '';

  private _snackBar = inject(MatSnackBar);

  loading: boolean = false;

  constructor(
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.showLoading();
    const input = new ListCompaniesData(this.currentPage, this.resultsPerPage, this.filterText);
    this.companyService.getCompanies(input).subscribe(
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
    this.loadCompanies();
  }

  onFilterChange(filterText: string): void {
    this.filterText = filterText;
    this.loadCompanies();
  }

  showLoading(): void {
    this.loading = true;
  }

  hideLoading(): void {
    this.loading = false;
  }
}
