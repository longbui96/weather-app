import { API_URL } from "../../constants/config";
import { IWeather } from "../../components/WeatherCard";

interface IWeatherRequest {
  page?: number,
  pageSize?: number
}

const getWeatherData = async ({page = 1, pageSize = 10}: IWeatherRequest) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/weathers`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IWeather[] = await response.json();

    // Need to simulate the pagination because this API do not have that feature
    // const paginatedData = data.slice((page - 1) * pageSize, page * pageSize)

    return data;
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
    return [];
  }
};

export { getWeatherData };
