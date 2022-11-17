import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    CitiesComponent,
    CityComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
          path: "cities",
          component: CitiesComponent
      },
      {
        path: "city/:cityId",
        component: CityComponent
    },
    {
      path: "**",
      component: ErrorPageComponent
  }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
