export class AssociateHomeDeviceToRoomData
{
    hardwareId: string | undefined;
    roomId: number | undefined;

    constructor(hardwareId: string, roomId: number) {
        this.hardwareId = hardwareId;
        this.roomId = roomId;
    }
}