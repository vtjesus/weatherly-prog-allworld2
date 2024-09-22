import { createSlice } from "@reduxjs/toolkit";
import { weatherApiSlice } from "./weatherApiSlice";
import getCountryName from "../../utils/getCountryName";
import formatDateFromTimestamp from "../../utils/formatDateFromTimestamp";
import { reduceToDailyForecast } from "../../utils/weatherUtils";
import type WeatherSliceState from "../../types/weatherSliceTypes";

const initialState: WeatherSliceState = {
  cityData: {
    name: "",
    country: null,
  },
  currentWeather: null,
  forecastWeather: null,
  stagingData: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      weatherApiSlice.endpoints.getCityCoordinates.matchFulfilled,
      (state, action) => {
        const cityData = action.payload?.[0];

        if (!cityData) {
          return;
        }

        const { name, country: countryCode } = cityData;
        state.stagingData = {
          cityData: {
            name,
            country: getCountryName(countryCode),
          },
        };
      }
    );
    builder.addMatcher(
      weatherApiSlice.endpoints.getCurrentWeather.matchFulfilled,
      (state, action) => {
        const { dt: timestamp, timezone: timezoneOffset } = action.payload;

        state.stagingData!.currentWeather = {
          ...action.payload,
          formattedDate: formatDateFromTimestamp(timestamp, timezoneOffset),
        };
      }
    );
    builder.addMatcher(
      weatherApiSlice.endpoints.getForecastWeather.matchFulfilled,
      (state, action) => {
        const cityCurrentIsoDate =
          state.stagingData!.currentWeather?.formattedDate.isoDate ?? "";

        let dailyForecast = reduceToDailyForecast(action.payload);

        const todayForecastIndex = dailyForecast.findIndex(
          (dayForecast) => dayForecast.dt_txt === cityCurrentIsoDate
        );

        if (todayForecastIndex !== -1) {
          const todayForecast = dailyForecast[todayForecastIndex];
          state.stagingData!.currentWeather!.pop = todayForecast.pop;

          dailyForecast = dailyForecast.slice(todayForecastIndex + 1);
        } else {
          state.stagingData!.currentWeather!.pop = 0;
        }

        const { cityData, currentWeather } = state.stagingData!;
        state.cityData = cityData;
        state.currentWeather = currentWeather;
        state.forecastWeather = dailyForecast;
        state.stagingData = null;
      }
    );
  },
  selectors: {
    selectCityData: ({ cityData }) => cityData,
    selectCurrentWeather: ({ currentWeather }) => currentWeather,
    selectForecastWeather: ({ forecastWeather }) => forecastWeather,
  },
});

export const { selectCityData, selectCurrentWeather, selectForecastWeather } =
  weatherSlice.selectors;
