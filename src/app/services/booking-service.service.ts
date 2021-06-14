import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../models/bookingModel';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(
    private http:HttpClient
  ) { }

  getBookings(searchModel?: any): Observable<[BookingModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<[BookingModel]>(
      'https://localhost:44318/api/Booking',
      {
        headers: headers,
        params: searchModel,
      }
    );
  }

  addBooking(body:any): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    const params=JSON.stringify(body);
    return this.http.post<[any]>('https://localhost:44318/api/Booking', params, httpOptions);
  }
  
}
