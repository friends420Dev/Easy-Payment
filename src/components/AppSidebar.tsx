import React, { ElementType, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from './../assets/brand/logo'
import { sygnet } from './../assets/brand/sygnet'
import Apiauth from 'src/api/Apiauth';
// sidebar nav config
// import navigation from '../_nav'
import { cibAmazonPay, cibCcAmazonPay } from '@coreui/icons'
import type { State } from '../store'
import usersData, { Permission } from 'src/views/user-management/data'
import config from 'src/config/app.config';
import {
  cilSpeedometer,
  cilBank,
  cilTransfer,
  cilHistory,
  cilUser,
  cilChartLine,
  cilPeople,
  cilSync,
  cilFilter
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next';
export type NavItem = {
  badge?: string | JSX.Element
  component: string
  href?: string
  icon?: string | JSX.Element
  items?: NavItem[]
  name: string | JSX.Element
  to: string
  access?: string
}
interface Menu {
  badge: string | JSX.Element;
  component: string;
  href: string | JSX.Element;
  name: string | JSX.Element
  icon: string;
  to?: string
  items?: string[]
  access: {
    role: string[];
    isPublic: boolean;
    resource: string[];
  };
}
interface User {
  added_by: string;
  admin_status: number;
  admin_type: string;
  auth_token: string
  created_at: string;
  id?: number
  invalid_email_password?: number
  merchantId: number;
  name: string;
  password: string;
  profile_photo: string;
  role: string;
  roleID: number;
  updated_at: string;
  user_device_id: string;
  username: string;
  user: {
    roleID: number;
    role: string;
  }
}
interface Role {
  uuid: string;
  roleName: string;
  name: string;
  merchantId?: number
  isPublic?: boolean
  id: number;
  data?: string[]
  permissions: string | Permissions[]
}
interface Permissions {
  isPublic: number;
  createdAt: string;
  permissionId: number;
  roleId?: number
  permission: Permission2;
  updatedAt: string
}
interface Permission2 {

  permission: {
    action: string;
    attributes: string;
    conditions: string;
    created_at?: string
    description: string;
    id: number;
    ispublic: boolean;
    name: string;
    resource: string;
    updated_at: string;
    uuid: string;
    flatpermission: string;
  }
}

interface Menuv {
  to?: string;
  component?: string | ElementType;
  name?: string | JSX.Element
  icon?: string;
  items?: NavItem[]
  access?: {
    role?: string;
    isPublic?: boolean;
    resource?: string[]
  };
}

interface Userv {
  id: number;
  name: string;
  roles: string[];
  permissions: string | Permissions[]
}
export type Badge = {
  color: string
  text: string
}
export type TypePermission = {
  id?: number;
  createdAt: string;
  isPublic: boolean | number;
  merchantId?: number;
  uuid: string;
  roleName: string
  permissions?: Permission[]
}
import { DataContext } from 'src/layout/DefaultLayout';
// import { socketNotifydep } from 'src/utils/socket';
const AppSidebar = () => {
  const itemContext: any = useContext<any>(DataContext)
  const data: any = {
    id: 1,
    createdAt: "2025-02-14T15:38:45.000Z",
    isPublic: true,
    name: "Owner",
    merchantId: 6,
    uuid: "53191cc4-5e57-4ce9-bc27-4d6a10beeb90",
    roleName: "GBP Vegas Owner",
    permissions: [
      {
        "roleId": 39,
        "permissionId": 1,
        "isPublic": 1,
        "createdAt": "2025-02-14T15:38:45.000Z",
        "updatedAt": "2025-04-16T08:29:21.000Z",
        "permission": {
          "id": 1,
          "name": "dashboard read",
          "description": "สามารถดูสถานะบัญชี Dashboard",
          "uuid": "3a2959db-a276-45d2-a700-5f2fbf67f289",
          "action": "read",
          "resource": "Dashboard",
          "attributes": "*",
          "conditions": ['Owner', 'Subowner', 'Head_Accounting', 'Accounting', 'Cs', 'Head_Cs', 'Manager'],
          "flatpermission": "",
          "ispublic": true,
          "created_at": "2025-02-08T12:05:16.000Z",
          "updated_at": "2025-02-09T06:18:08.000Z"
        }
      },
      {
        "roleId": 39,
        "permissionId": 1,
        "isPublic": 1,
        "createdAt": "2025-02-14T15:38:45.000Z",
        "updatedAt": "2025-04-16T08:29:21.000Z",
        "permission": {
          "id": 2,
          "name": "dashboard read2",
          "description": "สามารถอัพเดทสถานะบัญชี Dashboard",
          "uuid": "3a2959db-a276-45d2-a700-5f2fbf67f2845",
          "action": "read",
          "resource": "Dashboard",
          "attributes": "*",
          "conditions": ['Owner', 'Subowner', 'Head_Accounting', 'Accounting'],
          "flatpermission": "",
          "ispublic": true,
          "created_at": "2025-02-08T12:05:16.000Z",
          "updated_at": "2025-02-09T06:18:08.000Z"
        }
      },
      
    ]

  }
  const dispatch = useDispatch()
  const unfoldable = useSelector((state: State) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state: State) => state.sidebarShow)
  var Web_name = config?.web_name;
  const [navData, setNavData] = React.useState([]);
  const [DataPermissions, setDataPermissions] = React.useState([]);
  const [DataRoleAdmin, setDataRoleAdmin]: any = React.useState("");
  const [stateRole, setStateRole]: any = React.useReducer(
    (stateRole: any, newState_Role: any) => ({ ...stateRole, ...newState_Role }),
    {
      data: [],
    },
  );

  useEffect(() => {
    usersData.nav_menu(data, itemContext)
      .then((data: any) => setNavData(data?.data))
      .catch((error: any) => console.error(error));
  }, [itemContext]);
  useEffect(() => {
    Apiauth.getProfileAdmin()
      .then((res: any) => setDataRoleAdmin(res?.data))
      .catch((error: any) => console.error(error));
  }, []);
  useEffect(() => {
    Apiauth.getRole()
      .then((res: any) => setStateRole({ data: res?.data?.data }))
      .catch((error: any) => console.error(error));
  }, []);
  function extractRTB(text: any) {
    // ตรวจสอบว่าสตริงมีคำว่า 'RTB' อยู่หรือไม่
    const index = text.indexOf('PAY');
    if (index != -1) {
      // ถ้าพบ 'RTB' ให้ตัดสตริงตั้งแต่ตำแหน่งที่พบ 'RTB' จนถึง 3 ตัวอักษร
      return text.substring(index, index + 3)// + "88";
    } else {
      return 'No data'; // หรือส่งค่าอื่นๆ ตามความเหมาะสม เช่น null, undefined
    }
  }
  function filterUser(user: User, role: Role) {

    let filterRoleAdmin: any = role?.data?.filter((res: any) => {
      if (user?.user?.roleID == res?.id) {
        return user?.user?.roleID == res?.id
      }
    })
    if (filterRoleAdmin?.length == 0) {
      return []
    }
    let permissions = filterRoleAdmin;
    return { ...user, ...permissions }
  }

  const isUser: any = filterUser(DataRoleAdmin, stateRole);
  const menus: any = navData;
  var i = 0
  const user: any = {
    id: isUser?.user?.id,
    name: isUser?.user?.name,
    roles: [isUser?.user?.role],
    permissions: { ...isUser[i] }

  };
  function filterMenusByUser(menus: Menuv[], user: Userv): Menuv[] {
    return menus.filter((menu: any) => {
      return menu?.access?.role?.some((role: any) => user?.roles?.includes(role));
    });
  }
  const accessibleMenus: any = filterMenusByUser(menus, user);
  var isMenu: any = accessibleMenus
  // console.log(isMenu)

  return (
    <CSidebar
      className="bg-dark-gradient border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className='w-100 d-flex' style={{ justifyContent: "center", alignItems: "center" }} as={NavLink} to="/">
          {/* <CIcon customClassName="sidebar-brand-full me-2" style={{fill:"#e2e2e3"}} icon={cibCcAmazonPay} height={24} /> */}
          <img src="https://img2.pic.in.th/pic/logo-pay88.png" className='sidebar-brand-full me-2 img-logo' height={45} alt="logo pay88" border="0" />
          {/* <b className='sidebar-brand-full '>{Web_name}</b> */}
          <b className='sidebar-brand-narrow text-center'>{extractRTB(Web_name)}</b>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={isMenu} permissions={user?.permissions} />
    </CSidebar>
  )
}

export default AppSidebar
