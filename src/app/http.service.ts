import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Weather} from "./model/weather";
import {Joke} from "./model/joke";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getOpenWeatherMap(city: string) {
    let params = new HttpParams().set('city', city);
    return this.http.get<Weather>('http://localhost:8080/owm/weather',{ params: params })
  }

  getWeatherStack(city: string) {
    let params = new HttpParams().set('city', city);
    return this.http.get<Weather>('http://localhost:8080/ws/weather',{ params: params })
  }

  getWeatherBit(city: string) {
    let params = new HttpParams().set('city', city);
    return this.http.get<Weather>('http://localhost:8080/wb/weather',{ params: params })
  }

  getJoke() {
    return this.http.get<Joke>('http://localhost:8080/joke')
  }
}
