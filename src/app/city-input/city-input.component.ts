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
  streets: string[] = []
  apiKey = '46beb04043c94408454319d7f2b20142';
  result = {};
  filteredStreets: Observable<string[]> | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredStreets = this.control.valueChanges.pipe(
      map(value => this.getCities(value)),
    );
  }


  httpGet(theUrl: string) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  getWeather(lat: string, lon: string) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    let result = this.httpGet(url);
    this.result = JSON.parse(result)
  }

  getCities(value: any) {

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${this.apiKey}`;
    let result = this.httpGet(url);
    let obj = JSON.parse(result)
    let asdf: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      // @ts-ignore
      asdf.push(`${value.name}-${value.country}`)
    }
    return asdf
  }

}
