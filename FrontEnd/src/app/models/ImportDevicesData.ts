export class ImportDevicesData {
    importerType: string;
    fileName: string;
  
    constructor(importerType: string = '', fileName: string = '') {
      this.importerType = importerType;
      this.fileName = fileName;
    }
  }