import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  set token(token:string){
    localStorage.setItem(environment.token_name,token);
  }
  get token(){
    return localStorage.getItem(environment.token_name) as string;
  }

  get isLoggedIn(){
    if (this.token) {
      return true;
    }else{
      return false;
    }
  }

  get name(){
    return this._jwtService.decodeToken(this.token).name;
  }

  removeToken():void{
    localStorage.clear();
  }


  constructor(private _jwtService:JwtHelperService) { }
}
