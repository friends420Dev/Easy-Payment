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
    CSmartTable,
    CCollapse,
    CModal,
    CFormInput,
    CFormSelect,
} from '@coreui/react-pro'
type Props = {
    setVisible?: any
    visible?: any
    data?: any
    t?: any
    config?: any
    handleCopy?: any
    moment?: any
    itemContext?: any

}
import { Tabs, Tooltip, Alert, Tag } from 'antd';
import { useState, useEffect } from 'react';
import type { TabsProps } from 'antd';
import React from 'react'
interface AccountUsage {
    usedDays: number | 'N/A';
    remainingDays: number | any | 'N/A';
    limitDays: number;
    remainingEndDate: string | 'N/A';
}
import { getToken } from "../../Token";
interface TypeBankGrop {

    created_at?: any
    id?: any
    isActive?: any
    merchantId?: any
    name?: any
    numberOfMemberInBankAccountGroup?: any
    prefix?: any
    updated_at?: any

}
// Define minimal types here if not available from the package

// Local type definitions for SmartTable
type ColumnFilterValue = { [key: string]: any };
type SorterValue = { column: string; state: 'asc' | 'desc' } | undefined | [];
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';

const ModelAccountDetails = ({ setVisible, visible, data, t, config, handleCopy, moment, itemContext }: Props) => {
    if (data == "" || !data) {
        return false
    }
    const [state, setState]: any = useState(1);

    const onChange = (key: string) => {
        setState(key);
    };
   
    const item: any[] = data?.Request_Alls
   
    
  
    const getBadge = (status: any) => {
        switch (status) {
            case 'Active':
                return 'success'
            case 'Inactive':
                return 'secondary'
            case 'Pending':
                return 'warning'
            case 'Banned':
                return 'danger'
            case "deposit":
                return 'success'
            case "withdrawal":
                return 'danger'
            case "Delete":
                return 'danger'
            case "current":
                return 'secondary'
            case "savings":
                return 'info'
            case "1":
                return 'success'
            case "0":
                return 'danger'
            case "SUCCESS":
                return '#52c41a'
            case "PANDING":
                return '#faad14'
            default:
                return '#cf1322'
        }
    }
    const columns = [
        {
            key: 'CreatedAt',
            label: `${t('Created At')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'type_option',
            label: `${t("type_option")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'bankAccount',
            label: `${t("Bank Account")}`,
            filter: true,
            sorter: false,
        },

        {
            key: 'Amount',
            label: `${t('Amount')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'Remark',
            label: `${t('remark')}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },
        {
            key: 'Status',
            label: `${t('Status')}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },


    ]
    

    function formatAccnumID(numberAcc: any) {
        if (numberAcc?.length < 9) {
            return `${!numberAcc ? t("No data") : `xxx ${numberAcc}`}`;
        }
        let length = numberAcc?.length;
        const middleFour = numberAcc?.slice(6, length);
        return `${!middleFour ? t("No data") : `xxx ${middleFour}`}`;
    }
    function removeTitle(fullName: any) {
        if (fullName?.startsWith('นาย ')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('นาย')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('นางสาว')) {
            return fullName?.slice(6);
        } else if (fullName?.startsWith('นาง ')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('น.ส.')) {
            return fullName?.slice(4);
        } else if (fullName?.startsWith('น.ส. ')) {
            return fullName?.slice(4);
        } else {
            return fullName;
        }
    }

    const calculateAccountUsage = ({ data, t }: Props): AccountUsage => {
        const createdAt = data?.created_at;
        const limitDays = 120;

        if (!createdAt) {
            return {
                usedDays: 'N/A',
                remainingDays: 'N/A',
                limitDays: limitDays,
                remainingEndDate: 'N/A',
            };
        }

        const createdDate = moment(createdAt);
        const now = moment();
        const usedDays = now.diff(createdDate, 'days');
        const remainingDays = limitDays - usedDays;
        const endDate = createdDate.clone().add(120, 'days').subtract(remainingDays, 'days');

        return {
            usedDays: usedDays >= 0 ? usedDays : 0,
            remainingDays: remainingDays >= 0 ? remainingDays : 0,
            limitDays: limitDays,
            remainingEndDate: endDate.format('YYYY/MM/DD'),
        };
    };

    const { usedDays, remainingDays, limitDays, remainingEndDate } = calculateAccountUsage({ data, t });
    // console.log("remainingEndDate", remainingEndDate)
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("Details"),
            children: <div className={`containprocess`} style={{ padding: '0 20px' }}>
                <div className="text-center h5 mb-3">{t('Details Bank Account')}</div>
                <table align="center" className="accountofuser" style={{ borderBottom: "none" }}>
                    <tbody>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Bank Account')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.bank?.bank_id)}>
                                {' '}
                                {t(data?.bank?.bank_id)}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Account Number')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.accountNumber)}>
                                {data?.accountNumber || t('No data')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Account Name')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.accountName)}>
                                {data?.accountName || t('No data')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Type')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.balance)}>
                                {data?.accountType || t('No data')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Channel')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.channel)}>
                                {data?.channel || t('No data')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('isActive')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.isActive)}>
                                {data?.isActive === true ? 'true' : 'false'}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Status')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.status_bank)}>
                                {data?.status_bank || t('No data')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Bank account group')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.bankAccountGroupId)}>
                                {data?.bankAccountGroupId || t('No data')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Merchant')} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDatamerchant(data?.merchantId, 'merchant'))}>
                                {fillterDatamerchant(data?.merchantId, 'merchant')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('MerchantId')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.merchantId)}>
                                {data?.merchantId || t('No data')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Balance')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.balance)}>
                                {!data?.balance ? t('No data') : Intl.NumberFormat().format(data?.balance)}.-
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('limit Left')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.limit_Left)}>
                                {!data?.limit_Left ? t('No data') : Intl.NumberFormat().format(data?.limit_Left)}.-
                            </td>
                        </tr>
                        {/* <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Same bank withdrawal limit')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.sameBankLimit)}>
                                {!data?.sameBankLimit ? t('No data') : Intl.NumberFormat().format(data?.sameBankLimit)}.-
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Other Bank Withdrawal Limit')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.otherBankLimit)}>
                                {!data?.otherBankLimit ? t('No data') : Intl.NumberFormat().format(data?.otherBankLimit)}.-
                            </td>
                        </tr> */}
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Telephone Number')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.telephoneNumber)}>
                                {!data?.telephoneNumber ? <span style={{ color: '#88888880' }}></span> : data?.telephoneNumber}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('ใช้งานมาแล้ว')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.created_at)}>
                                <span className="">{usedDays} {t('วัน')}</span>
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('เหลือเวลาใช้งานบัญชี')} :</td>
                            <td className="item-list" onClick={() => handleCopy(remainingDays)}>
                                <span >
                                    <span className={`text-${remainingDays > 10 ? '' : 'danger'}`}> {remainingDays} {t('วัน')} </span>
                                </span>
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3 text-danger">{t('Limit การใช้งานบัญชี')} :</td>
                            <td className="item-list" onClick={() => handleCopy(limitDays)}>
                                <span className="text-danger">{limitDays} {t('วัน')}</span>
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Created At')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.created_at)}>
                                {moment(data?.created_at).format('YYYY/MM/DD HH:mm:ss')}
                            </td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t('Updated At')} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.updated_at)}>
                                {moment(data?.updated_at).format('YYYY/MM/DD HH:mm:ss')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>,
        },

        {
            key: '2',
            label: t('Transactions', { counter: item?.length }),
            children: <div className={`containprocess`} style={{ padding: "0 20px" }}>
                <CSmartTable
                    activePage={1}
                    cleaner
                    clickableRows
                    columns={columns}
                    // columnFilter
                    // columnSorter
                    footer
                    items={data?.Request_Alls || []}
                    itemsPerPageSelect
                    itemsPerPage={10}
                    pagination
                    onFilteredItemsChange={(items) => {
                        //console.log('onFilteredItemsChange')
                        //console.table(items)
                    }}
                    onSelectedItemsChange={(items) => {
                        // console.log('onSelectedItemsChange')
                        // console.table(items)
                    }}
                    scopedColumns={{
                        bankAccount: (item: any) => (
                            //
                            <td onClick={() => handleCopy(item?.accnum)}>
                                {item?.to_bank} ,{formatAccnumID(item?.accnum)}
                            </td>
                        ),

                        Amount: (item: any) => (
                            <td className='text-truncate' >
                                {Intl.NumberFormat().format(item?.amount)}.-
                            </td>
                        ),
                        type_option: (item: any) => (
                            //
                            <td className='text-truncate' >
                                {item?.type_status == 'ถอนเงิน' ? (
                                    <CBadge color="danger"> {t(item?.type_status == "ถอนเงิน" && "Deposits")}</CBadge>
                                ) : (
                                    <CBadge color="success"> {t(item?.type_status == "ฝากเงิน" && "Withdrawals")}</CBadge>
                                )}
                            </td>
                        ),
                        Status: (item: any) => (
                            <td className='text-truncate' style={{ textTransform: "uppercase" }}>
                                <CBadge color={getBadge(item?.status)}>{t(item?.status ? "Success" : "rejected")}</CBadge>
                            </td>
                        ),
                        Remark: (item: any) => (
                            //
                            <td title={item?.remark} className='text-truncate' style={{ maxWidth: "100px" }}>
                                {item?.remark}
                            </td>
                        ),

                        CreatedAt: (item: any) => (
                            <td title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")} className='text-truncate' style={{ maxWidth: "100px" }}>
                                {moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}
                            </td>
                        ),

                    }}
                    // selectable
                    sorterValue={{ column: 'status', state: 'asc' }}
                    tableFilter
                    tableProps={{
                        className: 'add-this-custom-class text-truncate',
                        responsive: true,
                        striped: true,
                        hover: true,
                    }}
                    tableBodyProps={{
                        className: 'align-middle text-truncate',
                    }}
                />

            </div>,
        },
       
    ];

    function fillterDatamerchant(id: any, type: any) {
        if (!id) {
            return t('No data');
        }

        if (type === 'merchant') {
            const merchant = itemContext?.stateMerchang?.data?.find((user: any) => user.id === id);
            return merchant?.name ? t(merchant.name) : t('No data');
        }
        const merchant = itemContext?.stateMerchang?.data?.find((user: any) => user.id === id);
        return merchant?.name ? t(merchant.name) : t('No data');
    }
    return (
        <>
            <CModal
                alignment="top"
                visible={visible}
                onClose={() => setVisible(!visible)}
                aria-labelledby="VerticallyCenteredExample"
                size={`${state == 1 ? "lg" : 'lg'}`}
            >
                <CModalHeader style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }} closeButton>
                    <CModalTitle>{t("Details")} </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol sm={12}>

                            {remainingDays <= 10 && <>
                                <Alert
                                    message="Warning"
                                    description={<b className='' style={{ color: "rgba(0, 0, 0, 0.65)" }}>{`บัญชีเหลือเวลาใช้งานอีก ${remainingDays}`}</b>}
                                    type="error"
                                    showIcon
                                    closable
                                />
                            </>}

                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                onChange={onChange}
                                centered={true}
                                animated={{ inkBar: true, tabPane: true }}

                            />
                            {/* <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div> */}

                        </CCol>
                    </CRow>

                </CModalBody>
                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                    <p>{t("version")}: {config?.version}</p>
                </CModalFooter>
            </CModal>

        </>

    );
}

export default ModelAccountDetails;