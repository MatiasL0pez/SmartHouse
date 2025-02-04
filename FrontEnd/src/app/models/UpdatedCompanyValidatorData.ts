export class UpdatedCompanyValidatorData {
    companyId: number;
    modelValidator: string;
  
    constructor(companyId: number, modelValidator: string) {
      this.companyId = companyId;
      this.modelValidator = modelValidator;
    }
  }
  