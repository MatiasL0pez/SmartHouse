export class ListCompanyDevicesData {
    page: number;
    pageSize: number;
    rut?: string;
  
    constructor(
      page: number,
      pageSize: number,
      rut?: string,
    ) {
      this.page = page;
      this.pageSize = pageSize;
      this.rut = rut;
    }
  }