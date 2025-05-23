
import axios from "axios";
import config from "../config/app.config"
const Apilogin = {
    Postlogin: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/login_admin`,
            data: data
        };

        return await axios(resData);
    },
    first_time_login: async (data: any) => {
      const resData: any = {
          method: 'post',
          url: `${config.apiURL}/api/v1/admin/login_admin2`,
          data: data
      };

      return await axios(resData);
  },
    logout: async () => {

        const resData: any = {
          method: 'get',
          url: `${config.apiURL}/api/v1/admin/logout`,
          headers: {
            'Content-Type': 'application/json'
          },
          // data:data
        };
    
        return await axios(resData);
      },
}

export default Apilogin