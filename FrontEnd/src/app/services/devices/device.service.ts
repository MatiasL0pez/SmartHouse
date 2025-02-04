import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ListDevicesData } from '../../models/ListDevicesData';
import { ListCompanyDevicesData } from '../../models/ListCompanyDevicesData';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = 'http://localhost:5000/devices';
  private supportedDevicesCache: Observable<any> | null = null;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  listDevices(input: ListDevicesData): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        ...input,
        page: input.page.toString(),
        pageSize: input.pageSize.toString(),
      },
    });
    return this.http.get(`${this.apiUrl}`, { ...this.getHeaders(), params });
  }

  listCompanyDevices(input: ListCompanyDevicesData): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        ...input,
        page: input.page.toString(),
        pageSize: input.pageSize.toString(),
      },
    });
    return this.http.get(`${this.apiUrl}/company`, {
      ...this.getHeaders(),
      params,
    });
  }

  listSupportedDevices(): Observable<any> {
    const cachedData = localStorage.getItem('supportedDevicesCache');
    const timestamp = localStorage.getItem('supportedDevicesCacheTimestamp');

    if (cachedData && timestamp) {
      const cacheAge = Date.now() - parseInt(timestamp, 10);
      const cacheDuration = 86400;
      if (cacheAge < cacheDuration) {
        return of(JSON.parse(cachedData));
      }
    }

    this.supportedDevicesCache = this.http
      .get(`${this.apiUrl}/supported`, { ...this.getHeaders() })
      .pipe(
        shareReplay(1),
        tap((data) => {
          localStorage.setItem('supportedDevicesCache', JSON.stringify(data));
          localStorage.setItem(
            'supportedDevicesCacheTimestamp',
            Date.now().toString()
          );
        })
      );

    return this.supportedDevicesCache;
  }

  getModelsValidators(): Observable<any> {
    return this.http.get(`${this.apiUrl}/validators`, { ...this.getHeaders() });
  }
}
