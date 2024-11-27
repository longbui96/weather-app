import { API_URL } from "../../constants/config";
import { IWeather } from "../../components/WeatherCard";

const getWeatherData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/weathers`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IWeather[] = await response.json();
    return data;
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
  }
};

export { getWeatherData };
