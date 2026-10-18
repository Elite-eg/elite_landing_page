import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
// import environment from "@/app/config/environment";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   const middlewares = getDefaultMiddleware();
  //   return environment.isDev ? middlewares.concat(logger) : middlewares;
  // },
  // devTools: environment.isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
