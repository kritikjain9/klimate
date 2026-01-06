import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { WeatherSkeleton } from '@/components/ui/loading-skeleton';
import { useGeolocation } from '@/hooks/use-geolocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertCircle, AlertTriangle, MapPin, RefreshCw } from 'lucide-react'

const WeatherDashboard = () => {

  const { 
    coordinates, 
    error: locationError,
    isLoading: locationDataLoading,
    getLocation
   } = useGeolocation();
 
   const weatherQ = useWeatherQuery(coordinates);
  //  console.log(weatherQ.data);
   const forecastQ = useForecastQuery(coordinates);
  //  console.log(forecastQ.data);
   const reverseGeoQ = useReverseGeocodeQuery(coordinates);
  //  console.log(typeof(reverseGeoQ.data)

  // const currentCity = reverseGeoQ.data
  const handleRefresh = () => {
    getLocation();
  }
  
    if(locationDataLoading){
      return <WeatherSkeleton />
    }

  if(locationError){
    return <Alert variant={"destructive"}>
      <AlertTriangle className='h-4 w-4' />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription>
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className='w-fit mt-2'>
          <MapPin className='mr-2 h-4 w-4' />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  }

  if(!coordinates){
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
          Please enable location access to see your local weather.
        </AlertDescription>
        <AlertDescription>
          <p></p>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      {/* favourite cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight"></h1>
        <h1 className="text-xl font-bold tracking-tight">
          {/* My coordinates
          {coordinates?.latitude}
          {coordinates?.longitude} */}
        </h1>
        <h1 className="text-xl font-bold tracking-tight">
          My location
          {currentCity}
        </h1>
        <Button 
          onClick={handleRefresh}
          // disabled={}
          variant={"outline"}
          size={"icon"}
        >
          <RefreshCw className='h-4 w-4'/>
        </Button>
      </div>
    </div>
  )
}

export default WeatherDashboard