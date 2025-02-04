import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImportDevicesData } from '../models/ImportDevicesData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  private apiUrl = 'http://localhost:5000/importer';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  importDevices(input: ImportDevicesData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, input, this.getHeaders());
  }

  getImporterTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}`, this.getHeaders());
  }
}
