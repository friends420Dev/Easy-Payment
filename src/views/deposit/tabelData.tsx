import React, { useEffect, useState } from 'react'
import config from 'src/config/app.config';
import Apibank from 'src/api/Apibank';
import moment from 'moment'
import { getToken } from "../../Token";
import {
    CAvatar,
    CButton,
    CCard,
    CCardBody,
    CCardSubtitle,
    CCardTitle,
    CCol,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CLoadingButton,
    CModalFooter,
    CModalBody,
    CModalTitle,
    CBadge,
    CModalHeader,
    CCollapse,
    CModal,
    CFormInput,
    CFormSelect,
    CDatePicker,
    CSmartTable
} from '@coreui/react-pro'
import { Tabs, Divider, message, Card, Tooltip, Flex } from 'antd';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
import { Tag } from "antd";

interface Item {
    member_id?: string;
    ref?: string | undefined;
    name_member?: string;
    nodere?: string | undefined;
    note?: string | undefined;
    amount?: number | any;
    remark?: string | undefined;
    members?: {
        bankId?: string;
        bankAccountNumber?: string;
    };
    transaction_bank?: {
        status_pay?: string;
    };
    status?: string;
    created_at?: string;
}

interface Column {
    key: string;
    label: string;
    _style?: { [key: string]: string };
    _props?: { [key: string]: any };
    sorter?: boolean;
    filter?: boolean | { [key: string]: any };
}
export const TabelData = ({ t, itemContext, setVisible, setVisible2, visible2, visible, setIsData, loadding, handleOnclick }: any) => {
    const [filterLength, setFilterLength]: any = useState(0)
    const [messageApi2, contextHolder2]: any = message?.useMessage();
    const [columnFilter, setColumnFilter]: any = useState({})
    const [columnSorter, setColumnSorter]: any = useState()
    const success = (msg: any) => {
        messageApi2?.open({
            type: 'success',
            content: `${msg}`,
        });
    };
    const error = (msg: any) => {
        messageApi2?.open({
            type: 'error',
            content: `${msg}`,
        });
    };
    const columns: Column[] | any = [
        { key: 'member_id', filter: true, sorter: false },

        { key: 'bankAccount', label: `${t('Bank Account')}` },
        { key: 'name_member', label: `${t('Name ')}` },
        { key: 'amount', },
        { key: 'status', },
        { key: 'ref', },

        { key: 'remark', label: `${t('Remark')}`, _style: { width: '150px' }, },
        {
            key: 'nodere',
            label: `${t('Note')}`,
            _style: { width: '150px' },
            filter: true,
            sorter: false,
        },
        { key: 'created_at', },
    ]

    const getBadge = (status: any) => {
        switch (status) {
            case 'ฝาก':
                return 'success'
            case 'ฝากเงิน':
                return 'success'
            case 'ถอน':
                return 'danger'
            case 'ถอนเงิน':
                return 'danger'
            case 'success':
                return 'success'
            case 'pending':
                return 'warning'
            case 'rejected':
                return 'danger'
            case 'cancel':
                return 'danger'
            case '0':
                return 'success'
            case '1':
                return 'warning'

            default:
                return 'primary'
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
            // return '#673ab7'
            case "verification":
                return '#1677ff'
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

            default:
                return ''
        }
    }

    const handleCopy = (text: any, item: any) => {
        //itemContext?.getAllMembers()
        setIsData(item)
        setVisible(!visible)
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
    return (
        <>
            {contextHolder2}
            <CSmartTable
                columns={columns}
                columnFilter={false}
                columnSorter={false}
                tableFilter={false}
                // tableFilterLabel={t("Search")}
                loading={loadding}
                items={itemContext?.isDataDeposit || []}
                itemsPerPage={itemContext?.itemsPerPage}
                itemsPerPageSelect
                scopedColumns={{
                    member_id: (item: Item) => (
                        <td className='text-truncate' style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}`, maxWidth: "100px", cursor: "copy" }} onClick={() => handleCopy(item?.member_id, item)}>
                            {item?.member_id}
                        </td>
                    ),
                    ref: (item: Item) => (
                        <td className='text-truncate' style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}`, maxWidth: "100px", cursor: "copy" }} onClick={() => handleCopy(item?.ref, item)}>
                            <Tooltip placement="topLeft" title={item?.ref} >
                                {item?.ref || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                            </Tooltip>
                        </td>
                    ),
                    remark: (item: Item) => (
                        <td className='' title={item?.remark} style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}`, cursor: "copy" }} onClick={() => handleCopy(item?.remark, item)}>
                            {
                                item?.remark ?
                                    <em style={{ color: `${item?.status == 'success' ? '#51cc8a' : ''}` }}>{item?.remark == 'ฝากเงิน' ? 'ฝากเงิน Auto' : item?.remark}</em>
                                    : <em style={{ color: "#88888880" }}>{t("No data")}</em>
                            }
                        </td>
                    ),
                    amount: (item: Item) => (
                        <td onClick={(e: any) => handleOnclick(item)} className={`text-${getBadge(item?.transaction_bank?.status_pay)}`} style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}`, fontWeight: "700" }}>
                            {Intl.NumberFormat().format(item?.amount)}.-
                        </td>
                    ),
                    nodere: (item: Item) => (
                        <td onClick={(e: any) => handleOnclick(item)} style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}`, fontWeight: "700" }}>
                            {item?.nodere ?
                                <em style={{ color: `${item?.nodere == "ฝากเงินแบบ Manual ไม่มีสลิป" ? '#39f' : 'red'}` }}>{item?.nodere}</em> : <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                        </td>
                    ),
                    bankAccount: (item: Item) => (
                        <td onClick={(e: any) => handleOnclick(item)} style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                            <b>{getBadge_bank(item?.members?.bankId)}</b>
                            , {formatAccnumID(item?.members?.bankAccountNumber)}
                           
                        </td>
                    ),
                    name_member: (item: Item) => (
                        <td onClick={() => handleCopy(item?.name_member, item)} style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}`, cursor: "copy" }}>
                            {item?.name_member}
                        </td>
                    ),

                    status: (item: Item) => (
                        <td onClick={(e: any) => handleOnclick(item)} style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                            <Tag color={getBadgeTags(item?.status)}>{t(item?.status)}</Tag>
                        </td>
                    ),
                    created_at: (item: Item) => (
                        <td style={{ backgroundColor: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}`, cursor: "copy" }} onClick={(e: any) => handleCopy(item?.created_at, item)}>
                            <Tooltip title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                        </td>
                    ),

                }}
                // sorterValue={{ column: 'created_at', state: 'desc' }}
                pagination={{
                    external: true,
                }}
                paginationProps={{
                    activePage: itemContext?.activePage,
                    pages: itemContext?.records > 0 ? Math.ceil(itemContext?.records / itemContext?.itemsPerPage) : 1,
                }}
                tableProps={{
                    hover: true,
                    responsive: true,
                    bordered: true,
                    borderless: false,
                }}
                onActivePageChange={(page) => {
                    itemContext?.setLoadding(true)
                    itemContext?.setActivePage(page)
                }}
                onColumnFilterChange={(filter) => {
                    itemContext?.setActivePage(itemContext?.activePage)
                    setColumnFilter(filter)
                }}
                onFilteredItemsChange={(items) => {
                    // ค้นหา
                    if (items?.length > 0) {
                        setFilterLength(items?.length)
                    }
                    // console.log(items)
                }}
                onItemsPerPageChange={(pageSize) => {
                    itemContext?.setActivePage(itemContext?.activePage)
                    itemContext?.setItemsPerPage(pageSize)
                }}
                onSorterChange={(value: any) => setColumnSorter(value)}
            />
        </>
    )
}
