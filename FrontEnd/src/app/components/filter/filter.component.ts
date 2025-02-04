import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filterText: string = '';
  @Output() filter = new EventEmitter<string>();  

  applyFilter() {
    this.filter.emit(this.filterText);
  }

  clearFilter() {
    this.filterText = '';
    this.applyFilter();
  }
}
