import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { BookingModel } from '../models/bookingModel';
import { PassengerModel } from '../models/passengerModel';

@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getBookings(searchModel?: any): Observable<[BookingModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<[BookingModel]>(
      this.baseUrl+'Booking',
      {
        headers: headers,
        params: searchModel,
      }
    );
  }

  getBookingById(bookingId: string): Observable<BookingModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    const url = this.baseUrl+'Booking/' + bookingId;
    return this.http.get<BookingModel>(url, {
      headers: headers,
    });
  }

  getPassengersByBookingId(bookingId: string): Observable<[PassengerModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    const url = this.baseUrl+'Booking/GetPassengersByBookingId/' + bookingId;
    return this.http.get<[PassengerModel]>(url, {
      headers: headers,
    });
  }

  cancelByBookingId(bookingId: string): Observable<[PassengerModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    const url = this.baseUrl+'Booking/CancelBookingById/' + bookingId;
    return this.http.put<[PassengerModel]>(url,null, {
      headers: headers,
    });
  }

  addBooking(body: any): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    const params = JSON.stringify(body);
    return this.http.post<[any]>(
      this.baseUrl+'Booking',
      params,
      httpOptions
    );
  }
}
