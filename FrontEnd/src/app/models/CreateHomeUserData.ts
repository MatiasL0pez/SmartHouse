export class CreateHomeUserData {
  email: string;
  homeId: Number;

  constructor(email: string, homeId: Number) {
    this.email = email;
    this.homeId = homeId;
  }
}
