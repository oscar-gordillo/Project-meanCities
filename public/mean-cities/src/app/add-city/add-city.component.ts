import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
    
    let newCity:City=new City(this.cityForm.value.cityName,this.cityForm.value.countryName,this.cityForm.value.yearVisited);
    
    this._cityService.addCity(newCity).subscribe(value=>{
    
      this._routerNav.navigate([environment.path_cities]);
    });
  }

}
