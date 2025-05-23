import axios from "axios";
import config from "../config/app.config"
import { setAuthorizationToken } from "../helpers/axios";

setAuthorizationToken();

const Apisetting = {

    Postlogin: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/login_admin`,
            data: data
        };

        return await axios(resData);
    },
    Postlogin_verify: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/verify`,
            data: data
        };

        return await axios(resData);
    },
    signUp: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/v1/admin/signup`, data)
    },
    verifyOtp: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/v1/admin/verify-otp`, data)
    },
    resendOtp: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/v1/admin/resend-otp`, data);
    },
    forgotPassword: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/v1/admin/forgot-password`, data);
    },
    logout: async () => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/logout`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    getdatanewss: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getdatanews`,
            headers: {
                'Content-Type': 'application/json'
            }
            // data: data
        };
        return await axios(resData);
    },
    getall_BankAccount: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getAllBankAccounts`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },

    upBank_level_deposit: async (data: any) => {
        //console.log(data)
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/upBank_level_deposit`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },

    postHistory: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/auth/history`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    postAddbankAcc: async (data: any) => {
        //console.log(data)
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/create_BankAccountApiscb_Kbankz`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    postIsActiveBank: async (data: any) => {
        //console.log(data)
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/update_BankAccounts`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    upBankAccountGroup: async (data: any) => {
        //console.log(data)
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/upBankAccountGroup`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    getall_bankinfo: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getall_bankinfo`,
            headers: {
                'Content-Type': 'application/json'
            },
            // data:data
        };

        return await axios(resData);
    },
    Cratepay: async (data: any) => {

        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/cratepay`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    Postupdate_settings: async (data: any) => {

        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v5/amb/postupdate_set`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    postupdate_all: async (data: any) => {

        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/sarubyod`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    datasetting: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/get_datasetting`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    data_settingagent: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/data_settingagent`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    chack_logins: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/chack_logins`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    chack_loginv2: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/chack_loginv2`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },


    Postchack_settings: async (data: any) => {

        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/chack_logins`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
   
    Postupdate_settings_webfontend: async (data: any) => {

        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/Postupdate_settings_webfontend`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
}
export default Apisetting
