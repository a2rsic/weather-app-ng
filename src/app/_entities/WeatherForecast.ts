import { Weather } from './Weather';

export class WeatherForecast {
    constructor(
        public id: number,
        public name: string,
        public forecasts: any[]
    ) { }

    get weathers(): Weather[] {
        return this.forecasts.map((forecast) => {
            const { id, weather_state_name, weather_state_abbr, applicable_date, min_temp, max_temp, the_temp, humidity } = forecast;
            return new Weather(
                id,
                weather_state_name,
                weather_state_abbr,
                applicable_date,
                min_temp,
                max_temp,
                the_temp,
                humidity
            )
        })
    }
}