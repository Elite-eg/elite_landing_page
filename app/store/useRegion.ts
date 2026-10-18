"use client";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, setCookie } from "cookies-next/client";
import { REGION_COOKIE, REGIONS, type RegionCode } from "@/lib/constants";
import type { AppDispatch, RootState } from "./index";
import { setRegion } from "./appSlice";

const ONE_YEAR = 60 * 60 * 24 * 365;

const isRegionCode = (value: unknown): value is RegionCode =>
  REGIONS.some((region) => region.code === value);

/** Current visitor region + a setter that also persists it in the "region" cookie. */
export function useRegion() {
  const region = useSelector((state: RootState) => state.app.region);
  const dispatch = useDispatch<AppDispatch>();

  // Restore the saved choice after hydration (the server always renders the default).
  useEffect(() => {
    const saved = getCookie(REGION_COOKIE);
    if (isRegionCode(saved)) dispatch(setRegion(saved));
  }, [dispatch]);

  const changeRegion = useCallback(
    (code: RegionCode) => {
      setCookie(REGION_COOKIE, code, { maxAge: ONE_YEAR, path: "/" });
      dispatch(setRegion(code));
    },
    [dispatch]
  );

  return { region, changeRegion };
}
