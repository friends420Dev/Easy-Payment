import axios from "axios";
import { getToken } from "../config/authsave";

export const setAuthorizationToken_Scb = async () => {
  axios.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
      config.headers["Aurhtokenserver"] = ``;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
