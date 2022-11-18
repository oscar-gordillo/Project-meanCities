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
  public addCity(city:City):Observable<City>{
    const url:string = this._baseUrl+"/cities/";
    return this._http.post(url,city.toJSON()) as Observable<City>;
  }

  public updateCity(city:City):Observable<City>{
    const url:string = this._baseUrl+"/cities/"+city._id;
    return this._http.patch(url,city.toJSON()) as Observable<City>;
  }

  public deleteCity(cityId:string):Observable<City>{
    const url:string = this._baseUrl+"/cities/"+cityId;
    return this._http.delete(url) as Observable<City>;
  }
  public deleteAttraction(cityId:string,attractionId:string):Observable<Attraction>{
    const url:string= this._baseUrl+"/cities/"+cityId+"/attractions/"+attractionId;
    return this._http.delete(url) as Observable<Attraction>;
  }
  public addAttraction(attraction:Attraction,cityId:string):Observable<Attraction[]>{
    const url:string = this._baseUrl+"/cities/"+cityId+"/attractions";
    return this._http.post(url,attraction.toJSON()) as Observable<Attraction[]>
  }

  public updateAttraction(attraction:Attraction,cityId:string):Observable<Attraction>{
    const url:string = this._baseUrl+"/cities/"+cityId+"/attractions/"+attraction._id;
    return this._http.patch(url,attraction.toJSON()) as Observable<Attraction>
  }

  public getAttraction(attractionId:string,cityId:string):Observable<Attraction>{
    const url:string = this._baseUrl+"/cities/"+cityId+"/attractions/"+attractionId;
    return this._http.get(url) as Observable<Attraction>
  }


}
