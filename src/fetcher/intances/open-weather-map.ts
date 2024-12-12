import { API_KEY, API_URL } from "../../constants/config";
import Fetcher from "..";

// Since the native API has CORS issues I need to use this service temporarily to allow it
const CORSED_API_URL = `https://cors-anywhere.herokuapp.com/${API_URL}`;

const openWeatherMap = new Fetcher({
  baseURL: CORSED_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  apiKey: API_KEY,
});

export default openWeatherMap;
