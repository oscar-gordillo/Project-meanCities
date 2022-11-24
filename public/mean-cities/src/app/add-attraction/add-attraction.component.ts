import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CitiesDataService } from '../cities-data.service';
import { Attraction } from '../cities/cities.component';

@Component({
  selector: 'app-add-attraction',
  templateUrl: './add-attraction.component.html',
  styleUrls: ['./add-attraction.component.css']
})
export class AddAttractionComponent implements OnInit {

  attractionForm!:FormGroup;
  image!:string;
  video!:string;

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
    const cityId:string=this._router.snapshot.params[environment.city_id_tag];
    console.log(cityId);
    let newAttraction:Attraction=new Attraction(this.attractionForm.value.name,this.attractionForm.value.interestingFacts
      ,this.image,this.video);
    this._cityService.addAttraction(newAttraction,cityId).subscribe(value=>{
      console.log(value);
      this._routerNav.navigate([environment.city_route+cityId]);
    });
  }

  handleUpload(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.image=reader.result as string;        
    };
  }
  handleUploadVideo(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.video=reader.result as string;        
    };
  }

}
