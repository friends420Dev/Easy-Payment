


import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'
import { Table } from "react-bootstrap";
import { Modal, Tabs, Switch, message, Space, Divider, notification, Radio, Tag, Flex, ConfigProvider, Button, Card, Badge, Tooltip, Alert, Form, Skeleton, Spin } from 'antd';
import { PlusOutlined, ReloadOutlined, LoadingOutlined, CheckOutlined, CloseOutlined, ToolOutlined, StopOutlined, DownloadOutlined } from '@ant-design/icons';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';

import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    SwapOutlined,
    SettingOutlined,
    DollarOutlined,
    FieldTimeOutlined,
    QrcodeOutlined,
    AndroidOutlined
} from '@ant-design/icons';
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
    CForm,
    CFormLabel
} from '@coreui/react-pro'
import Moment from 'moment'
import 'moment/locale/th'
import { CIcon } from '@coreui/icons-react';
import { cilPlus, cilMediaRecord, cilLayers, cilTransfer, cilLibraryBuilding, cilInputPower } from '@coreui/icons';
import Apisetting from "src/api/Apisetting";
import Apibank from 'src/api/Apibank';
import { UpdateBtn } from '../../components/updateBtn/updateBtn'
import { useTranslation } from 'react-i18next'
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { object } from 'prop-types';
import config from 'src/config/app.config';
import Swal from 'sweetalert2'
import ImageSelectFromBankaccount from './imageSelect';
import type { RadioChangeEvent } from 'antd';
import { intlFormat, set } from 'date-fns';
import moment from 'moment';
import type { TabsProps } from 'antd';
import PaymentQR from './paymentQRcode';
type Option = {
    data?: any
    get_balance_summerys?: any
    getUpdateBankAccount?: any
    handleModel?: any
    setSwitchLoadding?: any
    handleOnClickStatusBank?: any
    details?: any
    toggleDetails?: any
    handleCopy?: any
    disibel?: boolean
    switchLoadding: number
}
type PropsLg = {
    setVisibleLg?: any
    visibleLg?: any
    data?: any
    handleAddBankAccount?: any
    handleInput?: any
    addAccount?: any
    countNumber?: any
    validated?: any
    countAcc?: any
    t?: any
    setHandleInput: any
    countTelePhone?: any
    bankPlatform: any
    isOpen: any
    setIsOpen: any
    handleSelectChange?: any
    resetForm?: any
    loadding?: any
}
interface DataTypeBankAccounts {

    Request_Alls?: any[]
    accountName?: any
    accountNumber?: any
    accountType?: any
    auth?: any
    balance?: any
    bank?: any
    bankAccountGroupId?: any
    bankId?: any
    channel?: any
    created_at?: any
    id?: any
    isActive?: any
    latestPollingStatus?: any
    limit_Left?: any
    litmit_status?: any
    merchantId?: any
    name?: any
    otherBankLimit?: any
    prefix?: any
    run_from?: any
    sameBankLimit?: any
    setting?: any
    settings?: any
    status_bank?: any
    telephoneNumber?: any
    updated_at?: any

}
interface DataType {

    bankAccounts?: DataTypeBankAccounts[]
    id?: any
    merchantId?: any
    name?: any
    numberOfMemberInBankAccountGroup?: any
    isActive?: any
    created_at?: any
    prefix?: any
    updated_at?: any

}
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
import { createStyles } from 'antd-style';
type TypeStatus = 'code' | 'header' | 'description';
import type { ConfigProviderProps } from 'antd';
type SizeType = ConfigProviderProps['componentSize'];
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { TransferMoneyToAccountWealth } from './transferMoneyToAccountWealth';
export const Model_detailsLG = ({ loadding, setVisibleLg, visibleLg, data, handleAddBankAccount, addAccount, handleInput, countNumber, setIsOpen, countAcc, t, isOpen, bankPlatform, handleSelectChange, resetForm }: PropsLg) => {
    if (!data) {
        return false
    }
    const style: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    };
    return (
        <>
            <CModal
                alignment="top"
                size="lg"
                visible={visibleLg}
                onClose={() => setVisibleLg(false)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">{t("Modal Add Bank Account")}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <CForm
                                    onSubmit={addAccount}
                                >
                                    <CRow xs={{ gutter: 2 }}>
                                        <CCol md={6}>
                                            <ImageSelectFromBankaccount options={bankPlatform} value={handleInput?.bank} handleSelectChange={handleSelectChange} t={t} statusResult={loadding} setIsOpen={setIsOpen} isOpen={isOpen} />
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup className="flex-nowrap mb-2">
                                                <CFormInput
                                                    valid={handleInput?.bank == "PayoneX" ? true : (countNumber !== countAcc?.length) ? false : true}
                                                    // invalid={handleInput?.bank == "PayoneX" ? false : (countNumber !== countAcc?.length) ? true : false}
                                                    type='text'
                                                    floatingLabel={t("Bank Account Number")}
                                                    style={{ fontWeight: "700" }}
                                                    placeholder="*จำเป็นต้องใส่ข้อมูลในช่องนี้"
                                                    // disabled={!handleInput?.bank || false}
                                                    disabled={handleInput?.bank == "PayoneX" ? true : loadding ? true : false}
                                                    name="accountNo"
                                                    onChange={handleAddBankAccount}

                                                />
                                            </CInputGroup>
                                            {handleInput?.bank == "PayoneX" ? "" : countNumber != countAcc?.length ? <p style={{ fontWeight: "500", color: "#ef376e" }}>* เลขบัญชี ฺ <b style={{ textTransform: "capitalize" }}>{countAcc?.name}</b> ต้องมี <b>{countAcc?.length}</b> หลัก</p> : ""}
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup className="flex-nowrap mb-2">
                                                <CFormInput
                                                    valid={!handleInput?.accountName ? false : handleInput?.bank == "PayoneX" ? false : true}
                                                    // invalid={!handleInput?.accountName ? true : false}
                                                    floatingLabel={t("Bank Account Name")}
                                                    type="text"
                                                    style={{ fontWeight: "700" }}
                                                    placeholder="*จำเป็นต้องใส่ข้อมูลในช่องนี้"
                                                    disabled={handleInput?.bank == "PayoneX" ? true : loadding ? true : false}
                                                    name="accountName"
                                                    onChange={handleAddBankAccount}
                                                />
                                            </CInputGroup>
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup className="flex-nowrap mb-2">
                                                <CFormSelect
                                                    valid={
                                                        !handleInput?.channel ||
                                                            handleInput?.channel == "-- Select --" ||
                                                            handleInput?.bank === "kbank" && (handleInput?.channel !== "k-biz" && handleInput?.channel !== "kplus" && handleInput?.channel !== "kbank-business") ||
                                                            handleInput?.bank === "scb" && (handleInput?.channel !== "scb-easy" && handleInput?.channel !== "scb-business") ||
                                                            handleInput?.bank === "ktb" && (handleInput?.channel !== "KTB_NEX" && handleInput?.channel !== "ktb-business") ||
                                                            handleInput?.bank === "truewallet" && (handleInput?.channel !== "true_wallet") ||
                                                            handleInput?.bank === "PayoneX" && (handleInput?.channel !== "PayoneX") ||
                                                            handleInput?.bank === "bay" && (handleInput?.channel !== "krungsribizonline")
                                                            ? false : true}

                                                    floatingLabel={t("Select Channel")}
                                                    defaultValue={''}
                                                    name="channel"
                                                    title={`${!handleInput?.channel ? "Select Bank  channel" : ""}`}
                                                    disabled={handleInput?.bank == "PayoneX" ? true : loadding ? true : false}
                                                    value={handleInput?.bank == "PayoneX" ? "PayoneX" : handleInput?.channel}
                                                    onChange={handleAddBankAccount}
                                                    style={{ fontWeight: "700", color: `${handleInput?.bank == "kbank" ? "#01a950" : handleInput?.bank == "scb" ? "#4e2e7e" : handleInput?.bank == "ktb" ? "#1da6e2" : handleInput?.bank == "truewallet" ? "#feb100" : handleInput?.bank == "PayoneX" ? "#43db9c" : handleInput?.bank == "bay" ? "#feb100" : "#888"}` }}>
                                                    <option selected>{t("Select")}</option>
                                                    <option value="k-biz" className={`${handleInput?.bank != "kbank" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "kbank" ? "#01a950" : ""}` }}>{"Channel: K-biz"}</option>
                                                    <option value="kbank-business" className={`${handleInput?.bank != "kbank" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "kbank" ? "#01a950" : ""}` }}>{"Channel: kbank-business"}</option>
                                                    <option value="kplus" className={`${handleInput?.bank != "kbank" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "kbank" ? "#01a950" : ""}` }}>{"Channel: Kplus"}</option>
                                                    <option value="scb-easy" className={`${handleInput?.bank != "scb" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "scb" ? "#4e2e7e" : ""}` }}>{"Channel: scb-easy"}</option>
                                                    <option value="scb-business" className={`${handleInput?.bank != "scb" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "scb" ? "#4e2e7e" : ""}` }}>{"Channel: scb-business"}</option>
                                                    <option value="KTB_NEX" className={`${handleInput?.bank != "ktb" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "ktb" ? "#1da6e2" : ""}` }}>{"Channel: KTB_NEX"}</option>
                                                    <option value="ktb-business" className={`${handleInput?.bank != "ktb" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "ktb" ? "#1da6e2" : ""}` }}>{"Channel: ktb-business"}</option>
                                                    <option value="true_wallet" className={`${handleInput?.bank != "truewallet" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "truewallet" ? "#feb100" : ""}` }}>{"Channel: ทรูวอเล็ต"}</option>
                                                    <option value="PayoneX" selected={handleInput?.bank == "PayoneX" ? true : false} className={`${handleInput?.bank != "PayoneX" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "PayoneX" ? "#43db9c" : ""}` }}>{"Channel: PayoneX"}</option>
                                                    <option value="krungsribizonline" className={`${handleInput?.bank != "bay" && "d-none"}`} style={{ fontWeight: "600", color: `${handleInput?.bank == "bay" ? "#feb100" : ""}` }}>{"Channel: Krungsri-biz Online"}</option>
                                                </CFormSelect>
                                            </CInputGroup>
                                            {handleInput?.bank === "kbank" && (handleInput?.channel !== "k-biz" && handleInput?.channel !== "kplus" && handleInput?.channel !== "kbank-business") ? <p className="text-danger" >{"* ตรวจสอบ Channel ให้ถูกต้อง"}</p> : ""}
                                            {handleInput?.bank === "scb" && (handleInput?.channel !== "scb-easy" && handleInput?.channel !== "scb-business") ? <p className="text-danger" >{"* ตรวจสอบ Channel ให้ถูกต้อง"}</p> : ""}
                                            {handleInput?.bank === "ktb" && (handleInput?.channel !== "KTB_NEX" && handleInput?.channel !== "ktb-business") ? <p className="text-danger" >{"* ตรวจสอบ Channel ให้ถูกต้อง"}</p> : ""}
                                            {handleInput?.bank === "truewallet" && (handleInput?.channel !== "true_wallet") ? <p className="text-danger" >{"* ตรวจสอบ Channel ให้ถูกต้อง"}</p> : ""}
                                            {handleInput?.bank === "PayoneX" && (handleInput?.channel != "PayoneX") ? "" : ""}
                                            {handleInput?.bank === "bay" && (handleInput?.channel != "krungsribizonline") ? <p className="text-danger" >{"* ตรวจสอบ Channel ให้ถูกต้อง"}</p> : ""}
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup
                                                className="flex-nowrap mb-2">
                                                <CFormSelect
                                                    valid={!handleInput?.accountType ? false : true}
                                                    // invalid={!handleInput?.accountType || handleInput?.accountType == "-- Select --" ? true : false}
                                                    floatingLabel={t("Select Account Type")}
                                                    defaultValue={''}
                                                    name="accountType"
                                                    // disabled={!handleInput?.bank || !handleInput?.channel || !handleInput?.accountNo || !handleInput?.accountName || false}
                                                    disabled={loadding}
                                                    value={handleInput?.accountType}
                                                    onChange={handleAddBankAccount}
                                                    style={{ fontWeight: "600" }}>
                                                    <option selected >{t("Select")}</option>
                                                    {['deposit', 'withdrawal', 'verifying_account'].map((pageSize) => (
                                                        <option className={pageSize} style={{ fontWeight: "500", textTransform: "capitalize" }} key={Math.random()} value={pageSize}>
                                                            {pageSize}
                                                        </option>
                                                    ))}
                                                </CFormSelect>
                                            </CInputGroup>
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup className="flex-nowrap mb-2">
                                                <CInputGroup className="flex-nowrap mb-2">
                                                    <CFormSelect
                                                        valid={!handleInput?.bankAccountGroupId ? false : true}
                                                        // invalid={!handleInput?.bankAccountGroupId || handleInput?.bankAccountGroupId == "-- Select --" ? true : false}
                                                        defaultValue={''}
                                                        floatingLabel={t("Select Bank Group")}
                                                        name="bankAccountGroupId"
                                                        // disabled={!handleInput?.bank || !handleInput?.channel || !handleInput?.accountNo || !handleInput?.accountName || !handleInput?.accountType || false}
                                                        disabled={loadding}
                                                        // value={handleInput?.bankAccountGroupId}
                                                        onChange={handleAddBankAccount}
                                                        style={{ fontWeight: "600" }}>
                                                        <option  >{t("Select")}</option>
                                                        {data?.bankGroup?.length > 0 && data?.bankGroup?.map((index: any, id: any) => {
                                                            return <option key={id} value={index?.id} style={{ fontWeight: "700" }}>{index?.name}</option>
                                                        })}
                                                    </CFormSelect>
                                                </CInputGroup>
                                            </CInputGroup>
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup className="flex-nowrap mb-2">
                                                <CInputGroup className="flex-nowrap mb-2">
                                                    <CFormSelect
                                                        valid={!handleInput?.merchantId ? false : true}
                                                        // invalid={!handleInput?.merchantId || handleInput?.merchantId == "-- Select --" ? true : false}
                                                        floatingLabel={t("Select MerchantId")}
                                                        name="merchantId"
                                                        // disabled={!handleInput?.bank || !handleInput?.channel || !handleInput?.accountNo || !handleInput?.accountName || !handleInput?.accountType || !handleInput?.bankAccountGroupId || false}
                                                        disabled={loadding}
                                                        value={handleInput?.merchantId}
                                                        onChange={handleAddBankAccount}
                                                        style={{ fontWeight: "600" }}>
                                                        <option selected>{t("Select")}</option>
                                                        {data?.MerchantId?.length > 0 && data?.MerchantId?.map((index: any, id: any) => {
                                                            //console.log(index?.isActive)
                                                            return <option key={id} value={index?.id} style={{ fontWeight: "700" }}>{index?.name}</option>
                                                        })}
                                                    </CFormSelect>
                                                </CInputGroup>
                                            </CInputGroup>
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup className="flex-nowrap mb-2">
                                                <CFormInput
                                                    valid={!handleInput?.telephoneNumber ? false : true}
                                                    // invalid={!handleInput?.telephoneNumber ? true : false}
                                                    floatingLabel={t("telephone number")}
                                                    type="text"
                                                    style={{ fontWeight: "700" }}
                                                    placeholder="*จำเป็นต้องใส่ข้อมูลในช่องนี้"
                                                    // disabled={!handleInput?.bank || !handleInput?.channel || !handleInput?.accountNo || !handleInput?.accountName || !handleInput?.accountType || false}
                                                    disabled={loadding}
                                                    name="telephoneNumber"
                                                    defaultValue={''}
                                                    autoComplete='off'
                                                    value={handleInput?.telephoneNumber}
                                                    onChange={handleAddBankAccount}
                                                    aria-describedby="addon-wrapping" />
                                            </CInputGroup>
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup className="flex-nowrap mb-2">
                                                <CFormInput
                                                    valid={!handleInput?.deviceId ? false : true}
                                                    // invalid={!handleInput?.deviceId ? true : false}
                                                    floatingLabel={handleInput?.bank == "truewallet" ? t("Phone number") : (handleInput?.bank == "scb" || handleInput?.bank == "ktb") ? t("Device Id") : (handleInput?.bank == "kbank" || handleInput?.bank == "PayoneX") ? t("Username ") : t("Username ")}
                                                    type="text" style={{ fontWeight: "700" }}
                                                    placeholder="*จำเป็นต้องใส่ข้อมูลในช่องนี้"
                                                    name="deviceId"
                                                    defaultValue={''}
                                                    // disabled={!handleInput?.bank || !handleInput?.channel || !handleInput?.accountNo || !handleInput?.accountName || !handleInput?.accountType || !handleInput?.telephoneNumber || false}
                                                    disabled={loadding}
                                                    value={handleInput?.deviceId}
                                                    onChange={handleAddBankAccount}
                                                    aria-describedby="addon-wrapping" />
                                            </CInputGroup>
                                        </CCol>
                                        <CCol md={6}>
                                            <CInputGroup className="flex-nowrap mb-2">
                                                <CFormInput
                                                    valid={!handleInput?.pin ? false : true}
                                                    // invalid={!handleInput?.pin ? true : false}
                                                    floatingLabel={handleInput?.bank == "truewallet" ? t("Passward") : (handleInput?.bank == "scb" || handleInput?.bank == "ktb") ? t("Pin") : (handleInput?.bank == "kbank" || handleInput?.bank == "PayoneX") ? t("Passward") : t("Passward")}
                                                    type="password"
                                                    style={{ fontWeight: "700" }}
                                                    placeholder="*จำเป็นต้องใส่ข้อมูลในช่องนี้"
                                                    // disabled={!handleInput?.bank || !handleInput?.channel || !handleInput?.accountNo || !handleInput?.accountName || !handleInput?.accountType || !handleInput?.telephoneNumber || !handleInput?.deviceId || false}
                                                    name="pin"
                                                    disabled={loadding}
                                                    value={handleInput?.pin}
                                                    autoComplete='off'
                                                    defaultValue={''}
                                                    onChange={handleAddBankAccount}
                                                    aria-describedby="addon-wrapping" />
                                            </CInputGroup>
                                        </CCol>
                                        <br />
                                        <div className='d-flex mb-3'>
                                            <div className='d-flex justify-content-start' style={{ width: "50%", flexWrap: "wrap" }}>
                                                <Divider orientation="left">{t("Status Account")}</Divider>
                                                <div className='container' style={{ height: "140px" }}>
                                                    {!handleInput?.status_bank ? <p className="text-danger"><b>{"* เลือกสถานะบัญชี "}</b></p> : ""}
                                                    <Radio.Group
                                                        id='status_bank'
                                                        name='status_bank'
                                                        disabled={loadding}
                                                        style={style}
                                                        onChange={handleAddBankAccount}
                                                        value={handleInput?.status_bank}
                                                        options={[
                                                            { value: "Inactive", label: t("Inactive"), style: { color: 'red', fontWeight: "600" } },
                                                            { value: "Active", label: t("Active"), style: { color: 'green', fontWeight: "600" } },
                                                            { value: "Vault", label: t("Vault"), style: { color: '#531dab', fontWeight: "600" } },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className='d-flex justify-content-end' style={{ width: "50%", flexWrap:"wrap" }}>
                                                <Divider orientation="left">{t("Status Account")}</Divider>
                                                <div className='container' style={{ height: "140px"  }}>
                                                    {!handleInput?.status_bank ? <p className="text-danger" ><b>{"* Status promptpay qr_code "}</b></p> : ""}
                                                    <Radio.Group
                                                        id='status_promptpay_qr'
                                                        name='status_promptpay_qr'
                                                        disabled={loadding}
                                                        style={style}
                                                        onChange={handleAddBankAccount}
                                                        value={handleInput?.status_promptpay_qr}
                                                        options={[
                                                            { value: 0, label: t("Inactive"), style: { color: 'red', fontWeight: "600" } },
                                                            { value: 1, label: t("Active"), style: { color: 'green', fontWeight: "600" } },
                                                        ]}
                                                    />
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className='d-flex mb-3' style={{ justifyContent: "right" }}>
                                            <CButton
                                                style={{ color: "#fff", fontWeight: "600" }}
                                                onClick={() => resetForm()}
                                                disabled={loadding}
                                                type="reset"
                                                color="danger" className="me-2">
                                                <ReloadOutlined />   {t("Reset")}
                                            </CButton>

                                            <CButton
                                                type={`${loadding ? "button" : "submit"}`}
                                                color="primary"
                                                style={{ color: "#fff", fontWeight: "600" }}
                                                disabled={
                                                    loadding || false}>
                                                {loadding ? <> <LoadingOutlined /> {"Loadding..."}</> : <><PlusOutlined />   {t("Add Bank Acc")}</>}
                                            </CButton>
                                        </div>
                                        <br />
                                        <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                                            <p>{t("version")}: {config?.version}</p>
                                        </CModalFooter>
                                    </CRow>
                                </CForm>
                            </div>
                        </div>
                    </div>
                </CModalBody>
            </CModal></>
    )
}

