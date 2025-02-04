export class HomeDeviceDetails {
  hardwareId: string;
  isOnline: boolean;
  name: string;
  modelNumber: string;
  companyName: string;
  mainPhoto: string;

  constructor(data: any) {
    this.hardwareId = data.hardwareId;
    this.isOnline = data.isOnline;
    this.name = data.name;
    this.modelNumber = data.modelNumber;
    this.companyName = data.companyName;
    this.mainPhoto = data.mainPhoto;
  }
}
