import axios from "axios";
import { routing } from "@/i18n/routing";
import { log } from "./logger";

/**
 * Shared Axios instance. All HTTP traffic goes through here.
 * - baseURL: TBD. No backend is connected yet, so requests go to the site's own origin.
 * - Never throws on HTTP status codes: callers check `response.status` (2xx = success).
 * - Requests are logged in development only, without headers (they carry the auth token).
 */
const ApiService = axios.create({
  // baseURL: TBD (backend API origin, owner to provide)
  validateStatus: () => true,
});

const isDev = process.env.NODE_ENV !== "production";

ApiService.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // The page language set by the root layout on <html lang>, so the backend can reply in it.
    config.headers["lang"] = document.documentElement.lang || routing.defaultLocale;
  }

  if (isDev) log.debug("[api] request", config.method?.toUpperCase(), config.url);
  return config;
});

ApiService.interceptors.response.use(
  (response) => {
    if (isDev) log.debug("[api] response", response.status, response.config.url);
    return response;
  },
  (error) => {
    // Only network failures and timeouts reach here (validateStatus accepts every status code).
    log.error("[api] network error", error?.message);
    return Promise.reject(error);
  }
);

export default ApiService;
