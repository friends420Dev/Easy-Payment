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
const AppSidebar = ({item}:any) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state: State) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state: State) => state.sidebarShow)
  var Web_name = config?.web_name;
  const [navData, setNavData] = React.useState([]);
  const [DataRoleAdmin, setDataRoleAdmin]: any = React.useState("");
  const [stateRole, setStateRole]: any = React.useReducer(
    (stateRole: any, newState_Role: any) => ({ ...stateRole, ...newState_Role }),
    {
      data: [],
    },
  );
  useEffect(() => {
    const fetchData = () => {
      usersData.nav_menu(item) // ปรับ data ให้เหมาะสมกับที่คุณต้องการ
        .then((data: any) => setNavData(data?.data))
        .catch((error: any) => console.error(error));
    };
    fetchData();
  }, [item]);
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
    const index = text.indexOf('PAY');
    if (index != -1) {
      return text.substring(index, index + 3)
    } else {
      return 'No data';
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
          <CIcon customClassName="sidebar-brand-full me-2" style={{fill:"#1677ff"}} icon={cibCcAmazonPay} height={30} />
          {/* <img src="https://img5.pic.in.th/file/secure-sv1/logo-easy-payment.md.png" className='sidebar-brand-full me-2 img-logo' height={45} alt="logo pay88" border="0" /> */}
          <b className='sidebar-brand-full ' style={{color:"#1677ff"}}>{Web_name}</b>
          {/* <b className='sidebar-brand-narrow text-center'>{extractRTB(Web_name)}</b> */}
          <CIcon customClassName="sidebar-brand-narrow text-center" style={{fill:"#1677ff"}} icon={cibCcAmazonPay} height={30} />
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
