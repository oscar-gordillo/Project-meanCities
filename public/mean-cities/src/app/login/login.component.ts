import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { User } from '../register/register.component';
import { UsersDataService } from '../users-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User=new User("","","");

  constructor(private _userService:UsersDataService, public _authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  onLogin(loginForm:NgForm){
    
    
    this._userService.login(this.user).subscribe(value=>{
    
      this._authenticationService.token=value;
    
    });
  }
  logout(){
    this._authenticationService.removeToken();
  }

}
