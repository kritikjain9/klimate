import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

export interface Geolocation {
    coordinates : Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

// export function useGeolocation(){
export const useGeolocation = () => {
    const [locationData, setLocationData] = useState<Geolocation>({
        coordinates : null,
        error : null,
        isLoading: true
    });

    const getLocation = () => {
        console.log("getLocation called");
        setLocationData((prevData) => ({...prevData, error: null, isLoading: true}));
        if(!navigator.geolocation){
            setLocationData({
                coordinates: null,
                error: "Please provide location permission",
                isLoading: false
            });

            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setLocationData({
                coordinates : {
                    latitude : latitude,
                    longitude : longitude
                },
                error: null,
                isLoading: false
            })
        }, (error) => {
            let errorMessage: string;

            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = "Localtion permission denied. Please enable location access";
                break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Localtion information is not available";
                break;
                case error.TIMEOUT:
                    errorMessage = "Request timed out, please try again";
                break;
                default:
                    errorMessage = "An unknown error occured";
            }

            setLocationData({
                coordinates: null,
                error : errorMessage,
                isLoading: false
            });
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }

    useEffect(() => {
        getLocation();
    }, [])

    return {
        ...locationData, 
        getLocation
    };
}
