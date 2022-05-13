import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CityInputComponent } from './city-input/city-input.component';
import { WeatherOutputComponent } from './weather-output/weather-output.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    CityInputComponent,
    WeatherOutputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
