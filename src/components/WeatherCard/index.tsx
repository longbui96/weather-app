import { HTMLAttributes } from "react";

import { formatTime } from "../../utils";
import { ReactComponent as IconXMarkCircle } from "../../assets/icons/x-mark-circle.svg";

import Button from "../Button";

import "./index.css";

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

export interface IWeatherCardProps {
  data: IWeather;
  onRemove?: () => void;
}

const WeatherCard = ({
  data,
  onRemove,
  className,
  ...props
}: Partial<HTMLAttributes<HTMLDivElement>> & IWeatherCardProps) => {
  return (
    <div className={`WeatherCard ${className}`} {...props}>
      <div className="WeatherCard-City">
        <span>
          {data.city}, {data.temperature}°C
        </span>
      </div>
      <div className="WeatherCard-Details">
        <div key={`${data.city}`}>
          <div>{formatTime(new Date())}</div>
          <div>Wind: {data.wind_speed} m/s</div>
          {/* <div>
            Humidity: {data.humidity}g/m<sup>3</sup>
          </div> */}
        </div>
      </div>
      <Button
        className="WeatherCard-Closer noselect"
        onClick={onRemove}
        icon={<IconXMarkCircle />}
      />
    </div>
  );
};

export default WeatherCard;
