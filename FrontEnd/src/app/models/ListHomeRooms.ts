export class ListHomeRooms {
    roomId: number;
    roomName: string;
    homeDevicesNames: string;
  
    constructor(roomId: number, roomName: string, homeDevicesNames: string) {
      this.roomId = roomId;
      this.roomName = roomName;
      this.homeDevicesNames = homeDevicesNames;
    }
  }
