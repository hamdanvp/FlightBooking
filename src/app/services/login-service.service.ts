import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { UserModel } from 'src/app/models/user'
import { BookingViewmodel } from '../models/bookingViewmodel';

@Injectable()
export class LoginServiceService {
  baseUrl = environment.baseUrl;
  public booking:BookingViewmodel=new BookingViewmodel();
private userData:any;
  constructor(
    private http:HttpClient
  ) { }
  public getUser() {
    this.userData = JSON.parse(''+localStorage.getItem('currentUser'));
    return this.userData;
  }

  setCurrentBooking(booking:BookingViewmodel){
    this.booking=booking;
  }

  getCurrentBooking(){
    return this.booking;
  }

  public setUser(user: UserModel): void {
    this.userData=user;
    localStorage.setItem('currentUser',JSON.stringify(user))
  }
  public logOut(){
    this.userData=null;
    localStorage.removeItem('currentUser');
  }
  public Login(username:string,password:string): Observable<UserModel>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<UserModel>(this.baseUrl+'User/Login/'+username+'/'+password,{headers: headers})
  }

  addUser(body: any): Observable<[any]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    const params = JSON.stringify(body);
    return this.http.post<any>(
      this.baseUrl+'User',
      params,
      httpOptions
    );
  }


}
