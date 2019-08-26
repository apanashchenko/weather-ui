import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {Weather} from "../model/weather";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  mainSearchForm: FormGroup;
  openWeatherForm: FormGroup;
  weatherBitForm: FormGroup;
  apixuForm: FormGroup;
  formBuilder: FormBuilder;
  owmWeather: Weather;
  apixuWeather: Weather;
  weatherBitWeather: Weather;
  http: HttpService;

  constructor(http: HttpService, formBuilder: FormBuilder) {
    this.http = http;
    this.formBuilder = formBuilder;
    this.createForms();
  }

  ngOnInit() {
    this.http.getOpenWeatherMap('dnipro').subscribe(data => {
      this.owmWeather = data;
      console.log(this.owmWeather);
    });
    this.http.getApixu('los angeles').subscribe(data => {
      this.apixuWeather = data;
      console.log(this.owmWeather);
    });
    this.http.getWeatherBit('sydney').subscribe(data => {
      this.weatherBitWeather = data;
      console.log(this.owmWeather);
    });
  }

  createForms() {
    this.mainSearchForm = this.formBuilder.group({
      city: [''],
    });
    this.openWeatherForm = this.formBuilder.group({
      city: [''],
    });
    this.weatherBitForm = this.formBuilder.group({
      city: [''],
    });
    this.apixuForm = this.formBuilder.group({
      city: [''],
    });
  }

  submitMainSearch() {
    let city = this.mainSearchForm.value['city'];
    this.getOpenWeatherMap(city);
    this.getWeatherBit(city);
    this.getApixu(city);
    this.mainSearchForm.reset();
  }

  submitOwm() {
    this.getOpenWeatherMap(this.openWeatherForm.value['city']);
    this.openWeatherForm.reset()
  }

  submitApixu() {
    this.getApixu(this.apixuForm.value['city']);
    this.apixuForm.reset()
  }

  submitWb() {
    this.getWeatherBit(this.weatherBitForm.value['city']);
    this.weatherBitForm.reset()

  }

  getOpenWeatherMap(city) {
    this.http.getOpenWeatherMap(city).subscribe(data => {
      this.owmWeather = data;
      console.log(this.owmWeather);
    });
  }

  getWeatherBit(city) {
    this.http.getWeatherBit(city).subscribe(data => {
      this.weatherBitWeather = data;
      console.log(this.weatherBitWeather);
    });
  }

  getApixu(city) {
    this.http.getApixu(city).subscribe(data => {
      this.apixuWeather = data;
      console.log(this.apixuWeather);
    });
  }


}
