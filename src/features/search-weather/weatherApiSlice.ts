import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Coordinates,
  GeocodingApiResponse,
  CurrentWeatherApiResponse,
  ForecastWeatherApiResponse,
} from "../../types/apiTypes";

const isLocal = import.meta.env.MODE === "development";
const apiKey = import.meta.env.VITE_API_KEY;

interface BuildQueryStringParams {
  coords: Coordinates;
  apiCallType: string;
}

const buildQueryString = ({ coords, apiCallType }: BuildQueryStringParams) =>
  isLocal
    ? `data/2.5/${apiCallType}?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}` // OpenWeather API direct call for local development
    : `getWeatherData?lat=${coords.lat}&lon=${coords.lon}&apiCallType=${apiCallType}`; // Serverless function in production

export const weatherApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: isLocal ? "https://api.openweathermap.org" : "/api", // Use OpenWeather API locally, serverless functions in production
  }),
  reducerPath: "weatherApi",
  endpoints: (builder) => ({
    getCityCoordinates: builder.query<GeocodingApiResponse, string>({
      query: (city) =>
        isLocal
          ? `geo/1.0/direct?q=${city}&appid=${apiKey}` // OpenWeather API directly for local development
          : `getCityCoordinates?city=${city}`, // Use serverless function in production
    }),
    getCurrentWeather: builder.query<CurrentWeatherApiResponse, Coordinates>({
      query: (coords) => buildQueryString({ coords, apiCallType: "weather" }),
    }),
    getForecastWeather: builder.query<
      ForecastWeatherApiResponse["list"],
      Coordinates
    >({
      query: (coords) => buildQueryString({ coords, apiCallType: "forecast" }),
      transformResponse: (response: ForecastWeatherApiResponse) =>
        response.list,
    }),
  }),
});

export const {
  useLazyGetCityCoordinatesQuery,
  useLazyGetCurrentWeatherQuery,
  useLazyGetForecastWeatherQuery,
} = weatherApiSlice;
