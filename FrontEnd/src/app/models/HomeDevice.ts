export class HomeDevice {
  hardwareId: string;
  deviceName: string;
  model: string;
  name: string;
  mainPhoto: string;
  isOnline: boolean;
  roomId: number;
  roomName: string;
  status: string;

  constructor(data: any) {
    this.hardwareId = data.hardwareId;
    this.deviceName = data.deviceName;
    this.model = data.model;
    this.name = data.name;
    this.mainPhoto = data.mainPhoto;
    this.isOnline = data.isOnline;
    this.roomId = data.roomId;
    this.roomName = data.roomName;
    this.status = data.status;
  }
}
