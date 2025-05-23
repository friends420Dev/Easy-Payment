import React, { ReactNode, ElementType, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { CBadge, CNavLink, CSidebarNav } from '@coreui/react-pro'
import Apiauth from 'src/api/Apiauth';

// import type { Badge, NavItem } from '../_nav'
export interface TypePermissions {
  action: string
  attributes: string
  conditions: string
  created_at: string
  description: string
  flatpermission: string
  id: number
  ispublic: boolean
  name: string
  resource: string
  uuid: string
  updated_at: string
}
export type AccessRights = {
  role: string
  isPublic: boolean
  resource?: string
}
export type Badge = {
  color: string
  text: string
}
export type NavItem = {
  badge?: Badge
  component: string | ElementType
  href?: string
  icon?: string | JSX.Element
  items?: NavItem[]
  name: string | JSX.Element
  to?: string
  access?: AccessRights
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


export const AppSidebarNav = ({ items, permissions }: { items: NavItem[], permissions: TypePermissions[] }) => {
//console.log(items)
  const navLink = (
    name: string | JSX.Element,
    icon: string | ReactNode,
    badge?: Badge,
    indent = false,
  ) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }


  const navItem = (item: NavItem, index: number, indent = false, permissions: any) => {
    const { component, name, badge, icon, access, ...rest }: any = item
    const isAccess = access;

    const Component = component
    function checkPremission(prem: any, nav: any) {
      return <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink disabled={!isAccess?.isPublic || false} {...(rest?.to && { as: NavLink })} {...rest}> 
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (

          <CNavLink disabled={!isAccess?.isPublic || false}>
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        )}
      </Component>
    }

    return (
      <>{checkPremission(permissions, rest.to)}</>
    )
  }

  const navGroup = (item: NavItem, index: number, permissions: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { component, name, icon, items, to, access, ...rest } = item
    const Component = component
    // console.log(data)
    // console.log(permissions)
    const isAccess = access;


    return (
      <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
        {item?.items?.map((item: any, index: any) =>
          item?.items ? navGroup(item, index, permissions) : navItem(item, index, true, permissions),
          // (),
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items?.map((item: any, index: any) =>
          (item?.items ? navGroup(item, index, permissions) : navItem(item, index, false, permissions))

        )}
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
