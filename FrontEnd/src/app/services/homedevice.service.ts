import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateHomeDeviceName } from '../models/UpdateHomeDeviceName';
import { AssociateHomeDeviceToRoomData } from '../models/AssociateHomeDeviceToRoomData';

@Injectable({
  providedIn: 'root',
})
export class HomeDeviceService {
  private apiUrl = 'http://localhost:5000/home-devices';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  listHomeDevices(homeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${homeId}/devices`, {
      ...this.getHeaders(),
    });
  }

  associateHomeDeviceToRoom(
    input: AssociateHomeDeviceToRoomData
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/room-device`,
      input,
      this.getHeaders()
    );
  }

  createHomeDevice(input: {
    DeviceId: number;
    HomeId: number;
    Name: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, input, this.getHeaders());
  }

  updateHomeDeviceName(
    updateDeviceName: UpdateHomeDeviceName
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/devices/name`,
      updateDeviceName,
      this.getHeaders()
    );
  }

  toggleDeviceOn(hardwareId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${hardwareId}/on`,
      {},
      this.getHeaders()
    );
  }

  toggleDeviceOff(hardwareId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${hardwareId}/off`,
      {},
      this.getHeaders()
    );
  }

  toggleDeviceOpen(hardwareId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${hardwareId}/open`,
      {},
      this.getHeaders()
    );
  }

  toggleDeviceClose(hardwareId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${hardwareId}/close`,
      {},
      this.getHeaders()
    );
  }

  toggleDeviceOnline(hardwareId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${hardwareId}/online`,
      {},
      this.getHeaders()
    );
  }

  toggleDeviceOffline(hardwareId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${hardwareId}/offline`,
      {},
      this.getHeaders()
    );
  }
}
