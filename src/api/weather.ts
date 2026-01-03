import { API_CONFIG } from "./config";
import type { Coordinates } from "./types";

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
        // return await response.json();
    }

    async getCurrentWeather({latitude, longitude} : Coordinates){
        // const url = this.createUrl(API_CONFIG.BASE_URL, <"/weather", latitude, longitude>);
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            latitude,
            longitude
        })
    }


}