import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CamaraService } from '../../../../services/devices/camara.service';
import { SensorService } from '../../../../services/devices/sensor.service';
import { MovmentSensorService } from '../../../../services/devices/movmentsensor.service';
import { SmartLightService } from '../../../../services/devices/smartlight.service';
import { CreateCameraData } from '../../../../models/CreateCamaraData';
import { CreateSensorData } from '../../../../models/CreateSensorData';
import { CreateSmartLightData } from '../../../../models/CreateSmartLightData';
import { CreateMovementSensorData } from '../../../../models/CreateMovmentSensorData';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})
export class CreateDeviceComponent implements OnInit {
  form!: FormGroup;
  deviceTypes: string[] = ['Camera', 'Sensor', 'Smart Light', 'Movement Sensor'];
  companyId!: number;
  
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private camaraService: CamaraService,
    private sensorService: SensorService,
    private movmentSensorService: MovmentSensorService,
    private smartLightService: SmartLightService,
    public dialogRef: MatDialogRef<CreateDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { companyId: number }
  ) {}

  ngOnInit(): void {
    this.companyId = this.data.companyId;
    this.form = this.fb.group({
      name: ['', Validators.required],
      modelNumber: ['', Validators.required],
      description: ['', Validators.required],
      deviceType: ['', Validators.required],
      mainPhoto: ['', Validators.required],
      photos: this.fb.array([])
    });
  }

  get photos(): FormArray {
    return this.form.get('photos') as FormArray;
  }

  get photoControls(): FormControl[] {
    return this.photos.controls as FormControl[];
  }

  addPhotoField(): void {
    this.photos.push(this.fb.control(''));
  }
  
  onDeviceTypeChange(type: string): void {
    if (type === 'Camera') {
      this.form.addControl('indoorUse', this.fb.control(false));
      this.form.addControl('outdoorUse', this.fb.control(false));
      this.form.addControl('supportsMotionDetection', this.fb.control(false));
      this.form.addControl('supportsPersonDetection', this.fb.control(false));
    } else {
      this.form.removeControl('indoorUse');
      this.form.removeControl('outdoorUse');
      this.form.removeControl('supportsMotionDetection');
      this.form.removeControl('supportsPersonDetection');
    }
  }

  addDevice(): void {
    if (this.form.valid) {
      const deviceData = this.form.value;

      switch (deviceData.deviceType) {
        case 'Camera':
          this.createCamera(deviceData);
          break;
        case 'Sensor':
          this.createSensor(deviceData);
          break;
        case 'Smart Light':
          this.createSmartLight(deviceData);
          break;
        case 'Movement Sensor':
          this.createMovementSensor(deviceData);
          break;
        default:
          this.showSnackBar('Invalid device type');
      }
    } else {
      this.showSnackBar('Please complete all required fields');
    }
  }

  private createCamera(deviceData: any): void {
    const cameraData = new CreateCameraData(
      deviceData.name,
      deviceData.modelNumber,
      deviceData.mainPhoto,
      deviceData.description,
      this.companyId,
      deviceData.photos.length ? [deviceData.mainPhoto, ...deviceData.photos] : [deviceData.mainPhoto],
      deviceData.indoorUse,
      deviceData.outdoorUse,
      deviceData.supportsMotionDetection,
      deviceData.supportsPersonDetection
    );

    this.camaraService.createCamera(cameraData).subscribe({
      next: () => {
        this.showSnackBar('Camera added successfully');
        this.dialogRef.close(true);
      },
      error: (error) => this.showSnackBar(error.error.errorMessage)
    });
  }

  private createSensor(deviceData: any): void {
    const sensorData = new CreateSensorData(
      deviceData.name,
      deviceData.modelNumber,
      deviceData.mainPhoto,
      deviceData.description,
      this.companyId,
      deviceData.photos.length ? [deviceData.mainPhoto, ...deviceData.photos] : [deviceData.mainPhoto],
    );

    this.sensorService.createSensor(sensorData).subscribe({
      next: () => {
        this.showSnackBar('Sensor added successfully');
        this.dialogRef.close(true);
      },
      error: (error) => this.showSnackBar(error.error.errorMessage)
    });
  }

  private createSmartLight(deviceData: any): void {
    const smartLightData = new CreateSmartLightData(
      deviceData.name,
      deviceData.modelNumber,
      deviceData.mainPhoto,
      deviceData.description,
      this.companyId,
      deviceData.photos.length ? [deviceData.mainPhoto, ...deviceData.photos] : [deviceData.mainPhoto],
    );

    this.smartLightService.createSmartLight(smartLightData).subscribe({
      next: () => {
        this.showSnackBar('Smart Light added successfully');
        this.dialogRef.close(true);
      },
      error: (error) => this.showSnackBar(error.error.errorMessage)
    });
  }

  private createMovementSensor(deviceData: any): void {
    const movmentSensorData = new CreateMovementSensorData(
      deviceData.name,
      deviceData.modelNumber,
      deviceData.mainPhoto,
      deviceData.description,
      this.companyId,
      deviceData.photos.length ? [deviceData.mainPhoto, ...deviceData.photos] : [deviceData.mainPhoto],
    );

    this.movmentSensorService.createMovementSensor(movmentSensorData).subscribe({
      next: () => {
        this.showSnackBar('Movement Sensor added successfully');
        this.dialogRef.close(true);
      },
      error: (error) => this.showSnackBar(error.error.errorMessage)
    });
  }

  private showSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}