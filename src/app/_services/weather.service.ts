import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { WeatherLocation } from '../_entities/WeatherLocation';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherUrl = "https://www.metaweather.com/api/"

  constructor(
    private http: HttpClient
  ) { }

  /* GET city whose name contains search term */
  searchWeatherLocations(term: string): Observable<WeatherLocation[]> {
    if (!term.trim()) {
      return of([])
    }

    return this.http.get<WeatherLocation[]>(`${this.weatherUrl}/location/search/?query=${term}`)
      .pipe(
        tap(_ => console.log(`found locations matching "${term}"`)),
      )
  }
}
