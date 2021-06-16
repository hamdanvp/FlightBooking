import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { scheduleModel } from '../models/scheduleModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSchedules(searchModel?: any): Observable<[scheduleModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<[scheduleModel]>(this.baseUrl + 'Schedule', {
      headers: headers,
      params: searchModel,
    });
  }

  getScheduleById(id: string): Observable<scheduleModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    const url = this.baseUrl + 'Schedule/' + id;
    return this.http.get<scheduleModel>(url, {
      headers: headers,
    });
  }

  addSchedule(body: any): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    const params = JSON.stringify(body);
    return this.http.post<any>(this.baseUrl + 'Schedule', params, httpOptions);
  }
}
