import Axios from "axios";
import { keycloak } from "./auth";

export const http = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const authHttp = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
authHttp.interceptors.request.use((config) => {
  if (keycloak?.token) {
    config.headers["Authorization"] = "Bearer " + keycloak?.token;
    return config;
  }
  return new Promise((resolve, reject) => {
    keycloak.onAuthSuccess = () => {
      config.headers["Authorization"] = "Bearer " + keycloak?.token;
      resolve(config);
    };
    keycloak.onAuthError = () => {
      reject(config);
    };
  });
});
