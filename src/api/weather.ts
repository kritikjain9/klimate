import { API_CONFIG } from "./config";
import type { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types";

class WeatherAPI{

    private createUrl(endpoint: string, params: Record<string, string | number>){

        //har url ke saath saath, we are seding the API_KEY
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params
        });

        return `${endpoint}?${searchParams.toString()}`
    }

    //writing <T> as we have no idea of the types we will be getting here
    private async fetchData<T>(url: string) : Promise<T>{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Weather API Error : ${response.statusText}`);
        }
        console.log(response);
        return response.json();
    }

    async getCurrentWeather({latitude, longitude} : Coordinates): Promise<WeatherData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            latitude,
            longitude,
            units: API_CONFIG.DEFAULT_PARAMS.units
        });
        return this.fetchData<WeatherData>(url);
    }

    async getForecast({latitude, longitude} : Coordinates) : Promise<ForecastData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: latitude.toString(),
            lon: longitude.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });

        return this.fetchData<ForecastData>(url);
    }

    async reverseGeocode({latitude, longitude} : Coordinates) : Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEOCODING_API}/reverse`, {
            latitude,
            longitude,
            limit: 1
        })

        return this.fetchData<GeocodingResponse[]>(url);
    }
}

export const weatherAPI = new WeatherAPI();