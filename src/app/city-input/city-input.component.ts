import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss']
})
export class CityInputComponent implements OnInit {

  control = new FormControl();
  streets: string[] = ['city-one', 'city-two']
  apiKey = '46beb04043c94408454319d7f2b20142';
  result = {};
  filteredStreets: Observable<string[]> | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    console.log(value, filterValue)
    return this.getWeather(value)
    // return ['1'];
    // return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  httpGet(theUrl: string) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  getWeather(value: any) {

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=20&appid=${this.apiKey}`;
    let result = this.httpGet(url);
    let obj = JSON.parse(result)
    let asdf: any[] = [];

    for (const [key, value] of Object.entries(obj)) {
      // @ts-ignore
      asdf.push(value.name)
    }
    return asdf
  }

}
