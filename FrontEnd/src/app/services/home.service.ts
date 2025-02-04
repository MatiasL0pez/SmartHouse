import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeData } from '../models/HomeData';
import { ListHomesData } from '../models/ListHomesData';
import { UpdateHomeAliasData } from '../models/UpdateHomeAliasData';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:5000/homes';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  createHome(home: HomeData): Observable<any> {
    return this.http.post<HomeData>(`${this.apiUrl}`, home, this.getHeaders());
  }

  getHome(homeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${homeId}`, this.getHeaders());
  }

  getHomes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, this.getHeaders());
  }

  listHomeMembers(homeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${homeId}/members`, {
      ...this.getHeaders(),
    });
  }

  updateAlias(homeId: number, input: UpdateHomeAliasData): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${homeId}/alias`,
      input,
      this.getHeaders()
    );
  }
}
