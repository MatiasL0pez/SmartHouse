export class ListCompanies {
    companyName: string;
    emailOwner: string;
    fullNameOwner: string;
    companyRut: string;
  
    constructor(company: any) {
      this.companyName = company.name;
      this.companyRut = company.rut;
      this.emailOwner = company.owner.email;
      this.fullNameOwner = `${company.owner.name} ${company.owner.surname}`;
    }
  }
  