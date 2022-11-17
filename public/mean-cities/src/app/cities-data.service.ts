import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Attraction, City } from './cities/cities.component';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CitiesDataService {

  private _baseUrl:string = "http://localhost:3000/api";

  constructor(private _http:HttpClient) { }

  public getCities():Observable<City[]>{
    const url:string = this._baseUrl+"/cities";
    return this._http.get(url) as Observable<City[]>;

  }
  public getCity(cityId:string):Observable<City>{
    const url:string = this._baseUrl+"/cities/"+cityId;
    return this._http.get(url) as Observable<City>;
  }
  public deleteCity(cityId:string):Observable<City>{
    const url:string = this._baseUrl+"/cities/"+cityId;
    return this._http.delete(url) as Observable<City>;
  }
  public deleteAttraction(cityId:string,attractionId:string):Observable<Attraction>{
    const url:string= this._baseUrl+"/cities/"+cityId+"/attractions/"+attractionId;
    return this._http.delete(url) as Observable<Attraction>;
  }

}
