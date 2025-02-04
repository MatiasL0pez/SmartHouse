export class CreateCameraData {
    name: string;
    modelNumber: string;
    mainPhoto: string;
    description: string;
    companyId: number;
    photos: string[];
    indoorUse: boolean;
    outdoorUse: boolean;
    supportsMotionDetection: boolean;
    supportsPersonDetection: boolean;
  
    constructor(
      name: string,
      modelNumber: string,
      mainPhoto: string,
      description: string,
      companyId: number,
      photos: string[],
      indoorUse: boolean,
      outdoorUse: boolean,
      supportsMotionDetection: boolean,
      supportsPersonDetection: boolean
    ) {
      this.name = name;
      this.modelNumber = modelNumber;
      this.mainPhoto = mainPhoto;
      this.description = description;
      this.companyId = companyId;
      this.photos = photos;
      this.indoorUse = indoorUse;
      this.outdoorUse = outdoorUse;
      this.supportsMotionDetection = supportsMotionDetection;
      this.supportsPersonDetection = supportsPersonDetection;
    }
  }
  