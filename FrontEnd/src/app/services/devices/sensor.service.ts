import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSensorData } from '../../models/CreateSensorData';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private apiUrl = 'http://localhost:5000/sensors';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  createSensor(input: CreateSensorData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, input, this.getHeaders());
  }
}
