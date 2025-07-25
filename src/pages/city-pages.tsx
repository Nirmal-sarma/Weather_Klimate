import CurrentWeather from '@/components/current-weather';
import FavoriteButton from '@/components/favorite-button';
import HourlyTemparature from '@/components/hourly-temparature';
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import WeatherDetails from '@/components/weather-details';
import WeatherForecast from '@/components/weather-forecast';
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather.ts';
import { AlertTriangle } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom'



const Citypages = () => {
  const [searchParams]=useSearchParams();
  const params=useParams();
  const lat=parseFloat(searchParams.get("lat") || "0");
  const lon=parseFloat(searchParams.get("lon") || "0");
  const coordinates={lat,lon};
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

    if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Failed to load weather data.Please try again.
        </AlertDescription>
      </Alert>
    );
  }
    if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className='text-3xl font-bold tracking-tight'>{params.cityName},{weatherQuery.data.sys.country}</h1>
        <div>  <FavoriteButton data={{...weatherQuery.data,name: params.cityName}}/></div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {weatherQuery.data && (
            <CurrentWeather data={weatherQuery.data} />
          )}
          {forecastQuery.data && (

            <HourlyTemparature data={forecastQuery.data} />
          )}
        </div>
         <div className="grid gap-6 md:grid-cols-2 items-start">
          {weatherQuery.data && <WeatherDetails data={weatherQuery.data} />}
          {forecastQuery.data && <WeatherForecast data={forecastQuery.data} />}
        </div>
      </div>
    </div>
  )
}

export default Citypages
