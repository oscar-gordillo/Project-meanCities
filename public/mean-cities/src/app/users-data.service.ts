import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  private _baseUrl:string = "http://localhost:3000/api";

  constructor(private _http:HttpClient) { }

  public register(user:User):Observable<User>{
    const url:string = this._baseUrl+"/users/";
    return this._http.post(url,user.toJSON()) as Observable<User>;
  }

  public login(user:User):Observable<string>{
    const url:string = this._baseUrl+"/users/login/";
    return this._http.post(url,user.toJSON()) as Observable<string>;
  }
  
}
