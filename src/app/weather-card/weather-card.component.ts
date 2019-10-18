import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {Weather} from "../model/weather";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Joke} from "../model/joke";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  mainSearchForm: FormGroup;
  openWeatherForm: FormGroup;
  weatherBitForm: FormGroup;
  wsForm: FormGroup;
  formBuilder: FormBuilder;
  owmWeather: Weather;
  wsWeather: Weather;
  weatherBitWeather: Weather;
  http: HttpService;
  joke: Joke;
  isHasJoke: boolean;

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
    this.http.getWeatherStack('los angeles').subscribe(data => {
      this.wsWeather = data;
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
    this.wsForm = this.formBuilder.group({
      city: [''],
    });
  }

  submitMainSearch() {
    let city = this.mainSearchForm.value['city'];
    this.getOpenWeatherMap(city);
    this.getWeatherBit(city);
    this.getWeatherStack(city);
    this.mainSearchForm.reset();
  }

  submitOwm() {
    this.getOpenWeatherMap(this.openWeatherForm.value['city']);
    this.openWeatherForm.reset()
  }

  submitApixu() {
    this.getWeatherStack(this.wsForm.value['city']);
    this.wsForm.reset()
  }

  submitWb() {
    this.getWeatherBit(this.weatherBitForm.value['city']);
    this.weatherBitForm.reset()
  }

  getOpenWeatherMap(city) {
    this.isHasJoke = false;
    this.http.getOpenWeatherMap(city).subscribe(data => {
      this.owmWeather = data;
      console.log(this.owmWeather);
      let temp = 20.0;
      if (this.owmWeather.temp >= temp) {
        this.http.getJoke().subscribe(response => {
          console.log(response);
          this.joke = response;
          if (this.joke.value.img == null) {
            this.joke.value.img = 'https://media2.giphy.com/media/BIuuwHRNKs15C/200.webp?cid=790b7611ad7099317869e782054f87b01de3e0e90ec12e34&rid=200.webp';
          }
          this.isHasJoke = true;
        })
      }
    });
  }

  getWeatherBit(city) {
    this.http.getWeatherBit(city).subscribe(data => {
      this.weatherBitWeather = data;
      console.log(this.weatherBitWeather);
    });
  }

  getWeatherStack(city) {
    this.http.getWeatherStack(city).subscribe(data => {
      this.wsWeather = data;
      console.log(this.wsWeather);
    });
  }


}
