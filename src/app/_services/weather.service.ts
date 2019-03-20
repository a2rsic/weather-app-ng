import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { WeatherLocation } from '../_entities/WeatherLocation';
import { WeatherForecast } from '../_entities/WeatherForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  searchWeatherLocations(term: string): Observable<WeatherLocation[]> {
    if (!term.trim()) {
      return of([])
    }
    const searchRequestUrl = `/api/location/search/?query=${term}`

    return this.http.get<WeatherLocation[]>(searchRequestUrl)
      .pipe(
        tap(() => console.log(`found locations matching "${term}"`)),
        map(data => data.map((weatherLocation) => {
          const { woeid, title } = weatherLocation as any;
          return new WeatherLocation(woeid, title)
        })),
      )
  }

  getWeatherForecast(id: number): Observable<WeatherForecast> {
    const weatherRequestUrl = `/api/location/${id}/`
    return this.http.get<WeatherForecast>(weatherRequestUrl)
      .pipe(
        map(weatherForecast => {
          const { woeid, title, consolidated_weather } = weatherForecast as any;
          return new WeatherForecast(woeid, title, consolidated_weather)
        })
      )
  }
}
