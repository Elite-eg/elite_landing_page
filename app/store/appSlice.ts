import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_REGION, type RegionCode } from "@/lib/constants";

export interface AppState {
  isInitialized: boolean;
  theme: "light" | "dark";
  /** Visitor country, drives the currency prices are shown in. */
  region: RegionCode;
}

const initialState: AppState = {
  isInitialized: true,
  theme: "light",
  region: DEFAULT_REGION,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setRegion: (state, action: PayloadAction<RegionCode>) => {
      state.region = action.payload;
    },
  },
});

export const { setTheme, setRegion } = appSlice.actions;
export default appSlice.reducer;
