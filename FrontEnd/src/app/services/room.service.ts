import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImportDevicesData } from '../models/ImportDevicesData';
import { Observable } from 'rxjs';
import { ListHomeRooms } from '../models/ListHomeRooms';
import { CreateRoomData } from '../models/CreateRoomData';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'http://localhost:5000/rooms';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders().set(
        'token',
        localStorage.getItem('token') || ''
      ),
    };
  }

  createRoom(input: CreateRoomData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, input, this.getHeaders());
  }

  getHomeRooms(homeId: number): Observable<any> {
    let params = new HttpParams().set('homeId', homeId.toString());

    return this.http.get<ListHomeRooms[]>(`${this.apiUrl}`, {
      ...this.getHeaders(),
      params: params,
    });
  }
}
