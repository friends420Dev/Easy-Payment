import React, { ElementType, useContext } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilCalendar,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilEnvelopeOpen,
  cilGrid,
  cilLayers,
  cilMap,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilBank,
  cilTransfer,
  cilHistory,
  cilChart,
  cilUser,
  cilChartLine,
  cilPeople,
  cilTouchApp,
  cilSync
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next'
// import { DataContext } from 'src/layout/DefaultLayout'
// const itemContext: any = useContext<any>(DataContext)
// console.log(usersData?.nav_menu())
import { SwapOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
export type Badge = {
  color: string
  text: string
}
export type Level = {
  level: [string | JSX.Element]
}
export type AccessRights = {
  role: string
  isPublic: boolean
  resource?: string
}
export type TypedataPermissions = {
  createdAt: string
  permission: string[]
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
  updated_at: string
  uuid: string
  permissionId: number
  roleId: number
  updatedAt: string
}
export type TypedataRole = {
  id: number
  isPublic: boolean
  merchantId: number
  name: string
  permissions: TypedataPermissions[]
  roleName: string
  uuid: string
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

// const _nav: NavItem[] = [
//   {
//     component: CNavItem,
//     name: <Translation>{(t) => t('Bank account status')}</Translation>,
//     to: '/dashboard',
//     icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

//   },
//   // Finance and Accounting
//   {
//     component: CNavTitle,
//     name: <Translation>{(t) => t('Finance and Accounting')}</Translation>,
//   },
//   {
//     component: CNavGroup,
//     name: <Translation>{(t) => t('Financial lists')}</Translation>,
//     to: '/base',
//     icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
// items: [
//   {
//     component: CNavItem,
//     name: <Translation>{(t) => t('Deposit List')}</Translation>,
//     to: '/deposit/deposit_list',
//   },
//   {
//     component: CNavItem,
//     name: <Translation>{(t) => t('Withdrawal List')}</Translation>,
//     to: '/withdrawal/withdrawal_list',
//   },

// ],
//   },
//   // {
//   //   component: CNavItem,
//   //   name: <Translation>{(t) => t('Bank Statement')}</Translation>,
//   //   to: '/bank-statement',
//   //   icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
//   // },
//   {
//     component: CNavItem,
//     name: <Translation>{(t) => t('Transfer Money')}</Translation>,
//     to: '/money-transfer',
//     icon: <CIcon icon={cilSync} customClassName="nav-icon" />,
//   },
//   {
//     component: CNavGroup,
//     name: <Translation>{(t) => t('Bank Account')}</Translation>,
//     to: '/bank-management',
//     icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: <Translation>{(t) => t('Manage Accounts')}</Translation>,
//         to: '/bank-management/bank-accounts',
//       },
//       // {
//       //   component: CNavItem,
//       //   name: <Translation>{(t) => t('Bank account group')}</Translation>,
//       //   to: '/bank-management/bank-account-groups',
//       // },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: <Translation>{(t) => t('Create a list')}</Translation>,
//     to: '/manual-transaction',
//     icon: <CIcon icon={cilTouchApp} customClassName="nav-icon" />,
//     items: [
//       // {
//       //   component: CNavItem,
//       //   name: <Translation>{(t) => t('Deposit List Slip')}</Translation>,
//       //   to: '/manual-transaction/slip',
//       // },
//       // {
//       //   component: CNavItem,
//       //   name: <Translation>{(t) => t('Deposit List Trans Ref')}</Translation>,
//       //   to: '/manual-transaction/trans-ref',
//       // },
//       {
//         component: CNavItem,
//         name: <Translation>{(t) => t('Deposit List Manual')}</Translation>,
//         to: '/manual-transaction/manual',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: <Translation>{(t) => t('history Create a list')}</Translation>,
//     to: '/manual-history-deposit',
//     icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: <Translation>{(t) => t('manual')}</Translation>,
//         to: '/manual-history-deposit/manual',
//       },
//     ],
//   },
//   // Members
//   {
//     component: CNavTitle,
//     name: <Translation>{(t) => t('Members')}</Translation>,
//   },
//   {
//     component: CNavGroup,
//     name: <Translation>{(t) => t('Members')}</Translation>,
//     to: '/bank-management',
//     icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: <Translation>{(t) => t('Manage Members')}</Translation>,
//         to: '/members',
//       },
//       // {
//       //   component: CNavItem,
//       //   name: <Translation>{(t) => t('history')}</Translation>,
//       //   to: '/user-management/history',
//       // },

//     ],
//   },
//   // Admin
//   {
//     component: CNavTitle,
//     name: <Translation>{(t) => t('Admin')}</Translation>,
//   },
//   {
//     component: CNavGroup,
//     name: <Translation>{(t) => t('Admin')}</Translation>,
//     to: '/bank-management',
//     icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: <Translation>{(t) => t('Manage Admin')}</Translation>,
//         to: '/user-management/users',
//       },
//       // {
//       //   component: CNavItem,
//       //   name: <Translation>{(t) => t('history')}</Translation>,
//       //   to: '/user-management/history',
//       // },

//     ],
//   },

//   // Reporting
//   {
//     component: CNavTitle,
//     name: <Translation>{(t) => t('Reporting')}</Translation>,
//   },
//   {
//     component: CNavGroup,
//     name: <Translation>{(t) => t('Report')}</Translation>,
//     to: '/base',
//     icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: <Translation>{(t) => t('Overview Report')}</Translation>,
//         to: '/reports/dashboard-report',
//       },
//       // {
//       //   component: CNavItem,
//       //   name: <Translation>{(t) => t('Overview All Merchant')}</Translation>,
//       //   to: '/reports/dashboard-report-by-merchant',
//       // },
//       {
//         component: CNavItem,
//         name: <Translation>{(t) => t('Overview')}</Translation>,
//         to: '/reports/chart-report',
//       },
//       // {
//       //   component: CNavItem,
//       //   name: <Translation>{(t) => t('Download Report')}</Translation>,
//       //   to: '/reports/export-report',
//       // },
//     ],
//   },
//   // {
//   //   component: CNavGroup,
//   //   name: <Translation>{(t) => t('forms')}</Translation>,
//   //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
//   //   items: [
//   //     {
//   //       component: CNavItem,
//   //       name: 'Form Control',
//   //       to: '/forms/form-control',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Select',
//   //       to: '/forms/select',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Multi Select',
//   //       to: '/forms/multi-select',
//   //       badge: {
//   //         color: 'danger-gradient',
//   //         text: 'PRO',
//   //       },
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Checks & Radios',
//   //       to: '/forms/checks-radios',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Range',
//   //       to: '/forms/range',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Input Group',
//   //       to: '/forms/input-group',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Floating Labels',
//   //       to: '/forms/floating-labels',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Date Picker',
//   //       to: '/forms/date-picker',
//   //       badge: {
//   //         color: 'danger-gradient',
//   //         text: 'PRO',
//   //       },
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Date Range Picker',
//   //       to: '/forms/date-range-picker',
//   //       badge: {
//   //         color: 'danger-gradient',
//   //         text: 'PRO',
//   //       },
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Time Picker',
//   //       to: '/forms/time-picker',
//   //       badge: {
//   //         color: 'danger-gradient',
//   //         text: 'PRO',
//   //       },
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Layout',
//   //       to: '/forms/layout',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Validation',
//   //       to: '/forms/validation',
//   //     },
//   //   ],
//   // },
//   // {
//   //   component: CNavGroup,
//   //   name: <Translation>{(t) => t('icons')}</Translation>,
//   //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//   //   items: [
//   //     {
//   //       component: CNavItem,
//   //       name: 'CoreUI Free',
//   //       to: '/icons/coreui-icons',
//   //       badge: {
//   //         color: 'success-gradient',
//   //         text: 'FREE',
//   //       },
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'CoreUI Flags',
//   //       to: '/icons/flags',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'CoreUI Brands',
//   //       to: '/icons/brands',
//   //     },
//   //   ],
//   // },
//   // {
//   //   component: CNavGroup,
//   //   name: <Translation>{(t) => t('notifications')}</Translation>,
//   //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
//   //   items: [
//   //     {
//   //       component: CNavItem,
//   //       name: 'Alerts',
//   //       to: '/notifications/alerts',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Badges',
//   //       to: '/notifications/badges',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Modal',
//   //       to: '/notifications/modals',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: 'Toasts',
//   //       to: '/notifications/toasts',
//   //     },
//   //   ],
//   // },
//   // {
//   //   component: CNavItem,
//   //   name: <Translation>{(t) => t('widgets')}</Translation>,
//   //   to: '/widgets',
//   //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//   //   badge: {
//   //     color: 'info-gradient',
//   //     text: 'NEW',
//   //   },
//   // },
//   // {
//   //   component: CNavItem,
//   //   name: 'Smart Table',
//   //   icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
//   //   badge: {
//   //     color: 'danger-gradient',
//   //     text: 'PRO',
//   //   },
//   //   to: '/smart-table',
//   // },
//   // {
//   //   component: CNavTitle,
//   //   name: <Translation>{(t) => t('plugins')}</Translation>,
//   // },
//   // {
//   //   component: CNavItem,
//   //   name: <Translation>{(t) => t('calendar')}</Translation>,
//   //   icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
//   //   badge: {
//   //     color: 'danger-gradient',
//   //     text: 'PRO',
//   //   },
//   //   to: '/plugins/calendar',
//   // },
//   // {
//   //   component: CNavItem,
//   //   name: <Translation>{(t) => t('charts')}</Translation>,
//   //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
//   //   to: '/plugins/charts',
//   // },
//   // {
//   //   component: CNavItem,
//   //   name: 'Google Maps',
//   //   icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
//   //   badge: {
//   //     color: 'danger-gradient',
//   //     text: 'PRO',
//   //   },
//   //   to: '/plugins/google-maps',
//   // },
//   // {
//   //   component: CNavTitle,
//   //   name: <Translation>{(t) => t('extras')}</Translation>,
//   // },
//   // {
//   //   component: CNavGroup,
//   //   name: <Translation>{(t) => t('pages')}</Translation>,
//   //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//   //   items: [
//   //     {
//   //       component: CNavItem,
//   //       name: <Translation>{(t) => t('login')}</Translation>,
//   //       to: '/login',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: <Translation>{(t) => t('register')}</Translation>,
//   //       to: '/register',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: <Translation>{(t) => t('error404')}</Translation>,
//   //       to: '/404',
//   //     },
//   //     {
//   //       component: CNavItem,
//   //       name: <Translation>{(t) => t('error500')}</Translation>,
//   //       to: '/500',
//   //     },
//   //   ],
//   // },
//   // {
//   //   component: CNavGroup,
//   //   name: <Translation>{(t) => t('apps')}</Translation>,
//   //   icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
//   //   items: [
//   //     {
//   //       component: CNavGroup,
//   //       name: 'Invoicing',
//   //       icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
//   //       to: '/apps/invoicing',
//   //       items: [
//   //         {
//   //           component: CNavItem,
//   //           name: 'Invoice',
//   //           badge: {
//   //             color: 'danger-gradient',
//   //             text: 'PRO',
//   //           },
//   //           to: '/apps/invoicing/invoice',
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       component: CNavGroup,
//   //       name: 'Email',
//   //       to: '/apps/email',
//   //       icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
//   //       items: [
//   //         {
//   //           component: CNavItem,
//   //           name: 'Inbox',
//   //           badge: {
//   //             color: 'danger-gradient',
//   //             text: 'PRO',
//   //           },
//   //           to: '/apps/email/inbox',
//   //         },
//   //         {
//   //           component: CNavItem,
//   //           name: 'Message',
//   //           badge: {
//   //             color: 'danger-gradient',
//   //             text: 'PRO',
//   //           },
//   //           to: '/apps/email/message',
//   //         },
//   //         {
//   //           component: CNavItem,
//   //           name: 'Compose',
//   //           badge: {
//   //             color: 'danger-gradient',
//   //             text: 'PRO',
//   //           },
//   //           to: '/apps/email/compose',
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },
// ]


// //console.log(_nav)
// export default _nav
