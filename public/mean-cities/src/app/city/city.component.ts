import { Component, OnInit } from '@angular/core';
import { CitiesDataService } from '../cities-data.service';
import { City } from '../cities/cities.component';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  city!: City;

  constructor(private _citiesService:CitiesDataService, private _router:ActivatedRoute, private _routerNav:Router) { }

  ngOnInit(): void {
    const cityId:string=this._router.snapshot.params["cityId"];
    this._citiesService.getCity(cityId).subscribe(value=>{
      this.city=value;
    });
  }

  deleteCity(cityId:string){
    this._citiesService.deleteCity(cityId).subscribe(value=>{
      console.log(value);
      this._routerNav.navigate(['cities']);
    });
  }

  deleteAttraction(cityId:string,attractionId:string){
    this._citiesService.deleteAttraction(cityId,attractionId).subscribe(value=>{
      console.log(value);
      const cityId:string=this._router.snapshot.params["cityId"];
      this._citiesService.getCity(cityId).subscribe(value=>{
        this.city=value;
      });
    });
  }

}
