import axios from 'axios'
import config from '../config/app.config'
import { setAuthorizationToken } from '../helpers/axios'
import { verify } from 'crypto'
import { getToken } from "../Token";
setAuthorizationToken()
const Apibank = {
  gtdata_withdraws: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/gtdata_withdraw`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return await axios(resData)
  },
  get_data_deposit: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/get_data_deposit`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return await axios(resData)
  },
  transferMoney: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/create_transaction_tranfer`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  verify_withdraw: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/verify_withdraw`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    return await axios(resData)
  },
  transferconfirmation: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/transferconfirmations`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    return await axios(resData)
  },
  get_balance_summery: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/get_balance_summery`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    return await axios(resData)
  },
  get_delete_bank_account: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/delete_bank_account`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    return await axios(resData)
  },
  create_Manual: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/create_Manual`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    return await axios(resData)
  },
  upload_Manual: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/upload_Manual`,
      headers: {
        // 'Content-Type': 'application/json',
      },
      data: data,
    }

    return await axios(resData)
  },
  getall_Transaction_manuals: async () => {
    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/getall_Transaction_manuals`,
      headers: {
        'Content-Type': 'application/json',
      },
      // data: data,
    }

    return await axios(resData)
  },


  getdata_bankPlatform: async () => {
    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/getdata_bankPlatform`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      // data: data,
    }

    return await axios(resData)
  },
  upBank_level_deposit: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/upBank_level_deposit`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  upBank_level_withdrawal: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/upBank_level_withdrawal`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  getApiTransferMoneyToAccount: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/create_depprosit_krungthai`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },


  // ****************************************************//
  getCreate_depprositgateway: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/create_depprositgateway`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  getChack_depprositgateway: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/chack_depprositgateway`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  getAll_depprositgateway: async () => {
    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/getall_depprositgateway`,
      headers: {
        'Content-Type': 'application/json',
      },
      // data: data
    }
    return await axios(resData)
  },
  // ************************************************//
  getUpdate_stust_Manual: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/update_stust_Manual`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  getManualUploadSlip: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/chack_upload_Manual`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data
    }
    return await axios(resData)
  },
  getUpdate_autokbank: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/update_autokbank`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },

  getVerifyInfo: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/verrify_tranfer_withdrowinq`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  getChack_stuaus_kbank: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/chack_stuaus_kbank`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  getInstructionViewType: async (data: any) => {
    const resData: any = {
      method: 'post',
      url: `${config.apiURL}/api/v1/admin/instructionViewType`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    return await axios(resData)
  },
  getUpdate_depprosit_krungthais: async () => {
    const resData: any = {
      method: 'get',
      url: `${config.apiURL}/api/v1/admin/update_depprosit_krungthais`,
      headers: {},
    }
    return await axios(resData)
  },
}
export default Apibank
