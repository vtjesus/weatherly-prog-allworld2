import convertTemperature from "./convertTemperature";
import temperatureLogo from "../assets/temperature.svg";
import rainLogo from "../assets/rain.svg";
import humidityLogo from "../assets/humidity.svg";
import windLogo from "../assets/wind.svg";
import type WeatherSliceState from "../types/weatherSliceTypes";
import type { ForecastWeatherApiResponse } from "../types/apiTypes";

// Function to reduce the array to one object per day following the WeatherData structure
export function reduceToDailyForecast(
  data: ForecastWeatherApiResponse["list"]
) {
  const result: Record<
    string,
    {
      dt: number;
      temp_max: number;
      temp_min: number;
      pop: number;
      iconFrequency: Record<string, { count: number; description: string }>;
      count: number;
      dt_txt: string;
    }
  > = {};

  data.forEach((entry) => {
    const date = entry.dt_txt!.split(" ")[0]; // Extract the date part (YYYY-MM-DD)
    const iconNumber = entry.weather[0].icon.slice(0, -1); // Extract icon number (remove 'd' or 'n')
    const description = entry.weather[0].description; // Get the description

    // If this date is not in the result object yet, initialize it
    if (!result[date]) {
      result[date] = {
        dt: entry.dt,
        temp_max: entry.main.temp_max,
        temp_min: entry.main.temp_min,
        pop: entry.pop!,
        iconFrequency: { [iconNumber]: { count: 1, description } }, // Track icon frequency and description
        count: 1, // Track how many entries per day for averaging pop
        dt_txt: date, // Store the date part only
      };
    } else {
      // Update temp_max and temp_min if current entry has higher/lower values
      result[date].temp_max = Math.max(
        result[date].temp_max,
        entry.main.temp_max
      );
      result[date].temp_min = Math.min(
        result[date].temp_min,
        entry.main.temp_min
      );

      // Add to pop and increment count for later averaging
      result[date].pop += entry.pop!;
      result[date].count += 1;

      // Update icon frequency and description
      if (result[date].iconFrequency[iconNumber]) {
        result[date].iconFrequency[iconNumber].count += 1;
      } else {
        result[date].iconFrequency[iconNumber] = { count: 1, description };
      }
    }
  });

  // Function to find the most frequent icon number and its description
  function getMostFrequentIconData(
    iconFrequency: Record<string, { count: number; description: string }>
  ) {
    return Object.keys(iconFrequency).reduce((a, b) =>
      iconFrequency[a] > iconFrequency[b] ? a : b
    );
  }

  // Finalize the result, averaging the pop value and removing the count
  return Object.keys(result).map((date) => {
    const mostFrequentIcon = getMostFrequentIconData(
      result[date].iconFrequency
    );

    return {
      dt: result[date].dt,
      main: {
        temp_min: result[date].temp_min,
        temp_max: result[date].temp_max,
      },
      weather: [
        {
          icon: mostFrequentIcon,
          description: result[date].iconFrequency[mostFrequentIcon].description,
        },
      ] as [{ icon: string; description: string }], // Most frequent icon and description
      pop: Math.round((result[date].pop / result[date].count) * 100), // Average pop value
      dt_txt: result[date].dt_txt, // Include the date part
    };
  });
}

export const getCurrentWeatherCardsData = (
  currentWeather: WeatherSliceState["currentWeather"],
  currentTempUnit: "C" | "F"
) => {
  const currentWeatherCardsData = [
    {
      title: "Max/min",
      value: `${convertTemperature(
        currentWeather?.main.temp_max ?? 0,
        currentTempUnit
      )}°/${convertTemperature(
        currentWeather?.main.temp_min ?? 0,
        currentTempUnit
      )}°`,
      iconSrc: temperatureLogo,
    },
    {
      title: "Rain",
      value: `${currentWeather?.pop ?? "\u00A0\u00A0"}%`,
      iconSrc: rainLogo,
    },
    {
      title: "Humidity",
      value: `${currentWeather?.main.humidity}%`,
      iconSrc: humidityLogo,
    },
    {
      title: "Wind",
      value: `${currentWeather?.wind?.speed} m/s`,
      iconSrc: windLogo,
    },
  ];

  return currentWeatherCardsData;
};
