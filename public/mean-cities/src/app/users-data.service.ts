import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  private _baseUrl:string = environment.base_url_api;

  constructor(private _http:HttpClient) { }

  public register(user:User):Observable<User>{
    const url:string = this._baseUrl+environment.base_url_users;
    return this._http.post(url,user.toJSON()) as Observable<User>;
  }

  public login(user:User):Observable<string>{
    const url:string = this._baseUrl+environment.base_url_login_users;
    return this._http.post(url,user.toJSON()) as Observable<string>;
  }
  
}
