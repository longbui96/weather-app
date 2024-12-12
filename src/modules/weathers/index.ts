import { IWeather } from "../../components/WeatherCard";
import openWeatherMap from "../../fetcher/intances/open-weather-map";
import { kelvinToCelsius } from "../../utils";

interface IWeatherRequest {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // Optional, as it might not always be present
    grnd_level?: number; // Optional, as it might not always be present
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number; // Optional, as it might not always be present
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const getWeatherData = async ({
  page = 1,
  pageSize = 10,
  search,
}: IWeatherRequest) => {
  try {
    const payload: { q?: string } = {};
    if (search) {
      payload.q = search;
    }

    const data: WeatherResponse = await openWeatherMap.get(
      "/data/2.5/weather",
      {
        params: payload,
      }
    );

    const convertedData: IWeather[] = [
      {
        id: data?.id,
        city: data?.name,
        latitude: data?.coord?.lat,
        longitude: data?.coord?.lon,
        temperature: Math?.round(kelvinToCelsius(data?.main?.temp) * 10) / 10,
        weather_description: data?.weather[0]?.main,
        humidity: data?.main?.humidity,
        wind_speed: data?.wind?.speed,
        country: "", // TODO
        forecast: [], // TODO
      },
    ];

    return convertedData;
  } catch (err) {
    // alert(err instanceof Error ? err.message : "Unknown error");
    return [];
  }
};

export { getWeatherData };
