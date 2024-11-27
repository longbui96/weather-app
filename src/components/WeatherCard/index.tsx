import { HTMLAttributes } from "react";
import "./index.css";
import { formatTime } from "../../utils";
import { ReactComponent as IconXMarkCircle } from "../../assets/icons/iconmonstr-x-mark-circle-thin.svg";

/*
  // Example data
  {
    id: 1,
    city: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.006,
    temperature: 25,
    weather_description: "Clear sky",
    humidity: 50,
    wind_speed: 10,
    forecast: [
      {
        date: "2023-07-28",
        temperature: 24,
        weather_description: "Partly cloudy",
        humidity: 55,
        wind_speed: 12,
      },
      {
        date: "2023-07-29",
        temperature: 26,
        weather_description: "Sunny",
        humidity: 48,
        wind_speed: 9,
      },
    ],
  }

*/

export interface IForecast {
  date: string;
  temperature: number;
  weather_description: string;
  humidity: number;
  wind_speed: number;
}

export interface IWeather {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  temperature: number;
  weather_description: string;
  humidity: number;
  wind_speed: number;
  forecast: IForecast[];
}

const WeatherCard = ({
  data,
  ...props
}: Partial<HTMLAttributes<HTMLDivElement>> & { data: IWeather }) => {
  // const latestForecast = data.forecast.sort((a, b) => {
  //   return new Date(b.date).getTime() - new Date(a.date).getTime();
  // })[0];

  return (
    <div className="WeatherCard" {...props}>
      <div className="WeatherCard-City">
        <span>
          {data.city}, {data.temperature}°C
        </span>
      </div>
      <div className="WeatherCard-Details">
        <div key={`${data.city}`}>
          <div>{formatTime(new Date())}</div>
          <div>Wind speed: {data.wind_speed}km/h</div>
          <div>
            Humidity: {data.humidity}g/m<sup>3</sup>
          </div>
        </div>
      </div>
      <div className="WeatherCard-Closer noselect">
        <IconXMarkCircle />
      </div>
    </div>
  );
};

export default WeatherCard;
