export type Coordinates = {
  lat: number;
  lon: number;
};

type CityData = {
  name: string;
  country: string;
};

type WeatherData = {
  weather: [{ icon: string; description: string }];
  main: {
    temp?: number;
    temp_min: number;
    temp_max: number;
    humidity?: number;
  };
  wind?: {
    speed: number;
  };
  dt: number;
  dt_txt?: string;
  timezone?: number;
  pop?: number;
};

export type GeocodingApiResponse = (Coordinates & CityData)[];
export type CurrentWeatherApiResponse = WeatherData;
export type ForecastWeatherApiResponse = { list: WeatherData[] };
