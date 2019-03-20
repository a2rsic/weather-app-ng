import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { WeatherService } from '../_services/weather.service';
import { WeatherLocation } from '../_entities/WeatherLocation';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {
  weatherLocations$: Observable<WeatherLocation[]>

  private searchTerms = new Subject<string>();

  constructor(private weatherService: WeatherService) { }

  search(input: string): void {
    this.searchTerms.next(input)
  }

  ngOnInit() {
    this.weatherLocations$ = this.searchTerms.pipe(
      debounceTime(100),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {

        return this.weatherService.searchWeatherLocations(term)
      })
    )
  }

}
