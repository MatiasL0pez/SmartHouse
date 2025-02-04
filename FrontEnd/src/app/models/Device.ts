export class Device {
  deviceId: number;
  name: string;
  companyName: string;
  model: string;
  mainPhoto: string;
  photos: string[];

  constructor(device: any) {
    this.deviceId = device.deviceId;
    this.name = device.name;
    this.companyName = device.companyName;
    this.model = device.model;
    this.mainPhoto = device.mainPhoto;
    this.photos = device.photos;
  }
}
