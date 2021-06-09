import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { UserModel } from 'src/app/models/user'

@Injectable()
export class LoginServiceService {
private userData:any;
  constructor(
    private http:HttpClient
  ) { }
  public getUser() {
    return this.userData;
  }
  public setUser(user: UserModel): void {
    this.userData=user;
  }
  public logOut(){
    this.userData=null;
  }
  public Login(username:string,password:string): Observable<UserModel>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<UserModel>('https://localhost:44318/api/User/Login/'+username+'/'+password,{headers: headers})
  }


}
