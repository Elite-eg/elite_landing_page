import axios from "axios";
// import environment from "../config/environment";

/**
 * Singleton Axios instance. All network traffic flows through here.
 * Every request/response/error is now fully logged.
 */
const ApiService = axios.create({
  // baseURL: environment.apiBaseUrl,
  // withCredentials: true,
  validateStatus: () => true,
});

// ---------- Interceptors ----------
ApiService.interceptors.request.use((config) => {
  return config;
});

ApiService.interceptors.request.use(
  (config) => {
    console.info("[Axios][Request]", {
      method: config.method?.toUpperCase(),
      url: " " + config.baseURL + config.url,
      headers: config.headers,
      data: config.data,
      params: config.params,
    });
    // Add auth token to headers
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add locale to headers
    const locale =
      typeof window !== "undefined" ? localStorage.getItem("locale") : "en";
    if (locale) {
      config.headers["lang"] = locale;
    }

    return config;
  },
  (error) => {
    console.error("[Axios][Request][Error]", error);
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (res) => {
    console.info("[Axios][Response]", {
      url: res.config.url,
      status: res.status,
      data: res.data,
    });
    return res;
  },
  (error) => {
    // Network / timeout / non-2xx
    if (error.response) {
      console.error("[Axios][Response][Error]", {
        url: error.response.config.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error("[Axios][Response][Network-Error]", error.message);
    }
    return Promise.reject(error);
  }
);

export default ApiService;
