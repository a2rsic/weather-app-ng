import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { WeatherService } from '../_services/weather.service';
import { WeatherForecast } from '../_entities/WeatherForecast';


@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  @Input() weatherForecast: WeatherForecast;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private location: Location

  ) { }

  getForecast() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.weatherService.getWeatherForecast(id)
      .subscribe((locationForecast) => {
        this.weatherForecast = locationForecast

      })

  }

  goBack(): void {
    this.location.back()
  }

  ngOnInit() {
    this.getForecast()
  }

}
