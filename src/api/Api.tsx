import axios from "axios";
import config from "../config/app.config"
import { setAuthorizationToken } from "../helpers/axios";

setAuthorizationToken();


const Api = {
    getAllMember: async (data:any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/getallMember`,
            headers: {
                'Content-Type': 'application/json'
            },
             data: data
        };

        return await axios(resData);
    },
    getTransaction: async () => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/getTransaction`,
            headers: {
                'Content-Type': 'application/json'
            },
            // data: data
        };

        return await axios(resData);
    },
    getWithdrawalTransaction: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getWithdrawalTransaction`,
            headers: {
                'Content-Type': 'application/json'
            },
            // data: data
        };

        return await axios(resData);
    },
    getDepositTransaction: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getDepositTransaction`,
            headers: {
                'Content-Type': 'application/json'
            },
            // data: data
        };

        return await axios(resData);
    },
    getdataMerchang: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getdataMerchang`,
            headers: {
                'Content-Type': 'application/json'
            },
            // data: data
        };

        return await axios(resData);
    },
    postEditProfile: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/postEditProfile`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getListOfBankAccounts: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getListOfBankAccounts`,
            headers: {
                'Content-Type': 'application/json'
            },
            // data: data
        };

        return await axios(resData);
    },
    getallAdmin: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getallAdmin`,
            headers: {
                'Content-Type': 'application/json'
            },
            // data: data
        };

        return await axios(resData);
    },
    getall_BankGrop: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/v1/admin/getall_BankGrop`,
            headers: {
                'Content-Type': 'application/json'
            },
            // data: data
        };

        return await axios(resData);
    },



    // Report
    postOverviewReports: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/postOverviewReport`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },

    postOverviewReportChart: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/v1/admin/postOverviewReportChart`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
}

export default Api
