import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalResults: number = 0;
  @Input() resultsPerPage: number = 0;
  @Input() showResultsInfo: boolean = true;

  @Output() pageChange = new EventEmitter<number>();

  nextPage() {
    if(this.currentPage < this.totalPages){
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  disablePrevious(): boolean {
    return this.currentPage === 1;
  }

  disableNext(): boolean {
    return this.currentPage === this.totalPages;
  }

  getResultsInfo(): string {
    const startResult = (this.currentPage - 1) * this.resultsPerPage + 1;
    const endResult = Math.min(this.currentPage * this.resultsPerPage, this.totalResults);
    return `Showing ${startResult} - ${endResult} from ${this.totalResults} results`;
  }
}