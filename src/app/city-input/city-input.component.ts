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
  filteredStreets: Observable<any[]> | undefined;
  lon: string = '';
  lat: string = '';

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

  getWeather(lon:string, lat:string) {

    console.log('work', this.control.value.replace(new RegExp(",.*"), ''))
    // let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    let result = this.httpGet(url);
    this.result = JSON.parse(result)
  }

  getCities(value: any) {

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${this.apiKey}`;
    let result = this.httpGet(url);
    let obj = JSON.parse(result)
    let asdf: string[] = [];
    for (value of Object.entries(obj)) {
      let v = value[1];
      let name = v.name;
      let country = v.country;
      let lat = v.lat;
      let lon = v.lon;
      // console.log()
      // asdf.push(`${value.name}, ${value.country}, ${value.lat}`)
      // @ts-ignore
      asdf.push({
        name: name,
        country: country,
        lat: lat,
        lon: lon
      })
    }
    // console.log(asdf)
    return asdf
  }

}
