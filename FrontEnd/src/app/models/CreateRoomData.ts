export class CreateRoomData {
    homeId: number | undefined;
    name: string | undefined;

    constructor(name: string, homeId: number) {
        this.name = name;
        this.homeId = homeId;
    }
  }
