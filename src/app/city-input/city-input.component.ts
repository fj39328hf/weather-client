import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {filter, map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss']
})

export class CityInputComponent implements OnInit {

  control = new FormControl();
  apiKey = '46beb04043c94408454319d7f2b20142';
  result = {};
  filteredStreets: Observable<any[]> | undefined;
  city: any = {};
  lastSearchCity: any = [];

  constructor() {
  }

  ngOnInit(): void {
    this.filteredStreets = this.control.valueChanges.pipe(
      map(value => this.getCities(value)),
    );
    // @ts-ignore
    this.lastSearchCity = CityInputComponent.getWeatherLocalStorage()

  }

  setCoordinates(city: any) {
    this.city = city;
  }

  getLastSearch() {
    this.control.setValue(this.lastSearchCity[0].name)
    this.setCoordinates(this.lastSearchCity[0])
  }

  getWeather() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.city.lat}&lon=${this.city.lon}&appid=${this.apiKey}`;
    let result = CityInputComponent.httpGet(url);
    CityInputComponent.updateWeatherLocalStorage(this.city);
    this.result = JSON.parse(result)
  }

  getCities(value: any) {

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${this.apiKey}`;
    let result = CityInputComponent.httpGet(url);
    let obj = JSON.parse(result)
    let cities = [];
    for (value of Object.entries(obj)) {
      let v = value[1];
      cities.push({
        name: v.name,
        country: v.country,
        lat: v.lat,
        lon: v.lon
      })
    }
    return cities
  }

  private static httpGet(theUrl: string) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  private static updateWeatherLocalStorage(city: any) {
    localStorage.setItem("lastSearchCity", JSON.stringify([city]));
  }

  private static getWeatherLocalStorage() {
    // @ts-ignore
    let ls = JSON.parse(localStorage.getItem('lastSearchCity'));
    return ls === null ? [] : ls;
  }

}
