import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// List of non-auth routes
const nonAuthRoutes = ["/auth/login", "/auth/register"];

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (!token && config.url && !nonAuthRoutes.includes(config.url)) {
      window.location.href = "/login";
      return Promise.reject(new Error("No auth token found, redirecting to login"));
    }

    if (token && config.url && !nonAuthRoutes.includes(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response && error.response.data.message === "Invalid or expired token") {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
