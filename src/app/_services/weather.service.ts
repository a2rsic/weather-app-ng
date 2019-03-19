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

  /* GET city whose name contains search term */
  searchWeatherLocations(term: string): Observable<WeatherLocation[]> {
    if (!term.trim()) {
      return of([])
    }

    return this.http.get<WeatherLocation[]>(`/api/location/search/?query=${term}`)
      .pipe(
        tap(_ => console.log(`found locations matching "${term}"`)),
        // map(weatherLocation => WeatherLocation[0]),
        // catchError(err => of([1]))

      )
  }

  getWeatherForecast(id: number): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(`/api/location/${id}/`)
  }
}
