import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { DiscountModel } from '../models/discountModel';

@Injectable({
  providedIn: 'root',
})
export class DiscountServicesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getDiscount(searchModel?: any): Observable<[DiscountModel]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<[DiscountModel]>(this.baseUrl + 'Discount', {
      headers: headers,
      params: searchModel,
    });
  }

  getDiscountByCode(code: string): Observable<DiscountModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    headers.append('Access-Control-Allow-Origin', '*');
    const url = this.baseUrl + 'Discount/GetCouponByCode/' + code;
    return this.http.get<DiscountModel>(url, {
      headers: headers,
    });
  }

  addDiscount(body: any): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    const params = JSON.stringify(body);
    return this.http.post<any>(this.baseUrl + 'Discount', params, httpOptions);
  }
}
