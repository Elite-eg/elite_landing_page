import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_COUNTRY, type CountryCode } from "@/lib/countries";

export interface AppState {
  isInitialized: boolean;
  theme: "light" | "dark";
  country: CountryCode;
}

const initialState: AppState = {
  isInitialized: true,
  theme: "light",
  country: DEFAULT_COUNTRY,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setCountry: (state, action: PayloadAction<CountryCode>) => {
      state.country = action.payload;
    },
  },
});

export const { setTheme, setCountry } = appSlice.actions;
export default appSlice.reducer;
