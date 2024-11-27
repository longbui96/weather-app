import "./index.css";
import CardBox from "../../components/CardBox";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { getWeatherData } from "../../modules/weathers";
import WeatherCard, { IWeather } from "../../components/WeatherCard";
import Button from "../../components/Button";

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
  const [data, setData] = useState<IWeather[] | undefined>([]);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    try {
      const response: IWeather[] | undefined = await getWeatherData();
      setData(response);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="MainLayout">
      <CardBox>
        <Input />
        <Button>Search</Button>
        {data?.map((each) => (
          <WeatherCard data={each}></WeatherCard>
        ))}
      </CardBox>
    </div>
  );
}

export default MainLayout;
