export interface Coordinates {
    latitude : number;
    longitude : number;
}
export interface WeatherCondition {
    id : number;
    main: string;
    description : string;
    icon : string;
}

export interface WeatherData {
    coord : Coordinates;
    weather: WeatherCondition[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
        country: number;
    };
    name: string;
    dt: number;
}

export interface ForecastData{
    list: Array<{
        dt: number;
        main: WeatherData["main"];
        weather: WeatherCondition[];
        wind: WeatherData["wind"];
        dt_txt: string;
    }>;
    city: {
        id?: number;
        coord? : Coordinates;
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    }
}

export interface GeocodingResponse{
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state? : string;
}