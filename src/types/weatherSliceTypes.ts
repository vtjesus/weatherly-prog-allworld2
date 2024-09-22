import formatDateFromTimestamp from "../utils/formatDateFromTimestamp";
import type {
  CurrentWeatherApiResponse,
  ForecastWeatherApiResponse,
} from "./apiTypes";

type FormattedDate = ReturnType<typeof formatDateFromTimestamp>;

interface WeatherSliceState {
  cityData: {
    name: string;
    country: string | undefined | null;
  };
  currentWeather:
    | (CurrentWeatherApiResponse & { formattedDate: FormattedDate })
    | null
    | undefined;
  forecastWeather: ForecastWeatherApiResponse["list"] | null;
  stagingData: null | {
    cityData: WeatherSliceState["cityData"];
    currentWeather?: WeatherSliceState["currentWeather"];
  };
}

export default WeatherSliceState;
