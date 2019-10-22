import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherCardComponent } from './weather-card/weather-card.component';

const routes: Routes = [
  {path: '', component: WeatherCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
