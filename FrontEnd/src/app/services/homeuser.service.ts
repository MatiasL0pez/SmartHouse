import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateHomeUserData } from '../models/CreateHomeUserData';
import { ChangePermissions } from '../models/ChangePermissions';

@Injectable({
  providedIn: 'root',
})
export class HomeUserService {
  private apiUrl = 'http://localhost:5000/home-users';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  createHomeUser(input: CreateHomeUserData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, input, this.getHeaders());
  }

  updatePermissions(
    homeId: number,
    permissions: ChangePermissions
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/homes/${homeId}/access`,
      permissions,
      this.getHeaders()
    );
  }

  getHomesWhereUserIsAMember(): Observable<any> {
    return this.http.get(`${this.apiUrl}/homes`, this.getHeaders());
  }
}
