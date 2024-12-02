import { API_URL } from "../../constants/config";

export interface ICity {
  id: number;
  city: string;
  country: string;
}

export interface ICityRequest {
  page?: number;
  pageSize?: number;
  search?: string;
}

const getCityData = async ({
  page = 1,
  pageSize = 10,
  search,
}: ICityRequest) => {
  try {
    const payload: Omit<ICityRequest, "page" | "pageSize"> = {};
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
    const data: ICity[] = await response.json();

    // // Need to simulate the pagination because this API do not have that feature
    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

    // Simulate another API for cities
    return paginatedData.map(({ id, city, country }) => ({
      id,
      city,
      country,
    }));
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
    return [];
  }
};

export { getCityData };
