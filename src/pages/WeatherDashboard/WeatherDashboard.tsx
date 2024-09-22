import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCityData } from "../../features/search-weather/weatherSlice";
import useScrolled from "../../hooks/useScrolled";
import SearchWeather from "../../features/search-weather/SearchWeather";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";
import * as StyledCommon from "../../common/components/styled";
import * as StyledWeatherDashboard from "./WeatherDashboard.styles";

const Styled = { ...StyledWeatherDashboard, Common: { ...StyledCommon } };

function WeatherDashboard() {
  const navigate = useNavigate();
  const cityData = useAppSelector(selectCityData);
  const isScrolled = useScrolled();

  const [currentTempUnit, setCurrentTempUnit] = useState<"C" | "F">("C");

  const handleTempUnitToggle = () =>
    setCurrentTempUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));

  useEffect(() => {
    if (!cityData.name) {
      navigate("/");
    }
  }, [cityData.name, navigate]);

  return (
    <>
      <Styled.Header $isScrolled={isScrolled}>
        <SearchWeather />
      </Styled.Header>
      <Styled.Main>
        <CurrentWeather
          currentTempUnit={currentTempUnit}
          onToggleTempUnit={handleTempUnitToggle}
        />
        <ForecastWeather currentTempUnit={currentTempUnit} />
      </Styled.Main>
    </>
  );
}

export default WeatherDashboard;
