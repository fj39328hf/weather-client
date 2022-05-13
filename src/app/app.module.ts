import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CityInputComponent } from './city-input/city-input.component';
import { WeatherOutputComponent } from './weather-output/weather-output.component';

@NgModule({
  declarations: [
    AppComponent,
    CityInputComponent,
    WeatherOutputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
