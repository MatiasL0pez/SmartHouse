import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyData } from '../models/CompanyData';
import { ListCompaniesData } from '../models/ListCompaniesData';
import { UpdatedCompanyValidatorData } from '../models/UpdatedCompanyValidatorData';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:5000/companies';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  createCompany(company: CompanyData): Observable<any> {
    return this.http.post<CompanyData>(
      `${this.apiUrl}`,
      company,
      this.getHeaders()
    );
  }

  getCompany(): Observable<any> {
    return this.http.get(`${this.apiUrl}/company`, this.getHeaders());
  }

  getCompanies(input: ListCompaniesData): Observable<any> {
    let params = new HttpParams()
      .set('page', input.page.toString())
      .set('pageSize', input.pageSize.toString());

    if (input.filter) {
      params = params.set('filter', input.filter);
    }

    return this.http.get(`${this.apiUrl}`, { ...this.getHeaders(), params });
  }

  updateModelValidator(input: UpdatedCompanyValidatorData): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/model-validator`,
      input,
      this.getHeaders()
    );
  }
}
