import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMovementSensorData } from '../../models/CreateMovmentSensorData';

@Injectable({
  providedIn: 'root',
})
export class MovmentSensorService {
  private apiUrl = 'http://localhost:5000/movement-sensors';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  createMovementSensor(input: CreateMovementSensorData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, input, this.getHeaders());
  }
}