type typeModel = {
    setVisibleHistoryTransferGateway?: any | boolean
    visibleHistoryTransferGateway?: any | boolean
    data?: any | string
    t?: any | string
    handleCopy?: any
}
type ColumnFilterValue = { [key: string]: any };
type SorterValue = { column: string; state: 'asc' | 'desc' } | undefined | [];
import { getToken } from "../../Token";

export const ModalHistoryTransferGateway = ({ visibleHistoryTransferGateway, setVisibleHistoryTransferGateway, t, handleCopy, data }: typeModel) => {
    if (!data) {
        return null
    }
    const [activePage, setActivePage] = useState(1)
    const [columnFilter, setColumnFilter] = useState<ColumnFilterValue>({})
    const [columnSorter, setColumnSorter] = useState<any>()
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [records, setRecords] = useState(0);
    const columnsWealth = [
        {
            key: 'platform_order_id',
            label: `${t('OrderID')}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },

        {
            key: 'amount',
            label: `${t('จำนวนเงินโอน')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'transfer_amount',
            label: `${t("จำนวนที่ได้รับ")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'charge',
            label: `${t('ค่าธรรมเนียม')}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },
        {
            key: 'status',
            label: `${t('สถานะ')}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },
        {
            key: 'order_datetime',
            label: `${t('วันที่ทำรายการ')}`,
            _style: { width: '1%' },
            filter: true,
            sorter: false,
        },

    ]

    const fetchData = async () => {
        try {
            setLoading(true)
            const offset = (activePage - 1) * itemsPerPage
            const params = new URLSearchParams()

            Object.keys(columnFilter).forEach((key) => {
                params.append(key, columnFilter[key])
            })


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${getToken()}`);
            const requestOptions: any = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(`${config.apiURL}/api/v1/admin/getall_depprositgateway`, requestOptions);


            const result = await response.json()

            setRecords(result.data.length)
            setUsers(result.data ? result.data : [])
        } catch (error) {
            console.error('Error fetching users:', error)
            setUsers([]) // Optionally show an error state
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [activePage, columnFilter, columnSorter, itemsPerPage]);
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
    return (
        <>
            <CModal
                backdrop="static"
                visible={visibleHistoryTransferGateway}
                onClose={() => setVisibleHistoryTransferGateway(false)}
                aria-labelledby="StaticBackdropExampleLabel"
                size='lg'
            >
                <CModalHeader>
                    <CModalTitle id="StaticBackdropExampleLabel"><ClockCircleOutlined className='me-1' /> {`ประวัติการเติมเงิน ( ${data?.bank?.bankNameTh} )`}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className={`containprocess`} style={{ padding: "0 20px" }}>
                        <CSmartTable
                            activePage={activePage}
                            cleaner
                            clickableRows
                            columns={columnsWealth}
                            footer={false}
                            items={users || []}
                            itemsPerPageSelect
                            loading={loading}
                            pagination={{
                                external: true,
                            }}
                            onActivePageChange={(page) => setActivePage(page)}
                            onColumnFilterChange={(filter) => {
                                setActivePage(1)
                                setColumnFilter(filter)
                            }}
                            onItemsPerPageChange={(pageSize) => {
                                setActivePage(1)
                                setItemsPerPage(pageSize)
                            }}
                            onSorterChange={(value: any) => setColumnSorter(value)}
                            paginationProps={{
                                activePage,
                                pages: records > 0 ? Math.ceil(records / itemsPerPage) : 1,
                            }}
                            
                            onFilteredItemsChange={(items) => {
                                //console.log('onFilteredItemsChange')
                                //console.table(items)
                            }}
                            onSelectedItemsChange={(items) => {
                                // console.log('onSelectedItemsChange')
                                // console.table(items)
                            }}
                            scopedColumns={{
                                order_datetime: (item: any) => (
                                    <td className='text-truncate' style={{ maxWidth: "150px", cursor: "copy" }} onClick={() => handleCopy(item?.order_datetime)}>
                                        <Tooltip title={moment(item?.order_datetime).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.order_datetime)}</Tooltip>
                                    </td>
                                ),

                                amount: (item: any) => (
                                    <td className='text-danger' style={{ fontWeight: "600" }} onClick={() => handleCopy(item?.amount)}>
                                        {Intl.NumberFormat().format(item?.amount)}.-
                                    </td>
                                ),
                                transfer_amount: (item: any) => (
                                    //
                                    <td className='text-success' style={{ fontWeight: "600" }} onClick={() => handleCopy(item?.transfer_amount)}>
                                        {Intl.NumberFormat().format(item?.transfer_amount)}.-
                                    </td>
                                ),
                                charge: (item: any) => (
                                    //
                                    <td style={{ color: "#531dab", fontWeight: "600" }} onClick={() => handleCopy(Intl.NumberFormat().format(item?.amount - item?.transfer_amount))}>
                                        {Intl.NumberFormat().format(item?.amount - item?.transfer_amount)}.-
                                    </td>
                                ),

                                platform_order_id: (item: any) => (
                                    //
                                    <td onClick={() => handleCopy(item?.platform_order_id)} className='text-truncate' style={{ maxWidth: "100px", cursor: "copy" }}>
                                        <Tooltip placement="topLeft" title={item?.platform_order_id}>{item?.platform_order_id}</Tooltip>

                                    </td>
                                ),

                                status: (item: any) => (
                                    <td className='' style={{ textTransform: "uppercase" }}>
                                        <Tag color={getBadge(item?.status)}>{t(item?.status)}</Tag>
                                    </td>
                                ),
                            }}
                            // selectable
                            sorterValue={{ column: 'order_datetime', state: 'desc' }}
                            tableFilter
                            tableProps={{
                                className: 'add-this-custom-class ',
                                responsive: true,
                                striped: true,
                                hover: true,
                            }}
                            tableBodyProps={{
                                className: 'align-middle ',
                            }}
                        />

                    </div>
                </CModalBody>
                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                    <p>{t("version")}: {config?.version}</p>
                </CModalFooter>

            </CModal>
        </>
    )
}



