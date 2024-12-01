import { useEffect, useRef, useState } from "react";

import { getWeatherData } from "../../modules/weathers";

import CardBox from "../../components/CardBox";
import SearchBox from "../../components/SearchBox";
import WeatherCard, { IWeather } from "../../components/WeatherCard";

import "./index.css";
import Loading from "../../components/Loading";

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
*/

function MainLayout() {
  const [data, setData] = useState<IWeather[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    if (isLoading) return; // Prevent multiple requests while loading

    try {
      setLoading(true);
      const newData: IWeather[] = await getWeatherData({page: currentPage, pageSize: 2})

      setData(prev => [...prev, ...newData]);
      setLoading(false);
      setCurrentPage(prev => prev + 1)
    }
    catch (error) {
      console.log("Error when get weather data: ", error)
      // alert("Having a issue when get weather data, please try again!")
    }
  };

  return (
    <div className="MainLayout">
      <CardBox>
        <SearchBox />
        <div className="Scroller">
          {data?.map((each) => (
            <WeatherCard className={"mb-2"} data={each}></WeatherCard>
          ))}
        </div>
        <Loading isLoading={isLoading}/>
      </CardBox>
    </div>
  );
}

export default MainLayout;
