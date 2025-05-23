import React, { useEffect, useState } from 'react'
import config from 'src/config/app.config';
import Apibank from 'src/api/Apibank';
import moment from 'moment';
import {
    FileDoneOutlined
} from '@ant-design/icons';
import { getToken } from "../../Token";
import {
  
    CSmartTable
} from '@coreui/react-pro'
import { Tabs, Divider, message, Card, Tooltip, Flex, Button } from 'antd';
import { Tag } from "antd";
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
type Item = {
    member_id: any
    ref: any
    remark: any
    nodere: any
    amount: any
    members: {
        bankId: any
        bankAccountNumber: any
        name_member: any
    }
    name_member: any
    status: any
    created_at: any
    transaction_bank: {
        status_pay: any
    }
    uuid: string
}
export const TabelData = ({ t, itemContext, loadding, setVisiblem2, visiblem2, getStatusTransfer, setIsData }: any) => {
    const [columnFilter, setColumnFilter]: any = useState({})
    const [columnSorter, setColumnSorter]: any = useState()
    const [messageApi2, contextHolder2]: any = message.useMessage();
    const success = (msg: any) => {
        messageApi2.open({
            type: 'success',
            content: `${msg}`,
        });
    };
    const error = (msg: any) => {
        messageApi2.open({
            type: 'error',
            content: `${msg}`,
        });
    };
    const columns = [
        // { key: 'uuid', label: `${t('UUID')}`, _style: { width: '150px' }, },
        { key: 'member_id', filter: true, sorter: false },
        {
            key: 'BankAccount',
            label: `${t('Bank Account ')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        { key: 'name_member', label: `${t('Name ')}`, _style: { width: '' }, },
        { key: 'amount', },
        { key: 'status', },
        { key: 'ref', },
        { key: 'remark', label: `${t('Remark')}`, _style: { width: '150px' }, },
        { key: 'nodere', label: `${t('Note ')}`, _style: { width: '180px' }, },
        { key: 'created_at', },
        { key: 'Advanced', label: `${t('Advanced ')}`, },
    ]
    const getBadgeTags = (status: any) => {
        switch (status) {
            case 'success':
                return 'rgb(82, 196, 26)'
            case 'rejected':
                return 'rgb(245, 34, 45)'
            case 'processing':
                return '#1677ff'
            case 'pending':
                return '#faad14'
            case 'cancel':
                return 'rgb(245, 34, 45)'
            case "confirm":
                return 'green'
            case "inq":
                return 'rgb(103, 58, 183)'
            case 'inq_manual':
                return '#f50'
            case "withdrawal_confirm_queued":
                return '#3b5999'
            // return '#673ab7'

            default:
                return '#108ee9'
        }
    }
  
    const getBgTags = (status: any) => {
        switch (status) {

            case "verification":
                return '#e6f4ff'
            case "rejected":
                return '#fff2f0'
            case "cancel":
                return '#fff2f0'
            case "reviewing":
                return '#fffbe6'
            case "pending":
                return '#fffbe6'
            case "processing":
                return '#e6f4ff'
            case "inq":
                return '#f9f0ff'
            default:
                return ''
        }
    }
    const getColorTags = (status: any) => {
        switch (status) {

            case "verification":
                return '#1677ff'
            case "rejected":
                return '#ff4d4f'
            case "cancel":
                return '#ff4d4f'
            case "reviewing":
                return '#faad14'
            case "pending":
                return '#faad14'
            case "processing":
                return '#1677ff'
            case "inq":
                return '#531dab'
            

            default:
                return ''
        }
    }
    const getBadge_bank = (bank_id: any) => {
        switch (bank_id) {
            case 1:
                return 'bbl'
            case 2:
                return 'scb'
            case 3:
                return 'kbank'
            case 4:
                return 'bay'
            case 5:
                return 'ktb'
            case 6:
                return 'ttb'
            case 8:
                return 'gsb'
            case 9:
                return 'baac'
            case 10:
                return 'uob'
            case 11:
                return 'tisco'
            case 12:
                return 'cimb'
            case 13:
                return 'lhb'
            case 14:
                return 'TRUE'
            case 15:
                return 'Bonus'
            case 16:
                return 'truewallet'
            case 17:
                return 'tcrb'
            case 18:
                return 'GHB'
            case 19:
                return 'CITI'
            case 20:
                return 'DB'
            case 21:
                return 'HSBC'
            case 22:
                return 'ICBC'
            case 23:
                return 'ISBT'
            case 24:
                return 'kkp'
            case 25:
                return 'MHCB'
            case 26:
                return 'SCBT'
            case 27:
                return 'SMBC'

            default:
                return 'No data'
        }
    }
    function handleOnclick(item: any) {
        if (item) {
            setIsData(item)
            setVisiblem2(!visiblem2)
        }
    }
    const handleCopy = (text: any, item: any) => {
        setIsData(item)
        setVisiblem2(!visiblem2)
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success('Copied : ' + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
   
    function formatAccnumID(numberAcc: any) {
        if (numberAcc?.length < 9) {
            return `${!numberAcc ? t("No data") : `xx ${numberAcc}`}`;
        }
        let length = numberAcc?.length;
        const middleFour = numberAcc?.slice(6, length);
        return `${!middleFour ? t("No data") : `xx ${middleFour}`}`;
    }
    function getTargetStatus(status: any) {
        if (!status) {
            return false
        }
        if (status == "success") {
            return true
        }
        return false
    }
    function getTargetWord(txt: any) {
        const msg: any = txt;
        if (!msg) {
            return null
        }
        const targetWord: any = msg?.split(" ").pop();
        return targetWord
    }
    function extractWithdrawalInfo(text: any, status: any) {
        const prefix = 'รอถอน manual โดย แอดมิน';
        if (text.startsWith(prefix)) {
            return <>{getTargetStatus(status) ? <>Manual system By <b>{getTargetWord(text)}</b></> : `แอดมิน ${getTargetWord(text)} กำลังทำรายการ...`}</>;
        } else {
            return <em style={{ color: "#88888880" }}>{t("No data")}</em>;
        }
    }

    function funcTxtNodere(txt: any, status: any) {
        let tx;
        if (txt == "ถอนโดยระบบออโต้") {
            tx = 'Auto System'
        } else if (txt == "PayoneX") {
            tx = `Gateway ( ${txt} )`
        } else if (txt == "ถอนแบบระบบ manual กรุณาตรวจสอบ และ ยืนยันการถอนอีกครั้ง") {
            tx = 'Manual System'
        } else if (txt == "อนุมัติถอน รอดำเนินการ") {
            tx = `Approved (${status})`
        } else {
            tx = extractWithdrawalInfo(txt, status)
        }
        return tx
    }
    function funcColorNodere(txt: any, status: any) {
        let t = getBadgeTags(status);
        if (txt == "ถอนโดยระบบออโต้") {
            t = '#2db7f5'
        } else if (txt == "PayoneX") {
            t = `#41e197`
        } else if (txt == "ถอนแบบระบบ manual กรุณาตรวจสอบ และ ยืนยันการถอนอีกครั้ง") {
            t = '#f50'
        } else if (txt == "อนุมัติถอน รอดำเนินการ") {
            t = `#57b04e`
        } else if (txt == "FTOT" || txt == "FTOB") {
             t = '#f50'
        } else {
            t = '#f50'
        }
        return t
    }
    return (
        <>
            {contextHolder2}
            <CSmartTable
                columns={columns}
                columnFilter={false}
                columnSorter={false}
                tableFilter={false}
                loading={loadding}
                items={itemContext?.isDataWithdraw || []}
                itemsPerPage={itemContext?.itemsPerPageWit}
                itemsPerPageSelect
                scopedColumns={{
                    member_id: (item: Item) => (
                        <td className='text-truncate' style={{ maxWidth: "100px", cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.member_id, item)}>
                            {item?.member_id}
                        </td>
                    ),
                    uuid: (item: Item) => (
                        <td className='text-truncate' style={{ maxWidth: "100px", cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.uuid, item)}>
                            {item?.uuid}
                        </td>
                    ),
                    ref: (item: Item) => (
                        <td className='text-truncate' style={{ maxWidth: "100px", cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.ref, item)}>
                            <Tooltip placement="topLeft" title={item?.ref} >
                                {item?.ref || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                            </Tooltip>
                        </td>
                    ),
                    remark: (item: Item) => (
                        <td  title={item?.remark} style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.remark, item)}>
                            {item?.remark ? <span >{item?.remark}</span> : <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                        </td>
                    ),
                    nodere: (item: Item) => (
                        <td  style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.nodere, item)}>
                            <span style={{ color: `${funcColorNodere(item?.nodere, item?.status)}` }}>
                                {funcTxtNodere(item?.nodere, item?.status)}
                            </span>

                        </td>
                    ),
                    amount: (item: Item) => (
                        <td onClick={(e: any) => handleOnclick(item)} style={{ fontWeight: "700", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                            <span style={{ color: `${item?.status == "success" ? '#39f': getColorTags(item?.status)}` }}>{Intl.NumberFormat().format(item?.amount)}.-</span>
                        </td>
                    ),
                    BankAccount: (item: Item) => (
                        <td onClick={(e: any) => handleOnclick(item)} style={{ background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                            <b>{getBadge_bank(item?.members?.bankId)}</b>
                            , {formatAccnumID(item?.members?.bankAccountNumber)}<br />
                        </td>
                    ),
                    name_member: (item: Item) => (
                        <td onClick={() => handleCopy(item?.name_member, item)} style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} >
                            {item?.name_member}
                        </td>
                    ),
                    status: (item: Item) => (
                        <td onClick={(e: any) => handleOnclick(item)} style={{ background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                            <Tag color={getBadgeTags(item?.status)}>{t(item?.status)}</Tag>
                        </td>
                    ),
                    Advanced: (item: Item) => (
                        <td onClick={() => getStatusTransfer(item)} style={{ background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                            <Tooltip title={`${item?.remark == "FTOB" || item?.remark == "FTOT" || item?.nodere == "PayoneX" || (item?.status != "success") ? '': "เช็คสถานะการโอนเงิน"}`}><Button disabled={item?.remark == "FTOB" || item?.remark == "FTOT" || item?.nodere == "PayoneX" || (item?.status != "success")} shape="circle" icon={<FileDoneOutlined />} /></Tooltip>
                        </td>
                    ),
                    created_at: (item: Item) => (
                        <td style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={(e: any) => handleCopy(item?.created_at, item)}>
                            <Tooltip  title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                        </td>
                    ),

                }}
                // sorterValue={{ column: 'created_at', state: 'desc' }}
                pagination={{
                    external: true,
                }}
                paginationProps={{
                    activePage: itemContext?.activePageWit,
                    pages: itemContext?.recordsWithdraws > 0 ? Math.ceil(itemContext?.recordsWithdraws / itemContext?.itemsPerPageWit) : 1,
                }}
                tableProps={{
                    hover: true,
                    responsive: true,
                    bordered: true,
                    borderless: false,
                }}
                onActivePageChange={(page) => itemContext?.setActivePageWit(page)}
                onColumnFilterChange={(filter) => {
                    itemContext?.setActivePageWit(itemContext?.activePageWit)
                    setColumnFilter(filter)
                }}
                onItemsPerPageChange={(pageSize) => {
                    itemContext?.setActivePageWit(itemContext?.activePageWit)
                    itemContext?.setItemsPerPageWit(pageSize)
                }}
                onSorterChange={(value: any) => setColumnSorter(value)}
            />
        </>
    )
}
