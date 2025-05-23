export const authenticate = (res, next ) => {
    if (window !== "undefiend") {
        localStorage.setItem("token", JSON.stringify(res.token))
        localStorage.setItem("user", JSON.stringify(res.userInfo))
    }
   // next()
}

export const getToken=()=>{
    if (window  !== "undefiend") {
       if(localStorage.getItem("token")) {
        return JSON.parse(localStorage.getItem("token"))
       }else{
        return false
       }
    }
}

export const getUser=()=>{
    if (window !== "undefiend") {
       if(localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"))
       }else{
        return false
       }
    }
}
export const getUser_info=()=>{
    if (window !== "undefiend") {
       if(localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"))
       }else{
        return false
       }
    }
}
export const logout=()=>{
    if (window !== "undefiend") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }
   // next()
}

export const setAuthorizationToken = async () => {


  // axios.interceptors.request.use(
  //   (config) => {
  //     config.headers["Authorization"] = `Bearer ${getToken()}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
};
// /
