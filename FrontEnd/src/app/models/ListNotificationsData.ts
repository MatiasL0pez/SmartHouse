export class ListNotificationsData {
    deviceType?: string;
    dateCreated?: string;
    wasRead?: boolean;

    constructor(deviceType: string, dateCreated: string, wasRead: boolean) {
        this.deviceType = deviceType;
        this.dateCreated = dateCreated;
        this.wasRead = wasRead;
    }
}