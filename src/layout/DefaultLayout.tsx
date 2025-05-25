import React, { useEffect, useReducer, useState, createContext, useContext } from 'react'
import { AppAside, AppContent, AppSidebar, AppFooter, AppHeader, AddLoadding } from '../components/index'
import Apisetting from '../api/Apisetting'
import Api from '../api/Api'
import { Button, message, Space, notification } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import { Logout, getUserID, checkError } from 'src/Token';
import routes from '../routes'
import type { Route } from '../routes'
// import _nav from '../_nav'
import type { NavItem } from '../_nav'
import Apiauth from 'src/api/Apiauth';
import { Translation } from 'react-i18next'
import { t } from 'i18next';
import Apibank from 'src/api/Apibank'
export const DataContext: any = createContext("");
import moment from 'moment'
const startDate = moment().subtract(1, 'days').format("YYYY-MM-DD");
const endDate = moment().subtract(0, 'days').format("YYYY-MM-DD");
// import { connectToSocket } from 'src/api/API.socket.io';
import { Dispatch, SetStateAction } from 'react';
import config from 'src/config/app.config';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Swal from 'sweetalert2'
type NotificationType = 'success' | 'info' | 'warning' | 'error';
interface TypeAcc {
  status_bank?: string;
  accountType?: string;
  balance?: number;
  accountName?: string;
  accountNumber?: string;
  // Add other properties of TypeAcc if needed
}

