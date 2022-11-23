import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CitiesDataService } from '../cities-data.service';

export class Attraction {
  #_id!:string;
  private _name: string;
  private _interestingFacts: string;
  private _image:string;
  private _video:string;

    public get video(): string {
        return this._video;
    }

    public set video(video: string) {
        this._video = video;
    }


    public get image(): string {
        return this._image;
    }

    public set image(image: string) {
        this._image = image;
    }


  /* private _image!:Buffer;

    public get image(): Buffer {
        return this._image;
    }

    public set image(image: Buffer) {
        this._image = image;
    } */


  public get _id(): string {
    return this.#_id;
  }

  public set _id(id: string
  ) {
    this.#_id = id;
  }
  public get name(): string {
    return this._name;
  }

  public set name(name: string
  ) {
    this._name = name;
  }

  public get interestingFacts(): string {
    return this._interestingFacts;
  }

  public set interestingFacts(interestingFacts: string) {
    this._interestingFacts = interestingFacts;
  }


  constructor(name: string, interestingFacts: string, image:string, video:string) {
    this._name = name
    this._interestingFacts = interestingFacts    
    this._image=image;
    this._video=video;
  }

  toJSON(){
    const obj={
      name:this.name,
      interestingFacts:this.interestingFacts,
      image:this.image,
      video:this.video
    }
    return obj;
  }



}

export class City {
  #_id!: string;
  #cityName!: string;
  #countryName!: string;
  #yearVisited!: number;
  #attractions!:Attraction[];

  get attractions(){
    return this.#attractions
  }

  set attractions(attractions:Attraction[]){
    this.#attractions=attractions;
  }

  get _id() { return this.#_id; }
  get cityName() { return this.#cityName; }
  get countryName() { return this.#countryName; }
  get yearVisited() { return this.#yearVisited; }

  set _id(_id: string) { this.#_id = _id }
  set cityName(cityName: string) { this.#cityName = cityName }
  set countryName(countryName: string) { this.#countryName = countryName }
  set yearVisited(yearVisited: number) { this.#yearVisited = yearVisited }

/*  constructor(id: string, cityName: string, countryName: string, yearVisited: number) {
    this.#_id = id;
    this.#cityName = cityName;
    this.#countryName = countryName;
    this.#yearVisited = yearVisited;
  }*/

    constructor(cityName: string, countryName: string, yearVisited: number) {    
      this.#cityName = cityName;
      this.#countryName = countryName;
      this.#yearVisited = yearVisited;
    }

  fillCityFromForm(form:FormGroup){
    console.log(form.value);
    this.#cityName = form.value.cityName;
    this.#countryName = form.value.countryName;
    this.#yearVisited = form.value.yearVisited;
  }

  toJSON(){
    let obj={
      "cityName":this.cityName,
      "countryName":this.countryName,
      "yearVisited":this.yearVisited
    };
    return obj;
  }
  

}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  constructor(private _citiesService: CitiesDataService) {
    this._citiesService.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  ngOnInit(): void {
  }

  cities: City[] = [];

  

}
