import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirlineModel } from '../models/airlineModel';

@Injectable({
  providedIn: 'root',
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

  addAirlines(body: any): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    const params = JSON.stringify(body);
    return this.http.post<any>(
      'https://localhost:44318/api/Airline',
      params,
      httpOptions
    );
  }

  getLocation() {
    return [
      { locationName: 'Bangalore' },
      { locationName: 'Delhi' },
      { locationName: 'Chennai' },
      { locationName: 'Mumbai' },
    ];
  }
  getInstrument() {
    return [
      { instrumentName: 'A320' },
      { instrumentName: 'A320 neo' },
      { instrumentName: 'Boeing 737' },
      { instrumentName: 'Boeing 717' },
      { instrumentName: 'Boeing 757' },
    ];
  }
}