const DefaultLayout = (props: any) => {
  const navigate: any = useNavigate()
  const currentLocation = useLocation()?.pathname;
  const [messageApi, contextHolder]: any = message?.useMessage();
  const [loadding, setLoadding]: any = useState(false)
  const [spinUpdate, setSpinUpdate]: any = useState(false)
  const [titlePage, setTitlePage]: any = useState("")
  const getUserId: any = getUserID()
  const success = (msg: any) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
    });
  };
  // Deposit
  const [activePage, setActivePage]: any = useState(1)
  const [itemsPerPage, setItemsPerPage]: any = useState(10)
  const [records, setRecords]: any = useState(0)
  const [recordsPandingDeposit, setRecordsPandingDeposit]: any = useState(0)

  // Withdraws
  const [activePageWit, setActivePageWit]: any = useState(1)
  const [itemsPerPageWit, setItemsPerPageWit]: any = useState(10)
  const [recordsWithdraws, setRecordsWithdraws]: any = useState(0)
  const [recordsPandingWithdraws, setRecordsPandingWithdraws]: any = useState(0);


  // All Member
  const [activePageMember, setActivePageMember]: any = useState(1)
  const [itemsPerPageMember, setItemsPerPageMember]: any = useState(10)
  const [recordsMember, setRecordsMember]: any = useState(0)
  const [recordsNewMember, setRecordsNewMember]: any = useState(0);
  const [isDataMember, setIsDataMember]: any = useState([])
  const [isDataNewMember, setIsDataNewMember]: any = useState([])

  const [dataAdmin, setDataAdmin]: any = useReducer(
    (dataAdmin: any, newState_Admin: any) => ({ ...dataAdmin, ...newState_Admin }),
    {
      data: {},
    },
  )
  const [stateRole, setStateRole]: any = useReducer(
    (stateRole: any, newState_Role: any) => ({ ...stateRole, ...newState_Role }),
    {
      data: [],
    },
  )
  const [bankAccount, setState_BankAccount]: any = useReducer(
    (bankAccount: any, newState_BankAccount: any) => ({ ...bankAccount, ...newState_BankAccount }),
    {
      data: [],
    },
  )
  const [stateMember, setStateMember]: any = useReducer(
    (stateMember: any, newState_Member: any) => ({ ...stateMember, ...newState_Member }),
    {
      data: [],
    },
  )
  const [stateAdmin, setStateAdmin]: any = useReducer(
    (stateAdmin: any, newState_Admin: any) => ({ ...stateAdmin, ...newState_Admin }),
    {
      data: [],
    },
  )
  const [transListOfBankAccount, setTransListOfBankAccount]: any = useReducer(
    (transListOfBankAccount: any, newTransListOfBankAccount: any) => ({ ...transListOfBankAccount, ...newTransListOfBankAccount }),
    {
      data: [],
    },
  )
  const [stateTransaction, setTransaction]: any = useReducer(
    (stateTransaction: any, newTransaction: any) => ({ ...stateTransaction, ...newTransaction }),
    {
      data: [],
    },
  )
  const [stateDepositTransaction, setDepositTransaction]: any = useReducer(
    (stateDepositTransaction: any, newDepositTransaction: any) => ({ ...stateDepositTransaction, ...newDepositTransaction }),
    {
      data: [],
    },
  )
  const [stateWithdrawalTransaction, setWithdrawalTransaction]: any = useReducer(
    (stateWithdrawalTransaction: any, newWithdrawalTransaction: any) => ({ ...stateWithdrawalTransaction, ...newWithdrawalTransaction }),
    {
      data: [],
    },
  )
  const [bankList, setBanklist]: any = useState("")
  const [isDataDeposit, setIsDataItemDeposit]: any = useState([])
  const [isDataItemPendingDeposit, setIsDataItemPendingDeposit]: any = useState([])
  const [isDataWithdraw, setIsDataItemWithdraw]: any = useState([])
  const [isDataItemPendingWithdraw, setIsDataItemPendingWithdraw]: any = useState([])
  const [stateMerchang, setDatastateMerchang]: any = useReducer(
    (stateMerchang: any, newstateMerchang: any) => ({ ...stateMerchang, ...newstateMerchang }),
    {
      data: [],
    },
  )
  const [stateTransaction_manual, setStateTransaction_manual]: any = useReducer(
    (stateTransaction_manual: any, newStateTransaction_manual: any) => ({ ...stateTransaction_manual, ...newStateTransaction_manual }),
    {
      data: [],
    },
  )
  const [statement, setStatement] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
    data: [],
  })
  const [stateBankGrop, setStateBankGrop]: any = useReducer(
    (stateBankGrop: any, newState_BankGrop: any) => ({ ...stateBankGrop, ...newState_BankGrop }),
    {
      data: [],
    },
  )
  const [stateBankPlatform, setStateBankPlatform]: any = useReducer(
    (stateBankPlatform: any, newStateBankPlatform: any) => ({ ...stateBankPlatform, ...newStateBankPlatform }),
    {
      data: [],
    },
  )
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  const [totalPages, setTotalPages] = useState(0);
  const [highlightedTimes, setHighlightedTimes] = useState<string[]>([]);
  const [openUpdate, setOpenUpdate]: any = useState(true)
  const [dataMessage, setDataMessage] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>('');
  const [totalPending, setTotalPending] = useState<number>(0);
  const [nofPendingWit, setNofPendingWit] = useState<string | number>(0);
  const [nofWit, setNofWit] = useState<string | number>(0);
  const [nofDep, setNofDep] = useState<string | number>(0);
  const [nofPendingDep, setNofPendingDep] = useState<string | number>(0);
  const [nofNewMember, setNofNewMember] = useState<string | number>(0);

  useEffect(() => {
    const updateHighlight = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}.${minutes}`;
      const shouldHighlight = [
        '23.00-02.00',
        '00.00-01.00',
        '00.00-02.00',
        '01.30-22.35',
        '01.30-04.30',
        '23.00-01.30',
        '22.30-01.35',
      ].filter(range => {
        const [start, end] = range.split('-');
        const [startHour, startMinute] = start.split('.').map(Number);
        const [endHour, endMinute] = end.split('.').map(Number);
        const [currentHour, currentMinute] = currentTime.split('.').map(Number);

        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        if (startHour > endHour) { // Handles cases that cross midnight (e.g., 23:00 - 02:00)
          return currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes < endTimeInMinutes;
        } else {
          return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
        }
      });
      setHighlightedTimes(shouldHighlight);
    };
    updateHighlight();
    bank_closed_system_maintenance()
    const intervalId = setInterval(() => {
      updateHighlight();
      bank_closed_system_maintenance();
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  function bank_closed_system_maintenance() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    if (hours >= 22 || hours <= 4) {
      return (
        <b>
          {/* <span className={`me-5 ${highlightedTimes.includes("23.00-02.00") ? '':'d-none'}`} >
            📢 ช่วงเวลา 23.00 - 02.00 น. ธนาคารกรุงไทย (KTB) <span className=''>ปิดปรับปรุงระบบชั่วคราว</span>.
          </span> */}
          <span className={`me-5 ${highlightedTimes.includes("00.00-01.00") ? '' : 'd-none'}`}>
            📢 ช่วงเวลา 00.00 - 01.00 น. ธนาคารกสิกรไทย (KBank) <span className=''>ปิดปรับปรุงระบบชั่วคราว</span>.
          </span>

          <span className={`me-5 ${highlightedTimes.includes("00.00-02.00") ? '' : 'd-none'}`}>
            📢 ช่วงเวลา 00.00 - 02.00 น. ธนาคารไทยพาณิชย์ (SCB) <span className=''>ปิดปรับปรุงระบบชั่วคราว</span>.
          </span>
          <span className={`me-5 ${highlightedTimes.includes("23.00-01.30") ? '' : 'd-none'}`}>
            📢 ช่วงเวลา 23.00 - 01.30 น.  ระบบปิดให้บริการชั่วคราวสำหรับ <span className=''>ธนาคารกรุงไทย (ถอน)</span> กรุณาเลือกใช้ธนาคารอื่น.
          </span>
          <span className={`me-5 ${highlightedTimes.includes("01.30-04.30") ? '' : 'd-none'}`}>
            📢 ช่วงเวลา 01.30 - 04.30 น. ธนาคารกรุงศรีอยุธยา (BAY) <span className=''>ปิดปรับปรุงระบบชั่วคราว</span>.
          </span>
          <span className={`me-5 ${highlightedTimes.includes("22.30-01.35") ? '' : 'd-none'}`}>
            📢 ช่วงเวลา 22.30 - 01.35 น. PayoneX (GateWay) <span className=''>ปิดปรับปรุงระบบชั่วคราว</span> ไม่สามารถใช้งานได้.
          </span>
        </b>
      );
    }
    return null; // ไม่มีการปิดปรับปรุงในช่วงเวลานี้
  }
  const error = (msg: any) => {
    messageApi.open({
      type: 'error',
      content: `${msg}`,
    });
  };

  const onChangeCurrentPage = (event: any) => {
    //console.log(activePage)
    get_data_deposit()
    setActivePage(parseInt(event?.target?.innerText))
    //parseInt(setActivePage(event))
  }
  // console.log(nofPendingWit)
  // console.log(nofWit)
  interface Itemcalculate {
    amount: number;
  }
  const calculateTotal = (data: Itemcalculate[] | undefined) => {
    let total = 0;
    if (data) {
      data.forEach((item) => {
        total += item.amount;
      });
    }
    return total;
  };
  const getBankList = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Apisetting.getall_bankinfo()
      .then((res) => {
        if (res?.data?.success) {
          setBanklist(res?.data)
          setLoadding(false)
          setSpinUpdate(false)
        }
      }).catch((err: any) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const gegetdataMerchangs = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Api.getdataMerchang()
      .then((res) => {
        if (res?.data?.success) {
          setDatastateMerchang(res?.data)
          setSpinUpdate(false)
          setLoadding(false)
        } else {
          setSpinUpdate(false)
          setLoadding(false)
        }
      }).catch((err: any) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const get_data_deposit = () => {

    const offset = (activePage - 1) * itemsPerPage
    let data = {
      offset: offset,
      limit: itemsPerPage,
      sort: "id",
    }
    try {
      Apibank.get_data_deposit(data)
        .then((res) => {
          if (res?.data?.success == true) {
            setOpenUpdate(false)
            setLoadding(false)
            setSpinUpdate(false)
            // let isNow = moment().format('HH:mm:ss')
            // console.log("อัพเดทข้อมูลรายการฝากสำเร็จเมื่อ :" + " " + isNow);
            localStorage.setItem("recordsDeposit", res?.data?.data?.count)
            localStorage.setItem("recordsPandingDeposit", res?.data?.datapanding?.count)
            var o: any = localStorage.getItem("recordsDeposit")
            var oo: any = localStorage.getItem("recordsPandingDeposit")
            checkError(400)
            setIsDataItemDeposit(res?.data?.data?.rows)
            setIsDataItemPendingDeposit(res?.data?.datapanding?.rows)
            setRecords(res?.data?.data?.count)
            setRecordsPandingDeposit(res?.data?.datapanding?.count);
            setNofDep(o)
            setNofPendingDep(oo)
          } else {
            setTimeout(() => {
              setOpenUpdate(false)
              setSpinUpdate(false)
              setLoadding(false)
            }, 1000)
            error(res?.data?.message)
          }
        })
        .catch((err: any) => {
          setOpenUpdate(false)
          setSpinUpdate(false)
          setLoadding(false)
          if (err.status == 401) {
            Toast.fire({
              icon: "info",
              title: t('expTimesession')
            });
            Logout()
            navigate("/login");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          } if (err.code == "ERR_NETWORK") {
            error(err.message)
          } else {
            console.log(err)
          }
        })
    } catch (error: any) {
      setOpenUpdate(false)
      setLoadding(false)
      if (error instanceof Error) {
        console.error("ชื่อข้อผิดพลาด:", error.name);
        console.error("ข้อความข้อผิดพลาด:", error.message);
        console.error("Stack Trace:", error.stack);
      } else {
        console.error("ข้อผิดพลาดที่ไม่รู้จัก:", error);
      }
    } finally {
      return true
    }
  }
  const get_data_wit = () => {
    const offset = (activePageWit - 1) * itemsPerPageWit
    let data = {
      offset: offset,
      limit: itemsPerPageWit,
      sort: "id",
    }
    try {
      Apibank.gtdata_withdraws(data)
        .then((res) => {
          if (res?.data?.success == true) {
            setLoadding(false)
            setOpenUpdate(false)
            setSpinUpdate(false)
            // let isNow = moment().format('HH:mm:ss')
            // console.log("อัพเดทรายการถอนสำเร็จเมื่อ :" + " " + isNow);
            gegetdataMerchangs?.()
            localStorage.setItem("recordsWithdraws", res?.data?.data?.count)
            localStorage.setItem("recordsPandingWithdraws", res?.data?.datapanding?.count)
            var o: any = localStorage.getItem("recordsWithdraws")
            var oo: any = localStorage.getItem("recordsPandingWithdraws")
            setIsDataItemWithdraw(res?.data?.data?.rows)
            setIsDataItemPendingWithdraw(res?.data?.datapanding?.rows)
            setRecordsWithdraws(res?.data?.data?.count)
            setRecordsPandingWithdraws(res?.data?.datapanding?.count)
            setTotalPending(calculateTotal(res?.data?.datapanding?.rows));
            setNofWit(o)
            setNofPendingWit(oo)

          } else {
            setTimeout(() => {
              setOpenUpdate(false)
              setSpinUpdate(false)
              setLoadding(false)
            }, 1000)
            error(res?.data?.message)
          }
        })
        .catch((err: any) => {
          setOpenUpdate(false)
          setSpinUpdate(false)
          setLoadding(false)
          console.log(err)
        })
    } catch (error: any) {
      setOpenUpdate(false)
      setLoadding(false)
      if (error instanceof Error) {
        console.error("ชื่อข้อผิดพลาด:", error.name);
        console.error("ข้อความข้อผิดพลาด:", error.message);
        console.error("Stack Trace:", error.stack);
      } else {
        console.error("ข้อผิดพลาดที่ไม่รู้จัก:", error);
      }
    } finally {
      return true
    }

  }
  const getBankAccount = () => {
    //setLoadding(true)
    try {
      Apisetting.getall_BankAccount()
        .then((res: any) => {
          if (res?.data?.success == true) {
            setOpenUpdate(false)
            setLoadding(false)
            setSpinUpdate(false)
            setState_BankAccount(res?.data)
            filterActiveBankAccunt(res?.data);
          } else {
            setSpinUpdate(false)
            setLoadding(false)
            error(res?.data?.message)
          }
        })
        .catch((err: any) => {
          setSpinUpdate(false)
          setLoadding(false)
          if (err.status == 401) {
            Toast.fire({
              icon: "info",
              title: t('expTimesession')
            });
            Logout()
            navigate("/login");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          } if (err.code == "ERR_NETWORK") {
            error(err.message)
          } else {
            // console.log(err)
          }
        })
    } catch (error: any) {
      setOpenUpdate(false)
      setLoadding(false)
      if (error instanceof Error) {
        console.error("ชื่อข้อผิดพลาด:", error.name);
        console.error("ข้อความข้อผิดพลาด:", error.message);
        console.error("Stack Trace:", error.stack);
      } else {
        console.error("ข้อผิดพลาดที่ไม่รู้จัก:", error);
      }
    } finally {
      return true
    }

  }
  const getAllMembers = () => {
    const offset = (activePageMember - 1) * itemsPerPageMember
    let data = {
      offset: offset,
      limit: itemsPerPageMember,
      sort: "id",
    }
    //setLoadding(true)
    try {
      Api.getAllMember(data)
        .then((res: any) => {
          if (res?.data?.success == true) {
            let isNow = moment().format('HH:mm:ss')
            console.log("อัพเดทข้อมูล Member สำเร็จเมื่อ :" + " " + isNow);
            setOpenUpdate(false)
            setLoadding(false)
            setIsDataMember(res?.data?.data?.rows)
            setRecordsMember(res?.data?.data?.count);
            setStateMember(res?.data?.data?.rows)

            setIsDataNewMember(res?.data?.newMembersToday?.rows)
            setRecordsNewMember(res?.data?.newMembersToday?.count)
            setNofNewMember(res?.data?.newMembersToday?.count)
            setSpinUpdate(false)
          } else {
            setSpinUpdate(false)
            setLoadding(false)
            error(res?.data?.message)
          }
        })
        .catch((err: any) => {
          setSpinUpdate(false)
          setLoadding(false)
          if (err.status == 401) {
            Toast.fire({
              icon: "info",
              title: t('expTimesession')
            });
            Logout()
            navigate("/login");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          } if (err.code == "ERR_NETWORK") {
            error(err.message)
          } else {
            console.log(err)
          }
        });
    } catch (error: any) {
      setOpenUpdate(false)
      setLoadding(false)
      if (error instanceof Error) {
        console.error("ชื่อข้อผิดพลาด:", error.name);
        console.error("ข้อความข้อผิดพลาด:", error.message);
        console.error("Stack Trace:", error.stack);
      } else {
        console.error("ข้อผิดพลาดที่ไม่รู้จัก:", error);
      }
    } finally {
      return true
    }
  }
  const getallAdmins = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Api.getallAdmin()
      .then((res: any) => {
        if (res?.data?.success == true) {
          setLoadding(false)
          setStateAdmin(res?.data)
          setSpinUpdate(false)
        } else {
          setLoadding(false)
          setSpinUpdate(false)
          error(res?.data?.message)
        }
      })
      .catch((err: any) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getListOfBankAccount = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Api.getListOfBankAccounts()
      .then((res: any) => {
        if (res?.data?.success == true) {
          setLoadding(false)
          setTransListOfBankAccount(res?.data)
          setSpinUpdate(false)
        } else {
          setLoadding(false)
          setSpinUpdate(false)
          error(res?.data?.message)
        }
      })
      .catch((err: any) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getWithdrawalTransactions = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Api.getWithdrawalTransaction()
      .then((res: any) => {
        if (res?.data?.success == true) {
          setLoadding(false)
          setWithdrawalTransaction(res?.data)
          setSpinUpdate(false)

        } else {
          setSpinUpdate(false)
          setLoadding(false)
          error(res?.data?.message)
        }
      })
      .catch((err: any) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getDepositTransactions = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Api.getDepositTransaction()
      .then((res: any) => {
        if (res?.data?.success == true) {
          setSpinUpdate(false)
          setLoadding(false)
          setDepositTransaction(res?.data)

        } else {
          setSpinUpdate(false)
          setLoadding(false)
          error(res?.data?.message)
        }
      })
      .catch((err: any) => {
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getall_Transaction_manual = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Apibank.getall_Transaction_manuals()
      .then((res: any) => {
        //console.log(res?.data)
        if (res?.data?.success) {
          setSpinUpdate(false)
          setLoadding(false)
          setStateTransaction_manual({ data: res?.data?.data })
        } else {
          setSpinUpdate(false)
          setLoadding(false)
          error(res?.data?.message)
        }
      }).catch((err: any) => {

        setSpinUpdate(false)
        error(err.message)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getall_BankGrop = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Api.getall_BankGrop()
      .then((res: any) => {
        if (res?.data?.success == true) {
          setSpinUpdate(false)
          setLoadding(false)
          setStateBankGrop(res?.data)

        } else {
          setSpinUpdate(false)
          setLoadding(false)
          error(res?.data?.message)
        }
      })
      .catch((err: any) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getdata_bankPlatforms = () => {
    //setLoadding(true)

    Apibank.getdata_bankPlatform()
      .then((res) => {
        //console.log(res?.data)
        if (res?.data?.success) {
          setLoadding(false)
          setStateBankPlatform({ data: res?.data?.data })
        } else {
          setLoadding(false)
          error(res.statusText)
        }
      }).catch((err) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getdata_BankAccount = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Apisetting.getall_BankAccount()
      .then((res) => {
        //console.log(res?.data);
        if (res?.data?.success) {
          const array1 = res?.data?.data[0]?.bankAccounts;
          const array2 = res?.data?.data[1]?.bankAccounts;
          setSpinUpdate(false)
          // console.log(res?.data.daauser)
          setStateBankGrop({ data: res?.data?.data })
          for (let i = 0; i < array2.length; i++) {
            array1.push(array2[i]);
          }
          setStatement({
            data: array1,
          })
          setLoadding(false)
        } else {
          setLoadding(false)
          setSpinUpdate(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getDataProfileAdmin = () => {
    let role: any = fillterRole(stateRole, dataAdmin?.data?.roleID);
    //setLoadding(true)
    Apiauth.getRole()
      .then((res) => {
        if (res?.data?.data) {
          setSpinUpdate(false)
          // console.log(role)
          setStateRole({ data: res?.data?.data })
          setTimeout(() => {
            setLoadding(false)
          }, 2000)
        } else {
          setSpinUpdate(false)
          setLoadding(false)
        }
      }).catch((err) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
    Apiauth.getProfileAdmin()
      .then((res: any) => {
        if (res?.status == 200) {
          setSpinUpdate(false)
          setLoadding(false)
          //console.log(role)
          setDataAdmin({ data: res?.data?.user, ...role })
        } else {
          setSpinUpdate(false)
          setLoadding(false)
        }
      })
      .catch((err: any) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      });
  }
  const getDataPermissions = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Apiauth.getRole()
      .then((res) => {
        if (res?.data?.success) {
          setStateRole({ data: res?.data?.data })
          setTimeout(() => {
            setSpinUpdate(false)
            setLoadding(false)
          }, 2000)
        } else {
          setSpinUpdate(false)
          setLoadding(false)

        }
      }).catch((err) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  const getTransactions = () => {
    //setLoadding(true)
    setSpinUpdate(true)
    Api.getTransaction()
      .then((res: any) => {
        if (res?.data?.success == true) {
          setLoadding(false)
          setSpinUpdate(false)
          setTransaction(res?.data)

        } else {
          setSpinUpdate(false)
          setLoadding(false)
          error(res?.data?.message)
        }
      })
      .catch((err: any) => {
        setSpinUpdate(false)
        setLoadding(false)
        if (err.status == 401) {
          Toast.fire({
            icon: "info",
            title: t('expTimesession')
          });
          Logout()
          navigate("/login");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } if (err.code == "ERR_NETWORK") {
          error(err.message)
        } else {
          console.log(err)
        }
      })
  }
  // *****************************//
  function fillterRole(item: any, id: any) {
    if (!item || !id) {
      return undefined
    }
    const c: any = item?.data?.filter((user: any) => user?.id == id);
    if (c?.length > 0) {
      return c[0]
    }
    return undefined;
  }
  const [api, contextHolder2]: any = notification.useNotification();

  const openNotificationWithIcon2 = (type: NotificationType, msg: any, mute: any, minAmount: any) => {
    const key = `open${Date.now()}`;
    function gotoPath() {
      window.location.assign(`/#/money-transfer/create-money-transfer`);
      api.destroy(key);
      return
    }
    const btn = (
      <Space>
        <Button type="primary" size="small" onClick={gotoPath}>
          {"ไปที่หน้าโอนเงิน"}
        </Button>
      </Space>
    );
    api[type]({
      message: <>
        {mute == "true" ? <CIcon icon={icon.cilVolumeHigh} /> : <CIcon icon={icon.cilVolumeOff} />} {"แจ้งเตือนยอดเงินใกล้จะหมด : เวลา"} {moment().format('HH:mm:ss')} {"น."}
      </>,
      duration: 15,
      style: {
        width: "469px",
        backgroundColor: "#fff",
        color: "#fff",
      },
      placement: "topRight",
      showProgress: false,
      pauseOnHover: true,

      btn,
      key,
      description:
        msg,
    });
  };

  function filterActiveBankAccunt(item: any): void {
    const filterBankAccount = item?.data?.filter((bank: any) => bank?.isActive === true);

    if (!filterBankAccount || filterBankAccount.length === 0) {
      console.log("No active bank accounts found.");
      return;
    }
    filterBankAccount.forEach((activeBank: any) => {
      checkBalance(activeBank);
    });
  }
  async function checkBalance(item: any): Promise<void> {
    const showNotification: any = localStorage.getItem("showNotification");
    const getItemMinAmount: any = localStorage.getItem("minAmount");
    if (getItemMinAmount === null) {
      localStorage.setItem("minAmount", "2000");
    }
    const minAmount: any = getItemMinAmount;

    const withdrawalAccounts: TypeAcc[] = (await item?.bankAccounts?.filter((account: any) =>
      account?.status_bank === "Active" && account?.accountType === "withdrawal"
    )) || [];
    if (withdrawalAccounts.length > 1) {
      const hasSufficientBalance = withdrawalAccounts.some(
        (account) => account.balance !== undefined && account.balance > parseInt(minAmount)
      );

      if (hasSufficientBalance) {
        console.info("พบบัญชีถอนเงินหลายบัญชี และอย่างน้อยหนึ่งบัญชีมีเงินคงเหลือเพียงพอ");
        return;
      }
    }
    for (const account of withdrawalAccounts) {
      if (account.balance !== undefined && account.balance < parseInt(minAmount)) {
        if (showNotification === "false") {
          console.log("Notification is disabled.");
          return;
        }
        let mute = localStorage.getItem("mute");
        const playAudio = new Audio('https://tiengdong.com/wp-content/uploads/Nhac-chuong-thong-bao-iphone-12-www_tiengdong_com.mp3?_=1');
        if (mute === null) {
          localStorage.setItem("mute", "true");
          mute = "true";
        }

        if (mute === "true") {
          playAudio.play();
        }
        const messageContent = <>
          <div>
            <p className="">
              <b>บัญชี (ถอน) :</b> <span>{account.accountName}, {account?.accountNumber}</span>
            </p>
            <p className="">
              <b> ยอดเงินคงเหลือน้อยกว่า {Intl.NumberFormat().format(minAmount)} บาท กรุณาเติมเงินด้วยคะ</b>
            </p>
          </div>
        </>;
        const Notification_message = messageContent;
        openNotificationWithIcon2('warning', Notification_message, mute, minAmount);
        console.log("!!ยอดเงินในบัญชีเหลือน้อย");
      } else {
        return 
      }
    }
  }
  const itemContex: any = {
    getBankList,
    dataMessage,
    newMessage,
    setNewMessage,
    setLoadding,
    getBankAccount,
    getAllMembers,
    getallAdmins,
    getListOfBankAccount,
    getWithdrawalTransactions,
    getDepositTransactions,
    gegetdataMerchangs,
    getall_Transaction_manual,
    getall_BankGrop,

    onChangeCurrentPage,
    getDataProfileAdmin,
    getdata_BankAccount,
    getDataPermissions,
    setSpinUpdate,
    getdata_bankPlatforms,

    // Deposit
    get_data_deposit,
    itemsPerPage,
    activePage,
    records,
    recordsPandingDeposit,
    isDataDeposit,
    isDataItemPendingDeposit,
    setRecords,
    setRecordsPandingDeposit,
    setIsDataItemPendingDeposit,
    setIsDataItemDeposit,
    setActivePage,
    setItemsPerPage,
    // Withdraws
    get_data_wit,
    itemsPerPageWit,
    recordsWithdraws,
    activePageWit,
    recordsPandingWithdraws,
    isDataItemPendingWithdraw,
    isDataWithdraw,
    setRecordsWithdraws,
    setActivePageWit,
    setItemsPerPageWit,
    setIsDataItemWithdraw,
    setIsDataItemPendingWithdraw,
    setRecordsPandingWithdraws,
    setOpenUpdate,
    openUpdate,
    loadding,
    spinUpdate,
    bankList,
    getUserId,
    stateAdmin,
    transListOfBankAccount,
    stateTransaction,
    stateWithdrawalTransaction,
    stateDepositTransaction,
    currentLocation,
    stateMerchang,
    stateTransaction_manual,
    stateBankGrop,
    totalPages,
    bankAccount,
    dataAdmin,
    stateRole,
    statement,
    stateBankPlatform,
    bank_closed_system_maintenance,
    totalPending,

    nofWit,
    nofPendingWit,

    nofDep,
    nofPendingDep,
    // All Member
    stateMember,
    recordsMember, recordsNewMember, isDataMember, isDataNewMember,
    nofNewMember, activePageMember, setActivePageMember, itemsPerPageMember, setItemsPerPageMember,
  }
  // *************** socket **************//
  let sytem: any = document.getElementById("sytem")
  if (sytem) {
    let data = stateBankGrop?.data
    let i = data?.filter((bank: any) => bank?.isActive === true)
    sytem.innerHTML = !i[0]?.name ? "No connection" : i[0]?.name == "Bankstandard" ? "EPAY" : i[0]?.name == "Gateway" ? "GATEWAY" : "other"
  }
  let sendData:any = {
    nofWit: nofWit,
    nofDep: nofDep,
    nofPendingWit: nofPendingWit,
    nofPendingDep: nofPendingDep,
    recordsPandingWithdraws: recordsPandingWithdraws,
    nofNewMember: nofNewMember,
  }
  return (
    <>
      <AppSidebar item={sendData} />
      <DataContext.Provider value={itemContex}>
        {contextHolder2}
        {contextHolder}
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <div className="main-containt">
              <AppContent />
            </div>
          </div>
          <AppFooter />
        </div>
        <AppAside />
      </DataContext.Provider>
    </>
  )
}

export default DefaultLayout
