"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCookie } from "cookies-next/client";
import { COUNTRY_COOKIE, countryByCode, type CountryCode } from "@/lib/countries";
import type { AppDispatch, RootState } from "./index";
import { setCountry } from "./appSlice";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * The visitor's country (its whole entry in lib/countries.ts: currency, dial code, mobile format, VAT, payment
 * methods) and a setter that also saves it in the country cookie. Every component using it re-renders with the new
 * country as soon as it changes, wherever it was changed (header switcher, checkout toggle).
 *
 * @example const { country } = useCountry(); // country.currency, country.dialCode, country.paymentMethods
 */
export function useCountry() {
  const code = useSelector((state: RootState) => state.app.country);
  const dispatch = useDispatch<AppDispatch>();

  const changeCountry = useCallback(
    (next: CountryCode) => {
      setCookie(COUNTRY_COOKIE, next, { maxAge: ONE_YEAR, path: "/" });
      dispatch(setCountry(next));
    },
    [dispatch]
  );

  return { country: countryByCode(code), changeCountry };
}
