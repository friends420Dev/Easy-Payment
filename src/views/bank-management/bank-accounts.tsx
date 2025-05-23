import React, { useEffect, useRef, useContext, useReducer, useState } from 'react'
import { DataContext } from 'src/layout/DefaultLayout';
import Option_bank from './option';
import ApiBank from "src/api/Apibank";
import { Tabs, Switch, message, Modal, Result, Select, Radio } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import Apisetting from "src/api/Apisetting";
import { ModelAccountDetails } from '../model';
import config from 'src/config/app.config';
import moment from 'moment';
import Swal from 'sweetalert2';
// import { socket } from 'src/utils/socket';

type Props = {
  data?: any
  t?: any
}
interface PropsBankAccount {
  accountType?: string; // Optional: Current account type to pre-check
  statusBank?: string; // Optional: Current status to pre-check
  t: (key: string) => string;
  item?: any;
  msg?: string
  Actioned?: string
}
export const DetailsBankAcc = ({ data, t }: Props) => {
  // console.log(data?.data?.accountNumber)
  if (!data) {
    return null
  }
  let bank = data?.data?.bank?.bank_id
  let num = data?.data?.accountNumber
  let name = data?.data?.accountName

  let type = t(data?.status_bank)
  return (

    <Result
      status="warning"
      title={t(`Are you sure`, { status_bank: type, bank: t(bank), accountNumber: num, name: name })}

    />
  );
}
const Bank_accounts = () => {
  const { confirm } = Modal;
  const itemContext: any = useContext<any>(DataContext)
  const [messageApi, contextHolder]: any = message.useMessage();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          itemContext?.getBankAccount?.(),
          itemContext?.getBankList?.(),
          itemContext?.getDataProfileAdmin?.(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("allAppContent finally fetching data");
      }
    };
    fetchData();
  }, []);


  const { t } = useTranslation("")
  const [state, setState]: any = useState(1);
  const [visible, setVisible] = useState(false);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const success = (msg: any) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
    });
  };
  const error = (msg: any) => {
    messageApi.open({
      type: 'error',
      content: `${msg}`,
    });
  };
  const [details, setDetails]: any = useState([])
  const toggleDetails = (index: any) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  async function bank_closed_system_maintenance(bank: any) {
    let bankName = bank?.bank?.bank_id
    let accountType = bank?.accountType
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    if ((hours === 22 && minutes >= 30) || hours >= 23 || (hours === 0 && minutes <= 59) || (hours >= 1 && hours <= 2)) {
      return bankName == "ktb" && accountType == "withdrawal"
    } else {
      return false
    }
  }
  const [disibel, setDisibel] = useState<boolean>(false)
  const [switchLoadding, setSwitchLoadding]: any = useState(0)
  const postIsActiveBanks = (postData: any) => {
    // itemContext?.setLoadding(true)
    Apisetting.postIsActiveBank(postData)
      .then((res: any) => {
        if (res.data.success == true) {
          itemContext?.getBankAccount()
          setTimeout(() => {
            setSwitchLoadding(0)
            toggleDetails(postData.types == "onSwitch" ? 0 : postData.edit_id)
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: `${res.data.message}`
            });
            itemContext?.setLoadding(false)

          }, 1000)
        } else {
          setTimeout(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "error",
              title: `${res.data.message}`
            });
            itemContext?.setLoadding(false)
          }, 1000)
        }
      }).catch((err: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: `${err.message}`
        });
        itemContext?.setLoadding(false)
      })
  }
  const showConfirm = async (item: any) => {
    let checkTime = await bank_closed_system_maintenance(item?.data);
    Swal.fire({
      title: "Are you sure?",
      text: checkTime ? `❌⚠️ ในช่วงเวลา 22:30 - 03:00 น.  ไม่ควรใช้ธนาคารกรุงไทย (ถอน) คุณแน่ใจที่จะเปิดใช้งาน? ❌⚠️` : `คุณต้องการ ${item?.status_bank == "Active" ? "เปิดใช้งาน" : item?.status_bank == "Inactive" ? "ปิดใช้งาน" : item?.status_bank}!`,
      showDenyButton: true,
      showCancelButton: false,
      icon: "question",
      confirmButtonText: "Yes!",
      background: "rgb(0 21 41)",
      color: "#aeaeae"
    }).then((result) => {
      if (result.isConfirmed) {
        postIsActiveBanks(item)
      } else if (result.isDenied) {
        itemContext?.setLoadding(true)
        setTimeout(() => {
          itemContext?.setLoadding(false)
          itemContext?.getBankAccount()
          setSwitchLoadding(0)
        }, 1000)

      } else if (result.isDismissed) {
        itemContext?.setLoadding(false);
        itemContext?.getBankAccount();
        setSwitchLoadding?.(0);
        Toast?.fire({
          icon: "info",
          title: t(`ยกเลิกการกระทำ`),
        });
      }
    });

  };
  const get_balance_summerys = (params: any) => {
    setDisibel(true)
    itemContext?.setLoadding(true)
    ApiBank.get_balance_summery({ id: params?.id })
      .then((res: any) => {
        //
        if (res.data.success) {
          setTimeout(() => {
            setDisibel(false)
          }, 120000)
          success("อัพเดทข้อมูลสำเร็จ")
          Toast.fire({
            icon: "success",
            title: "อัพเดทยอดเงินสำเร็จ"
          });
          itemContext?.getBankAccount()
          itemContext?.setLoadding(false)
        } else {
          Toast.fire({
            icon: "error",
            title: res.data.message
          });
          itemContext?.setLoadding(false)
        }
      }).catch((error: any) => {
        itemContext?.setLoadding(false)
        error(error.message)
      })
  }
  async function handleOnClickStatusBank(status: any, params: any) {

    let i = {
      status: status == true ? "Active" : status == false ? "Inactive" : status?.taget?.id
    }
    if (i.status && params) {
      let postData = {
        status_bank: status == true ? "Active" : status == false ? "Inactive" : status?.taget?.id,
        edit_id: params?.id,
        data: params,
        description: `${status ? "เปิดใช้งาน" : "ปิดใช้งาน"}!`,
        types: "onSwitch"
      }
      showConfirm(postData)
      setSwitchLoadding(params?.id)
      //console.log(postData)
    } else {
      error(`ไม่สามารถเปลี่ยนสถานะได้`)
    }
  }
  const [stateData, setData]: any = useState("");
  async function getUpdateBankAccountVault({ Actioned, msg, item, t, accountType }: PropsBankAccount) {

    let active = Actioned || undefined
    if (!accountType || !item?.id) {
      Swal.fire({ html: t("error: ข้อมูลไม่ถูกต้อง") });
      return;
    }
    const { value: formValues }: any = await Swal.fire<{ value: { accountType: string; status_bank: string; note: string, edit_id: number, run_from: string } }>({
      title: t(msg || ""),
      icon: "question",
      html: `
      ${active == "Repair" ?
          ` 
      <form id="swal-form">
     
      <hr style="margin-bottom: 20px;" />
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <label htmlFor="Vault" style="font-weight: bold; margin-bottom: 10px; display: flex; align-items: center;">${t("ปัญหา :")}</label>
        <div style="display: flex; gap: 10px; align-items: center;">

          <input type="radio" id="Face_Scan"  name="status_bank" value="Face_Scan" class="swal2-radio" />
          <label htmlFor="Face_Scan">${t("Face Scan")}</label>

          <input type="radio" id="Captcha"  name="status_bank" value="Captcha" class="swal2-radio" />
          <label htmlFor="Captcha">${t("ติด Captcha")}</label>

          <input type="radio"  style="margin-left: 10px" id="Verify" name="status_bank" value="Verify" class="swal2-radio d-none" />
          <label class=" d-none" htmlFor="Verify">${t("Verify")}</label>
        </div>
      </div>
      <hr style="margin-bottom: 20px;" />
      <div style="display: none; flex-direction: column; align-items: flex-start;">
        <label htmlFor="note" style="font-weight: bold; margin-bottom: 2px;">${t("รายละเอียด :")}</label>
        <textarea id="note" name="note" cols={10} rows={5} class="swal2-textarea " style="height: 3.75em;"></textarea>
      </div>
    </form>
    `
          :
          ` 
      <form id="swal-form">
      <div style="display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 20px;">
        <label htmlFor="account-type" style="font-weight: bold; margin-bottom: 10px; display: flex; align-items: center;">${t("ประเภทบัญชี")}</label>
        <div style="display: flex; gap: 10px; align-items: center;">
          <input type="radio"  style="margin-left: 10px" id="deposit" name="accountType" value="deposit" class="swal2-radio" />
          <label htmlFor="deposit">${t("deposit")}</label>
          <input type="radio" id="withdrawal"  name="accountType" value="withdrawal" class="swal2-radio" />
          <label htmlFor="withdrawal">${t("withdrawal")}</label>
          <input type="radio"  id="verifying_account" name="accountType" value="verifying_account" class="swal2-radio" />
          <label htmlFor="verifying_account">${t("บัญชี Verify")}</label>
        </div>
      </div>
      <hr style="margin-bottom: 20px;" />
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <label htmlFor="Active" style="font-weight: bold; margin-bottom: 10px; display: flex; align-items: center;">${t("สถานะบัญชี")}</label>
        <div style="display: flex; gap: 10px; align-items: center;">
          <input type="radio" style="margin-left: 10px" id="Active" name="status_bank" value="Active" class="swal2-radio" />
          <label htmlFor="Active">${t("Active")}</label>
          <input type="radio" id="Inactive" name="status_bank" value="Inactive" class="swal2-radio" />
          <label htmlFor="Inactive">${t("Inactive")}</label>
        </div>
      </div>
      <hr style="margin-bottom: 20px;" />
      <div style="display: none; flex-direction: column; align-items: flex-start;">
        <label htmlFor="note" style="font-weight: bold; margin-bottom: 2px;">${t("การแก้ไข :")}</label>
        <textarea id="note" name="note" cols={10} rows={5} class="swal2-textarea " style="height: 3.75em;"></textarea>
      </div>
    </form>
    `}
  `,
      focusConfirm: false,
      showDenyButton: true,
      confirmButtonText: t("Yes!"),
      denyButtonText: t("ยกเลิก"),
      background: "rgb(0 21 41)",
      color: "#aeaeae",
      showCancelButton: false,
      footer: `${t("version")} : ${config?.version}`,

      preConfirm: () => {
        const inputType = (document.querySelector('input[name="accountType"]:checked') as HTMLInputElement)?.value;
        const inputStatus_bank = (document.querySelector('input[name="status_bank"]:checked') as HTMLInputElement)?.value;
        const note = (document.getElementById("note") as HTMLTextAreaElement)?.value;
        if (active == "Repair") {
          if (!inputStatus_bank) {
            Swal.showValidationMessage(t('กรุณาเลือกสถานะบัญชี'));
            return undefined;
          }
          return { status_bank: "Vault", note: !note ? inputStatus_bank : note, edit_id: item?.id, run_from: "" };
        } else if (active == "update_status_bank") {
          if (!inputType) {
            Swal.showValidationMessage(t('กรุณาเลือกทั้งประเภทบัญชี'));
            return undefined;
          }
          if (!inputStatus_bank) {
            Swal.showValidationMessage(t('กรุณาเลือกสถานะบัญชี'));
            return undefined;
          }
          return { accountType: inputType, status_bank: inputType == "verifying_account" ? "Vault" : inputStatus_bank, edit_id: item?.id, note: inputType == "verifying_account" ? "สำหรับ Verify เท่านั้น" : "", run_from: inputType != "verifying_account" ? "" : (inputType == "verifying_account" && inputStatus_bank == "Active") ? "amt" : "mt" };
        }

      },
    });

    if (!formValues) {
      itemContext?.setLoadding(false); // Ensure loading state is reset
      Toast.fire({ icon: "info", title: t("ยกเลิกการกระทำ") });
      return;
    }
    let postData = {
      ...formValues,
      description: `อัพเเดทสถานะบัญชี ${item?.accountName} ${item?.accountNumber} เป็นสถานะ ${formValues.status_bank}`,
      types: "update_status_bank",
    }
    if (formValues.edit_id) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      // itemContext?.setLoadding(true)
      try {

        Apisetting.postIsActiveBank(postData)
          .then((res: any) => {
            if (res.data.success == true) {
              itemContext?.getBankAccount()
              setTimeout(() => {
                setSwitchLoadding(0)
                toggleDetails(formValues.edit_id)
                Toast.fire({
                  icon: "success",
                  title: `${res.data.message}`
                });
                itemContext?.setLoadding(false)
              }, 1000)
            } else {
              setTimeout(() => {

                Toast.fire({
                  icon: "error",
                  title: `${res.data.message}`
                });
                itemContext?.setLoadding(false)
              }, 1000)
            }
          }).catch((err: any) => {

            Toast.fire({
              icon: "error",
              title: `${err.message}`
            });
            itemContext?.setLoadding(false)
          })
      } catch (error: any) {
        console.error('Error updating bank account status:', error);
        Swal.fire({
          icon: 'error',
          title: t('เกิดข้อผิดพลาดในการอัปเดต'),
          text: error.message || t('ไม่สามารถอัปเดตสถานะได้'),
          background: "rgb(0 21 41)",
          color: "#aeaeae",
        });
      }
    } else {
      Toast.fire({
        icon: "info",
        title: `ยกเลิกการกระทำแล้ว`
      });
      itemContext?.setLoadding(false)
    }
  };
  const getUpdateBankAccount = async (event: any, item: any) => {

    let status = event?.target?.id == "Vault" ? "Inactive" : event?.target?.id == "Delete" ? "Delete" : "Vault";

    let msg = event?.target?.id == "update_status_bank" ? `อัพเดทสถานะบัญชี?` :
      event?.target?.id == "Repair" ? `คุณต้องการ ${t(event?.target?.id)} account?` :
        event?.target?.id == "Delete" ? `คุณต้องการ ${t(event?.target?.id)} account?` : "null"

    let Actioned = event?.target?.id
    if (event?.target?.id == "update_status_bank" || event?.target?.id == "Repair") {
      getUpdateBankAccountVault({ Actioned, msg, item, t, accountType: item?.accountType });
      return
    }
    let resultNote: { note?: string } | undefined | any | null;
    try {
      const swalResult = await Swal.fire<{ value: { note: string } }>({
        title: msg,
        text: msg,
        icon: "question",
        html: `
          <form id="swal-form">
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
              <label htmlFor="note" style="font-weight: bold; margin-bottom: 2px;">${t("หมายเหตุ :")}</label>
              <textarea id="note" name="note" cols={30} rows={5} class="swal2-textarea " style="height: 3.75em;"></textarea>
            </div>
          </form>
        `,
        focusConfirm: false,
        showDenyButton: true,
        confirmButtonText: t("Yes!"),
        denyButtonText: t("ยกเลิก"),
        background: "rgb(0 21 41)",
        color: "#aeaeae",
        showCancelButton: false,
        footer: `${t("version")} : ${config?.version}`,
        preConfirm: () => {
          const note = (document.getElementById("note") as HTMLTextAreaElement)?.value;
          if (!note) {
            Swal.showValidationMessage(t('กรุณาบอกปัญหาของบัญชีเราหน่อย'));
            return undefined;
          }
          return { note };
        },
      });
      resultNote = swalResult.value;
      let dataToSend = {
        status_bank: status,
        edit_id: item?.id,
        note: resultNote?.note,
        run_from: "",
        description: `${status == "Delete" ? "ลบบัญชี" : status} ${item?.bank?.bank_id}, ${item?.accountName}, ${item?.accountNumber}`,
        types: "Delete",
      }

      if (swalResult.isConfirmed) {
        itemContext?.setLoadding(true);
        postIsActiveBanks(dataToSend);
      } else if (swalResult.isDenied) {
        itemContext?.setLoadding(false);
        itemContext?.getBankAccount();
        setSwitchLoadding?.(0);
        Toast?.fire({
          icon: "error",
          title: t(`ยกเลิกการกระทำ`),
        });
      } else if (swalResult.isDismissed) {
        itemContext?.setLoadding(false);
        itemContext?.getBankAccount();
        setSwitchLoadding?.(0);
        Toast?.fire({
          icon: "info",
          title: t(`ยกเลิกการกระทำ`),
        });
      }
    } catch (error: any) {
      console.error("Error during update bank account:", error);
      itemContext?.setLoadding(false);
      Toast?.fire({
        icon: "error",
        title: t("เกิดข้อผิดพลาด"),
        text: error.message || t("ไม่สามารถดำเนินการได้"),
      });
    } finally {
      itemContext?.setLoadding(false); // Ensure loading is off in case of errors
    }
  }
  const getReuse = (params: any) => {
    //console.log(params)
    alert("อยู่ในช่วงพัฒนา")

  }
  const handleModel = (event: any, params: any) => {
    //alert("อยู่ในช่วงพัฒนา")
    setVisible(!visible)
    setData(params)
    // console.log(params)
  }
  const handleCopy = (text: any) => {
    navigator?.clipboard?.writeText(text)
      .then(() => {
        success('Copied : ' + text);
      })
      .catch(() => {
        error('Copied Something went wrong.');
      });
  };

  return (
    <>
      {contextHolder}
      <ModelAccountDetails setVisible={setVisible} visible={visible} config={config} t={t} data={stateData} handleCopy={handleCopy} moment={moment} itemContext={itemContext} />
      <Option_bank getUpdateBankAccount={getUpdateBankAccount} setSwitchLoadding={setSwitchLoadding} switchLoadding={switchLoadding} disibel={disibel} data={itemContext} get_balance_summerys={get_balance_summerys} handleModel={handleModel} toggleDetails={toggleDetails} handleOnClickStatusBank={handleOnClickStatusBank} details={details} handleCopy={handleCopy} />
    </>
  )
}

export default Bank_accounts;
