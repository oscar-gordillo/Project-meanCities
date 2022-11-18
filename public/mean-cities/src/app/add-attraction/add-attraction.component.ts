import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesDataService } from '../cities-data.service';
import { Attraction } from '../cities/cities.component';

@Component({
  selector: 'app-add-attraction',
  templateUrl: './add-attraction.component.html',
  styleUrls: ['./add-attraction.component.css']
})
export class AddAttractionComponent implements OnInit {

  attractionForm!:FormGroup;

  constructor(private _formBuilder:FormBuilder,private _cityService:CitiesDataService,private _router:ActivatedRoute,private _routerNav:Router) { 
    this.attractionForm=this._formBuilder.group({
      name: "",      
      interestingFacts: ""      

    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.attractionForm.value);
    const cityId:string=this._router.snapshot.params["cityId"];
    console.log(cityId);
    let newAttraction:Attraction=new Attraction(this.attractionForm.value.name,this.attractionForm.value.interestingFacts);
    this._cityService.addAttraction(newAttraction,cityId).subscribe(value=>{
      console.log(value);
      this._routerNav.navigate(['/city/'+cityId]);
    });
  }

}
