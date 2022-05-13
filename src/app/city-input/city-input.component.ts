import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss']
})
export class CityInputComponent implements OnInit {

  apiKey = '46beb04043c94408454319d7f2b20142';

  result = {};
  constructor() { }

  ngOnInit(): void {
  }

  httpGet(theUrl: string)
  {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }
  getWeather($event: any) {

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${$event.target.value}&limit=20&appid=${this.apiKey}`;
    let result = this.httpGet(url);
    console.log(JSON.parse(result))
    this.result = result;
  }

}
