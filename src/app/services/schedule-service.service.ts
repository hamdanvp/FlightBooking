import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirlineModel } from '../models/airlineModel';
import { scheduleModel } from '../models/scheduleModel';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {

  constructor(private http: HttpClient) { }

  getSchedules(searchModel?: any): Observable<[scheduleModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<[scheduleModel]>(
      'https://localhost:44318/api/Schedule',
      {
        headers: headers,
        params: searchModel,
      }
    );
  }
}
