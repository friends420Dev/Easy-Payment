import React, { ReactNode, useEffect, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react-pro'
import { Button, Flex, Tooltip, Segmented, Switch, notification } from 'antd';
import routes from '../routes'
import type { Route } from '../routes'
import { UpdateBtn } from './updateBtn/updateBtn';
import { useNavigate } from 'react-router-dom'
import { DataContext } from 'src/layout/DefaultLayout';
import moment from 'moment';
export type SizeType = 'small' | 'middle' | 'large' | undefined;
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
// import { socketNotifydep } from 'src/utils/socket';
import { message, Space } from 'antd';
import Swal from 'sweetalert2';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
import dayjs from 'dayjs';

const messageApi = message;
type Breadcrumb = {
  pathname?: string
  name?: boolean | string | ReactNode
  active?: boolean
}

interface TypeAcc {
  balance: any;
}
const getRouteName = (pathname: string, routes: Route[]) => {
  const currentRoute = routes.find((route) => route.path === pathname)
  return currentRoute ? currentRoute.name : false
}

const getBreadcrumbs = (location: string) => {
  const breadcrumbs: Breadcrumb[] = []
  location.split('/').reduce((prev, curr, index, array) => {
    const currentPathname = `${prev}/${curr}`
    const routeName = getRouteName(currentPathname, routes)
    routeName &&
      breadcrumbs.push({
        pathname: currentPathname,
        name: routeName,
        active: index + 1 === array.length ? true : false,
      })
    return currentPathname;
  })
  return breadcrumbs
}

const AppBreadcrumb = () => {
  const navigate: any = useNavigate();
  const itemContext: any = useContext<any>(DataContext)
  const currentLocation = useLocation().pathname
  const { t } = useTranslation()
  const breadcrumbs = getBreadcrumbs(currentLocation)
  const lastBreadcrumb = breadcrumbs && [...breadcrumbs].pop();
  let loca: any = currentLocation;
  // ******************************// 

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, msg: any) => {
    api[type]({
      message: 'Notification',
      description:
        msg,
    });
  };

  // ****************  FUNCTION Switch UPDATE DATA ***********************//
  const [minute, setMinute] = useState(2);
  async function autoUpdate(e: any) {
    let event: any = e == true ? "on" : "off";
    itemContext?.setLoadding(true)
    //console.log(`autoUpdate : ${event}`)
    localStorage.setItem("autoUpdate", event);
    try {
      if (event == "on") {
        openNotificationWithIcon('success', "เปิดใช้งาน ฟังชั่นอัพเดทข้อมูลอัตโนมัติ")
        setIsUpdating(true);
        console.log("Auto update start.");
        setTimeout(async () => {
          itemContext?.setLoadding(false)
          await itemContext?.updateData?.()
        }, 1000)

      } else if (event == "off") {
        setIsUpdating(false);
        openNotificationWithIcon('error', "ปิดการอัพเดทข้อมูลอัตโนมัติ")
        console.log("Auto updating stop.");
        setTimeout(() => {
          itemContext?.setLoadding(false)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  };
  let updateInterval: NodeJS.Timeout | null = null; // เปลี่ยนเป็น NodeJS.Timeout
  const [isUpdating, setIsUpdating] = useState(false);
  async function startUpdate() {
    if (!updateInterval) {
      updateInterval = setInterval(async () => {
        await UpdatingData();
      }, minute * 60 * 1000); // 3 นาที = 3 * 60 * 1000 มิลลิวินาที
    }
  }
  async function stopUpdate() {
    if (updateInterval) {
      clearInterval(updateInterval);
      updateInterval = null;
    }
  }
  async function UpdatingData() {
    setTimeout(async () => {
      await itemContext?.updateData?.()
      await startUpdate();
    }, 1500)
  }

  useEffect(() => {
    if (isUpdating) {
      startUpdate();
    }
    return () => {
      stopUpdate();
    };
  }, [isUpdating]);

  // ****************  END FUNCTION Switch UPDATE DATA ***********************//

  function funCheckRole(role: any) {
    if (!role) {
      return false
    }
    if (role == "Cs_Accounting") {
      return false
    }
    return true
  }
  const [switchAutoUpdate, setSwitchAutoUpdate] = useState<any>(localStorage.getItem("autoUpdate") || "on");
  function onChangSwitchAutoUpdate(event: any) {
    let funCheckRoles = funCheckRole(itemContext?.dataAdmin?.data?.role);
    if (!funCheckRoles) {
      openNotificationWithIcon('error', `Role: ${itemContext?.dataAdmin?.data?.role} ไม่สามารถใช้งาน ฟังชั่นอัพเดทข้อมูลอัตโนมัติ ได้ค่ะ`)
      return
    }
    setSwitchAutoUpdate(event ? "on" : "off")
    itemContext?.setLoadding(true)
    localStorage.setItem("autoUpdate", event ? "on" : "off");
    let autoUpdate: any = localStorage.getItem("autoUpdate");
    console.log("Auto update : " + autoUpdate);
    openNotificationWithIcon(autoUpdate == "on" ? 'success' : 'error', "autoUpdate : " + autoUpdate)
    try {
      if (autoUpdate == "on") {
        setTimeout(async () => {
          itemContext?.setLoadding(false)
          await itemContext?.updateData?.()
        }, 1000)
      } else {
        setTimeout(() => {
          itemContext?.setLoadding(false)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // *************** socket ***************//

  // useEffect(() => {
  //   socketNotifydep.on('receive_message_ready_to_getdeposit', async (data: any) => {
  //     if (switchAutoUpdate == "on") {
  //       updateData()
  //       console.log("AutoUpdate : " + switchAutoUpdate);
  //     } else {
  //       console.log("AutoUpdate : " + switchAutoUpdate);
  //     }
  //   });
  //   return () => {
  //     socketNotifydep.off('receive_message_ready_to_getdeposit');
  //   };
  // }, [
  //   loca,
  //   itemContext?.activePage,
  //   itemContext?.activePageWit,
  //   itemContext?.currentLocation,
  // ]);

  // *************** end socket ***************//
  // updateData
  function updateData() {
    
    let params = currentLocation;
    itemContext?.bank_closed_system_maintenance?.();
    itemContext?.getBankAccount?.()
    itemContext?.get_data_wit?.()
    itemContext?.get_data_deposit?.()
    itemContext?.setActivePage?.(itemContext?.activePage)
    itemContext?.setActivePageWit?.(itemContext?.activePageWit)
    


    const now = dayjs();
    let isNow = moment().format('HH:mm:ss') //FormatTimeAgo(now)
    if (params == "/dashboard" || params == "/bank-management/bank-accounts") {
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);
    } else if (params == "/deposit/deposit_list") {
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);
    } else if (params == "/withdrawal/withdrawal_list") {
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);
    } else if (params == "/money-transfer") {
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);
      itemContext?.getListOfBankAccount?.()
    } else if (params == "/bank-statement") {
      itemContext?.getdata_BankAccount?.()
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);
    } else if (params == "/manual-history-deposit/manual") {
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);
      itemContext?.getall_Transaction_manual?.()
    } else if (params == "/members") {
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);

    } else if (params == "/user-management/users") {
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);
      itemContext?.getallAdmins?.()
    } else if (params == "/user-management/role") {
      itemContext?.getDataPermissions?.()
      console.log("AutoUpdate : Latest update  on :" + " " + isNow);
    } else if (params == "/activity/activity-report") {
      console.log(params)
    } else {
      console.log(params)
    }

  }


  // *************** end socket ***************//


  return (
    <>
      {contextHolder}
      <div className='row'>
        <div className='col-6'>
          <div className="fs-2 fw-semibold d-flex" id='titleBreadcrumb'>
            <Flex gap="middle" align="start" className='' vertical>
              {lastBreadcrumb && lastBreadcrumb.name}
            </Flex>
          </div>
        </div>
        <div className='col-6'>
          <div className="fs-2 fw-semibold d-flex" id='titleBreadcrumb'>
            <Flex gap="middle" align="end" className='w-100' vertical>
              <UpdateBtn location={currentLocation} itemContext={itemContext} />
            </Flex>
          </div>
        </div>
      </div>
      <div className="separator" />

      <CBreadcrumb className="mb-3 mt-3">
        <CBreadcrumbItem href="/">{t('home')}</CBreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem
              {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
              key={index}
            >
              {breadcrumb.name}
            </CBreadcrumbItem>
          )
        })}
      </CBreadcrumb>
      <Flex gap="small" align="flex-end" justify='center' vertical>
        <Tooltip title="เปิด/ปิด ฟังชั่นอัพเดทข้อมูลอัตโนมัติ" placement="left">
          <label className='mb-3'>
            <b>Auto Update : </b>
            <Switch
              // loading={itemContext?.loadding}
              disabled
              checkedChildren={<span style={{ display: "inline-flex" }}>{"เปิด"}</span>}
              unCheckedChildren={<span style={{ display: "inline-flex" }}>{"ปิด"}</span>}
              onChange={(e) => onChangSwitchAutoUpdate(e)}
              defaultChecked={switchAutoUpdate == "on" ? true : false}
              checked={switchAutoUpdate == "on" ? true : false}
            />

          </label>
        </Tooltip>
      </Flex>
    </>
  )
}

export default AppBreadcrumb
