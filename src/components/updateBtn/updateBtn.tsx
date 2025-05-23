import React, { useEffect, useRef, useContext } from 'react'
import { DataContext } from 'src/layout/DefaultLayout'
import { Translation } from 'react-i18next'
import { CButton } from '@coreui/react'
import {
    LoadingOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
type Props = {
    location?: any

}
import { Button, Flex, Tooltip, Segmented, Switch, notification } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const UpdateBtn = ({ location }: Props) => {
    const itemContext: any = useContext<any>(DataContext);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, msg: any) => {
        api[type]({
            message: 'Notification',
            description:
                msg,
        });
    };
    function funCheckRole(role: any) {
        if (!role) {
            return false
        }
        if (role == "Cs_Accounting") {
            return false
        } else {
            return true
        }
    }
    async function updateData(params: any) {
        itemContext?.setLoadding(true)
        itemContext?.setSpinUpdate(true)
        itemContext?.getDataProfileAdmin()
        itemContext?.getallAdmins()
        itemContext?.bank_closed_system_maintenance();
        let funCheckRoles: any = funCheckRole(itemContext?.dataAdmin?.data?.role);
        if (!funCheckRoles) {
            openNotificationWithIcon('error', `Role: ${itemContext?.dataAdmin?.data?.role} ไม่สามารถใช้งาน ฟังชั่นอัพเดทข้อมูลอัตโนมัติ ได้ค่ะ`)
        }
        let loca: any = params;
        //console.log(loca)
        switch (loca) {
            case '/dashboard':
                itemContext?.getBankAccount()
                break;
            case '/deposit/deposit_list':
                itemContext?.get_data_deposit()
                itemContext?.setActivePage?.(itemContext?.activePage)
                break;
            case '/withdrawal/withdrawal_list':
                itemContext?.get_data_wit()
                itemContext?.setActivePageWit?.(itemContext?.activePageWit)
                break;
            case "/money-transfer":
                itemContext?.getListOfBankAccount()
                break;
            case "/bank-management/bank-accounts":
                itemContext?.getBankAccount();
                break;
            case "/bank-management/bank-account-groups":
                itemContext?.setLoadding(true)
                break;
            case "/members":
                // 
                break;
            case "/user-management/users":
                // 
                break;
            case "/user-management/role":
                itemContext?.getDataPermissions()
                break;
            case "/manual-history-deposit/manual":
                itemContext?.getall_Transaction_manual()
                break;
            case "/bank-statement":
                itemContext?.getBankAccount()
                itemContext?.getdata_BankAccount()
                break;
            case "/user-management/profile":
                itemContext?.getDataPermissions()
                break;
            default:
                //console.log(loca)
                itemContext?.setSpinUpdate(false)
                itemContext?.setLoadding(false)
                return false
        }
    }


    // var roles: any = funCheckRole(itemContext?.dataAdmin?.name);
    return (
        <>
            {contextHolder}
            <Button disabled={itemContext?.spinUpdate} onClick={(e: any) => updateData(location)}>{!itemContext?.spinUpdate ? <><ReloadOutlined style={{ display: "inline-flex" }} /></> : <><LoadingOutlined style={{ display: "inline-flex" }} /></>}  <Translation>{(t) => t('Update data')}</Translation></Button>
        </>
    );
}