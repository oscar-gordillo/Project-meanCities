import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsersDataService } from '../users-data.service';

export class User {
  #_id!:string;
  private _name: string;
  private _username: string;
  private _password: string;

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

  public set name(name: string) {
    this._name = name;
  }

  public get username(): string {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  constructor(name: string, username: string, password: string) {
    this._name = name
    this._username = username
    this._password = password
  }

  toJSON(){
    const obj={
      name:this.name,
      username:this.username,
      password:this.password
    }
    return obj;
  }

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _userService: UsersDataService, private _routerNav: Router) {
    this.registerForm = this._formBuilder.group({
      name: "",
      username: "",
      password: ""

    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.registerForm.value);
    let user=new User(this.registerForm.value.name
      ,this.registerForm.value.username
      ,this.registerForm.value.password);
      this._userService.register(user).subscribe(value=>{
        console.log(value);
        this._routerNav.navigate([environment.path_root]);
      });
  }

}