const Option_bank: React.FC<Option> = ({
    data,
    get_balance_summerys,
    switchLoadding,
    handleModel,
    setSwitchLoadding,
    handleOnClickStatusBank,
    details,
    toggleDetails,
    handleCopy,
    getUpdateBankAccount,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();
    const [api, contextHolder_Notify] = notification.useNotification();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            data?.getdata_bankPlatforms?.();
            data?.getDataProfileAdmin?.();
            data?.getallAdmins?.();
        };
        fetchData()
    }, []);
    let dataBankgrop: TypeBankGrop[] = data?.stateBankGrop?.data;
    const error = (msg: any) => {
        messageApi.open({
            type: 'error',
            content: `${msg}`,
        });
    };
    const openNotification = (type: NotificationType, msg: any) => {
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
        if (role == "Owner") {
            return true
        } else if (role == "Subowner") {
            return true
        } else if (role == "Manager") {
            return true
        } else if (role == "Accounting") {
            return true
        } else if (role == "Head_Accounting") {
            return true
        } else {
            return false
        }
    }
    function funCheckRole2(role: any) {
        if (!role) {
            return false
        }
        if (role == "Owner") {
            return true
        } else if (role == "Subowner") {
            return true
        } else if (role == "Manager") {
            return true
        } else if (role == "Head_Accounting") {
            return true
        } else if (role == "Cs_Accounting") {
            return true
        } else {
            return false
        }
    }
    var roles: any = funCheckRole(data?.dataAdmin?.name);
    var roles2: any = funCheckRole2(data?.dataAdmin?.name);
    // Model
    const [visibleHistoryTransferGateway, setVisibleHistoryTransferGateway] = useState<boolean>(false)
    const [visibleXL, setVisibleXL] = useState(false)
    const [visibleLg, setVisibleLg] = useState(false)
    const [loading, setLoading] = useState<boolean>(true);
    const [disabled, setDisabled]: any = useState(false);
    const [bg_status_bank, setBg_status_bank]: any = useState("transparent");
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const useStyle = createStyles(({ prefixCls, css }: any) => ({
        linearGradientButton: css`
          &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
            > span {
              position: relative;
            }
            &::before {
              content: '';
              background: linear-gradient(268deg, #1677ff, #1677ff);
              position: absolute;
              inset: -1px;
              opacity: 1;
              transition: all 0.3s;
              border-radius: inherit;
            }
            &:hover::before {
              opacity: 0;
            }
          }
        `,
    }));
    // บัญชีปัจจุบัน
    const columns = [
        {
            key: 'avatar',
            label: `${t("Bank")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'accountName',
            label: `${t("Acc Name")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountNumber',
            label: `${t("Acc Number")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountType',
            label: `${t("Acc Type")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'balance',
            label: `${t("Balance")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },

        {
            key: 'limit_Left',
            label: `${t("Limit Left ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        // {
        //     key: 'telephoneNumber',
        //     label: `${t("telephone number")}`,
        //     _style: { width: '' },
        //     sorter: false,
        // },
        {
            key: 'status',
            label: `${t("Status Account")}`,
            filter: true,
            _style: { width: '' }
        },
        {
            key: 'active',
            label: `${t("Active ")}`,
            _style: { width: 150 },
            filter: true,
            sorter: false,
        },
        {
            key: 'action',
            label: `${t("Action")}`,
            _style: { width: '150px' },
            filter: false,
            sorter: false,
        },

    ]
    // บัญชีที่ยกเลิก
    const columns2 = [
        {
            key: 'avatar',
            label: `${t("Bank")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'accountName',
            label: `${t("Acc Name")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountNumber',
            label: `${t("Acc Number")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountType',
            label: `${t("Acc Type")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'balance',
            label: `${t("Balance")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },

        {
            key: 'limit_Left',
            label: `${t("Limit Left ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },

        {
            key: 'status',
            label: `${t("Status Account")}`,
            filter: true,
            _style: { width: '' }
        },
        {
            key: 'error_code',
            label: `${t("error_code")}`,
            _style: { width: 150 },
            filter: true,
            sorter: false,
        },
        {
            key: 'note',
            label: `${t("Note")}`,
            _style: { width: '150px' },
            filter: false,
            sorter: false,
        },
        {
            key: 'created_at',
            label: `${t("Created At")}`,
            _style: { width: '' },
            sorter: false,
        },

    ]
    // บัญชีที่ verify
    const columns3 = [
        {
            key: 'avatar',
            label: `${t("Bank")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'accountName',
            label: `${t("Acc Name")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountNumber',
            label: `${t("Acc Number")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountType',
            label: `${t("Acc Type")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'balance',
            label: `${t("Balance")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },


        {
            key: 'status',
            label: `${t("Status Account")}`,
            filter: true,
            _style: { width: '' }
        },
        {
            key: 'note',
            label: `${t("Note")}`,
            _style: { width: '' },
            sorter: false,
        },
        {
            key: 'active',
            label: `${t("Active ")}`,
            _style: { width: 150 },
            filter: true,
            sorter: false,
        },
        {
            key: 'action',
            label: `${t("Action")}`,
            _style: { width: '150px' },
            filter: false,
            sorter: false,
        },

    ]
    // columnsRepair
    const columnsRepair = [
        {
            key: 'avatar',
            label: `${t("Bank")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'accountName',
            label: `${t("Acc Name")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountNumber',
            label: `${t("Acc Number")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },

        {
            key: 'balance',
            label: `${t("Balance")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },


        {
            key: 'status',
            label: `${t("Status Account")}`,
            filter: true,
            _style: { width: '' }
        },
        {
            key: 'note',
            label: `${t("Note")}`,
            _style: { width: '' },
            sorter: false,
        },

        {
            key: 'action',
            label: `${t("Action")}`,
            _style: { width: '150px' },
            filter: false,
            sorter: false,
        },

    ]
    const getIconsView = (icon: any) => {
        switch (icon) {
            case 'Active':
                return <i className="bx bxs-circle bx-flashing" style={{ color: '#389e0d', fontSize: "10px" }} />
            case 'Inactive':
                return <i className="bx bxs-circle" style={{ fontSize: "10px" }} />
            case 'Delete':
                return <CloseOutlined />
            case 'Banned':
                return <StopOutlined style={{ display: "inline-flex" }} />
            case "Vault":
                return <ToolOutlined />

            default:
                return ''
        }
    }
    const getBadge = (status: any) => {
        switch (status) {
            case 'Active':
                return 'green'
            case 'Inactive':
                return 'error'
            case 'Pending':
                return 'warning'
            case 'Banned':
                setDisabled(true)
                return 'error'
            case "deposit":
                return '#52c41a'
            case "withdrawal":
                return '#f5222d'
            case "Delete":
                return 'error'
            case "Banned2":
                return 'error'
            case "Vault":
                return 'purple'
            case "verifying_account":
                return 'rgb(24, 144, 255)'
            case "savings":
                return '#faad14'
            default:
                return 'default'
        }
    }
    const getBadgeTags = (status: any) => {


        switch (status) {
            case 'Active':
                return 'green'
            case 'Inactive':
                return 'error'
            case 'Pending':
                return 'warning'
            case 'Banned':
                setBg_status_bank("Banned")
                setDisabled(true)
                return 'error'
            case "deposit":
                return 'success'
            case "withdrawal":
                return 'danger'
            case "Delete":
                return '#cd201f'
            case "Vault":
                return '#673ab7'
            case "verifying_account":
                return 'rgb(24, 144, 255)'
            case "Support":
                return '#08979c'
            case "savings":
                return '#faad14'
            case "Identity":
                return '#f50'
            default:
                return 'primary'
        }
    }

    function handleOnchangVerifying_account(params: any, accType: any) {
        if (params?.channel == "krungsribizonline") {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ขออภัย เนื่องจากการใช้ krungsribiz เพื่อ Verify  ยังติดปัญหา Timeout จึงไม่เหมาะที่จะใช้งาน!",
                footer: `${t("version")} : ${config?.version}`,
            });
            return
        }
        if (params?.channel != "scb-easy" && params?.channel != "k-biz") {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ขออภัย เนื่องจากตอนนี้มีแค่ scb-easy และ k-biz ที่สามารถใช้เป็นบัญชี Verify !",
                footer: `${t("version")} : ${config?.version}`,
            });
            return
        }

        let postData = {
            run_from: accType,
            edit_id: params?.id,
            accountType: "verifying_account",
            status_bank: "Vault"
        }
        let msg_Vault = accType == "amt" ? `คุณต้องการใช้บัญชีนี้ Verify?` : 'คุณต้องการยกเลิกใช้บัญชีนี้ Verify?';
        Swal.fire({
            title: "Are you sure?",
            text: msg_Vault,
            showDenyButton: true,
            showCancelButton: false,
            icon: "question",
            confirmButtonText: "Yes!",
            background: "rgb(0 21 41)",
            footer: `${t("version")} : ${config?.version}`,
            color: "#aeaeae"
        }).then((result) => {
            if (result.isConfirmed) {
                data?.setLoadding(true)
                Apisetting.postIsActiveBank(postData)
                    .then((res) => {
                        if (res.data.success == true) {

                            setTimeout(() => {
                                data?.getBankAccount()
                                toggleDetails(params?.id)
                                data?.setLoadding(false)
                                Toast.fire({
                                    icon: "success",
                                    title: `${res?.data?.message}`
                                });
                            }, 1000)
                        } else {
                            setTimeout(() => {
                                data?.setLoadding(false)
                                Toast.fire({
                                    icon: "error",
                                    title: `${res?.data?.message}`
                                });
                            }, 1000)
                        }
                    }).catch((err) => {
                        error(err.message)
                        openNotification("error", `${err.message}`)
                        data?.setLoadding(false)
                        Toast.fire({
                            icon: "error",
                            title: `${err?.message}`
                        });
                    })
            } else if (result.isDenied) {
                data?.setLoadding(true)
                Toast.fire({
                    icon: "error",
                    title: `${`ยกเลิกการกระทำแล้ว`}`
                });
                setTimeout(() => {
                    data?.setLoadding(false)
                    data?.getBankAccount()
                }, 1000)

            }
        });

    }
    function handleOnChangTypeBank(event: any, params: any) {
        let postData = {
            run_from: event ? "amt" : "mt",
            edit_id: params?.id,
        }
        data?.setLoadding(true)
        setSwitchLoadding(params?.id)
        Swal.fire({
            title: "Are you sure?",
            text: `คุณต้องการ ${event ? "ใช้บัญชีนี้ Verify" : "ยกเลิกบัญชีนี้ Verify"} ?`,
            showDenyButton: true,
            showCancelButton: false,
            icon: "question",
            confirmButtonText: "Yes!",
            color: "#aeaeae",
            background: "rgb(0 21 41)",
            footer: `${t("version")} : ${config?.version}`,
        }).then((result) => {

            if (result.isConfirmed) {
                Apisetting.postIsActiveBank(postData)
                    .then((res) => {
                        if (res.data.success == true) {
                            data?.getBankAccount()
                            setTimeout(() => {
                                setSwitchLoadding(0)
                                data?.setLoadding(false)
                                Toast.fire({
                                    icon: "success",
                                    title: `${res?.data?.message}`
                                });
                            }, 1000)
                        } else {
                            setTimeout(() => {
                                data?.setLoadding(false)
                                Toast.fire({
                                    icon: "error",
                                    title: `${res?.data?.message}`
                                });
                            }, 1000)
                        }
                    }).catch((err) => {
                        error(err.message)
                        openNotification("error", `${err.message}`)
                        data?.setLoadding(false)
                        Toast.fire({
                            icon: "error",
                            title: `${err?.message}`
                        });
                    })
            } else if (result.isDenied || result.isDismissed) {
                data?.setLoadding(true)
                Toast.fire({
                    icon: "error",
                    title: `${`ยกเลิกการกระทำแล้ว`}`
                });
                setTimeout(() => {
                    data?.setLoadding(false)
                    data?.getBankAccount()
                }, 1000)

            }
        });
        return
    }
    function handleOnClickTypeBank(event: any, params: any) {

        let accType = event?.target?.id;
        if (accType == "amt" || accType == "mt") {
            handleOnchangVerifying_account(params, accType)
            return
        }
        if (accType && params?.id) {
            let msg_Vault = `คุณต้องการสลับเป็นบัญชี ${accType}?`
            let postData = {
                accountType: accType,
                edit_id: params?.id,
                note: accType == "verifying_account" ? "สำหรับ Verify เท่านั้น" : "",
                status_bank: accType == "verifying_account" ? "Vault" : params?.status_bank,
                run_from: accType == "verifying_account" ? "mt" : "",
                description: `สลับบัญชี ${params?.bank?.bank_id}, ${params?.accountName}, ${params?.accountNumber} เป็นประเภท ${t(accType)}`,
                types: "Switch_bank_type",
            }
            Swal.fire({
                title: "Are you sure?",
                text: msg_Vault,
                showDenyButton: true,
                showCancelButton: false,
                icon: "question",
                confirmButtonText: "Yes!",
                color: "#aeaeae",
                background: "rgb(0 21 41)",
                footer: `${t("version")} : ${config?.version}`,
            }).then((result) => {
                if (result.isConfirmed) {
                    data?.setLoadding(true)
                    Apisetting.postIsActiveBank(postData)
                        .then((res) => {
                            if (res.data.success == true) {

                                setTimeout(() => {
                                    data?.getBankAccount()
                                    toggleDetails(params.id)
                                    data?.setLoadding(false)
                                    Toast.fire({
                                        icon: "success",
                                        title: `${res?.data?.message}`
                                    });
                                }, 1000)
                            } else {
                                setTimeout(() => {
                                    data?.setLoadding(false)
                                    Toast.fire({
                                        icon: "error",
                                        title: `${res?.data?.message}`
                                    });
                                }, 1000)
                            }
                        }).catch((err) => {
                            error(err.message)
                            openNotification("error", `${err.message}`)
                            data?.setLoadding(false)
                            Toast.fire({
                                icon: "error",
                                title: `${err?.message}`
                            });
                        })
                } else if (result.isDenied) {
                    data?.setLoadding(true)
                    Toast.fire({
                        icon: "error",
                        title: `${`ยกเลิกการกระทำแล้ว`}`
                    });
                    setTimeout(() => {
                        data?.setLoadding(false)
                        data?.getBankAccount()
                    }, 1000)

                }
            });

            //console.log(postData)
        } else {
            data?.setLoadding(false)
        }
    }
    const [dataDetailsXL, setDataDetailsXL]: any = useState("")
    function handleModelDetailsXL(params: any) {
        if (params) {
            setDataDetailsXL(params)
            setVisibleXL(!visibleXL)
        }
    }
    function countAccount(n: any) {
        let length: any = "";
        var i = !n ? undefined : n;
        if (!i) {
            return { length: "", name: '', status: false };
        } else {
            if (i == "scb") {
                length = 10;
            } else if (i == "ktb") {
                length = 10;
            } else if (i == "baac") {
                length = 10;
            } else if (i == "kbank") {
                length = 10;
            } else if (i == "bbl") {
                length = 10;
            } else if (i == "bay") {
                length = 10;
            } else if (i == "ttb") {
                length = 10;
            } else if (i == "gsb") {
                length = 12;
            } else if (i == "uob") {
                length = 10;
            } else if (i == "tisco") {
                length = 14;
            } else if (i == "cimb") {
                length = 10;
            } else if (i == "lhb") {
                length = 10;
            } else if (i == "truewallet") {
                length = 10;
            } else if (i == "PayoneX") {
                length = "10";
            }
            return { length: length, name: i, status: true };
        }
    }
    function countNumbers(accountNumber: any) {
        if (accountNumber === undefined) {
            return 0;
        }
        const characters = accountNumber?.split('');
        const numbers = characters?.filter((char: any) => !isNaN(char));
        return numbers?.length;
    }
    // add Account
    const [validated, setValidated] = useState(false)
    const [handleInput, setHandleInput]: any = useState<any>({
        deviceId: undefined,
        pin: undefined,
        accountNo: undefined,
        accountType: undefined,
        merchantId: undefined,
        bank: undefined,
        channel: undefined,
        bankAccountGroupId: undefined,
        telephoneNumber: undefined,
        accountName: undefined,
        status_bank: undefined,

    })
    const countNumber: any = countNumbers(handleInput?.accountNo)
    const countAcc: any = countAccount(handleInput?.bank)
    const countTelePhone: any = countNumbers(handleInput?.telephoneNumber)
    //console.log(handleInput)
    function resetForm() {
        setHandleInput({
            deviceId: undefined,
            pin: undefined,
            accountNo: undefined,
            accountType: undefined,
            merchantId: "",
            bank: undefined,
            channel: undefined,
            bankAccountGroupId: undefined,
            telephoneNumber: undefined,
            accountName: undefined,
            status_bank: undefined,
        })
    }
    function handleAddBankAccount(event: any) {
        const form = event?.currentTarget
        setHandleInput({ ...handleInput, [event?.target?.name]: event?.target?.value })
        if (form?.checkValidity() === false) {
            event?.preventDefault()
            event?.stopPropagation()
            if (countNumber != countAcc) {
                setValidated(false)
                return
            } else {
                setValidated(true)
                return
            }
        } else {
            if (countNumber != countAcc) {
                setValidated(false)
                return
            } else {
                setValidated(true)
                return
            }
        }
    }
    //console.log(handleInput)
    async function checkInputChannel(item: any) {
        let data: any = {};
        data = { ...item };
        if (data?.bank == "kbank") {
            if (data?.channel === "k-biz" || data?.channel === "kbank-business" || data?.channel === "kplus") {
                return true
            }
            return false
        } else if (data?.bank == "scb") {
            if (data?.channel === "scb-easy" || data?.channel === "scb-business") {
                return true
            }
            return false
        } else if (data?.bank == "ktb") {
            if (data?.channel === "KTB_NEX" || data?.channel === "ktb-business") {
                return true
            }
            return false
        } else {
            return false
        }
    }
    async function checkInputForm(item: any) {
        if (!item) {
            openNotification("error", "กรุณากรอกข้อมูลให้ครบถ้วน")
            return false
        }
        let data: any = {};
        data = { ...item };
        let o = await checkInputChannel(item)
        if (!data?.bank) {
            openNotification("error", "กรุณาเลือกธนาคาร")
            return false
        }
        if (!data?.deviceId) {
            openNotification("error", "กรุณากรอกข้อมูล Device Id")
            return false
        }
        if (!data?.pin) {
            openNotification("error", "กรุณากรอกข้อมูล pin หรือ password")
            return false
        }
        if (!o) {
            openNotification("error", "กรุณาเลือกช่องทางหรือตรวจสอบช่องทางให้ถูกต้อง")
            return false
        }
        if (!data?.accountNo) {
            openNotification("error", "กรุณากรอกเลขบัญชีให้ถูกต้อง")
            return false
        }
        if (countNumber != countAcc?.length) {
            openNotification("error", `จำนวนเลขบัญชี ฺ ${t(data?.bank)} ต้องมี ${countAcc?.length} หลัก`)
            return false
        }
        if (!data?.accountName) {
            openNotification("error", "กรุณากรอกชื่อบัญชีธนาคาร")
            return false
        }
        if (!data?.accountType) {
            openNotification("error", "กรุณาเลือกประเภทบัญชี")
            return false
        }
        if (!data?.bankAccountGroupId) {
            openNotification("error", "กรุณาเลือกกลุ่มบัญชี")
            return false
        }
        if (!data?.merchantId) {
            openNotification("error", "กรุณาเลือก merchant Id")
            return false
        }
        if (!data?.status_bank) {
            openNotification("error", "กรุณาเลือกสถานะบัญชี")
            return false
        }
        return true
    }
    const addAccount = async (event: any) => {
        event.preventDefault()
        data.setLoadding(true);
        let check = await checkInputForm(handleInput);
        if (!check) {
            setTimeout(() => { data.setLoadding(false); }, 1500);
            return;
        }
        const datapost = {
            deviceId: handleInput?.deviceId,
            pin: handleInput?.pin,
            accountNo: handleInput?.accountNo,
            accountType: handleInput?.accountType,
            merchantId: parseInt(handleInput?.merchantId),
            bank: handleInput?.bank,
            channel: handleInput?.channel,
            bankAccountGroupId: parseInt(handleInput?.bankAccountGroupId),
            telephoneNumber: handleInput?.telephoneNumber ? handleInput?.telephoneNumber : "-",
            accountName: handleInput?.accountName,
            status_bank: handleInput?.status_bank,
            status_promptpay_qr: handleInput?.accountType == "withdrawal" ? 1 : 0,
        }
        Apisetting.postAddbankAcc(datapost)
            .then((res) => {
                if (res.data.success) {
                    setTimeout(() => {
                        setHandleInput({
                            deviceId: undefined,
                            pin: undefined,
                            accountNo: undefined,
                            accountType: undefined,
                            merchantId: undefined,
                            bank: undefined,
                            channel: undefined,
                            bankAccountGroupId: undefined,
                            telephoneNumber: undefined,
                            accountName: undefined,
                            status_bank: undefined,
                        })
                        data?.getBankAccount()
                        openNotification("success", "เพิ่มบัญชีสำเร็จ")
                        data?.setLoadding(false)
                        setVisibleLg(false)
                    }, 2000)
                } else {
                    openNotification("error", res.data.message.th)
                    data?.setLoadding(false)
                }
            }).catch((err) => {
                openNotification("error", err.message)
                data?.setLoadding(false)
            })
        //console.log(datapost)
    }
    const [selectedGroup, setSelectedGroup]: any = useState([]);
    const [handleSelectedGroup, sethandleSelectedGroup] = useState(1);
    const checkGroupChange = () => {

        let id: any = data?.bankAccount?.data?.filter((bank: any) => bank?.isActive === true)
        if (!id || id?.length == 0) {
            return false
        }

        sethandleSelectedGroup(parseInt(id[0]?.id))
        selectBankGroup(parseInt(id[0]?.id))
    };
    const openOnChange = () => {
        data?.setLoadding(true)

        SetShowConfig(!showConfig)
        setTimeout(() => {
            data?.setLoadding(false)
        }, 1000)
    };
    const [loadingSpin, setLoadingSpin] = useState(false)
    const [showConfig, SetShowConfig] = useState(false)
    const [handleChang, setHandleChang]: any = useState<any>({
        bankIdDeposit: "",
        bankIdWithdrawal: "",
    })
    function handleSelectBank(event: any) {
        setHandleChang({ ...handleChang, [event?.target?.name]: event?.target?.value })
        setLoadingSpin(true)
        if (event?.target?.name == "bankIdDeposit") {
            let item = {
                bankId: event?.target?.value ? parseInt(event?.target?.value) : undefined
            }
            if (item) {
                Apibank.upBank_level_deposit(item)
                    .then((res) => {
                        //console.log(res.data)
                        if (res.data.success) {

                            setTimeout(() => {
                                data?.getBankAccount()
                                openNotification("success", res.data.message)
                                setLoadingSpin(false)
                            }, 1000);

                        } else {
                            setTimeout(() => {
                                openNotification("error", res.data.message)
                                setLoadingSpin(false)
                            }, 1000);
                        }
                    }).catch((err) => {
                        setTimeout(() => {
                            openNotification("error", err.message)
                            setLoadingSpin(false)
                        }, 1000);
                    })
            }
        } else if (event?.target?.name == "bankIdWithdrawal") {
            let item = {
                bankId: event?.target?.value ? parseInt(event?.target?.value) : undefined
            }
            if (item) {
                Apibank.upBank_level_withdrawal(item)
                    .then((res) => {
                        if (res.data.success) {
                            setTimeout(() => {
                                data?.getBankAccount()
                                openNotification("success", res.data.message)
                                setLoadingSpin(false)
                            }, 1000);

                        } else {
                            setTimeout(() => {
                                openNotification("error", res.data.message)
                                setLoadingSpin(false)
                            }, 1000);
                        }
                    }).catch((err) => {
                        setTimeout(() => {
                            openNotification("error", err.message)
                            setLoadingSpin(false)
                        }, 1000);
                    })
            }
        } else {
            setTimeout(() => {
                openNotification("error", "ไม่พบข้อมูล")
                setLoadingSpin(false)
            }, 1000);
        }
    }
    function handleSelectChange(event: any) {
        //console.log(event?.target?.id)
        setHandleInput({ bank: event?.target?.id })
        setIsOpen(!isOpen)
    }
    // Main set payment config
    function mainSelectBank(data: any) {
        var accDeposit: any = []
        var accWithdrawal: any = []
        var a: any = [];

        for (let i = 0; i < data?.length; i++) {
            a.push({ data: data[i]?.bankAccounts })
        }
        a?.filter((o: any) => {
            o?.data?.filter((c: any) => {
                if (c?.accountType == "withdrawal" && c?.status_bank == "Active") {
                    accWithdrawal?.push({ ...c });
                }
            })
        });
        a?.filter((o: any) => {
            o?.data?.filter((c: any) => {
                if (c?.accountType == "deposit" && c?.status_bank == "Active") {
                    accDeposit?.push({ ...c });
                }
            })
        });

        {
            return roles ? <>
                <Spin tip="Loading" spinning={loadingSpin}>
                    <Divider orientation="left" className='mt-0'><SettingOutlined className='me-1' style={{ display: "inline-flex" }} />Set Payment Config</Divider>
                    <Form className={`${showConfig && "aninationleft"}`} style={{ width: "fit-content" }}>
                        <p className='text-center mb-3 h5' style={{ color: "#6b7785", fontWeight: "700" }}></p>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="staticEmail2" className="col-4 col-form-label text-md-end">
                                {"Bank Group"}
                            </CFormLabel>
                            <CCol>
                                <select id="inputGroupSelect01" disabled={data?.loadding} value={handleSelectedGroup} onChange={handleGroupChange} className="form-select me-3" style={{ fontWeight: "700", color: "rgb(16 159 244)", textTransform: "capitalize" }}>

                                    {dataBankgrop?.length > 0 && dataBankgrop?.map((index: any, id: any) => {
                                        return <>
                                            <img src={index?.bank?.imageUrl} alt="" />
                                            <option style={{ fontWeight: "500", color: index?.isActive ? 'rgb(16 159 244)' : "#607d8b", textTransform: "capitalize" }} key={id} id='' value={index?.id} selected={index?.isActive ? true : false}><span>{index?.name}<em>{index?.isActive ? <span> {t("Active2")}</span> : ''}</em></span></option>
                                        </>
                                    })}
                                </select>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="inputPassword2" className="col-4 col-form-label text-md-end">
                                {"ฝาก [หลัก]"}
                            </CFormLabel>
                            <CCol>
                                <CFormSelect className='form-select Cselect_ d-flex GroupSelect01Deposit' name='bankIdDeposit' onChange={handleSelectBank} style={{ height: "36px", color: `rgb(81 204 138)` }}>
                                    {accDeposit?.length > 0 ? accDeposit?.map((item: any) => {
                                        //console.log(item)
                                        return item?.level_Bank === 1 ?
                                            <option
                                                style={{ textTransform: "uppercase", color: `${item?.level_Bank == 1 ? 'rgb(81 204 138)' : 'rgb(136, 136, 136)'}` }}
                                                value={item?.id}
                                                selected={item?.level_Bank}>{`${item?.level_Bank == 1 ? "[หลัก] - " : ''}`} {item?.bank?.bank_id}, {hideLastName(item?.accountName)}
                                            </option>
                                            :
                                            <>
                                                <option selected style={{ textTransform: "uppercase", color: `rgb(136, 136, 136)` }} >{"-- เลือกบัญชีฝาก [ หลัก ] --"}</option>
                                                <option
                                                    style={{ textTransform: "uppercase", color: `${item?.level_Bank == 1 ? 'rgb(81 204 138)' : 'rgb(136, 136, 136)'}` }}
                                                    value={item?.id}
                                                    selected={item?.level_Bank}>{`${item?.level_Bank == 1 ? "[หลัก] - " : ''}`} {item?.bank?.bank_id}, {hideLastName(item?.accountName)}
                                                </option>
                                            </>
                                    }) : <option selected disabled style={{ textTransform: "uppercase" }} >{"ไม่มีบัญชีฝากที่ใช้งาน"}</option>}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="inputPassword2" className="col-4 col-form-label text-md-end">
                                {"ถอน [หลัก]"}
                            </CFormLabel>
                            <CCol>
                                <CFormSelect className='form-select Cselect_ d-flex mb-3 GroupSelect01Withdrawal' onChange={handleSelectBank} value={accWithdrawal?.map((o: any) => o?.level_Bank == 1)} name='bankIdWithdrawal' style={{ height: "36px", color: `rgb(239 55 129)` }}>
                                    {accWithdrawal?.length > 0 ? accWithdrawal?.map((items: any) => {
                                        return items?.level_Bank === 1 ?
                                            <option
                                                style={{ textTransform: "uppercase", color: `${items?.level_Bank == 1 ? 'rgb(239 55 129)' : 'rgb(136, 136, 136)'}` }}
                                                value={items?.id}
                                                selected={items?.level_Bank == 1 && true}>
                                                {`${items?.level_Bank == 1 ? "[หลัก] - " : ''}`} {items?.bank?.bank_id}, {hideLastName(items?.accountName)},  {formatAccnumID(items?.accountNumber)}
                                            </option>
                                            :
                                            <>
                                                <option selected style={{ textTransform: "uppercase", color: `rgb(136, 136, 136)` }} >{"-- เลือกบัญชีถอน [ หลัก ] --"}</option>
                                                <option
                                                    style={{ textTransform: "uppercase", color: `${items?.level_Bank == 1 ? 'rgb(239 55 129)' : 'rgb(31, 29, 29)'}` }}
                                                    value={items?.id}
                                                    selected={items?.level_Bank == 1 && true}>
                                                    {`${items?.level_Bank == 1 ? "[หลัก] - " : ''}`} {items?.bank?.bank_id}, {hideLastName(items?.accountName)}, {formatAccnumID(items?.accountNumber)}
                                                </option>
                                            </>
                                    }) : <option selected disabled style={{ textTransform: "uppercase" }} >{"ไม่มีบัญชีถอนที่ใช้งาน"}</option>}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                    </Form>
                    <Alert className='mb-3 mt-3' description={<ul style={{ color: "#616161" }}>
                        <li><b>[หลัก]</b> หมายถึง  <b>บัญชีฝาก/ถอน ที่ใช้งานหลัก</b></li>
                        <li>ถ้าไม่มี หมายถึง <b>ยังไม่ได้เลือกบัญชี บัญชีฝาก/ถอน ที่ใช้งานหลัก</b></li>
                    </ul>} message={<b>{"Note :"}</b>} type="info" showIcon />
                    <Divider orientation="center" children={<em style={{ color: "#88888880" }} >{`${t("version")}: ${config.version}`}</em>} />
                </Spin>
            </> : <></>
        }
    }
    const handleGroupChange = (event: any) => {
        sethandleSelectedGroup(event?.target?.value)
        data?.setLoadding(true)
        setLoadingSpin(true)
        if (event?.target?.value) {
            Apisetting.upBankAccountGroup({ id: event?.target?.value })
                .then((res) => {
                    if (res.data.success == true) {
                        setTimeout(() => {
                            data?.getBankAccount()
                            data?.getall_BankGrop()
                            selectBankGroup(event?.target?.value)
                            openNotification("success", `${res?.data?.message?.msg}`)
                            data?.setLoadding(false)
                            setLoadingSpin(false)

                        }, 1000)
                    } else {
                        setTimeout(() => {
                            setLoadingSpin(false)
                            data?.setLoadding(false)
                            openNotification("error", `${res?.data?.message?.msg}`)
                        }, 2500)
                    }
                }).catch((err) => {
                    setLoadingSpin(false)
                    data?.setLoadding(false)
                    openNotification("error", `${err?.message}`)
                })
        }
    };
    function selectBankGroup(group: any) {
        let datam = data?.bankAccount?.data?.filter((bank: any) => bank?.id == group);
        return setSelectedGroup(datam)
    }
    let item: any = {
        bankGroup: data?.bankAccount?.data,
        MerchantId: data?.stateMerchang?.data
    }
    const { styles } = useStyle();
    const operations: any = roles2 && <>
        <ConfigProvider
            button={{
                className: styles.linearGradientButton,
            }}
        >
            <Space>
                {!showConfig ? <><Button style={{ display: `${roles ? "block" : "none"}`, fontWeight: "700" }} onClick={() => setVisibleLg(!visibleLg)} type="primary" size="large" icon={<PlusOutlined className='me-1' />}>
                    {t('Add Bank Acc')}
                </Button></> : null}

                {/* {!showConfig ? <Button onClick={() => setVisibleLg(!visibleLg)} className="text-truncate" style={{ display: `${roles ? "block" : "none"}` }} >
                    <PlusOutlined className='' style={{ display: "inline-flex" }} /> {t('Add Bank Acc')}
                </Button> : <></>} */}
            </Space>
        </ConfigProvider>

    </>;
    //console.log(data?.stateBankGrop)
    const onChange = (key: string) => {
        console.log(key)
        if (key) {
            setTimeout(() => {
                data?.setLoadding(false)
            }, 1000)
        }
    };
    function processPollingStatus(data: any) {
        try {
            if (!data) {
                return
            }
            const parsedData: any = JSON.parse(data?.latestPollingStatus);
            let status: any = JSON.parse(parsedData)

            return status?.status?.code
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }
    function removeBackslashes(text: any) {
        //console.error(text);
        if (typeof text !== "string") {
            return ""; // ถ้าไม่ใช่ string คืนค่าเดิม
        }
        return text.replace(/^\\"/, "").replace(/\\"$/, "");
    }
    function calculateAccountUsage(data: any) {
        const createdAt = data?.created_at;
        const limitDays = 120;

        if (!createdAt) {
            return 'N/A';
        }

        const createdDate = Moment(createdAt);
        const now = Moment();
        const usedDays = now.diff(createdDate, 'days');
        return usedDays >= 0 ? usedDays : 0;
    };
    function calculateAccountRemainingDays(data: any) {
        const createdAt = data?.created_at;
        const limitDays = 120;

        if (!createdAt) {
            return 0;
        }

        const createdDate = Moment(createdAt);
        const now = Moment();
        const usedDays = now.diff(createdDate, 'days');
        const remainingDays: any = limitDays - usedDays;

        return remainingDays >= 0 ? remainingDays : 0;
    };
    const [activeBankAccounts, setActiveBankAccounts] = useState<DataType[] | undefined>([]);
    const [firstActiveBank, setFirstActiveBank] = useState<DataType | undefined>(undefined);
    const [allBankAccounts, setAllBankAccounts] = useState<any[] | undefined>(undefined);
    const [activeAccBanks, setActiveAccBanks] = useState<any[]>([]);
    const [deactivatedAccBanks, setDeactivatedAccBanks] = useState<any[]>([]);
    const [verifyAccBanks, setVerifyAccBanks] = useState<any[]>([]);
    const [faceScanAccBanks, setFaceScanAccBanks] = useState<any[]>([]);
    const [captchaAccBanks, setCaptchaAccBanks] = useState<any[]>([]);
    const [spinning, setSpinning] = React.useState(false);

    useEffect(() => {
        const updatedActiveBankAccounts = data?.bankAccount?.data?.filter((bank: any) => bank?.isActive === true);
        setActiveBankAccounts(updatedActiveBankAccounts);
        setFirstActiveBank(updatedActiveBankAccounts?.[0]);
    }, [data?.bankAccount?.data, data?.loadding]);
    useEffect(() => {
        setAllBankAccounts(firstActiveBank?.bankAccounts);
    }, [firstActiveBank]);
    useEffect(() => {
        setActiveAccBanks(allBankAccounts?.filter((bank: any) => bank?.status_bank !== "Banned" && bank?.status_bank !== "Delete" && bank?.status_bank !== "Vault" && bank?.accountType !== "verifying_account") ?? []);
        setDeactivatedAccBanks(allBankAccounts?.filter((bank: any) => bank?.status_bank === "Banned" || bank?.status_bank === "Delete") ?? []);
        setVerifyAccBanks(allBankAccounts?.filter((bank: any) => bank?.accountType == "verifying_account" && bank?.status_bank !== "Banned" && bank?.status_bank !== "Delete") ?? []);
        setFaceScanAccBanks(allBankAccounts?.filter((bank: any) => bank?.status_bank === "Vault" && bank?.note === "Face_Scan") ?? []);
        setCaptchaAccBanks(allBankAccounts?.filter((bank: any) => bank?.status_bank === "Vault" && bank?.note === "Captcha") ?? []);
    }, [allBankAccounts, roles2, roles]);
    function getChecked(status: any) {
        if (status == "Active") {
            return true
        }
        return false
    }
    const [size, setSize] = useState<SizeType>('large');


    const [loadings, setLoadings] = useState<boolean>(false);
    const [modalQRcode, contextHolderQRcode] = Modal.useModal();
    const showModalQRcode = (item: any) => {
        if (item?.data?.qrType == "QRCODE") {
            confirm(item)
            return
        }
        Toast?.fire({
            icon: "error",
            title: t(`ข้อมูลไม่ถูกต้อง`),
        });
    };
    const confirmPaymentQR = (item: any) => {
        setLoadings(true)
        if (item) {
            Apibank.getUpdate_depprosit_krungthais()
                .then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        setLoadings(false)
                        Toast?.fire({
                            icon: "success",
                            title: t(`${res.data.message}`),
                        });
                    } else {
                        setLoadings(false)
                        Toast?.fire({
                            icon: "error",
                            title: t(`${res.data.message}`),
                        });
                    }
                }).catch((err) => {
                    setLoadings(false)
                    console.log(err)
                })
        } else {
            setLoadings(false)
            Toast?.fire({
                icon: "error",
                title: t(`ข้อมูลไม่ถูกต้อง`),
            });
        }
    }

    const chack_depprositgateway = (orderID: any) => {
        //console.log(orderID)
        setSpinning(true)
        if (orderID) {
            Apibank.getChack_depprositgateway({ platform_order_id: orderID })
                .then((res) => {
                    if (res.data.success) {
                        setSpinning(false)
                        Toast?.fire({
                            icon: "success",
                            title: t(`${res.data.message}`),
                        });
                    } else {
                        Toast?.fire({
                            icon: "error",
                            title: t(`${res.data.message}`),
                        });
                        setSpinning(false)
                    }

                }).catch((err) => {
                    setSpinning(false)
                    Toast?.fire({
                        icon: "error",
                        title: t(`${err.message}`),
                    });
                })
        } else {
            Toast?.fire({
                icon: "error",
                title: t(`ข้อมูลไม่ถูกต้อง`),
            });
        }
    }
    const confirm = (item: any) => {
        modalQRcode.confirm({
            title: <b style={{ color: "rgba(0, 0, 0, 0.65)" }}>{"สแกน QRcode เพื่อโอนเงิน"}</b>,
            width: "469px",
            className: 'pay-main',
            icon: <QrcodeOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />,
            content: <>
                <PaymentQR data={item?.data} />
            </>,
            okText: <span>{"ยืนยันการทำรายการ"}</span>,
            onOk: () => confirmPaymentQR(item),
            cancelText: <span>{'ยกเลิก'}</span>,
        });
    };
    const modelTransferMoneyToAccountWealth = (item: any) => {
        modalQRcode.confirm({
            title: <b style={{ color: "rgba(0, 0, 0, 0.65)" }}><QrcodeOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} /> {"สแกน QRcode เพื่อโอนเงิน"}</b>,
            width: "469px",
            className: 'pay-main',
            icon: null,
            content: <>
                <TransferMoneyToAccountWealth data={item?.data} />
            </>,
            okText: <span>{"ยืนยันการทำรายการ"}</span>,
            onOk: () => chack_depprositgateway(item?.data?.platform_order_id),
            cancelText: <span>{'ยกเลิก'}</span>,
        });
    };
    async function getTransferMoneyToAccount_KTB(item: any) {
        if (item?.id) {
            let resultAmount: { amount?: string } | undefined | any | null;
            try {
                const swalResult = await Swal.fire<{ value: { amount: string } }>({
                    title: `โอนเงินเข้าบัญชี`,
                    inputLabel: `ธนาคาร: ${item?.bank?.bank_name} ชื่อ: ${item?.accountName} เลขบัญชี: ${item?.accountNumber}`,
                    icon: "question",
                    html: `
                     <form id="swal-form">
                       <div style="display: flex; flex-direction: column; align-items: flex-start;">
                       <small  class='text-left d-block mb-1'>
                            <b style="font-weight: 700; ">ธนาคาร:</b> ${item?.bank?.bank_name}
                        </small>
                        <small class='text-left d-block  mb-1'>
                            <b style="font-weight: 700; ">ชื่อบัญชี:</b> ${item?.accountName}
                        </small>
                        <small class='text-left d-block  mb-1'>
                            <b style="font-weight: 700; ">เลขบัญชี:</b> ${item?.accountNumber}
                        </small>
                        <br>
                         <label htmlFor="amount" style="font-weight: bold; margin-bottom: 2px;">${t("ใส่จำนวนเงินที่ต้องการโอน")}</label>
                         <input focus="true" type="number" id="amount" name="amount" placeholder='จำนวนเงิน' style="max-width: 100%;" class="swal2-input mt-2" ></input>
                       </div>
                     </form>
                   `,
                    focusConfirm: false,
                    showDenyButton: true,
                    confirmButtonText: t("Yes!"),
                    denyButtonText: t("ยกเลิก"),
                    background: "rgb(0 21 41)",
                    color: "#aeaeae",
                    showCancelButton: false,
                    footer: `${t("version")} : ${config?.version}`,
                    preConfirm: () => {
                        const amount = (document.getElementById("amount") as HTMLTextAreaElement)?.value;
                        if (!amount) {
                            Swal.showValidationMessage(t('กรุณาใส่จำนวนเงินด้วยคะ'));
                            return undefined;
                        }
                        return { amount };
                    },
                });
                resultAmount = swalResult.value;
                if (swalResult.isConfirmed) {
                    let postData = {
                        bankAccountId: item?.id,
                        accountNumber: item?.accountNumber,
                        amount: parseInt(resultAmount?.amount),
                    }
                    //console.log(postData)
                    Apibank.getApiTransferMoneyToAccount(postData)
                        .then((res) => {
                            //console.log(res?.data?.success)
                            if (res?.data?.success) {
                                //console.log(res?.data)
                                Toast?.fire({
                                    icon: "success",
                                    title: t(`${res?.data?.message}`),
                                });
                                showModalQRcode(res?.data)

                            } else if (res?.data?.data?.status == "PENDING") {
                                Toast?.fire({
                                    icon: "success",
                                    title: t(`${res?.data?.message}`),
                                });
                                showModalQRcode(res?.data)
                            } else {
                                setTimeout(() => {
                                    setLoadings(false)
                                    Toast?.fire({
                                        icon: "error",
                                        title: t(`${res?.data?.message || 'อยู่ในช่วงพัฒนาระบบ'}`),
                                    });
                                }, 1500)
                            }
                        }).catch((err) => {
                            Toast?.fire({
                                icon: "error",
                                title: t(`${err?.message}`),
                            });
                            console.log(err)
                        })
                } else if (swalResult.isDenied) {
                    setLoadings(false);
                    toggleDetails(item?.id)
                    Toast?.fire({
                        icon: "error",
                        title: t(`ยกเลิกการกระทำ`),
                    });
                } else if (swalResult.isDismissed) {
                    setLoadings(false);
                    toggleDetails(item?.id)
                    Toast?.fire({
                        icon: "info",
                        title: t(`ยกเลิกการกระทำ`),
                    });
                }
            } catch (error: any) {
                console.error("Error during update bank account:", error);
                setLoadings(false);
                Toast?.fire({
                    icon: "error",
                    title: t("เกิดข้อผิดพลาด"),
                    text: error.message || t("ไม่สามารถดำเนินการได้"),
                });
            } finally {
                setLoadings(false); // Ensure loading is off in case of errors
            }
        }

    }

    async function getTransferMoneyToAccount_Wealth(item: any) {
        data?.getBankList?.()
        if (item?.id) {
            let resultAmount: { amount: string } | undefined | any | null;
            const bankListFromBackend = data?.bankList?.data || [];

            let optionsHtml: any = '<option value="" selected>-- เลือก --</option>';
            if (bankListFromBackend) {
                for (let i = 0; i < bankListFromBackend.length; i++) {
                    const bank = bankListFromBackend[i];
                    optionsHtml += `<option style='display: ${bank.bankNameTh == "Wealth" ? 'none' : bank.bankNameTh == "PayoneX" ? 'none' : ''}' value="${bank.bank_id}">${bank.bankNameTh}</option>`;
                }
            }

            try {
                const swalResult = await Swal.fire<{ value: { amount: number } }>({
                    title: `<h4 class='text-center mb-3' style="color:#888">โอนเงินเข้าบัญชี Gateway ( ${item?.bank?.bank_name} )</h4>`,
                    html: `
                              <form id="swal-form">
                                <div style="display: flex; flex-direction: column; align-items: flex-start;">
                                  <label htmlFor="payerBank" style="font-weight: bold; margin-bottom: 2px;">${t("เลือกธนาคารผู้โอน")}</label>
                                  <select id="payerBank"  class="swal2-input mt-2" style="max-width: 100%;">
                                    ${optionsHtml}
                                  </select>
                
                                  <label htmlFor="payerName" style="font-weight: bold; margin-bottom: 2px; margin-top: 10px;">${t("ชื่อ-สกุล")}</label>
                                  <input type="text" id="payerName" name="payerName" placeholder='${t("กรอกชื่อ-สกุลผู้โอน")}' style="max-width: 100%;" class="swal2-input mt-2">
                
                                  <label htmlFor="payerAccountNumber" style="font-weight: bold; margin-bottom: 2px; margin-top: 10px;">${t("เลขบัญชี")}</label>
                                  <input type="number" id="payerAccountNumber" name="payerAccountNumber" placeholder='${t("กรอกเลขบัญชีผู้โอน")}' style="max-width: 100%;" class="swal2-input mt-2">
                
                                  <label htmlFor="amount" style="font-weight: bold; margin-bottom: 2px; margin-top: 10px;">${t("จำนวนเงิน")}</label>
                                  <input type="number" id="transferAmount" name="amount" placeholder='${t("กรอกจำนวนเงินที่ต้องการโอน")}' style="max-width: 100%;" class="swal2-input mt-2">
                                </div>
                              </form>
                            `,
                    focusConfirm: false,
                    icon: "question",
                    showDenyButton: true,
                    confirmButtonText: t("Yes!"),
                    denyButtonText: t("ยกเลิก"),
                    background: 'rgb(0 21 41)',
                    color: '#aeaeae',
                    showCancelButton: false,
                    footer: `${t('version')} : ${config?.version}`,

                    preConfirm: () => {
                        const amount = (document.getElementById("transferAmount") as HTMLTextAreaElement)?.value;
                        const bank = (document.getElementById("payerBank") as HTMLTextAreaElement)?.value.toUpperCase();
                        const account_name = (document.getElementById("payerName") as HTMLTextAreaElement)?.value;
                        const accountNumber = (document.getElementById("payerAccountNumber") as HTMLTextAreaElement)?.value;

                        if (!amount) {
                            Swal.showValidationMessage(t('กรุณาใส่จำนวนเงินด้วยคะ'));
                            return undefined;
                        }
                        if (!bank) {
                            Swal.showValidationMessage(t('กรุณาเลือกธนาคารผู้โอน'));
                            return undefined;
                        }
                        if (!account_name) {
                            Swal.showValidationMessage(t('กรุณากรอกชื่อ-สกุลผู้โอน'));
                            return undefined;
                        }
                        if (!accountNumber) {
                            Swal.showValidationMessage(t('กรุณากรอกเลขบัญชีผู้โอน'));
                            return undefined;
                        }
                        return { amount, bank, account_name, accountNumber };
                    },
                });
                resultAmount = swalResult.value;
                if (swalResult.isConfirmed) {
                    setSpinning(true)
                    let postData = {
                        bankAccountSenderId: item?.id,
                        accountNumber: resultAmount?.accountNumber,
                        account_name: resultAmount?.account_name,
                        bank: resultAmount?.bank?.toUpperCase(),
                        amount: parseInt(resultAmount?.amount),
                    }
                    //console.log(payerBankId)
                    Apibank.getCreate_depprositgateway(postData)
                        .then((res) => {
                            if (res?.data?.success) {
                                setSpinning(false)
                                setLoadings(false)
                                Toast?.fire({
                                    icon: "success",
                                    title: t(`${res?.data?.message}`),
                                });
                                modelTransferMoneyToAccountWealth(res?.data)

                            } else {
                                Toast?.fire({
                                    icon: "error",
                                    title: t(`${res?.data?.message}`),
                                });
                                setLoadings(false)
                                setSpinning(false)

                            }
                        }).catch((err) => {
                            Toast?.fire({
                                icon: "error",
                                title: t(`${err?.message}`),
                            });
                            console.log(err)
                            setLoadings(false)
                            setSpinning(false)
                        })
                } else if (swalResult.isDenied) {
                    setSpinning(false)
                    setLoadings(false)
                    toggleDetails(item?.id)
                    Toast?.fire({
                        icon: "error",
                        title: t(`ยกเลิกการกระทำ`),
                    });
                } else if (swalResult.isDismissed) {
                    setLoadings(false)
                    setSpinning(false);
                    toggleDetails(item?.id)
                    Toast?.fire({
                        icon: "info",
                        title: t(`ยกเลิกการกระทำ`),
                    });
                }
            } catch (error: any) {
                console.error("Error during update bank account:", error);
                setLoadings(false)
                setSpinning(false);
                Toast?.fire({
                    icon: "error",
                    title: t("เกิดข้อผิดพลาด"),
                    text: error.message || t("ไม่สามารถดำเนินการได้"),
                });
            }
        }
    }
    async function getCheckedRoleAdmin(role: any, item: any, bank: any) {
        setLoadings(true)
        setSpinning(true)
        if (!role) {
            setTimeout(() => {
                setLoadings(false)
                setSpinning(false)
                Toast?.fire({
                    icon: "error",
                    title: t(`ไม่สามารถทำรายการได้`),
                });
            }, 1500)
            return
        }
        if (role == "Owner" || role == "Subowner" || role == "Manager" || role == "Cs_Accounting" || role == "Accounting") {
            if (bank == 'ktb') {
                await getTransferMoneyToAccount_KTB(item)
            } else if (bank == 'Wealth') {
                await getTransferMoneyToAccount_Wealth(item)
            }
        } else {
            setTimeout(() => {
                setSpinning(false)
                setLoadings(false)
                Toast?.fire({
                    icon: "error",
                    title: t(`Role : ${role} ไม่สามารถทำรายการได้`),
                });
            }, 1500)

        }
    }
    async function getUpdateStatus(status: any) {
        setSpinning(true)
        if (status) {
            let postData = {
                status_bank: "Pending",
                edit_id: status?.id,
            }
            Apisetting.postIsActiveBank(postData)
                .then((res) => {
                    if (res.data.success) {
                        Toast?.fire({
                            icon: "success",
                            title: t(`${res.data.message}`),
                        });
                        setSpinning(false)
                        data?.getBankAccount()
                    } else {
                        Toast?.fire({
                            icon: "error",
                            title: t(`${res.data.message}`),
                        });
                        setSpinning(false)
                    }
                }).catch((err: any) => {
                    Toast?.fire({
                        icon: "error",
                        title: t(`${err?.message}`),
                    });
                    console.log(err)
                    setSpinning(false)
                })
        }

    }


    function getCheckedBankButton(item: any) {
        if (item?.bank?.bank_id == "Wealth") {
            return <>
                <Button
                    style={{ background: "#666666", color: "#fff", border: "none" }}
                    className='me-2'
                    variant="solid"
                    size={size}
                    loading={loadings}
                    disabled={loadings}
                    onClick={() => handleShoeModel(item)}
                >
                    <ClockCircleOutlined className='me-1' />   {"ประวัติการเติมเงิน"}
                </Button>
                <Button
                    loading={loadings}
                    disabled={loadings}

                    onClick={() => getCheckedRoleAdmin(data?.dataAdmin?.name, item, item?.bank?.bank_id)}
                    type="primary"
                    icon={<DownloadOutlined className='me-1' />}
                    size={size}>
                    {loadings ? " Loading..." : "เติมเงินเข้าบัญชี"}
                </Button>

            </>
        } else if (item?.bank?.bank_id == "ktb") {
            return <Button
                loading={loadings}
                disabled={loadings}
                onClick={() => getCheckedRoleAdmin(data?.dataAdmin?.name, item, item?.bank?.bank_id)}
                icon={<DownloadOutlined className='me-1' />}
                size={size}>
                {loadings ? " Loading..." : "โอนเงินเข้าบัญชี"}
            </Button>
        } else {
            return null
        }
    }
    function MainContainer(data: any) {
        if (data?.length < 0) {
            return <CSmartTable className='mt-3' loading={data?.loadding} columns={columns} />
        } else {
            const onChangeVault = (key: string) => {
                console.log(key);
            };
            let length_Face_Scan = faceScanAccBanks?.length;
            let length_Captcha = captchaAccBanks?.length;
            let length_Repair = (length_Face_Scan + length_Captcha);
            const itemsVault: TabsProps['items'] = [
                {
                    key: '1',
                    label: `Captcha Account ( ${length_Captcha} )`,
                    children: <CSmartTable
                        columns={columnsRepair}
                        // loading={data?.loadding}
                        footer={false}
                        items={captchaAccBanks ?? []}
                        itemsPerPageSelect
                        tableFilter
                        itemsPerPage={50}
                        activePage={currentPage}
                        onActivePageChange={(page) => {
                            setCurrentPage(page)
                        }}
                        pagination
                        onFilteredItemsChange={(items) => {
                            // ค้นหา
                            //console.log(items)
                        }}
                        onSelectedItemsChange={(items) => {
                            //console.log(items)
                        }}
                        scopedColumns={{
                            avatar: (item: any) => (
                                // (console.log(item))

                                <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                    <Tooltip title={t(item?.bank?.bank_id)}><CAvatar src={item?.bank?.imageUrl} /></Tooltip>
                                </td>

                            ),
                            balance: (item: any) => (
                                // (console.log(item))
                                <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                    <b style={{ color: `${item?.balance < 0 ? 'rgb(224, 6, 6)' : 'rgb(82, 196, 26)'}` }}>{Intl.NumberFormat().format(item?.balance)}.-</b>
                                </td>
                            ),
                            limit_Left: (item: any) => (
                                <td className="" style={{ textTransform: "uppercase", fontWeight: "700", background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                    <b
                                        style={{
                                            color:
                                                item?.limit_Left >= 1000000
                                                    ? "rgb(82, 196, 26)" // สีเขียว
                                                    : item?.limit_Left >= 100000
                                                        ? "rgb(24, 144, 255)" // สีฟ้า
                                                        : item?.limit_Left >= 10000
                                                            ? "#673ab7" // สีเหลือง (ปรับเป็นสีเหลืองที่คุณต้องการ)
                                                            : item?.limit_Left >= 0
                                                                ? "rgb(224, 6, 6)" // สีแดง
                                                                : "black", // สีเริ่มต้น (หรือสีที่คุณต้องการ)
                                        }}
                                    >
                                        {Intl.NumberFormat().format(item?.limit_Left)}.-
                                    </b>
                                </td>
                            ),

                            accountName: (item: any) => (
                                <td className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, fontWeight: item?.status_bank == "Vault" ? '700' : '' }} onClick={() => handleCopy(item?.accountName)}>
                                    {item?.accountName}
                                </td>
                            ),
                            accountNumber: (item: any) => (
                                <td className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, fontWeight: item?.status_bank == "Vault" ? '700' : '' }} onClick={() => handleCopy(item?.accountNumber)}>
                                    {formatAccnumID(item?.accountNumber)}
                                </td>
                            ),
                            updatedAt: (item: any) => {
                                const date = new Date(item?.updatedAt)
                                const options: any = {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                                return (
                                    <td>{date.toLocaleDateString('th-TH', options)}</td>
                                )
                            },
                            status: (item: any) => (
                                <td style={{ textTransform: "capitalize", fontWeight: "500", cursor: item?.status_bank == "Banned" ? "pointer" : "default", background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                    <Tag color={getBadgeTags(item?.status_bank)}>
                                        <ToolOutlined />   {t(item?.status_bank == "Vault" ? "Maintain" : item?.status_bank)}
                                    </Tag>
                                </td>
                            ),

                            note: (item: any) => (
                                <td style={{ textTransform: "uppercase", cursor: "copy" }}>
                                    {!item?.note ? <em style={{ color: "#88888880" }}>{t("No data")}</em> : item?.note == "Captcha" ? "ยืนยันตัวตน หรือ แคปช่า" : item?.note == "Face_Scan" ? "ติดสแกนหน้า" : <span style={{ color: "red" }}>{item?.note}</span>}
                                </td>
                            ),
                            action: (item: any) => {
                                return (
                                    <>
                                        <td className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                            <div className="d-grid gap-2 d-flex justify-content-md-center">
                                                {roles ? <>
                                                    {item?.status_bank != "Banned" ? <Button
                                                        color={item?.status_bank === "Banned" ? "danger" : details.includes(item?.id) ? "danger" : "primary"}
                                                        disabled={item?.status_bank === "Banned" ? true : false}
                                                        onClick={() => {
                                                            toggleDetails(item?.id, item?.status_bank)
                                                        }}
                                                    >
                                                        {details.includes(item?.id) ?
                                                            <span>
                                                                <CloseOutlined style={{ display: "inline-grid" }} /> {t('Hide ')}
                                                            </span> :
                                                            <span>
                                                                <SettingOutlined style={{ display: "inline-grid" }} /> {t('Option')}
                                                            </span>}
                                                    </Button> :
                                                        <span style={{ color: "#cd201f", background: "#ffffff", padding: "4px", borderRadius: "8px" }}>{!removeBackslashes(item?.logs_banks.length < 0 ? [] : item?.logs_banks[0]?.response_headers) ? null : removeBackslashes(item?.logs_banks[0]?.response_headers)}</span>}

                                                </> : <>
                                                    <Button ghost disabled>
                                                        {t('Option')}
                                                    </Button>
                                                </>}
                                            </div>
                                        </td>
                                    </>
                                )
                            },

                            details: (item) => {
                                // (console.log(item))
                                return (
                                    <>

                                        <CCollapse visible={details.includes(item?.id)}>
                                            <CCardBody className="p-3" style={{ background: "rgb(242 243 243)", borderBottom: "7px solid rgb(255 255 255)" }}>
                                                <Divider orientation="left" className='mt-0'>{t("Option Menu")}</Divider>
                                                <p className='text-left d-flex justify-content-start' style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                                    <b><ClockCircleOutlined style={{ fontSize: "15px", display: "inline-flex" }} /> ใช้งานมาแล้ว : {calculateAccountUsage(item)} วัน</b>
                                                    <b className={`mt-1`}><FieldTimeOutlined style={{ fontSize: "18px", display: "inline-flex" }} /> เหลือเวลาใช้งาน : <span className={`${calculateAccountRemainingDays(item) < 10 ? 'text-danger' : ''}`}>{item?.accountName == "PayoneX" ? 'Forever' : calculateAccountRemainingDays(item) + ' วัน '}</span></b>
                                                    <p></p>
                                                    <b> อัพเดตล่าสุด : <Tooltip title={moment(item?.updated_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.updated_at)}</Tooltip></b>
                                                </p>
                                                <p className="text-body-secondary"></p>
                                                <div className="d-grid gap-1 d-flex justify-content-md-start">

                                                    {roles && <>
                                                        <Button disabled={false} color="cyan" variant="solid" style={{ fontWeight: "700" }} onClick={(e) => handleModel(e, item)}>
                                                            <ExclamationCircleOutlined />   {t("Details")}
                                                        </Button>
                                                    </>}
                                                    {roles2 && <>
                                                        <Button id={"update_status_bank"} className='' disabled={false} onClick={(e) => getUpdateBankAccount(e, item)} style={{ fontWeight: "700" }}>
                                                            {t("อัพเดทสถานะบัญชี")}
                                                        </Button>
                                                    </>}
                                                    {roles2 && <>
                                                        <Button
                                                            color="danger" variant="solid"
                                                            id='Delete'
                                                            className={`ms-1 me-3`}
                                                            style={{ fontWeight: "700" }}
                                                            onClick={(e) => {
                                                                getUpdateBankAccount(e, item)
                                                            }}
                                                        >
                                                            <DeleteOutlined />   {t("deactivate")}
                                                        </Button>
                                                    </>}
                                                    <p className="ms-1 me-3" ></p>

                                                </div>
                                                <p className='text-center'></p>
                                                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                                                    <p>{t("version")}: {config?.version}</p>
                                                </CModalFooter>
                                            </CCardBody>
                                        </CCollapse>
                                    </>
                                )
                            },
                        }}
                        tableBodyProps={{
                            className: 'align-middle  font-400',
                        }}
                        tableProps={{
                            className: 'add-this-class  aninationleft',
                            responsive: true,
                            striped: true,
                            hover: false,
                            bordered: true,
                            borderless: false,
                        }}
                        sorterValue={{ column: 'accountType', state: 'asc' }}
                    />,
                },
                {
                    key: '55',
                    label: `Face Scan Account ( ${length_Face_Scan} )`,
                    children: <CSmartTable
                        columns={columnsRepair}
                        // loading={data?.loadding}
                        footer={false}
                        items={faceScanAccBanks ?? []}
                        itemsPerPageSelect
                        tableFilter
                        itemsPerPage={50}
                        activePage={currentPage}
                        onActivePageChange={(page) => {
                            setCurrentPage(page)
                        }}
                        pagination
                        onFilteredItemsChange={(items) => {
                            // ค้นหา
                            //console.log(items)
                        }}
                        onSelectedItemsChange={(items) => {
                            //console.log(items)
                        }}
                        scopedColumns={{
                            avatar: (item: any) => (
                                // (console.log(item))
                                <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                    <Tooltip title={t(item?.bank?.bank_id)}><CAvatar src={item?.bank?.imageUrl} /></Tooltip>
                                </td>
                            ),
                            balance: (item: any) => (
                                // (console.log(item))
                                <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                    <b style={{ color: `${item?.balance < 0 ? 'rgb(224, 6, 6)' : 'rgb(82, 196, 26)'}` }}>{Intl.NumberFormat().format(item?.balance)}.-</b>
                                </td>
                            ),
                            limit_Left: (item: any) => (
                                <td className="" style={{ textTransform: "uppercase", fontWeight: "700", background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                    <b
                                        style={{
                                            color:
                                                item?.limit_Left >= 1000000
                                                    ? "rgb(82, 196, 26)" // สีเขียว
                                                    : item?.limit_Left >= 100000
                                                        ? "rgb(24, 144, 255)" // สีฟ้า
                                                        : item?.limit_Left >= 10000
                                                            ? "#673ab7" // สีเหลือง (ปรับเป็นสีเหลืองที่คุณต้องการ)
                                                            : item?.limit_Left >= 0
                                                                ? "rgb(224, 6, 6)" // สีแดง
                                                                : "black", // สีเริ่มต้น (หรือสีที่คุณต้องการ)
                                        }}
                                    >
                                        {Intl.NumberFormat().format(item?.limit_Left)}.-
                                    </b>
                                </td>
                            ),

                            accountName: (item: any) => (
                                <td className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, fontWeight: item?.status_bank == "Vault" ? '700' : '' }} onClick={() => handleCopy(item?.accountName)}>
                                    {item?.accountName}
                                </td>
                            ),
                            accountNumber: (item: any) => (
                                <td className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, fontWeight: item?.status_bank == "Vault" ? '700' : '' }} onClick={() => handleCopy(item?.accountNumber)}>
                                    {formatAccnumID(item?.accountNumber)}
                                </td>
                            ),
                            updatedAt: (item: any) => {
                                const date = new Date(item?.updatedAt)
                                const options: any = {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                                return (
                                    <td>{date.toLocaleDateString('th-TH', options)}</td>
                                )
                            },

                            status: (item: any) => (
                                <td style={{ textTransform: "capitalize", fontWeight: "500", cursor: item?.status_bank == "Banned" ? "pointer" : "default", background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                    <Tag color={getBadgeTags(item?.status_bank)}>
                                        <ToolOutlined />   {t(item?.status_bank == "Vault" ? "Maintain" : item?.status_bank)}
                                    </Tag>
                                </td>
                            ),

                            note: (item: any) => (
                                <td style={{ textTransform: "uppercase", cursor: "copy" }}>
                                    {!item?.note ? <em style={{ color: "#88888880" }}>{t("No data")}</em> : item?.note == "Captcha" ? "ยืนยันตัวตน หรือ แคปช่า" : item?.note == "Face_Scan" ? "ติดสแกนหน้า" : <span style={{ color: "red" }}>{item?.note}</span>}
                                </td>
                            ),
                            action: (item: any) => {
                                return (
                                    <>
                                        <td className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                            <div className="d-grid gap-2 d-flex justify-content-md-center">
                                                {roles ? <>
                                                    {item?.status_bank != "Banned" ? <Button
                                                        color={item?.status_bank === "Banned" ? "danger" : details.includes(item?.id) ? "danger" : "primary"}

                                                        disabled={item?.status_bank === "Banned" ? true : false}

                                                        onClick={() => {
                                                            toggleDetails(item?.id, item?.status_bank)
                                                        }}
                                                    >
                                                        {details.includes(item?.id) ?
                                                            <span>
                                                                <CloseOutlined style={{ display: "inline-grid" }} /> {t('Hide ')}
                                                            </span> :
                                                            <span>
                                                                <SettingOutlined style={{ display: "inline-grid" }} /> {t('Option')}
                                                            </span>}
                                                    </Button> :
                                                        <span style={{ color: "#cd201f", background: "#ffffff", padding: "4px", borderRadius: "8px" }}>{!removeBackslashes(item?.logs_banks.length < 0 ? [] : item?.logs_banks[0]?.response_headers) ? null : removeBackslashes(item?.logs_banks[0]?.response_headers)}</span>}
                                                </> : <>
                                                    <Button ghost disabled>
                                                        {t('Option')}
                                                    </Button>

                                                </>}
                                            </div>
                                        </td>
                                    </>
                                )
                            },
                            active: (item: any) => {
                                return (
                                    <>
                                        <td className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                            {roles ? <>
                                                <Switch
                                                    id={`amt`}
                                                    loading={item?.id === switchLoadding}
                                                    defaultChecked={item?.run_from == "amt" ? true : false}
                                                    checkedChildren={<CheckOutlined style={{ display: "inline-flex", alignItems: "center" }} />}
                                                    unCheckedChildren={<CloseOutlined style={{ display: "inline-flex", alignItems: "center" }} />}
                                                    onChange={(e: any) => handleOnChangTypeBank(e, item)}
                                                />

                                            </> : <>
                                                <Switch disabled id={item?.id} loading={item?.id === switchLoadding} defaultChecked={item?.status_bank == "Active" ? true : false} />
                                            </>}
                                        </td>
                                    </>
                                )
                            },
                            details: (item) => {
                                // (console.log(item))
                                return (
                                    <>

                                        <CCollapse visible={details.includes(item?.id)}>
                                            <CCardBody className="p-3" style={{ background: "rgb(242 243 243)", borderBottom: "7px solid rgb(255 255 255)" }}>
                                                <Divider orientation="left" className='mt-0'>{t("Option Menu")}</Divider>
                                                <p className='text-left d-flex justify-content-start' style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                                    <b><ClockCircleOutlined style={{ fontSize: "15px", display: "inline-flex" }} /> ใช้งานมาแล้ว : {calculateAccountUsage(item)} วัน</b>
                                                    <b className={`mt-1`}><FieldTimeOutlined style={{ fontSize: "18px", display: "inline-flex" }} /> เหลือเวลาใช้งาน : <span className={`${calculateAccountRemainingDays(item) < 10 ? 'text-danger' : ''}`}>{item?.accountName == "PayoneX" ? 'Forever' : calculateAccountRemainingDays(item) + ' วัน '}</span></b>
                                                    <p></p>
                                                    <b> อัพเดตล่าสุด : <Tooltip title={moment(item?.updated_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.updated_at)}</Tooltip></b>
                                                </p>
                                                <p className="text-body-secondary"></p>
                                                <div className="d-grid gap-1 d-flex justify-content-md-start">

                                                    {roles && <>
                                                        <Button disabled={false} color="cyan" variant="solid" style={{ fontWeight: "700" }} onClick={(e) => handleModel(e, item)}>
                                                            <ExclamationCircleOutlined />   {t("Details")}
                                                        </Button>
                                                    </>}
                                                    {roles2 && <>
                                                        <CButton id={"update_status_bank"} className='' disabled={false} onClick={(e) => getUpdateBankAccount(e, item)} size="sm" color="info" style={{ color: "#fff", fontWeight: "700" }}>
                                                            {t("อัพเดทสถานะบัญชี")}
                                                        </CButton>
                                                    </>}
                                                    {roles2 && <>
                                                        <Button
                                                            color="danger" variant="solid"
                                                            id='Delete'
                                                            className={`ms-1 me-3`}
                                                            style={{ color: "#fff", fontWeight: "700" }}
                                                            onClick={(e) => {
                                                                getUpdateBankAccount(e, item)
                                                            }}
                                                        >
                                                            <DeleteOutlined />   {t("deactivate")}
                                                        </Button>
                                                    </>}
                                                    <p className="ms-1 me-3" ></p>
                                                </div>
                                                <p className='text-center'></p>
                                                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                                                    <p>{t("version")}: {config?.version}</p>
                                                </CModalFooter>
                                            </CCardBody>
                                        </CCollapse>
                                    </>
                                )
                            },
                        }}
                        tableBodyProps={{
                            className: 'align-middle  font-400',
                        }}
                        tableProps={{
                            className: 'add-this-class  aninationleft',
                            responsive: true,
                            striped: true,
                            hover: false,
                            bordered: true,
                            borderless: false,
                        }}
                        sorterValue={{ column: 'accountType', state: 'asc' }}
                    />,
                },
            ];
            return <>
                <Tabs
                    // tabBarExtraContent={operations}
                    onChange={onChange}
                    defaultActiveKey={`1`}
                    size={"middle"}
                    items={[
                        // Tab 1 เพิ่มบัญชีธนาคาร
                        {
                            label: !showConfig ? `${t("Current Account")} ( ${data?.loadding ? 0 : activeAccBanks?.length} ${t("items")} )` : ``,
                            disabled: false,
                            key: '1',
                            children: (
                                <>
                                    <Card
                                        style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                                        // styles={{ header: { display: "none" } }}
                                        extra={operations}
                                        // loading={data?.loadding}

                                        title={<span className='title-card'>
                                            {"บัญชีธนาคารที่ใช้งาน"}
                                        </span>}
                                        children={<>
                                            {showConfig && <>
                                                <Skeleton loading={data?.loadding} children={mainSelectBank(activeAccBanks)} />
                                            </>}
                                            {!showConfig && <CRow className={`${!showConfig && "aninationleft"}`}>
                                                <CSmartTable
                                                    columns={columns}
                                                    loading={data?.loadding}
                                                    footer={false}
                                                    items={activeAccBanks ?? []}
                                                    itemsPerPageSelect
                                                    tableFilter
                                                    itemsPerPage={50}
                                                    activePage={currentPage}
                                                    onActivePageChange={(page) => {
                                                        setCurrentPage(page)
                                                    }}
                                                    pagination
                                                    onFilteredItemsChange={(items) => {
                                                        // ค้นหา
                                                        //console.log(items)
                                                    }}
                                                    onSelectedItemsChange={(items) => {
                                                        //console.log(items)
                                                    }}
                                                    scopedColumns={{
                                                        avatar: (item: any) => (
                                                            // (console.log(item))

                                                            <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                <Tooltip title={t(item?.bank?.bank_id)}><CAvatar src={item?.bank?.imageUrl} /></Tooltip>
                                                            </td>

                                                        ),
                                                        balance: (item: any) => (
                                                            // (console.log(item))
                                                            <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                <b style={{ color: `${item?.balance < 0 ? 'rgb(224, 6, 6)' : 'rgb(82, 196, 26)'}` }}>{Intl.NumberFormat().format(item?.balance)}.-</b>
                                                            </td>
                                                        ),
                                                        limit_Left: (item: any) => (
                                                            <td className="" style={{ textTransform: "uppercase", fontWeight: "700", background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                <b
                                                                    style={{
                                                                        color:
                                                                            item?.limit_Left >= 1000000
                                                                                ? "rgb(82, 196, 26)" // สีเขียว
                                                                                : item?.limit_Left >= 100000
                                                                                    ? "rgb(24, 144, 255)" // สีฟ้า
                                                                                    : item?.limit_Left >= 10000
                                                                                        ? "#673ab7" // สีเหลือง (ปรับเป็นสีเหลืองที่คุณต้องการ)
                                                                                        : item?.limit_Left >= 0
                                                                                            ? "rgb(224, 6, 6)" // สีแดง
                                                                                            : "black", // สีเริ่มต้น (หรือสีที่คุณต้องการ)
                                                                    }}
                                                                >
                                                                    {Intl.NumberFormat().format(item?.limit_Left)}.-
                                                                </b>

                                                            </td>
                                                        ),

                                                        accountName: (item: any) => (
                                                            <td className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, color: item?.status_bank == "Banned" ? '#cd201f' : item?.status_bank == "Vault" ? 'rgb(103, 58, 183)' : '', fontWeight: item?.status_bank == "Vault" ? '700' : '' }} onClick={() => handleCopy(item?.accountName)}>
                                                                {item?.accountName}
                                                            </td>
                                                        ),
                                                        accountNumber: (item: any) => (
                                                            <td className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, color: item?.status_bank == "Banned" ? '#cd201f' : item?.status_bank == "Vault" ? 'rgb(103, 58, 183)' : '', fontWeight: item?.status_bank == "Vault" ? '700' : '' }} onClick={() => handleCopy(item?.accountNumber)}>
                                                                {formatAccnumID(item?.accountNumber)}
                                                            </td>
                                                        ),
                                                        updatedAt: (item: any) => {
                                                            const date = new Date(item?.updatedAt)
                                                            const options: any = {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            }
                                                            return (
                                                                <td>{date.toLocaleDateString('th-TH', options)}</td>
                                                            )
                                                        },
                                                        status: (item: any) => (
                                                            <td style={{ textTransform: "uppercase", fontWeight: "500", cursor: item?.status_bank == "Banned" ? "pointer" : "default", background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                                                <Tag color={getBadgeTags(item?.status_bank == "Pending" ? 'Support' : item?.status_bank)}>
                                                                    {getIconsView(item?.status_bank)}   <Tooltip title={item?.status_bank == "Pending" ? `จะทำงานเมื่อรายการถอน มากกว่า 5 รายการ` : t(item?.status_bank)}> {t(item?.status_bank)}</Tooltip>
                                                                </Tag>
                                                            </td>
                                                        ),
                                                        accountType: (item: any) => (
                                                            <td style={{ textTransform: "capitalize", background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                <Tag color={getBadge(item?.accountType)}><b>{t(item?.accountType == "verifying_account" ? 'Verify' : item?.accountType)}</b></Tag>
                                                            </td>
                                                        ),
                                                        telephoneNumber: (item: any) => (
                                                            <td style={{ textTransform: "uppercase", cursor: "help" }} onClick={() => handleCall(item?.telephoneNumber)}>
                                                                {item?.telephoneNumber == "" ? <em style={{ color: "#88888880" }}>{t("No data")}</em> : item?.telephoneNumber}
                                                            </td>
                                                        ),
                                                        action: (item: any) => {
                                                            return (
                                                                <>
                                                                    <Badge.Ribbon text="Verify" className='run_from' style={{ display: `${item?.run_from == "amt" ? '' : 'none'}`, insetInlineEnd: "0px", borderEndEndRadius: "0px", transform: `rotate(0deg)`, top: "3px", padding: "4px 5px" }}>
                                                                        <td className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                            <div className="d-grid gap-2 d-flex justify-content-md-center">
                                                                                {roles ? <>
                                                                                    {item?.status_bank != "Banned" ? <Button
                                                                                        color={item?.status_bank === "Banned" ? "danger" : details.includes(item?.id) ? "danger" : "primary"}
                                                                                        disabled={item?.status_bank === "Banned" ? true : false}
                                                                                        onClick={() => {
                                                                                            toggleDetails(item?.id, item?.status_bank)
                                                                                        }}
                                                                                    >
                                                                                        {details.includes(item?.id) ? <span><CloseOutlined style={{ display: "inline-grid" }} /> {t('Hide ')}</span> : <span><SettingOutlined style={{ display: "inline-grid" }} /> {t('Option')}</span>}
                                                                                    </Button> : <span style={{ color: "#cd201f", background: "#ffffff", padding: "4px", borderRadius: "8px" }}>{!removeBackslashes(item?.logs_banks.length < 0 ? [] : item?.logs_banks[0]?.response_headers) ? null : removeBackslashes(item?.logs_banks[0]?.response_headers)}</span>}

                                                                                </> : <>
                                                                                    <Button ghost disabled>
                                                                                        {t('Option')}
                                                                                    </Button>
                                                                                </>}
                                                                            </div>
                                                                        </td>
                                                                    </Badge.Ribbon>

                                                                </>
                                                            )
                                                        },
                                                        active: (item: any) => {

                                                            return (
                                                                <>
                                                                    <td className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                                                        {roles ? <>
                                                                            {item?.status_bank == "Banned" ?
                                                                                <>
                                                                                    {/* Banned */}
                                                                                    <code style={{ color: "#cd201f", background: "#ffffff", padding: "4px", borderRadius: "8px" }}>{`{"${item?.bank?.bank_id}_code":${processPollingStatus(item?.logs_banks?.length < 0 ? [] : item?.logs_banks[0])}}`}</code>
                                                                                </>
                                                                                : item?.status_bank == "Vault" ? <>
                                                                                    {/* Vault */}
                                                                                    <b style={{ color: "rgb(103, 58, 183)", width: "10px" }}><ToolOutlined /> {"Maintenance"}</b>
                                                                                </> : item?.status_bank == "Delete" ? <><b style={{ color: "red", width: "10px" }}>{"บช นี้ถูกลบแล้ว"}</b></> :
                                                                                    <Switch
                                                                                        disabled={false}
                                                                                        checkedChildren={<CheckOutlined style={{ display: "inline-flex", alignItems: "center" }} />}
                                                                                        unCheckedChildren={<CloseOutlined style={{ display: "inline-flex", alignItems: "center" }} />}
                                                                                        id={item?.id}
                                                                                        loading={item?.id === switchLoadding}
                                                                                        onChange={(e: any) => handleOnClickStatusBank(e, item)}
                                                                                        checked={getChecked(item?.status_bank)}
                                                                                    />}

                                                                        </> : <>
                                                                            <Switch disabled id={item?.id} loading={item?.id === switchLoadding} checked={getChecked(item?.status_bank)} />
                                                                        </>}
                                                                    </td>
                                                                </>
                                                            )
                                                        },
                                                        details: (item) => {
                                                            // (console.log(item))
                                                            return (
                                                                <>
                                                                    <CCollapse visible={details.includes(item?.id)}>
                                                                        <CCardBody className="p-3" style={{ background: "rgb(242 243 243)", borderBottom: "7px solid rgb(255 255 255)" }}>

                                                                            <Divider orientation="left" className='mt-0'>{t("Option Menu")}</Divider>
                                                                            <Flex gap="small" justify='flex-end' align='end' wrap>
                                                                                <div className='d-flex justify-flex-end'>
                                                                                    <div className="container">
                                                                                        <p className='d-flex me-3' style={{ justifyContent: "flex-start", fontWeight: "700" }}>{t("Extra Menu")}</p>

                                                                                        <Button type="primary" ghost className={`${item?.status_bank == "Vault" && 'd-none'} me-2`} disabled={false} onClick={(e) => get_balance_summerys(item)} style={{ fontWeight: "700" }}>
                                                                                            <DollarOutlined />  {t("Check balance credit limit")}
                                                                                        </Button>
                                                                                        {/* {item?.bank?.bank_id == "ktb" ? <Button loading={loadings} disabled={loadings} onClick={() => getCheckedRoleAdmin(data?.dataAdmin?.name, item)} type="primary" icon={<DownloadOutlined className='me-1' />} size={size}>
                                                                                            {loadings ? " Loading..." : "โอนเงินเข้าบัญชี"}
                                                                                        </Button> : null} */}
                                                                                        {getCheckedBankButton(item)}
                                                                                    </div>
                                                                                </div>
                                                                            </Flex>

                                                                            <p className='text-left d-flex justify-content-start' style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                                                                <b><ClockCircleOutlined style={{ fontSize: "15px", display: "inline-flex" }} /> ใช้งานมาแล้ว : {calculateAccountUsage(item)} วัน</b>
                                                                                <b className={`mt-1`}><FieldTimeOutlined style={{ fontSize: "18px", display: "inline-flex" }} /> เหลือเวลาใช้งาน : <span className={`${calculateAccountRemainingDays(item) < 10 ? 'text-danger' : ''}`}>{item?.accountName == "PayoneX" ? 'Forever' : calculateAccountRemainingDays(item) + ' วัน '}</span></b>
                                                                                <p></p>
                                                                                <b> อัพเดตล่าสุด : <Tooltip title={moment(item?.updated_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.updated_at)}</Tooltip></b>
                                                                            </p>
                                                                            <p className="text-body-secondary"></p>
                                                                            <Flex gap="small" wrap>
                                                                                <Flex justify='flex-start' className="d-grid gap-1 d-flex justify-content-md-start">
                                                                                    {roles && <>
                                                                                        <Button disabled={false} color="cyan" variant="solid" style={{ fontWeight: "700" }} onClick={(e) => handleModel(e, item)}>
                                                                                            <ExclamationCircleOutlined />   {t("Details")}
                                                                                        </Button>
                                                                                    </>}
                                                                                    {roles2 && <>
                                                                                        <Button id={"Repair"} disabled={false} onClick={(e) => getUpdateBankAccount(e, item)} color="purple" variant="solid" className={`ms-0 ${item?.status_bank == "Vault" && "d-none"}`} style={{ fontWeight: "700", color: "#fff" }}>
                                                                                            <ToolOutlined />  {t("Switch to Repair")}
                                                                                        </Button>
                                                                                        {item?.channel == "ktb-business" ? <Button id={"Support"} disabled={spinning} onClick={() => getUpdateStatus(item)} className={`ms-0 ${item?.status_bank == "Pending" && "d-none"}`} style={{ fontWeight: "700", color: "#fff", background: "#08979c", border: "none" }}>
                                                                                            <AndroidOutlined />  {t("Switch to Pending")}
                                                                                        </Button> : null}

                                                                                    </>}
                                                                                    {roles2 && <>
                                                                                        <Button
                                                                                            color="danger" variant="solid"
                                                                                            id='Delete'
                                                                                            className={`ms-1 me-3`}
                                                                                            style={{ fontWeight: "700" }}
                                                                                            onClick={(e) => {
                                                                                                getUpdateBankAccount(e, item)
                                                                                            }}
                                                                                        >
                                                                                            <DeleteOutlined />   {t("deactivate")}
                                                                                        </Button>
                                                                                    </>}
                                                                                    <p className="ms-1 me-3" ></p>
                                                                                    <Button id="deposit" variant="solid" ghost color={`green`} disabled={false} onClick={(e) => handleOnClickTypeBank(e, item)} className={`ms-0 me-1 ${item?.accountType == "deposit" && "d-none"} ${item?.status_bank == "Vault" && 'd-none'}`} style={{ fontWeight: "700", color: "#52c41a", background: "transparent", border: "1px solid #52c41a" }}>
                                                                                        <SwapOutlined />    {t("Switch to deposit account")}
                                                                                    </Button>
                                                                                    <Button id="withdrawal" type='primary' danger ghost disabled={false} onClick={(e) => handleOnClickTypeBank(e, item)} className={`ms-0 ${item?.accountType == "withdrawal" && "d-none"} ${item?.status_bank == "Vault" && 'd-none'}`} style={{ fontWeight: "700" }}>
                                                                                        <SwapOutlined />    {t("Switch to withdrawal account")}
                                                                                    </Button>
                                                                                    <Button id="verifying_account" color={`default`} variant="outlined" disabled={false} onClick={(e) => handleOnClickTypeBank(e, item)} className={`ms-0 ${item?.accountType == "verifying_account" && "d-none"} `} style={{ fontWeight: "700", background: "transparent", border: "1px solid rgb(79 79 103)", color: "rgb(79 79 103)" }}>
                                                                                        <SwapOutlined />    {t("Switch to verify account")}
                                                                                    </Button>
                                                                                </Flex>
                                                                            </Flex>
                                                                            <p className='text-center'></p>
                                                                            <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                                                                                <p>{t("version")}: {config?.version}</p>
                                                                            </CModalFooter>
                                                                        </CCardBody>
                                                                    </CCollapse>
                                                                </>
                                                            )
                                                        },
                                                    }}
                                                    tableBodyProps={{
                                                        className: 'align-middle  font-400',
                                                    }}
                                                    tableProps={{
                                                        className: 'add-this-class  aninationleft',
                                                        responsive: true,
                                                        striped: true,
                                                        hover: false,
                                                        bordered: true,
                                                        borderless: false,
                                                    }}
                                                    sorterValue={{ column: 'accountType', state: 'asc' }}
                                                />
                                            </CRow>}
                                        </>} variant="borderless" />
                                </>),
                        },
                        // Tab2 Verify Account
                        {
                            label: !showConfig ? `${t("Verify account")} ( ${data?.loadding ? 0 : verifyAccBanks?.length} ${t("items")} )` : ``,
                            disabled: false,
                            key: '2',
                            children: (
                                <>
                                    <Card
                                        style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                                        // styles={{ header: { display: "none" } }}
                                        extra={operations}
                                        // loading={data?.loadding}

                                        title={<span className='title-card'>
                                            Verify account
                                        </span>}
                                        children={<>

                                            <CRow className={`${!showConfig && "aninationleft-d-none"}`}>
                                                <CSmartTable
                                                    columns={columns3}
                                                    loading={data?.loadding}
                                                    footer={false}
                                                    items={verifyAccBanks ?? []}
                                                    itemsPerPageSelect
                                                    tableFilter
                                                    itemsPerPage={50}
                                                    activePage={currentPage}
                                                    onActivePageChange={(page) => {
                                                        setCurrentPage(page)

                                                    }}
                                                    pagination
                                                    onFilteredItemsChange={(items) => {
                                                        // ค้นหา
                                                        //console.log(items)
                                                    }}
                                                    onSelectedItemsChange={(items) => {
                                                        //console.log(items)
                                                    }}
                                                    scopedColumns={{
                                                        avatar: (item: any) => (
                                                            // (console.log(item))

                                                            <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                <Tooltip title={t(item?.bank?.bank_id)}><CAvatar src={item?.bank?.imageUrl} /></Tooltip>
                                                            </td>

                                                        ),
                                                        balance: (item: any) => (
                                                            // (console.log(item))
                                                            <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                <b style={{ color: `${item?.balance < 0 ? 'rgb(224, 6, 6)' : 'rgb(82, 196, 26)'}` }}>{Intl.NumberFormat().format(item?.balance)}.-</b>
                                                            </td>
                                                        ),
                                                        limit_Left: (item: any) => (
                                                            <td className="" style={{ textTransform: "uppercase", fontWeight: "700", background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                <b
                                                                    style={{
                                                                        color:
                                                                            item?.limit_Left >= 1000000
                                                                                ? "rgb(82, 196, 26)" // สีเขียว
                                                                                : item?.limit_Left >= 100000
                                                                                    ? "rgb(24, 144, 255)" // สีฟ้า
                                                                                    : item?.limit_Left >= 10000
                                                                                        ? "#673ab7" // สีเหลือง (ปรับเป็นสีเหลืองที่คุณต้องการ)
                                                                                        : item?.limit_Left >= 0
                                                                                            ? "rgb(224, 6, 6)" // สีแดง
                                                                                            : "black", // สีเริ่มต้น (หรือสีที่คุณต้องการ)
                                                                    }}
                                                                >
                                                                    {Intl.NumberFormat().format(item?.limit_Left)}.-
                                                                </b>
                                                            </td>
                                                        ),

                                                        accountName: (item: any) => (
                                                            <td className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, fontWeight: item?.status_bank == "Vault" ? '700' : '' }} onClick={() => handleCopy(item?.accountName)}>
                                                                {item?.accountName}
                                                            </td>
                                                        ),
                                                        accountNumber: (item: any) => (
                                                            <td className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, fontWeight: item?.status_bank == "Vault" ? '700' : '' }} onClick={() => handleCopy(item?.accountNumber)}>
                                                                {formatAccnumID(item?.accountNumber)}
                                                            </td>
                                                        ),
                                                        updatedAt: (item: any) => {
                                                            const date = new Date(item?.updatedAt)
                                                            const options: any = {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            }
                                                            return (
                                                                <td>{date.toLocaleDateString('th-TH', options)}</td>
                                                            )
                                                        },
                                                        status: (item: any) => (
                                                            <td style={{ textTransform: "capitalize", fontWeight: "500", cursor: item?.status_bank == "Banned" ? "pointer" : "default", background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                                                <Tag color={getBadgeTags(item?.run_from == "amt" ? "Identity" : "Inactive")}>
                                                                    {t(item?.run_from == "amt" ? "Identity" : "Inactive")}
                                                                </Tag>
                                                            </td>
                                                        ),
                                                        accountType: (item: any) => (
                                                            <td style={{ textTransform: "capitalize", background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                <Tag color={getBadge(item?.accountType)}>{t(item?.accountType == "verifying_account" ? "Verify" : item?.accountType)}</Tag>
                                                            </td>
                                                        ),
                                                        note: (item: any) => (
                                                            <td style={{ textTransform: "uppercase", cursor: "copy" }}>
                                                                {!item?.note ? <em style={{ color: "#88888880" }}>{t("No data")}</em> : item?.note == "Captcha" ? "ยืนยันตัวตน หรือ แคปช่า" : item?.note == "Face_Scan" ? "ติดสแกนหน้า" : <span style={{ color: "red" }}>{item?.note}</span>}
                                                            </td>
                                                        ),
                                                        action: (item: any) => {
                                                            return (
                                                                <>

                                                                    <td className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                        <div className="d-grid gap-2 d-flex justify-content-md-center">
                                                                            {roles ? <>
                                                                                {item?.status_bank != "Banned" ? <Button
                                                                                    color={item?.status_bank === "Banned" ? "danger" : details.includes(item?.id) ? "danger" : "primary"}
                                                                                    disabled={item?.status_bank === "Banned" ? true : false}
                                                                                    onClick={() => {
                                                                                        toggleDetails(item?.id, item?.status_bank)
                                                                                    }}
                                                                                >
                                                                                    {details.includes(item?.id) ?
                                                                                        <span>
                                                                                            <CloseOutlined style={{ display: "inline-grid" }} /> {t('Hide ')}
                                                                                        </span> :
                                                                                        <span>
                                                                                            <SettingOutlined style={{ display: "inline-grid" }} /> {t('Option')}
                                                                                        </span>}
                                                                                </Button> :
                                                                                    <span style={{ color: "#cd201f", background: "#ffffff", padding: "4px", borderRadius: "8px" }}>{!removeBackslashes(item?.logs_banks.length < 0 ? [] : item?.logs_banks[0]?.response_headers) ? null : removeBackslashes(item?.logs_banks[0]?.response_headers)}</span>}

                                                                            </> : <>
                                                                                <Button ghost disabled>
                                                                                    {t('Option')}
                                                                                </Button>
                                                                            </>}
                                                                        </div>
                                                                    </td>
                                                                </>
                                                            )
                                                        },
                                                        active: (item: any) => {
                                                            return (
                                                                <>
                                                                    <td className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                                                        {roles ? <>
                                                                            <Switch
                                                                                id={`amt`}
                                                                                loading={item?.id === switchLoadding}
                                                                                checkedChildren={<CheckOutlined style={{ display: "inline-flex", alignItems: "center" }} />}
                                                                                unCheckedChildren={<CloseOutlined style={{ display: "inline-flex", alignItems: "center" }} />}
                                                                                onChange={(e: any) => handleOnChangTypeBank(e, item)}
                                                                                checked={getChecked(item?.run_from == "amt" ? "Active" : "Inactive")}
                                                                            />
                                                                        </> : <>
                                                                            <Switch disabled id={item?.id} loading={item?.id === switchLoadding} checked={getChecked(item?.status_bank)} />
                                                                        </>}
                                                                    </td>
                                                                </>
                                                            )
                                                        },
                                                        details: (item) => {
                                                            // (console.log(item))
                                                            return (
                                                                <>
                                                                    <CCollapse visible={details.includes(item?.id)}>
                                                                        <CCardBody className="p-3" style={{ background: "rgb(242 243 243)", borderBottom: "7px solid rgb(255 255 255)" }}>
                                                                            <Divider orientation="left" className='mt-0'>{t("Option Menu")}</Divider>
                                                                            <p className='text-left d-flex justify-content-start' style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                                                                <b><ClockCircleOutlined style={{ fontSize: "15px", display: "inline-flex" }} /> ใช้งานมาแล้ว : {calculateAccountUsage(item)} วัน</b>
                                                                                <b className={`mt-1`}><FieldTimeOutlined style={{ fontSize: "18px", display: "inline-flex" }} /> เหลือเวลาใช้งาน : <span className={`${calculateAccountRemainingDays(item) < 10 ? 'text-danger' : ''}`}>{item?.accountName == "PayoneX" ? 'Forever' : calculateAccountRemainingDays(item) + ' วัน '}</span></b>
                                                                                <p></p>
                                                                                <b> อัพเดตล่าสุด : <Tooltip title={moment(item?.updated_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.updated_at)}</Tooltip></b>
                                                                            </p>
                                                                            <p className="text-body-secondary"></p>
                                                                            <div className="d-grid gap-1 d-flex justify-content-md-start">
                                                                                {roles && <>
                                                                                    <Button disabled={false} color="cyan" variant="solid" style={{ color: "#fff", fontWeight: "700" }} onClick={(e) => handleModel(e, item)}>
                                                                                        <ExclamationCircleOutlined />   {t("Details")}
                                                                                    </Button>
                                                                                </>}
                                                                                {roles2 && <>
                                                                                    <Button id={"update_status_bank"} color="purple" variant="solid" disabled={false} onClick={() => alert("Verify account ไม่สามารถอัพเดทสถานะบัญชีได้")} style={{ fontWeight: "700" }}>
                                                                                        {t("อัพเดทสถานะบัญชี")}
                                                                                    </Button>
                                                                                </>}
                                                                                {roles2 && <>
                                                                                    <Button
                                                                                        color="danger" variant="solid"
                                                                                        id='Delete'
                                                                                        className={`ms-1 me-3`}
                                                                                        style={{ color: "#fff", fontWeight: "700" }}
                                                                                        onClick={(e) => {
                                                                                            getUpdateBankAccount(e, item)
                                                                                        }}
                                                                                    >
                                                                                        <DeleteOutlined />   {t("deactivate")}
                                                                                    </Button>
                                                                                </>}

                                                                                <p className="ms-1 me-3" ></p>
                                                                            </div>
                                                                            <p className='text-center'></p>
                                                                            <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                                                                                <p>{t("version")}: {config?.version}</p>
                                                                            </CModalFooter>
                                                                        </CCardBody>
                                                                    </CCollapse>
                                                                </>
                                                            )
                                                        },
                                                    }}
                                                    tableBodyProps={{
                                                        className: 'align-middle  font-400',
                                                    }}
                                                    tableProps={{
                                                        className: 'add-this-class  aninationleft',
                                                        responsive: true,
                                                        striped: true,
                                                        hover: false,
                                                        bordered: true,
                                                        borderless: false,
                                                    }}
                                                    sorterValue={{ column: 'accountType', state: 'asc' }}
                                                />
                                            </CRow>

                                        </>} variant="borderless" />
                                </>),
                        },
                        // Tab3 Repair Account
                        {
                            label: !showConfig ? `${t("Repair account")} ( ${data?.loadding ? 0 : length_Repair} ${t("items")} )` : ``,
                            disabled: false,
                            key: '3',
                            children: (
                                <>
                                    <Card
                                        style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                                        // styles={{ header: { display: "none" } }}
                                        extra={operations}
                                        loading={data?.loadding}
                                        title={<span className='title-card'>
                                            Repair account
                                        </span>}
                                        children={<>
                                            <CRow className={`${!showConfig && "aninationleft-d-none"}`}>
                                                <Tabs defaultActiveKey="1" items={itemsVault} onChange={onChangeVault} />
                                            </CRow>
                                        </>} variant="borderless" />
                                </>),
                        },
                        // Tab3 บัญชียกเลิกใช้งาน
                        {
                            label: !showConfig ? `${t("Account suspended")} ( ${deactivatedAccBanks?.length} ${t("items")} )` : '',
                            key: '4',
                            children: (
                                <>
                                    <Card
                                        style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                                        extra={operations}
                                        // loading={data?.loadding}
                                        title={<></>}
                                        // styles={{ header: { display: "none" } }}
                                        children={<CRow className="aninationleft">
                                            <CSmartTable
                                                columns={columns2}
                                                loading={data?.loadding}
                                                footer={false}
                                                items={deactivatedAccBanks ?? []}
                                                itemsPerPageSelect
                                                tableFilter
                                                itemsPerPage={50}
                                                pagination
                                                onFilteredItemsChange={(items) => {
                                                    // ค้นหา
                                                    //console.log(items)
                                                }}
                                                onSelectedItemsChange={(items) => {
                                                    //console.log(items)
                                                }}
                                                scopedColumns={{
                                                    avatar: (item: any) => (
                                                        // (console.log(item))
                                                        <td style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                            <CAvatar src={item?.bank?.imageUrl} />
                                                        </td>
                                                    ),
                                                    balance: (item: any) => (
                                                        // (console.log(item))
                                                        <td onClick={(e) => handleModel(e, item)} style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                            <b style={{ color: `${item?.balance < 0 ? 'rgb(224, 6, 6)' : 'rgb(82, 196, 26)'}` }}>{Intl.NumberFormat().format(item?.balance)}.-</b>
                                                        </td>
                                                    ),
                                                    limit_Left: (item: any) => (
                                                        <td className="" onClick={(e) => handleModel(e, item)} style={{ textTransform: "uppercase", fontWeight: "700", background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                            <b
                                                                style={{
                                                                    color:
                                                                        item?.limit_Left >= 1000000
                                                                            ? "rgb(82, 196, 26)" // สีเขียว
                                                                            : item?.limit_Left >= 100000
                                                                                ? "rgb(24, 144, 255)" // สีฟ้า
                                                                                : item?.limit_Left >= 10000
                                                                                    ? "#673ab7" // สีเหลือง (ปรับเป็นสีเหลืองที่คุณต้องการ)
                                                                                    : item?.limit_Left >= 0
                                                                                        ? "rgb(224, 6, 6)" // สีแดง
                                                                                        : "black", // สีเริ่มต้น (หรือสีที่คุณต้องการ)
                                                                }}
                                                            >
                                                                {Intl.NumberFormat().format(item?.limit_Left)}.-
                                                            </b>
                                                        </td>
                                                    ),
                                                    accountName: (item: any) => (
                                                        <td onClick={(e) => handleModel(e, item)} className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, color: item?.status_bank == "Banned" ? '#cd201f' : item?.status_bank == "Vault" ? 'rgb(103, 58, 183)' : '', fontWeight: item?.status_bank == "Vault" ? '700' : '' }} >
                                                            {item?.accountName}
                                                        </td>
                                                    ),
                                                    accountNumber: (item: any) => (
                                                        <td onClick={(e) => handleModel(e, item)} className='text-truncate' style={{ cursor: item?.status_bank == "Banned" ? "pointer" : "copy", background: `${item?.status_bank === "Banned" && 'transparent'}`, color: item?.status_bank == "Banned" ? '#cd201f' : item?.status_bank == "Vault" ? 'rgb(103, 58, 183)' : '', fontWeight: item?.status_bank == "Vault" ? '700' : '' }} >
                                                            {formatAccnumID(item?.accountNumber)}
                                                        </td>
                                                    ),
                                                    created_at: (item: any) => (
                                                        <td onClick={(e) => handleModel(e, item)}>
                                                            <Tooltip title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                                                        </td>
                                                    ),
                                                    status: (item: any) => (
                                                        <td onClick={(e) => handleModel(e, item)} style={{ textTransform: "uppercase", fontWeight: "500", cursor: item?.status_bank == "Banned" ? "pointer" : "default", background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                                            <Tag color={getBadgeTags(item?.status_bank)}>
                                                                {getIconsView(item?.status_bank)}    {t(item?.status_bank)}
                                                            </Tag>
                                                        </td>
                                                    ),
                                                    accountType: (item: any) => (
                                                        <td onClick={(e) => handleModel(e, item)} style={{ textTransform: "capitalize", background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                            <Tag color={getBadge(item?.accountType)}>{t(item?.accountType)}</Tag>
                                                        </td>
                                                    ),
                                                    note: (item: any) => {
                                                        return (
                                                            <>
                                                                <td onClick={(e) => handleModel(e, item)} className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}`, cursor: item?.status_bank == "Banned" ? "pointer" : "default" }}>
                                                                    <div className="d-grid gap-2 d-flex justify-content-md-center">
                                                                        {item?.status_bank == "Delete" ? <span style={{ color: "#888", background: "#ffffff", padding: "4px", borderRadius: "8px" }}>{!item?.note ? <em style={{ color: "#88888880" }}>{t("No data")}</em> : item?.note}</span> :
                                                                            item?.status_bank == "Banned" ? <>
                                                                                {<span style={{ color: "#cd201f", background: "#ffffff", padding: "4px", borderRadius: "8px" }}>
                                                                                    {!removeBackslashes(item?.logs_banks[0]?.response_headers) ? "null" : removeBackslashes(item?.logs_banks[0]?.response_headers)}
                                                                                </span>}
                                                                            </> : null}
                                                                    </div>
                                                                </td>
                                                            </>
                                                        )
                                                    },
                                                    error_code: (item: any) => {
                                                        return (
                                                            <>
                                                                <td onClick={(e) => handleModel(e, item)} className="py-1" style={{ background: `${item?.status_bank === "Banned" && 'transparent'}` }}>
                                                                    <code style={{ color: "#cd201f", background: "#ffffff", padding: "4px", borderRadius: "8px" }}>{`{"${item?.bank?.bank_id}_code":${processPollingStatus(item?.logs_banks?.length < 0 ? [] : item?.logs_banks[0]) || null}}`}</code>
                                                                </td>
                                                            </>
                                                        )
                                                    },
                                                }}
                                                tableBodyProps={{
                                                    className: 'align-middle  font-400',
                                                }}
                                                tableProps={{
                                                    className: 'add-this-class  aninationleft',
                                                    responsive: true,
                                                    striped: false,
                                                    hover: true,
                                                    bordered: true,
                                                    borderless: false,
                                                }}
                                                sorterValue={{ column: 'created_at', state: 'desc' }}
                                            />
                                        </CRow>}
                                    />
                                </>),
                            disabled: false,
                        },
                    ]}
                />
            </>
        }
    }
    //console.log(bg_status_bank)
    function formatAccnumID(numberAcc: any) {
        //console.log(numberAcc)
        if (numberAcc?.length < 9) {
            return `xx ${numberAcc} `;
        }
        let length = numberAcc?.length;
        const middleFour = numberAcc?.slice(6, length);
        return `xx ${middleFour} `;
    }
    function hideLastName(fullName: any) {
        let formatName = removeTitle(fullName)
        const names = formatName.split(' ');
        if (names.length >= 2) {
            const firstName = names[0];
            const firstName2 = names[1];
            const lastName = names[2];
            return firstName == "" ? firstName2 + " " + '****' : firstName + " " + '****';
        } else {
            return formatName;
        }
    }
    function removeTitle(fullName: any) {
        //console.log(fullName?.slice(3))
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
    const handleCall = (phoneNumber: any) => {
        const phoneNumberRegex = /^\d{10}$/;
        if (phoneNumberRegex?.test(phoneNumber)) {
            window.location.href = `tel:+66${phoneNumber}`;
        } else {
            error('หมายเลขโทรศัพท์ไม่ถูกต้อง');
        }
    };
    function fillterDatamerchant(id: any, type: any) {
        // console.log(id, type)
        if (!id) {
            return t("No data")
        }
        if (type == 'member id') {
            const c: any = data?.stateMember?.data?.filter((user: any) => user.merchantId == id);
            console.log(c)
            return !c[0]?.userId ? t("No data") : t(c[0]?.userId);
        }
        const c: any = data?.stateMerchang?.data?.filter((user: any) => user.id == id);
        //console.log(admin)

        return !c[0]?.name ? t("No data") : t(c[0]?.name);
    }
    //console.log(selectedGroup)
    const [handleInputDepositGateway, setHandleInputDepositGateway]: any = useState<any>({
        deposit: "",
    })
    function onChangTypeDepositGateway(event: any) {
        setHandleInputDepositGateway({ ...handleInputDepositGateway, [event?.target?.name]: event?.target?.value })
        handleOnChangTypeDeposit_gateway({ ...handleInputDepositGateway, [event?.target?.name]: event?.target?.value })
    }
    function handleOnChangTypeDeposit_gateway(params: any) {
        data.setLoadding(true)
        let id = item?.bankGroup?.filter((group: any) => group?.isActive === true)
        //console.log(id)
        if (id?.length <= 0) {
            openNotification("error", "error")
            data.setLoadding(false)
            return
        }
        if (params) {
            let postData = {
                deposit: params.deposit,
                bankgrobid: id[0]?.id,
            }
            Apisetting.upBank_level_deposit(postData)
                .then((res) => {
                    if (res.data.success == true) {
                        setTimeout(() => {
                            data?.getBankAccount()
                            openNotification("success", `เปิดใช้งาน ${params?.deposit == 'Gateway' ? 'ฝาก gateway นอก' : 'ฝาก RTB เดิม'}`)
                            localStorage.setItem("bankgroup", JSON.stringify(postData))
                            data?.setLoadding(false)
                        }, 2500)
                    } else {
                        setTimeout(() => {
                            openNotification("error", `${res?.data?.message.msg}`)
                            data?.setLoadding(false)
                        }, 2500)
                    }
                }).catch((err) => {
                    openNotification("error", `${err.message}`)
                    data?.setLoadding(false)
                })
        } else {
            openNotification("error", `error`)
            data?.setLoadding(false)
        }
    }
    const [currentPage, setCurrentPage] = useState(1)
    const [dataTransferGateway, setDataTransferGateway] = useState(undefined)
    const handleShoeModel = (item: any) => {
        if (item) {
            setDataTransferGateway(item)
            setVisibleHistoryTransferGateway(true)
        }
    }

    return (
        <>
            {contextHolder}
            {contextHolder_Notify}
            {contextHolderQRcode}
            <Spin spinning={spinning} fullscreen />
            <ModalHistoryTransferGateway data={dataTransferGateway} t={t} handleCopy={handleCopy} setVisibleHistoryTransferGateway={setVisibleHistoryTransferGateway} visibleHistoryTransferGateway={visibleHistoryTransferGateway} />
            <Model_detailsLG loadding={data?.loadding} bankPlatform={data?.stateBankPlatform?.data} resetForm={resetForm} handleSelectChange={handleSelectChange} setIsOpen={setIsOpen} isOpen={isOpen} setHandleInput={setHandleInput} t={t} countTelePhone={countTelePhone} setVisibleLg={setVisibleXL} visibleLg={visibleLg} validated={validated} countAcc={countAcc} data={item} handleAddBankAccount={handleAddBankAccount} handleInput={handleInput} addAccount={addAccount} countNumber={countNumber} />
            {MainContainer(data.length < 0 ? [] : data)}
        </>
    );
}

export default Option_bank;