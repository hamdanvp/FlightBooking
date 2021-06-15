import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { UserModel } from 'src/app/models/user'
import { BookingViewmodel } from '../models/bookingViewmodel';

@Injectable()
export class LoginServiceService {
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
    return this.http.get<UserModel>('https://localhost:44318/api/User/Login/'+username+'/'+password,{headers: headers})
  }


}
