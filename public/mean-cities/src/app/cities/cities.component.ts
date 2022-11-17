import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../cities-data.service';

export class City{
  #_id!:string;
  #cityName!:string;
  #countryName!:string;
  #yearVisited!:number;

  get _id(){return this.#_id;}
  get cityName(){return this.#cityName;}
  get countryName(){return this.#countryName;}
  get yearVisited(){return this.#yearVisited;}

  set _id(_id:string){this.#_id=_id}
  set cityName(cityName:string){this.#cityName=cityName}
  set countryName(countryName:string){this.#countryName=countryName}
  set yearVisited(yearVisited:number){this.#yearVisited=yearVisited}

  constructor(id:string, cityName:string, countryName:string, yearVisited:number){
    this.#_id=id;
    this.#cityName=cityName;
    this.#countryName=countryName;
    this.#yearVisited=yearVisited;
  }

}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  constructor(private _citiesService:CitiesDataService) { 
    this._citiesService.getCities().subscribe(cities => {
        this.cities= cities;
      });
  }

  ngOnInit(): void {
  }

  cities: City[]= [];

}
