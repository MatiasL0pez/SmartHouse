import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImportDevicesData } from '../models/ImportDevicesData';
import { Observable } from 'rxjs';
import { ListNotificationsData } from '../models/ListNotificationsData';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:5000/notifications';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  markAsRead(notificationId: number): Observable<any> {
    const url = `${this.apiUrl}/${notificationId}/mark-as-read`;
    return this.http.post(url, {}, this.getHeaders());
  }

  getUserNotifications(input: ListNotificationsData): Observable<any> {
    let params = new HttpParams();

    if (input.deviceType) {
      params = params.set('deviceType', input.deviceType);
    }
    if (input.dateCreated) {
      params = params.set('dateCreated', input.dateCreated);
    }
    if (input.wasRead !== undefined) {
      params = params.set('wasRead', input.wasRead.toString());
    }

    return this.http.get(`${this.apiUrl}`, {
      ...this.getHeaders(),
      params,
    });
  }
}
