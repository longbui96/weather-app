import { API_URL } from "../../constants/config";
import { IWeather } from "../../components/WeatherCard";

interface IWeatherRequest {
  page?: number;
  pageSize?: number;
  search?: string;
}

const getWeatherData = async ({
  page = 1,
  pageSize = 10,
  search,
}: IWeatherRequest) => {
  try {
    const payload: Omit<IWeatherRequest, "page" | "pageSize"> = {};
    if (search) {
      payload.search = search;
    }

    const requestURL = new URLSearchParams(payload);
    const response = await fetch(
      `${API_URL}/api/v1/weathers?${requestURL.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IWeather[] = await response.json();

    // // Need to simulate the pagination because this API do not have that feature
    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

    return paginatedData;
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
    return [];
  }
};

export { getWeatherData };
