import { useEffect, useState } from "react";

import { waitForSeconds } from "../../utils";
import { getWeatherData } from "../../modules/weathers";
import { getCityData } from "../../modules/cities";

import CardBox from "../../components/CardBox";
import SearchBox, { ISuggestionItem } from "../../components/SearchBox";
import WeatherCard, { IWeather } from "../../components/WeatherCard";
import InfiniteScroller from "../../components/InfiniteScroller";
import Slider from "../../components/Slider";

import "./index.css";

/*
  1. Tech Stack:
    • React & TypeScript: Use React for UI and TypeScript for type safety. 
    • No Additional Libraries: Rely only on built-in React and JavaScript/TypeScript features. 
    • Following FSD (Feature Slice Design) is a plus: Structure your code by features to maintain scalability and separation of concerns.
  2. Features: 
    • City Search: Implement a search bar to find cities by name.
    • API Integration: Fetch weather data and handle responses, loading, and errors. 
  3. User Interface: 
    • Design a clean, responsive UI displaying city names, temperatures, and weather conditions. 
  4. Code Quality: 
    • Follow React and TypeScript best practices with strong typing, clean code, and reusable components. Deliverables: 
    • GitHub repository with the source code. 
    • README with setup instructions. Evaluation Criteria: 
    • Functionality, code quality, UI/UX, API handling, and adherence to feature slice design (if implemented).

  Header:
    "Выберите город" → "Select a city"

  Slider label:
    "Теплее чем" → "Warmer than"

  List items:
    "Пущино, 4°C" → "Pushchino, 4°C"
    "PM 10: 132" → "PM 10: 132"
    "Ветер: 2 м/с" → "Wind: 2 m/s"

    "Алексин, 8°C" → "Aleksin, 8°C"
    "PM 10: 115" → "PM 10: 115"
    "Ветер: 1 м/с" → "Wind: 1 m/s"

    "Чехов, 5°C" → "Chekhov, 5°C"
    "PM 10: 42" → "PM 10: 42"
    "Ветер: 2 м/с" → "Wind: 2 m/s"
*/

const INIT_SLIDER_VALUE = 10;

function MainLayout() {
  const [data, setData] = useState<IWeather[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const [warmerThan, setWarmerThan] = useState<number>(INIT_SLIDER_VALUE);

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, warmerThan]);

  const getWeather = async () => {
    if (isLoading) return; // Prevent multiple requests while loading

    try {
      setLoading(true);
      await waitForSeconds(0.2); // Simulate the network loading

      const payload: any = {
        page: currentPage,
        pageSize: 10,
      };
      if (search) {
        payload.search = search;
      }

      let newData: IWeather[] = await getWeatherData(payload);

      if (warmerThan) {
        newData = newData.filter((e) => e.temperature > warmerThan);
      }

      if (newData.length !== 0) {
        setData([...data, ...newData]);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.log("Error when get weather data: ", error);
      // alert("Having a issue when get weather data, please try again!")
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async (searchValue: string) => {
    const cities = await getCityData({
      page: 1,
      pageSize: 5,
      search: searchValue,
    });
    const suggestions: ISuggestionItem[] = cities.map((e) => ({
      label: e.city,
      value: e.city,
    }));
    return suggestions;
  };

  const refreshAll = () => {
    setData([]);
    setCurrentPage(1);
  };

  return (
    <div className="MainLayout">
      <CardBox>
        <SearchBox
          className="mb-2"
          placeholder={"Search a city"}
          onSearch={(input) => {
            refreshAll();
            setSearch(input);
          }}
          getSuggestions={getSuggestions}
        />
        <Slider
          className={"mb-2"}
          title="Warmer than"
          minValue={-10}
          maxValue={56}
          initialValue={INIT_SLIDER_VALUE}
          onChange={(value) => {
            refreshAll();
            console.log(value);
            setWarmerThan(value);
          }}
          showValue={true}
          renderValue={(value) => `${Math.round(value * 10) / 10}°C`}
        />
        <InfiniteScroller
          onLoad={() => getWeather()}
          dataSource={data}
          isLoading={isLoading}
        >
          {(item: IWeather, index: number) => (
            <WeatherCard
              key={`WeatherCard-${item.id}`}
              className={"mb-2"}
              data={item}
              onRemove={() => {
                setData([...data.slice(0, index), ...data.slice(index + 1)]);
              }}
            />
          )}
        </InfiniteScroller>
      </CardBox>
    </div>
  );
}

export default MainLayout;
