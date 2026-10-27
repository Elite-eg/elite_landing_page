import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
// import environment from "@/app/config/environment";
import type { CountryCode } from "@/lib/countries";
import appReducer, { appSlice } from "./appSlice";

/**
 * A new store per request on the server and per page load in the browser (Providers), so visitors never share state.
 * `country` is the visitor's country as the root layout found it (cookie, else geo header, else the default).
 */
export const makeStore = (country: CountryCode) =>
  configureStore({
    reducer: {
      app: appReducer,
    },
    preloadedState: { app: { ...appSlice.getInitialState(), country } },
    // middleware: (getDefaultMiddleware) => {
    //   const middlewares = getDefaultMiddleware();
    //   return environment.isDev ? middlewares.concat(logger) : middlewares;
    // },
    // devTools: environment.isDev,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
