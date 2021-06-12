import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirlineModel } from '../models/airlineModel';

@Injectable({
  providedIn: 'root'
})
export class AirlineServiceService {
  constructor(private http: HttpClient) {}

  getAirlines(): Observable<[AirlineModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<[AirlineModel]>(
      'https://localhost:44318/api/Airline',
      {
        headers: headers,
      }
    );
  }
}
