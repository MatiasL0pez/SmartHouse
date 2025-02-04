export class ListHomesData {
  page: number;
  pageSize: number;
  filter?: string;

  constructor(page: number, pageSize: number, filter?: string) {
    this.page = page;
    this.pageSize = pageSize;
    this.filter = filter;
  }
}
