export class CreateMovementSensorData {
    name: string;
    modelNumber: string;
    mainPhoto: string;
    description: string;
    companyId: number;
    photos: string[];
  
    constructor(
      name: string,
      modelNumber: string,
      mainPhoto: string,
      description: string,
      companyId: number,
      photos: string[]
    ) {
      this.name = name;
      this.modelNumber = modelNumber;
      this.mainPhoto = mainPhoto;
      this.description = description;
      this.companyId = companyId;
      this.photos = photos;
    }
  }
  