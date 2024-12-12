import openWeatherMap from "../../fetcher/intances/open-weather-map";

export interface ICity {
  id: number;
  city: string;
  country: string;
}

export interface ICityRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  appid?: string;
}

const getCityData = async ({
  page = 1,
  pageSize = 10,
  search,
}: ICityRequest) => {
  try {
    const payload: { q?: string } = {};
    if (search) {
      payload.q = search;
    }

    const data: any[] = await openWeatherMap.get("/geo/1.0/direct", payload);

    // Simulate another API for cities
    return data.map(({ id, city, country }) => ({
      id,
      city,
      country,
    }));
  } catch (err) {
    // alert(err instanceof Error ? err.message : "Unknown error");
    return [];
  }
};

export { getCityData };
