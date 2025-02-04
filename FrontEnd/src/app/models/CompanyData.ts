export class CompanyData {
    name: string;
    rut: string;
    logoUrl: string;
    modelValidator: string;
  
    constructor(name: string, rut: string, logoUrl: string, modelValidator: string) {
      this.name = name;
      this.rut = rut;
      this.logoUrl = logoUrl;
      this.modelValidator = modelValidator;
    }
  }
  