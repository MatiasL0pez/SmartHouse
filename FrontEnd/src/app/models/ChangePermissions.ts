export class ChangePermissions {
  homeId: number;
  userEmail: string;
  notifyUpdate: boolean;
  canAssociateDevicesUpdate: boolean;
  canListDevicesUpdate: boolean;
  canModifyNameDevices: boolean;

  constructor(
    homeId: number,
    userEmail: string,
    notifyUpdate: boolean,
    canAssociateDevicesUpdate: boolean,
    canListDevicesUpdate: boolean,
    canModifyNameDevices: boolean
  ) {
    this.homeId = homeId;
    this.userEmail = userEmail;
    this.notifyUpdate = notifyUpdate;
    this.canAssociateDevicesUpdate = canAssociateDevicesUpdate;
    this.canListDevicesUpdate = canListDevicesUpdate;
    this.canModifyNameDevices = canModifyNameDevices;
  }
}
