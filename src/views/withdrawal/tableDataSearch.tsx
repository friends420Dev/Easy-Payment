
import { Tabs, Statistic, message, Divider, Table, Card, Tag, Tooltip, Input, Select, Modal, Button, notification, Flex, Dropdown, Space, Spin } from 'antd';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
import {
    CSmartTable,
} from '@coreui/react-pro'
import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'
import 'moment/locale/th'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { DataContext } from 'src/layout/DefaultLayout'
import { useTranslation } from 'react-i18next'
import Apibank from 'src/api/Apibank'
import config from 'src/config/app.config';
import moment from 'moment'
import { LoadingOutlined, CloseOutlined, SyncOutlined, ClockCircleOutlined, FileDoneOutlined, CloudUploadOutlined, CheckOutlined, QrcodeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
}
type Props = {
    value?: any[]
    handleCopy?: any
    t?: any
    getStatusTransfer?: any
}
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
    uuid?: any
}



const getBadge = (status: string) => {
    switch (status) {
        case 'Active': {
            return 'success'
        }
        case 'Inactive': {
            return 'secondary'
        }
        case 'Pending': {
            return 'warning'
        }
        case 'Banned': {
            return 'danger'
        }
        default: {
            return 'primary'
        }
    }
}

export const TableTableSearch = ({setShowTableSearch, data, t, handleCopy, getStatusTransfer, getBadge_bank, formatAccnumID, getBgTags, getColorTags, getBadgeTags, funcColorNodere, funcTxtNodere, loadding }: any | []) => {
    const [details, setDetails] = useState<number[]>([])

    const items: any = data?.count < 0 ? [] : data?.rows
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
    return (
        <>
            <Card title={`ค้นพบข้อมูลทั้งหมด ${data?.count} รายการ`} extra={<Button onClick={() => setShowTableSearch(false)}>ย้อนกลับ</Button>} style={{ width: '100%' }}>
                <CSmartTable
                    activePage={1}
                    columns={columns}
                    columnFilter={false}
                    columnSorter={false}
                    loading={loadding}
                    footer
                    items={items}
                    itemsPerPageSelect
                    itemsPerPage={5}
                    pagination
                    onFilteredItemsChange={(items) => {
                        console.log('onFilteredItemsChange')
                        console.table(items)
                    }}
                    onSelectedItemsChange={(items) => {
                        console.log('onSelectedItemsChange')
                        console.table(items)
                    }}
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
                            <td title={item?.remark} style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.remark, item)}>
                                {item?.remark ? <span >{item?.remark}</span> : <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                            </td>
                        ),
                        nodere: (item: Item) => (
                            <td style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.nodere, item)}>
                                <span style={{ color: `${funcColorNodere(item?.nodere, item?.status)}` }}>
                                    {funcTxtNodere(item?.nodere, item?.status)}
                                </span>

                            </td>
                        ),
                        amount: (item: Item) => (
                            <td onClick={(e: any) => handleCopy(item?.amount, item)} style={{ fontWeight: "700", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                                <span style={{ color: `${item?.status == "success" ? '#39f' : getColorTags(item?.status)}` }}>{Intl.NumberFormat().format(item?.amount)}.-</span>
                            </td>
                        ),
                        BankAccount: (item: Item) => (
                            <td onClick={(e: any) => handleCopy(item?.members?.bankAccountNumber, item)} style={{ background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
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
                            <td onClick={(e: any) => handleCopy(item?.status, item)} style={{ background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                                <Tag color={getBadgeTags(item?.status)}>{t(item?.status)}</Tag>
                            </td>
                        ),
                        Advanced: (item: Item) => (
                            <td onClick={() => getStatusTransfer(item)} style={{ background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                                <Tooltip title={`${item?.remark == "FTOB" || item?.remark == "FTOT" || item?.nodere == "PayoneX" || item?.remark == "ฝากเงิน" || (item?.status != "success") ? '' : "เช็คสถานะการโอนเงิน"}`}><Button disabled={item?.remark == "FTOB" || item?.remark == "FTOT" || item?.nodere == "PayoneX"|| item?.remark == "ฝากเงิน" || (item?.status != "success")} shape="circle" icon={<FileDoneOutlined />} /></Tooltip>
                            </td>
                        ),
                        created_at: (item: Item) => (
                            <td style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={(e: any) => handleCopy(item?.created_at, item)}>
                                <Tooltip title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                            </td>
                        ),

                    }}

                    sorterValue={{ column: 'created_at', state: 'desc' }}

                    tableProps={{
                        className: 'add-this-custom-class',
                        responsive: true,
                        striped: true,
                        hover: true,
                    }}
                    tableBodyProps={{
                        className: 'align-middle',
                    }}
                />
            </Card>
        </>

    )
}
