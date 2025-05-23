import React, { useEffect, useRef, useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  CContainer,
  CForm,
  CFormInput,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CInputGroup,
  CInputGroupText,
  useColorModes,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilContrast,
  cilApplicationsSettings,
  cilMenu,
  cilMoon,
  cilSearch,
  cilSun,
  cilLanguage,
  cifGb,
  cifEs,
  cilSettings,
  cifTh,
  cifLa
} from '@coreui/icons'

import {
  AppHeaderDropdown,
  AppHeaderDropdownMssg,
  AppHeaderDropdownNotif,
  AppHeaderDropdownTasks,
} from './header/index'
import InstallAppButton from './InstallAppButton'
import moment from 'moment'
import type { State } from 'src/store'
import { DataContext } from 'src/layout/DefaultLayout';
import { useNavigate } from 'react-router-dom'
import { Alert, Flex } from 'antd';
import Marquee from 'react-fast-marquee';
import { Logout, getUserID } from '../Token'
import { ClockCircleOutlined, SoundOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
// import io from 'socket.io-client';
import config from 'src/config/app.config';
// const socket = io(config?.apiURL);
import Swal from 'sweetalert2'
interface Admin {
  name: string;
  data: any; // กำหนด type ของ data ตามข้อมูลที่คุณได้รับ
  time: string;
  timeFromNow: string;
  online: boolean;
  backgroundColor: string;
}
const AppHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  // const { colorMode, setColorMode }:any = useColorModes('coreui-pro-react-admin-template-theme-modern')
  const { i18n, t } = useTranslation()
  const navigate: any = useNavigate()

  const mode: any = localStorage.getItem("coreui-pro-react-admin-template-theme-modern")
  if (!mode) {
    localStorage.setItem("coreui-pro-react-admin-template-theme-modern", "light")
  }
  if (mode != "light") {
    localStorage.setItem("coreui-pro-react-admin-template-theme-modern", "light")
  }
  const dispatch = useDispatch()
  const asideShow = useSelector((state: State) => state.asideShow)
  const sidebarShow = useSelector((state: State) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])
  useEffect(() => {
    itemContext?.getDataProfileAdmin()

  }, [])
  const itemContext: any = useContext<any>(DataContext)
  const [seconds, setSeconds] = useState(20);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     } else {
  //       let isOk = checkAdmin();
  //       //console.log(isOk)
  //       itemContext?.getDataProfileAdmin()
  //       if (isOk != 1) {
  //         Logout()
  //         alert("บัญชีของคุณถูกระงับ")
  //         navigate('/login')
  //         return
  //       }
  //       setSeconds(20);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [seconds]);
  // function checkAdmin() {
  //   let status: any = itemContext?.dataAdmin?.data?.admin_status;
  //   if (status != 1) {
  //     Logout()
  //     alert("บัญชีของคุณถูกระงับ")
  //     navigate('/login')
  //     return false
  //   }
  //   return "ok";
  // }
  const [adminOnlineList, setAdminOnlineList] = useState<Admin[]>([]);
  const [onlineCount, setOnlineCount]: any = useState(0)
  // useEffect(() => {
  //   // ดึงข้อมูลจาก localStorage เมื่อ component ถูก render ครั้งแรก
  //   const storedOnlineUsers = localStorage.getItem('onlineUsers');
  //   if (storedOnlineUsers) {
  //     setAdminOnlineList(JSON.parse(storedOnlineUsers));
  //   }

  //   const handleOnline = (admin: Admin) => {
  //     setAdminOnlineList((prevList) => {
  //       if (!prevList.some((a) => a?.name === admin?.name)) {
  //         const updatedList = [...prevList, admin];
  //         // เก็บข้อมูลลง sessionStorage
  //         localStorage.setItem('onlineUsers', JSON.stringify(updatedList));
  //         return updatedList;
  //       }
  //       return prevList;
  //     });
  //   };

  //   const handleOffline = (admin: Admin) => {
  //     setAdminOnlineList((prevList) => {
  //       const updatedList = prevList.filter((a) => a?.name !== admin?.name);
  //       // เก็บข้อมูลลง sessionStorage
  //       localStorage.setItem('onlineUsers', JSON.stringify(updatedList));
  //       return updatedList;
  //     });
  //   };

  //   socketNotify.on('Online', handleOnline);
  //   socketNotify.on('Offline', handleOffline);

  //   return () => {
  //     socketNotify.off('Online', handleOnline);
  //     socketNotify.off('Offline', handleOffline);
  //   };
  // }, []);

  function AdminOnlineAvatars({ adminOnline }: any) {
    return (
      <Avatar.Group
        max={{
          count: 3,
          style: { color: '#f56a00', backgroundColor: '#fde3cf' },
        }}
      >
        {adminOnline?.map((admin: any) => (
          <Tooltip key={admin?.name} title={admin.name} placement="top">
            <Avatar style={{ backgroundColor: admin?.backgroundColor || "#f56a00" }} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${admin?.name}`} />
          </Tooltip>
        ))}
      </Avatar.Group>
    );
  };
  useEffect(() => {
    function myTimer() {
      const d = new Date();
      const timeString = d.toLocaleTimeString();
      const dateString = d.toLocaleDateString("th-TH", {
          year: "2-digit",
          month: "short",
          day: "numeric",
          weekday: "short",
      });
      const demoElement = document.getElementById("demo");
      const dateTimeFormat = `${dateString} : ${timeString}`; // รวมวันที่และเวลา
  
      if (demoElement) {
          demoElement.innerHTML = dateTimeFormat; // ใช้ตัวแปรใหม่ที่รวมวันที่และเวลา
      }
  }
  
  setInterval(myTimer, 1000);
  }, [])
  function BankMaintenanceAlert() {
    
    const maintenanceMessage = itemContext?.bank_closed_system_maintenance();
    const date = new Date();
    const result = date.toLocaleDateString("th-TH", {
      year: "2-digit", // พ.ศ
      month: "short", // เดือน มกราคม-ธันวาคม
      day: "numeric", // วันที่1-31
      weekday: "short", // วัน จ-อ. *long จันทร์-อาทิต
    });
    if (!maintenanceMessage) {
      return <Alert
        banner
        id='dateTime'
        className='dateTime'
        style={{ backgroundColor: '#d6d7d96e', color: '#616161', fontWeight: "700" }}
        icon={<ClockCircleOutlined style={{ color: "#616161" }} />}
        message={
          <><span id='demo'></span></>}
      />
    }

    return (
      <Alert
        banner
        style={{ backgroundColor: 'rgb(214 215 217 / 13%)', color: '#fff', fontWeight: "700" }}
        icon={<SoundOutlined style={{ color: "#fff" }} />}
        // message={maintenanceMessage}
        message={
          <Marquee pauseOnHover gradient={false} speed={100} >
            {maintenanceMessage}
          </Marquee>}
      />
    );
  }
  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="px-4" fluid style={{ flexWrap: "unset" }}>
        <CHeaderToggler
          className={classNames('d-lg-none', {
            'prevent-hide': !sidebarShow,
          })}
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CForm className="d-flex" >
          <BankMaintenanceAlert />

          {/* <Avatar.Group
            max={{
              count: 2,
              style: { color: '#f56a00', backgroundColor: '#fde3cf' },
            }}
          >
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            <Tooltip title="Ant User" placement="top">
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Tooltip>
            <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
          </Avatar.Group> */}
          <CInputGroup className="d-none">
            <CInputGroupText id="search-addon" className="bg-body-secondary border-0 px-1">
              <CIcon icon={cilSearch} size="lg" className="my-1 mx-2 text-body-secondary" />
            </CInputGroupText>
            <CFormInput
              placeholder={t('search')}
              aria-label="Search"
              disabled
              aria-describedby="search-addon"
              className="bg-body-secondary border-0"
            />
          </CInputGroup>
        </CForm>
        <CHeaderNav className="d-none d-md-flex ms-auto">

          {/* <InstallAppButton /> */}
          {/* <AppHeaderDropdownNotif /> */}
          <AppHeaderDropdownTasks />
          <AppHeaderDropdownMssg />
        </CHeaderNav>
        <CHeaderNav className="ms-auto ms-md-0 ">
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75">

            </div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={i18n.language === 'en' ? cifGb : i18n.language === 'th' ? cifTh : i18n.language === 'lao' ? cifLa : cilLanguage} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={i18n.language === 'th'}
                className="d-flex align-items-center"
                as="button"
                onClick={() => i18n.changeLanguage('th')}
              >
                <CIcon className="me-2" icon={cifTh} size="lg" /> ภาษาไทย
              </CDropdownItem>
              <CDropdownItem
                active={i18n.language === 'en'}
                className="d-flex align-items-center"
                as="button"
                onClick={() => i18n.changeLanguage('en')}
              >
                <CIcon className="me-2" icon={cifGb} size="lg" /> English
              </CDropdownItem>
              <CDropdownItem
                active={i18n.language === 'lao'}
                className="d-flex align-items-center"
                as="button"
                onClick={() => i18n.changeLanguage('lao')}
              >
                <CIcon className="me-2" icon={cifLa} size="lg" /> ລາວ
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          {/* โหมด มึด/สว่าง */}
          {/* <CDropdown variant="nav-item" className='' placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> {t('light')}
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> {t('dark')}
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
          style={{ marginInlineEnd: '-12px' }}
        >
          <CIcon style={{color:"#fff"}} icon={cilSettings} size="lg" />
        </CHeaderToggler>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
