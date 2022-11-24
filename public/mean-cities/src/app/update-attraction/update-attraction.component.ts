import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CitiesDataService } from '../cities-data.service';
import { Attraction } from '../cities/cities.component';

@Component({
  selector: 'app-update-attraction',
  templateUrl: './update-attraction.component.html',
  styleUrls: ['./update-attraction.component.css']
})
export class UpdateAttractionComponent implements OnInit {

  attractionForm!:FormGroup;
  image!:string;
  video!:string;

  constructor(private _formBuilder:FormBuilder,private _cityService:CitiesDataService,private _router:ActivatedRoute,private _routerNav:Router) { 
    
  }

  ngOnInit(): void {
    const cityId:string=this._router.snapshot.params[environment.city_id_tag];
    const attractionId:string=this._router.snapshot.params[environment.attraction_id_tag];
    this._cityService.getAttraction(attractionId,cityId).subscribe(value=>{
      
      //console.log(value.image);
      this.image=value.image;
      this.video=value.video;

      //console.log(new Buffer(value.image).toString('base64'));

      

      this.attractionForm=this._formBuilder.group({
        name: value.name,      
        interestingFacts: value.interestingFacts    ,
         
      });
    });

  }

  onSubmit(){
    console.log(this.attractionForm.value);
    const cityId:string=this._router.snapshot.params[environment.city_id_tag];
    const attractionId:string=this._router.snapshot.params[environment.attraction_id_tag];
    let newAttraction:Attraction=new Attraction(this.attractionForm.value.name
      ,this.attractionForm.value.interestingFacts
      ,this.image
      ,this.video);
    newAttraction._id=attractionId;
    this._cityService.updateAttraction(newAttraction,cityId).subscribe(value=>{
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
