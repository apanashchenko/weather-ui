import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {Weather} from "../model/weather";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  owpWeather: Weather;
  apixuWeather: Weather;
  weatherBitWeather: Weather;
  http: HttpService;

  constructor(http: HttpService) {
    this.http = http;
  }

  ngOnInit() {
    this.http.getOpenWeatherMap('dnipro').subscribe(data => {
      this.owpWeather = data;
      console.log(this.owpWeather);
    });
    this.http.getApixu('los angeles').subscribe(data => {
      this.apixuWeather = data;
      console.log(this.owpWeather);
    });
    this.http.getWeatherBit('sydney').subscribe(data => {
      this.weatherBitWeather = data;
      console.log(this.owpWeather);
    });
  }



}
