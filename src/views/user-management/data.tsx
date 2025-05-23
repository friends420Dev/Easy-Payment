import React, { ElementType, useContext, useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilSpeedometer,
    cilBank,
    cilTransfer,
    cilHistory,
    cilUser,
    cilChartLine,
    cilPeople,
    cilSync,
    cilFilter,
    cilDescription
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { Translation } from 'react-i18next'
// import type { Badge, NavItem } from '../../_nav'
import Apiauth from 'src/api/Apiauth';

export interface TypedataPermissions {
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
    Role?: any // Add this line to include the Role property
}
export interface TypedataRole {
    id: number
    isPublic: boolean
    merchantId: number
    name: string
    permissions: TypedataPermissions[]
    roleName: string
    uuid: string
}

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

export interface TypeTrans {
    records: number | undefined | string | any
    recordsPandingDeposit: number | undefined | string | any
    recordsPandingWithdraws: number | undefined | string | any
    recordsWithdraws: number | undefined | string | any
}
export interface MenuItem {
    component: React.ElementType;
    name: React.ReactNode;
    to?: string;
    icon?: React.ReactNode;
    access?: {
        role: string[];
        isPublic: boolean;
        resource: string[];
    };
    items?: MenuItem[];
    badge?: {
        color: string;
        text: React.ReactNode;
    };
}
export interface Permission {
    isPublic: boolean | number;
    permissionId: boolean | number;
    roleId: number;
    updatedAt: string;
    createdAt: string
    permission: {
        id: number
        action: string
        attributes: string
        created_at: string
        conditions: string[]
        description: string
        flatpermission: string
        ispublic: boolean | number;
        name: string
        resource: string
        updated_at: string
        uuid: string
    }
}
export interface TypePermissions {
    id: number;
    name: string;
    createdAt: string;
    isPublic: boolean | number;
    merchantId?: number;
    uuid: string;
    roleName: string
    permissions: Permission[];

}
import {
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { Badge, Tooltip, Switch, Tag } from 'antd';
const usersData = {
    nav_menu: async (itemContext: any) => {
        let allMenuItems: MenuItem[] = [
            {
                component: CNavItem,
                name: <Translation>{(t) => t('Bank account status')}</Translation>,
                to: '/dashboard',
                icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
                access: {
                    role: ['Owner', 'Subowner', 'Head_Accounting', 'Accounting', 'Cs', 'Head_Cs', 'Manager'],
                    isPublic: true,
                    resource: ["Dashboard"]
                },
            },
            // รายการ ฝาก-ถอน
            {
                component: CNavGroup,
                name: <Translation>{(t) => t('Deposit-Withdrawal List')}</Translation>,
                to: '/base',
                icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,

                access: {
                    role: ['Owner', 'Subowner', 'Head_Accounting', 'Accounting', 'Cs', 'Head_Cs', 'Manager'],
                    isPublic: true,
                    resource: ["BankAccount"]
                },

                items: [
                    {
                        component: CNavItem,
                        name: <Translation>{(t) => t('Deposit List')}</Translation>,
                        to: '/deposit/deposit_list',
                        access: {
                            role: ['Owner', 'Subowner', 'Head_Accounting', 'Accounting', 'Cs', 'Head_Cs', 'Manager'],
                            isPublic: true,
                            resource: ["BankAccount"]
                        },
                        badge: {
                            color: '',
                            text: <Badge
                                className="site-badge-count-109"
                                count={itemContext?.nofDep > 999 ? <Tag>999+ / {itemContext?.nofPendingDep > 999 ? '999+' : itemContext?.nofPendingDep}</Tag> : <Tag>{itemContext?.nofDep} / {itemContext?.nofPendingDep > 999 ? '999+' : itemContext?.nofPendingDep}</Tag>}
                            />
                        },
                    },
                    {
                        component: CNavItem,
                        name: <Translation>{(t) => t('Withdrawal List')}</Translation>,
                        to: '/withdrawal/withdrawal_list',
                        access: {
                            role: ['Owner', 'Subowner', 'Head_Accounting', 'Accounting', 'Cs', 'Head_Cs', 'Manager'],
                            isPublic: true,
                            resource: ["BankAccount"]
                        },
                        badge: {
                            color: '',
                            text: <>

                                <Badge
                                    className="site-badge-count-109"
                                    count={itemContext?.nofWit > 999 ? <Tag>999+ / {itemContext?.recordsPandingWithdraws > 999 ? '999+' : itemContext?.recordsPandingWithdraws}</Tag> : <Tag>{itemContext?.nofWit} / {itemContext?.recordsPandingWithdraws > 999 ? '999+' : itemContext?.recordsPandingWithdraws}</Tag>}
                                />

                            </>
                            ,
                        },
                    },
                ],
            },
            // END รายการ ฝาก-ถอน
            {
                component: CNavItem,
                name: <Translation>{(t) => t('Transfer Money')}</Translation>,
                to: '/money-transfer',
                icon: <CIcon icon={cilSync} customClassName="nav-icon" />,
                access: {
                    role: ['Owner', 'Subowner', 'Accounting', 'Manager', "Head_Accounting",],
                    isPublic: true,
                    resource: ["money-transfer"]
                },
            },
            {
                component: CNavItem,
                name: <Translation>{(t) => t('Bank Statement')}</Translation>,
                to: '/bank-statement',
                icon: <CIcon icon={cilFilter} customClassName="nav-icon" />,
                access: {
                    role: ['Owner', 'Subowner', 'Manager', 'Head_Cs', 'Cs'],
                    isPublic: true,
                    resource: ["BankAccount"]
                },
            },
            {
                component: CNavItem,
                name: <Translation>{(t) => t('Manage Accounts')}</Translation>,
                icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
                to: '/bank-management/bank-accounts',
                access: {
                    role: ['Owner', 'Subowner', 'Manager', 'Head_Cs', 'Accounting', 'Cs_Accounting', "Head_Accounting"],
                    isPublic: true,
                    resource: ["BankAccount"]
                },
            },
            {
                component: CNavItem,
                name: <Translation>{(t) => t('history deposit manual')}</Translation>,
                to: '/manual-history-deposit/manual',
                icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
                access: {
                    role: ['Owner', 'Subowner', 'Manager', 'Head_Cs', 'Cs'],
                    isPublic: true,
                    resource: ["BankAccount"]
                },
            },
            {
                component: CNavItem,
                name: <Translation>{(t) => t('Manage Members')}</Translation>,
                to: '/members',
                icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
                access: {
                    role: ['Owner', 'Subowner', 'Head_Cs', 'Manager', 'Cs'],
                    isPublic: true,
                    resource: ["Member"]
                },
                badge: {
                    color: '',
                    text: <Badge
                        className="site-badge-count-109"
                        count={itemContext?.nofNewMember > 999 ? <Tag><UsergroupAddOutlined style={{ fontSize: "14px" }} /> 999+</Tag> : <Tag><UsergroupAddOutlined style={{ fontSize: "14px" }} /> {itemContext?.nofNewMember}</Tag>}
                        title={`สมาชิกใหม่ ${itemContext?.nofNewMember}`}
                    // style={{ backgroundColor: '#1d3d65', boxShadow: "unset" }}
                    />
                },
            },
            // Admin
            {
                component: CNavGroup,
                name: <Translation>{(t) => t('Admin')}</Translation>,
                to: '/user-management',
                icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
                access: {
                    role: ['Owner', 'Subowner', 'Head_Cs', 'Manager'],
                    isPublic: true,
                    resource: ["User"]
                },
                items: [
                    {
                        component: CNavItem,
                        name: <Translation>{(t) => t('Manage Admin')}</Translation>,
                        to: '/user-management/users',
                        access: {
                            role: ['Owner', 'Subowner', 'Head_Cs', 'Manager'],
                            isPublic: true,
                            resource: ["User"]
                        },
                    },
                    {
                        component: CNavItem,
                        name: <Translation>{(t) => t('Roles')}</Translation>,
                        to: '/user-management/role',
                        access: {
                            role: ['Owner', 'Subowner', 'Manager', 'Head_Cs'],
                            isPublic: true,
                            resource: ["Role"]
                        },
                    },
                ],
            },
            // Report
            {
                component: CNavGroup,
                name: <Translation>{(t) => t('Report')}</Translation>,
                to: '/reports',
                icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
                access: {
                    role: ['Owner', 'Subowner', 'Manager'],
                    isPublic: true,
                    resource: ["Report"]
                },
                items: [
                    {
                        component: CNavItem,
                        name: <Translation>{(t) => t('Overview')}</Translation>,
                        to: '/reports/chart-report',
                        access: {
                            role: ['Owner', 'Subowner', 'Manager'],
                            isPublic: true,
                            resource: ["chart-report"]
                        },
                    },
                    {
                        component: CNavItem,
                        name: <Translation>{(t) => t('Activity Report')}</Translation>,
                        to: '/activity/activity-report',
                        access: {
                            role: ['Owner', 'Subowner', 'Manager'],
                            isPublic: true,
                            resource: ["ReportActivity"]
                        },
                    },
                ],
            },
            {
                component: CNavItem,
                name: <Translation>{(t) => t('Instruction')}</Translation>,
                to: '/Instruction/index',
                icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
                access: {
                    role: ['Owner', 'Subowner', 'Head_Accounting', 'Accounting', 'Cs', 'Head_Cs', 'Manager'],
                    isPublic: true,
                    resource: ["Instruction"]
                },
            },
            // End Report
        ];


        return { data: allMenuItems, total: allMenuItems.length, success: true };
    },
    datAaccessRights: async () => {
        const data = [
            {
                "id": 1,
                "name": "Dashboard",
                "description": "สามารถดูสถานะบัญชี",
                "action": "update",
                "resource": "dashboard",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                ],
                "flatPermission": "Dashboard",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 2,
                "name": "Update Info",
                "description": "สามารถอัพเดทข้อมูลได้",
                "action": "update",
                "resource": "dashboard",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                    "isHeadAdmin",
                    "isAdmin",
                ],
                "flatPermission": "Update",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 3,
                "name": "Deposit list",
                "description": "สามารถอ่านข้อมูล รายการฝากเงิน",
                "action": "read",
                "resource": "FinanceandAccounting",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                    "isHeadAdmin",
                    "isAdmin",
                ],
                "flatPermission": "read:deposit_list:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 4,
                "name": "Withdrawal list",
                "description": "สามารถอ่านข้อมูล รายการถอนเงิน",
                "action": "read",
                "resource": "FinanceandAccounting",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                ],
                "flatPermission": "read:FinanceandAccounting:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 5,
                "name": "Money transfer",
                "description": "สามารถอ่านข้อมูล รายการโอนเงิน",
                "action": "read",
                "resource": "FinanceandAccounting",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                    "isHeadAdmin",
                    "isAdmin",
                ],
                "flatPermission": "read:FinanceandAccounting:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 6,
                "name": "Bank Account Create",
                "description": "สามารถสร้างข้อมูล bank accounts",
                "action": "create",
                "resource": "FinanceandAccounting",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant"
                ],
                "flatPermission": "create:FinanceandAccounting:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 7,
                "name": "manual transaction manual",
                "description": "สามารถสร้างรายการฝาก (มือ)",
                "action": "create",
                "resource": "FinanceandAccounting",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                    "isHeadAdmin",
                ],
                "flatPermission": "create:FinanceandAccounting:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 8,
                "name": "manual history deposit manual",
                "description": "สามารถดูข้อมูล ประวัติรายการฝาก (มือ)",
                "action": "read",
                "resource": "FinanceandAccounting",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant"
                ],
                "flatPermission": "read:FinanceandAccounting:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 9,
                "name": "Members info",
                "description": "สามารถดูข้อมูลสมาชิก",
                "action": "read",
                "resource": "members",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                    "isHeadAdmin",
                    "isAdmin",

                ],
                "flatPermission": "read:members:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 10,
                "name": "Admin info",
                "description": "สามารถอ่านข้อมูล Admin info",
                "action": "read",
                "resource": "admin",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                    "isHeadAdmin",
                ],
                "flatPermission": "read:admin:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-02-03T04:40:55.307Z",
                "updatedAt": "2022-02-03T04:40:55.307Z"
            },
            {
                "id": 11,
                "name": "Read CS Dashboard",
                "description": "สามารถอัพเดทข้อมูล admin ได้",
                "action": "update",
                "resource": "admin",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant",
                    "isHeadAdmin",
                ],
                "flatPermission": "update:admin:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-12-31T11:17:30.894Z",
                "updatedAt": "2023-01-09T21:03:27.046Z"
            },
            {
                "id": 12,
                "name": "Dashboard Report",
                "description": "สามารถอ่านข้อมูลรายงานภาพรวม Dashboard Report",
                "action": "read",
                "resource": "report",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant"
                ],
                "flatPermission": "read:report:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-05-18T15:56:15.233Z",
                "updatedAt": "2022-05-18T15:56:15.233Z"
            },
            {
                "id": 13,
                "name": "Chart Report",
                "description": "สามารถอ่านข้อมูลสรุปภาพรวม Chart Report",
                "action": "read",
                "resource": "report",
                "attributes": [
                    "*"
                ],
                "conditions": [
                    "isOwnedByMerchant"
                ],
                "flatPermission": "read:report:*:{isOwnedByMerchant}",
                "isPublic": false,
                "createdAt": "2022-05-18T15:56:15.233Z",
                "updatedAt": "2022-05-18T15:56:15.233Z"
            },
        ]
        return { data: data, total: data.length, success: true };
    },




    getRole: async () => {
        const data = [
            {
                "id": 1,
                "name": "เจ้าของเว็ป",
                "uuid": "A32DF34E-637D-4FE2-83B3-8FF2B059E5D9",
                "merchantId": 6,
                "roleName": "Owner",
                "isPublic": false,
                "permissions": []
            },
            {
                "id": 19,
                "name": "Accounting",
                "uuid": "592c19f3-6b13-40c6-a839-4e19f151b44d",
                "merchantId": 6,
                "roleName": "Accounting",
                "isPublic": false,
                "permissions": [
                    {
                        "roleId": 19,
                        "permissionId": 1,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 1,
                            "name": "Bank Account Delete",
                            "description": "สามารถลบข้อมูล Bank Account",
                            "uuid": "3a2959db-a276-45d2-a700-5f2fbf67f289",
                            "action": "delete",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": "5",
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:16.000Z",
                            "updated_at": "2025-02-09T06:18:08.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 2,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 2,
                            "name": "Bank Account Create",
                            "description": "สามารถสร้างข้อมูล Bank Account",
                            "uuid": "035d56e7-4720-4eb4-9d4e-60be5d46d46a",
                            "action": "create",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 3,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 3,
                            "name": "Bank Account Read",
                            "description": "สามารถอ่านข้อมูล Bank Account",
                            "uuid": "4cbae83a-081a-44cd-81be-4bf67801f164",
                            "action": "read",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 4,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 4,
                            "name": "Bank Account Update",
                            "description": "สามารถปรับปรุงข้อมูล Bank Account",
                            "uuid": "9a6b2b0c-937e-4eb9-8106-5494bbbcc697",
                            "action": "update",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": "create",
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-09T06:12:57.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 5,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 5,
                            "name": "All Bank Account",
                            "description": "สามารถจัดการ Bank Account",
                            "uuid": "3b67f5cd-d93e-4f4d-b7f2-fbf7e273a6ef",
                            "action": "manage",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 6,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 6,
                            "name": "Bank Account Group Create",
                            "description": "สามารถสร้างข้อมูล Bank Account Group",
                            "uuid": "8b6bedd6-4329-4770-92da-0fab84ff333f",
                            "action": "create",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 7,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 7,
                            "name": "All Bank Account Group",
                            "description": "สามารถจัดการ Bank Account Group",
                            "uuid": "11cf9e86-8673-40d2-946b-2cd3ad72ac1a",
                            "action": "manage",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 8,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 8,
                            "name": "Bank Account Group Delete",
                            "description": "สามารถลบข้อมูล Bank Account Group",
                            "uuid": "b4f3b4b7-3dff-4259-aebf-abdbbef58912",
                            "action": "delete",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 9,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 9,
                            "name": "Bank Account Group Update",
                            "description": "สามารถปรับปรุงข้อมูล Bank Account Group",
                            "uuid": "247581e2-8071-431f-ae83-85afa3d379c4",
                            "action": "update",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 10,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 10,
                            "name": "Bank Account Group Read",
                            "description": "สามารถอ่านข้อมูล Bank Account Group",
                            "uuid": "b406d816-0cd6-4a72-80cc-f6fc48201f05",
                            "action": "read",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 11,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 11,
                            "name": "Read CS Dashboard",
                            "description": "สามารถอ่าน CS Dashboard",
                            "uuid": "c17a9385-4016-45a3-ad5d-23642d7c3dfd",
                            "action": "read",
                            "resource": "CsDashboard",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 12,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 12,
                            "name": "Read Dashboard",
                            "description": "สามารถอ่านข้อมูล Dashboard",
                            "uuid": "24e2b988-5c7e-4a17-a32a-49bef98ded1e",
                            "action": "read",
                            "resource": "Dashboard",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": "dashboard",
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 19,
                        "permissionId": 13,
                        "createdAt": "2025-02-09T07:05:36.000Z",
                        "updatedAt": "2025-02-09T07:05:36.000Z",
                        "permission": {
                            "id": 13,
                            "name": "Deposit Read",
                            "description": "สามารถอ่านข้อมูล Deposit",
                            "uuid": "5e9bb337-9067-40d2-aae2-f5fed12309ab",
                            "action": "read",
                            "resource": "Deposit",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    }
                ]
            },
            {
                "id": 20,
                "name": "Admin",
                "uuid": "2b251842-8814-4c51-9f50-465ecf0b1b42",
                "merchantId": 6,
                "roleName": "Admin",
                "isPublic": false,
                "permissions": [
                    {
                        "roleId": 20,
                        "permissionId": 11,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 11,
                            "name": "Read CS Dashboard",
                            "description": "สามารถอ่าน CS Dashboard",
                            "uuid": "c17a9385-4016-45a3-ad5d-23642d7c3dfd",
                            "action": "read",
                            "resource": "CsDashboard",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 12,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 12,
                            "name": "Read Dashboard",
                            "description": "สามารถอ่านข้อมูล Dashboard",
                            "uuid": "24e2b988-5c7e-4a17-a32a-49bef98ded1e",
                            "action": "read",
                            "resource": "Dashboard",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": "dashboard",
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 18,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 18,
                            "name": "Create Manual Deposit",
                            "description": "สร้างรายการฝาก Manual",
                            "uuid": "b3e6ab5c-a54d-400e-b95b-51896247fc12",
                            "action": "create",
                            "resource": "ManualDeposit",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 21,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 21,
                            "name": "Member Update",
                            "description": "สามารถปรับปรุงข้อมูล Member",
                            "uuid": "845a65c5-f130-497b-92af-4bfcef5b44a8",
                            "action": "update",
                            "resource": "Member",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:38.000Z",
                            "updated_at": "2025-02-08T12:05:38.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 22,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 22,
                            "name": "Member Delete",
                            "description": "สามารถลบข้อมูล Member",
                            "uuid": "8e0adeaa-3ce4-4ca9-84e6-933a4b4e6ba4",
                            "action": "delete",
                            "resource": "Member",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:38.000Z",
                            "updated_at": "2025-02-08T12:05:38.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 23,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 23,
                            "name": "All Member",
                            "description": "สามารถจัดการ Member",
                            "uuid": "a264ad40-0ce3-46b2-b451-15645e8aa783",
                            "action": "manage",
                            "resource": "Member",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:38.000Z",
                            "updated_at": "2025-02-08T12:05:38.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 24,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 24,
                            "name": "Member Create",
                            "description": "สามารถสร้างข้อมูล Member",
                            "uuid": "6c1bc376-2c07-482a-b0ea-8c3e2a3efe70",
                            "action": "create",
                            "resource": "Member",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:38.000Z",
                            "updated_at": "2025-02-08T12:05:38.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 25,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 25,
                            "name": "Member Read",
                            "description": "สามารถอ่านข้อมูล Member",
                            "uuid": "38bd77d1-ea19-4093-935a-408b0c682abe",
                            "action": "read",
                            "resource": "Member",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:38.000Z",
                            "updated_at": "2025-02-08T12:05:38.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 39,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 39,
                            "name": "User Delete",
                            "description": "สามารถลบข้อมูล User",
                            "uuid": "6f555f69-cdd6-4162-b972-79f6d7446d98",
                            "action": "delete",
                            "resource": "User",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:39.000Z",
                            "updated_at": "2025-02-08T12:05:39.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 40,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 40,
                            "name": "All User",
                            "description": "สามารถจัดการ User",
                            "uuid": "24f1ecf5-a6b4-47c9-a2ab-9e9ff531642c",
                            "action": "manage",
                            "resource": "User",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:39.000Z",
                            "updated_at": "2025-02-08T12:05:39.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 41,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 41,
                            "name": "User Read",
                            "description": "สามารถอ่านข้อมูล User",
                            "uuid": "5617c934-e552-4871-a0d7-c43b45494bce",
                            "action": "read",
                            "resource": "User",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:39.000Z",
                            "updated_at": "2025-02-08T12:05:39.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 42,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 42,
                            "name": "User Update",
                            "description": "สามารถปรับปรุงข้อมูล User",
                            "uuid": "a6c8d69b-de03-4bf3-889f-9b962ba5a7a1",
                            "action": "update",
                            "resource": "User",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:39.000Z",
                            "updated_at": "2025-02-08T12:05:39.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 43,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 43,
                            "name": "User Me",
                            "description": "สามารถอ่านข้อมูล User ตัวเองได้",
                            "uuid": "37e37cc0-3bef-45b0-aed3-2ea2877f2017",
                            "action": "me",
                            "resource": "User",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:39.000Z",
                            "updated_at": "2025-02-08T12:05:39.000Z"
                        }
                    },
                    {
                        "roleId": 20,
                        "permissionId": 44,
                        "createdAt": "2025-02-09T06:27:32.000Z",
                        "updatedAt": "2025-02-09T06:27:32.000Z",
                        "permission": {
                            "id": 44,
                            "name": "User Create",
                            "description": "สามารถสร้างข้อมูล User",
                            "uuid": "58a24109-5e9a-47fa-94aa-0d68712b6445",
                            "action": "create",
                            "resource": "User",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:39.000Z",
                            "updated_at": "2025-02-08T12:05:39.000Z"
                        }
                    }
                ]
            },
            {
                "id": 21,
                "name": "Subowner",
                "uuid": "c384ddae-f770-4e97-816e-bf83274cd5fe",
                "merchantId": 6,
                "roleName": "Subowner",
                "isPublic": false,
                "permissions": [
                    {
                        "roleId": 21,
                        "permissionId": 1,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 1,
                            "name": "Bank Account Delete",
                            "description": "สามารถลบข้อมูล Bank Account",
                            "uuid": "3a2959db-a276-45d2-a700-5f2fbf67f289",
                            "action": "delete",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": "5",
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:16.000Z",
                            "updated_at": "2025-02-09T06:18:08.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 2,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 2,
                            "name": "Bank Account Create",
                            "description": "สามารถสร้างข้อมูล Bank Account",
                            "uuid": "035d56e7-4720-4eb4-9d4e-60be5d46d46a",
                            "action": "create",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 3,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 3,
                            "name": "Bank Account Read",
                            "description": "สามารถอ่านข้อมูล Bank Account",
                            "uuid": "4cbae83a-081a-44cd-81be-4bf67801f164",
                            "action": "read",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 4,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 4,
                            "name": "Bank Account Update",
                            "description": "สามารถปรับปรุงข้อมูล Bank Account",
                            "uuid": "9a6b2b0c-937e-4eb9-8106-5494bbbcc697",
                            "action": "update",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": "create",
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-09T06:12:57.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 5,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 5,
                            "name": "All Bank Account",
                            "description": "สามารถจัดการ Bank Account",
                            "uuid": "3b67f5cd-d93e-4f4d-b7f2-fbf7e273a6ef",
                            "action": "manage",
                            "resource": "BankAccount",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 6,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 6,
                            "name": "Bank Account Group Create",
                            "description": "สามารถสร้างข้อมูล Bank Account Group",
                            "uuid": "8b6bedd6-4329-4770-92da-0fab84ff333f",
                            "action": "create",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 7,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 7,
                            "name": "All Bank Account Group",
                            "description": "สามารถจัดการ Bank Account Group",
                            "uuid": "11cf9e86-8673-40d2-946b-2cd3ad72ac1a",
                            "action": "manage",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 8,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 8,
                            "name": "Bank Account Group Delete",
                            "description": "สามารถลบข้อมูล Bank Account Group",
                            "uuid": "b4f3b4b7-3dff-4259-aebf-abdbbef58912",
                            "action": "delete",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 9,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 9,
                            "name": "Bank Account Group Update",
                            "description": "สามารถปรับปรุงข้อมูล Bank Account Group",
                            "uuid": "247581e2-8071-431f-ae83-85afa3d379c4",
                            "action": "update",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 10,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 10,
                            "name": "Bank Account Group Read",
                            "description": "สามารถอ่านข้อมูล Bank Account Group",
                            "uuid": "b406d816-0cd6-4a72-80cc-f6fc48201f05",
                            "action": "read",
                            "resource": "BankAccountGroup",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 11,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 11,
                            "name": "Read CS Dashboard",
                            "description": "สามารถอ่าน CS Dashboard",
                            "uuid": "c17a9385-4016-45a3-ad5d-23642d7c3dfd",
                            "action": "read",
                            "resource": "CsDashboard",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 12,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 12,
                            "name": "Read Dashboard",
                            "description": "สามารถอ่านข้อมูล Dashboard",
                            "uuid": "24e2b988-5c7e-4a17-a32a-49bef98ded1e",
                            "action": "read",
                            "resource": "Dashboard",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": "dashboard",
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    },
                    {
                        "roleId": 21,
                        "permissionId": 13,
                        "createdAt": "2025-02-09T06:55:17.000Z",
                        "updatedAt": "2025-02-09T06:55:17.000Z",
                        "permission": {
                            "id": 13,
                            "name": "Deposit Read",
                            "description": "สามารถอ่านข้อมูล Deposit",
                            "uuid": "5e9bb337-9067-40d2-aae2-f5fed12309ab",
                            "action": "read",
                            "resource": "Deposit",
                            "attributes": "*",
                            "conditions": "isOwnedByMerchant",
                            "flatpermission": null,
                            "ispublic": true,
                            "created_at": "2025-02-08T12:05:37.000Z",
                            "updated_at": "2025-02-08T12:05:37.000Z"
                        }
                    }
                ]
            }
        ]
        return { data: { data: data, total: data.length, success: true, message: "Success" } };
    }



}

export default usersData