import axios from "axios";
import { getToken } from "../Token";

export const setAuthorizationToken = async () => {

  let o:any = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5hdHRhd3V0MjkwNyIsIm5hbWUiOiLguJnguLLguKIg4LiT4Lix4LiQ4Lin4Li44LiS4Li0IOC4l-C4reC4h-C4hOC4syIsInVzZXJfaWQiOjYsInVzZXJfdHlwZSI6ImFkbWluIiwiaWF0IjoxNzQwMjI4MzQwLCJleHAiOjE3NDI5MDY3NDB9.L6LTkN7wogOqtlgRPLcXXUeh0eylpIEuq78kU_yw3EI`

  //console.log(getToken())
  axios.interceptors.request.use(
    (config:any) => {
      config.headers["Authorization"] = `Bearer ${getToken() || o}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
