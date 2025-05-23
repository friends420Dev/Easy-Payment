import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Apiauth from '../api/Apiauth'
import { useTranslation } from 'react-i18next'
import { LogoutStorage, getUserID, Logout } from '../Token'
import { Button, Spin } from 'antd';
import { App, Space, message } from 'antd';
import { DataContext } from 'src/layout/DefaultLayout';
import Swal from 'sweetalert2'

const Authmiddleware = (props: any) => {

  const [spinning, setSpinning] = useState(false);
  const itemContext: any = useContext<any>(DataContext)
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
  const { message, modal, notification, messageApi }: any = App?.useApp();
  // const [roled, setRole] = useState<'Accounting' | 'Cs' | 'Subowner' | 'Head_Cs' | 'Owner'>('Owner');
  const showModal = (msg: any) => {
    modal.warning({
      title: '!! Warning',
      content: msg,
    });
  };
  const success = (msg: any) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
    });
  };
  const navigate: any = useNavigate()
  const { t } = useTranslation<any>("")
  const [seconds, setSeconds] = useState<any>(30);
  var roleAdmin: any = itemContext?.dataAdmin?.data?.role;
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     } else {
  //       let isOk = await checkSession(roleAdmin);
  //       if (!isOk) {
  //         checkSession(roleAdmin);
  //         return
  //       }
  //       setSeconds(30);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [seconds]);
  // async function checkSession(roled: any) {
  //   if (roled == "Accounting" || roled == "Cs" || roled == "Subowner") {
  //     const sessionDataString: any = localStorage.getItem('loginTime');
  //     if (!sessionDataString) {
  //       return false; // ไม่มี Session
  //     }
  //     const sessionData = JSON.parse(sessionDataString);
  //     const currentTime = new Date().getTime();
  //     const sessionDuration = 5 * 60 * 1000;
  //     console.log(`${currentTime - sessionData.loginTime < sessionDuration ? currentTime - sessionData.loginTime < sessionDuration : t('expTimesession')}`)
  //     let expTimesession = currentTime - sessionData.loginTime < sessionDuration
  //     if (!expTimesession) {
  //       Toast.fire({
  //         icon: "info",
  //         title: t('expTimesession')
  //       });
  //       setSpinning(true)
  //       LogoutStorage()
  //       navigate('/login')
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 6000);
  //       return
  //     }
  //     setSpinning(false)
  //     return currentTime - sessionData.loginTime < sessionDuration;
  //   }
  //   return true
  // }

  return <React.Fragment>{props?.children}</React.Fragment>
}

export default Authmiddleware
