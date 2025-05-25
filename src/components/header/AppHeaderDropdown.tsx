import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'

import { useTranslation } from 'react-i18next'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Logout, getUserID } from '../../Token'
import avatar8 from '../../assets/images/avatars/9.jpg'
import { useNavigate } from 'react-router-dom'
import { CarryOutOutlined, ApiOutlined, UserOutlined } from '@ant-design/icons';
import config from 'src/config/app.config';
import { Button, Modal, Space } from 'antd';
import Swal from 'sweetalert2'
const AppHeaderDropdown = () => {

  const itemContext: any = getUserID();
  const { t } = useTranslation<any>("")

  let navigate = useNavigate()
  
  const getlogout = () => {
    if (window.confirm("ออกจากระบบหรือไม่?")) {
      Logout();
      // window.location.assign("/#/login");
      window.location.href = "/#/login";
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      console.log("ผู้ใช้ยืนยันการออกจากระบบ");
    } else {
      console.log("ผู้ใช้ยกเลิกการออกจากระบบ");
    }

  }
  return (
    <>
      <CDropdown variant="nav-item" alignment="end">
        <CDropdownToggle className="font-700" caret={true}>
        <UserOutlined style={{fontSize:"18px"}} />  {itemContext?.username}
        </CDropdownToggle>
        <CDropdownMenu className="pt-0">
          <CDropdownHeader className="bg-body-secondary text-center text-body-secondary fw-semibold rounded-top mb-2">
            <li style={{ display: "flex", justifyContent: "flex-start" }}><ApiOutlined className='me-2' style={{ fontSize: "16px" }} /> <span className='me-2' id='sytem'></span> {config?.version}</li>
          </CDropdownHeader>
          <CDropdownItem onClick={() => window.location.assign("/#/user-management/profile")}>
            <CIcon icon={cilSettings} className="me-2" />
            {t('Set up personal account')}
          </CDropdownItem>
          <CDropdownItem onClick={() => getlogout()}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            {t('logout')}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>

  )
}

export default AppHeaderDropdown
