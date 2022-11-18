import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesDataService } from '../cities-data.service';
import { Attraction } from '../cities/cities.component';

@Component({
  selector: 'app-update-attraction',
  templateUrl: './update-attraction.component.html',
  styleUrls: ['./update-attraction.component.css']
})
export class UpdateAttractionComponent implements OnInit {

  attractionForm!:FormGroup;

  constructor(private _formBuilder:FormBuilder,private _cityService:CitiesDataService,private _router:ActivatedRoute,private _routerNav:Router) { 
    
  }

  ngOnInit(): void {
    const cityId:string=this._router.snapshot.params["cityId"];
    const attractionId:string=this._router.snapshot.params["attractionId"];
    this._cityService.getAttraction(attractionId,cityId).subscribe(value=>{
      this.attractionForm=this._formBuilder.group({
        name: value.name,      
        interestingFacts: value.interestingFacts  
      });
    });

  }

  onSubmit(){
    console.log(this.attractionForm.value);
    const cityId:string=this._router.snapshot.params["cityId"];
    const attractionId:string=this._router.snapshot.params["attractionId"];
    let newAttraction:Attraction=new Attraction(this.attractionForm.value.name,this.attractionForm.value.interestingFacts);
    newAttraction._id=attractionId;
    this._cityService.updateAttraction(newAttraction,cityId).subscribe(value=>{
      console.log(value);
      this._routerNav.navigate(['/city/'+cityId]);
    });
  }

}
