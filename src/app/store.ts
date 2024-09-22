import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { weatherApiSlice } from "../features/search-weather/weatherApiSlice";
import { weatherSlice } from "../features/search-weather/weatherSlice";

const rootReducer = combineSlices(weatherApiSlice, weatherSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(weatherApiSlice.middleware);
    },
    devTools: import.meta.env.NODE_ENV !== "production",
    preloadedState,
  });
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
