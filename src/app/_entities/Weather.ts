export class Weather {
    constructor(
        public id: number,
        public stateName: string,
        public stateIcon: string,
        public date: string,
        public minTemp: number,
        public maxTemp: number,
        public currentTemp: number
    ) { }

    get iconUrl(): string {
        return `https://www.metaweather.com/static/img/weather/${this.stateIcon}.svg`
    }
}
