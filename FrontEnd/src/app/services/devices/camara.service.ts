import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCameraData } from '../../models/CreateCamaraData';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  private apiUrl = 'http://localhost:5000/cameras';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  createCamera(input: CreateCameraData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, input, this.getHeaders());
  }
}
