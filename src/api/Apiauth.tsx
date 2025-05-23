import axios from "axios";
import config from "../config/app.config"
import { setAuthorizationToken } from "../helpers/axios";
import { getToken } from "../Token";

setAuthorizationToken();

const Apiauth = {

  chack_apilogin: async () => {

    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/chack_apilogin`,
      headers: {
        'Content-Type': 'application/json'
      },
      // data:data
    };

    return await axios(resData);
  },
 
  editAdmin: async (data: any) => {

    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/postEditAdmin`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    return await axios(resData);
  },
  podtAddadmin: async (data: any) => {

    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/create-admin`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    return await axios(resData);
  },
  addRoles: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/addpermission`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    return await axios(resData);
  },
  getRole: async () => {
    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/getalldata_Role`,
      headers: {
        'Content-Type': 'application/json'
      },
      // data: data
    };

    return await axios(resData);
  },
  getDataPermissions: async () => {

    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/alldata_permissions`,
      headers: {
        'Content-Type': 'application/json'
      },
      // data: data
    };

    return await axios(resData);
  },
  getActivity_system: async () => {

    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/getActivity_system`,
      headers: {
        'Content-Type': 'application/json'
      },
      // data: data
    };

    return await axios(resData);
  },
  getProfileAdmin: async () => {
    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/getProfileAdmin`,
      headers: {
        'Content-Type': 'application/json'
      },
      // data: data
    };

    return await axios(resData);
  },
  postChangPassword: async (data: any) => {

    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/changPassword`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    return await axios(resData);
  },
  editRolePermission: async (data: any) => {

    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/editRolePermission`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    return await axios(resData);
  },
  editPermission: async (data: any) => {

    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/editPermission`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    return await axios(resData);
  },
  searchTransaction: async (data: any) => {

    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/search/getSearchDataTransaction`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    return await axios(resData);
  },
}
export default Apiauth
