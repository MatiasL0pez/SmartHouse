export class UpdateHomeDeviceName {
  hardwareId: string;
  newName: string;

  constructor(hardwareId: string, newName: string) {
    this.hardwareId = hardwareId;
    this.newName = newName;
  }
}
