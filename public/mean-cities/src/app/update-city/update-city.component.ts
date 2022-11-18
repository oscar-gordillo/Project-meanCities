import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesDataService } from '../cities-data.service';
import { City } from '../cities/cities.component';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrls: ['./update-city.component.css']
})
export class UpdateCityComponent implements OnInit {

  cityForm!:FormGroup;

  constructor(private _formBuilder:FormBuilder,private _cityService:CitiesDataService,private _routerNav:Router,private _router:ActivatedRoute) {
    
   }

  ngOnInit(): void {
    const cityId:string=this._router.snapshot.params["cityId"];
    this._cityService.getCity(cityId).subscribe(value=>{
      this.cityForm=this._formBuilder.group({
        cityName: value.cityName,      
        countryName: value.countryName,
        yearVisited: value.yearVisited  
      });
    });
  }

  onSubmit(){
    console.log(this.cityForm.value);
    let newCity:City=new City(this.cityForm.value.cityName,this.cityForm.value.countryName,this.cityForm.value.yearVisited);
    const cityId:string=this._router.snapshot.params["cityId"];
    newCity._id=cityId;
    this._cityService.updateCity(newCity).subscribe(value=>{
      console.log(value);
      this._routerNav.navigate(['/city/'+cityId]);
    });
  }

}
