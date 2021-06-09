import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { scheduleModel } from '../models/scheduleModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getBookingHistory() {
    return [
      { bookingDate: '05/20/2021', LogoUrl: '', price: 2500, seats: 3 },
      { bookingDate: '05/20/2021', LogoUrl: '', price: 1500, seats: 1 },
      { bookingDate: '05/20/2021', LogoUrl: '', price: 2000, seats: 2 },
      { bookingDate: '05/20/2021', LogoUrl: '', price: 5500, seats: 6 },
      { bookingDate: '05/20/2021', LogoUrl: '', price: 4500, seats: 5 },
      { bookingDate: '05/20/2021', LogoUrl: '', price: 3500, seats: 4 },
    ];
  }

  getScheduleList(searchModel: any): Observable<[scheduleModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<[scheduleModel]>('https://localhost:44318/api/Schedule', {
      headers: headers,
      params: searchModel,
    });
  }
}
