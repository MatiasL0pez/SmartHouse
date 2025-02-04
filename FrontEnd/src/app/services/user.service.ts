import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../models/LoginData';
import { RegisterHomeOwnerData } from '../models/RegisterHomeOwnerData';
import { RegisterCompanyOwnerAndAdminData } from '../models/RegisterCompanyOwnerAndAdminData';
import { ListAccountsData } from '../models/ListAccountsData';
import { AssignHomeOwnerRoleData } from '../models/AssignHomeOwnerRoleData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  login(user: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  registerHomeOwner(user: RegisterHomeOwnerData): Observable<any> {
    return this.http.post(`${this.apiUrl}/homeowner`, user);
  }

  registerCompanyOwner(
    user: RegisterCompanyOwnerAndAdminData
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/companyowner`,
      user,
      this.getHeaders()
    );
  }

  registerAdministrator(
    user: RegisterCompanyOwnerAndAdminData
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin`, user, this.getHeaders());
  }

  listAccounts(input: ListAccountsData): Observable<any> {
    let params = new HttpParams()
      .set('page', input.page.toString())
      .set('pageSize', input.pageSize.toString());

    if (input.filter) {
      params = params.set('filter', input.filter);
    }

    return this.http.get(`${this.apiUrl}`, { ...this.getHeaders(), params });
  }

  deleteAdmin(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/${email}`, this.getHeaders());
  }

  updateUserRoles(input: AssignHomeOwnerRoleData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/roles`, input, this.getHeaders());
  }
}
