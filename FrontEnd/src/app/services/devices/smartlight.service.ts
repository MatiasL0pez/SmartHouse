import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSmartLightData } from '../../models/CreateSmartLightData';

@Injectable({
  providedIn: 'root',
})
export class SmartLightService {
  private apiUrl = 'http://localhost:5000/smart-light';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  createSmartLight(input: CreateSmartLightData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, input, this.getHeaders());
  }
}
