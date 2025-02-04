export class HomeData {
  alias: string;
  street: string;
  number: number;
  latitude: number;
  longitude: number;
  maxMembers: number;

  constructor(
    alias: string,
    street: string,
    number: number,
    latitude: number,
    longitude: number,
    maxMembers: number
  ) {
    this.alias = alias;
    this.street = street;
    this.number = number;
    this.latitude = latitude;
    this.longitude = longitude;
    this.maxMembers = maxMembers;
  }
}
