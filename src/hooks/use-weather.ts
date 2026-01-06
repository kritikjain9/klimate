import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    // weather : (coords: Coordinates) => (`Weather${coords}`) as const
    weather : (coords: Coordinates) => ["Weather",coords] as const,
    forecast : (coords: Coordinates) => ["Forecast",coords] as const,
    location : (coords: Coordinates) => ["location",coords] as const
} as const;

export const useWeatherQuery = (coords : Coordinates | null) => {
    const query = useQuery({
        queryKey: WEATHER_KEYS.weather(coords?? {latitude: 0, longitude: 0}),
        //ye api call hogi when this function is called
        queryFn: () => coords ? weatherAPI.getCurrentWeather(coords) : null,
        //automatic refetching (api call) nahi hoga if coordinates are not there
        enabled: !!coords
    })
    return query;
}

export const useForecastQuery = (coords : Coordinates | null) => {
    const query = useQuery({
        queryKey: WEATHER_KEYS.forecast(coords ?? {latitude: 0, longitude: 0}),
        queryFn: () => coords ? weatherAPI.getForecast(coords) : null,
        enabled: !!coords
    })

    return query;
}

export const useReverseGeocodeQuery = (coords : Coordinates | null) => {
    const query = useQuery({
        queryKey: WEATHER_KEYS.location(coords ?? {latitude: 0, longitude: 0}),
        queryFn: () => coords ? weatherAPI.reverseGeocode(coords) : null,
        enabled: !!coords
    })

    return query;
}