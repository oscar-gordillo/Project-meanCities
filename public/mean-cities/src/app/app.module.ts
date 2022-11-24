import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddCityComponent } from './add-city/add-city.component';
import { AddAttractionComponent } from './add-attraction/add-attraction.component';
import { UpdateCityComponent } from './update-city/update-city.component';
import { UpdateAttractionComponent } from './update-attraction/update-attraction.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import {JwtHelperService,JWT_OPTIONS} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    CitiesComponent,
    CityComponent,
    ErrorPageComponent,
    AddCityComponent,
    AddAttractionComponent,
    UpdateCityComponent,
    UpdateAttractionComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: environment.path_root,
        component: HomeComponent
      },
      {
          path: environment.path_cities,
          component: CitiesComponent
      },
      {
          path: environment.path_register,
          component: RegisterComponent
      },
      {
          path: environment.path_login,
          component: LoginComponent
      },
      {
          path: environment.path_add_city,
          component: AddCityComponent
      },
      {
        path: environment.path_city,
        component: CityComponent
      },
      {
        path: environment.path_update_city,
        component: UpdateCityComponent
      },
      {
        path: environment.path_aupdate_attraction,
        component: UpdateAttractionComponent
      },
      {
        path: environment.path_add_attraction,
        component: AddAttractionComponent
      },

    {
      path: environment.path_error_page,
      component: ErrorPageComponent
  }
      ])
  ],
  providers: [
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
