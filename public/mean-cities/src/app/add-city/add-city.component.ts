import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CitiesDataService } from '../cities-data.service';
import { City } from '../cities/cities.component';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  cityForm!:FormGroup;

  constructor(private _formBuilder:FormBuilder,private _cityService:CitiesDataService,private _routerNav:Router) { 
    this.cityForm=this._formBuilder.group({
      cityName: "",      
      countryName: "",
      yearVisited: ""

    });
  }

  ngOnInit(): void {
  }
  onSubmit(){
    //console.log(this.cityForm.value);
    let newCity:City=new City(this.cityForm.value.cityName,this.cityForm.value.countryName,this.cityForm.value.yearVisited);
    //newCity.fillCityFromForm(this.cityForm);
    //console.log(newCity.toJSON());
    this._cityService.addCity(newCity).subscribe(value=>{
      console.log(value);
      this._routerNav.navigate(['cities']);
    });
  }

}
