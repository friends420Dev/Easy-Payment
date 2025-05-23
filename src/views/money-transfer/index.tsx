import { UpdateBtn } from '../../components/updateBtn/updateBtn'
import { Tabs, Switch, message,Tag } from 'antd';
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
    CDateRangePicker,
} from '@coreui/react-pro'
import { CIcon } from '@coreui/icons-react';
import { cilPlus, cilMediaRecord, cilLayers } from '@coreui/icons';
import React, { useEffect, useRef, useContext, useReducer, useState } from 'react'
import moment from 'moment';
import 'moment/locale/th'
import { DataContext } from 'src/layout/DefaultLayout';
import { useTranslation } from 'react-i18next'
import { ModelDepositBankStatement } from '../model';
import config from 'src/config/app.config';
import type { TabsProps } from 'antd';
import { getToken } from "../../Token";
import { UploadOutlined, DownloadOutlined, QrcodeOutlined, UserSwitchOutlined, FilterOutlined } from '@ant-design/icons';
import { Space, Tooltip, Alert } from 'antd';
import { Button, QRCode, Card, Divider } from 'antd';
import type { QRCodeProps } from 'antd';

import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
type Props = {
    visible?: any
    setVisible?: any
    data?: any
    itemContext?: any
    config?: any
    t?: any
    moment?: any
    getBadge_bank?: any
}
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
export const ModalDetailsMoneyTransfer = ({ visible, setVisible, data, itemContext, config, t, moment, getBadge_bank }: Props) => {
    if (data == "" || !data) {
        return false
    }
    //console.log(data)
    const [state, setState]: any = useState(1);
    const isFromAccount = data?.FormAccount;
    const isToAccount = data?.TOAccount;
    const [messageApi, contextHolder]: any = message.useMessage();
    const onChange = (key: string) => {
        setState(key);
    };
    const success = (msg: any) => {
        messageApi.open({
            type: 'success',
            content: `${msg}`,
        });
    };
    const error = (msg: any) => {
        messageApi.open({
            type: 'error',
            content: `${msg}`,
        });
    };
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success('Copied Finished' + ": " + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
    function fillterDatamerchant(id: any, type: any) {
        if (!id) {
            return t("No data")
        }
        if (type == 'merchant') {
            const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
            //console.log(admin)
            return !c[0]?.name ? t("No data") : t(c[0]?.name);
        }
        const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
        //console.log(admin)
        return !c[0]?.name ? t("No data") : t(c[0]?.name);
    }
    function fillterGroup(id: any) {
        if (!id) {
            return t("No data")
        }
        const c: any = itemContext?.stateBankGrop?.data?.filter((user: any) => user.id == id);
        //
        if (c?.length == 1) {
            return c[0]?.name
        }
        return t("No data");
    }
    const jsonString: any = JSON.parse(data?.QrScanner);
    //console.log(jsonString)
    function doDownload(url: string, fileName: string) {
        const a = document.createElement('a');
        a.download = fileName;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    const downloadCanvasQRCode = () => {
        const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            doDownload(url, `qr_${moment().format("lll")}.png`);
        }
    };
    const downloadSvgQRCode = () => {
        const svg = document.getElementById('myqrcode')?.querySelector<SVGElement>('svg');
        const svgData = new XMLSerializer().serializeToString(svg!);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        doDownload(url, `qr_${moment().format("lll")}.svg`);
    };
    const [renderType, setRenderType] = React.useState<QRCodeProps['type']>('canvas');
    const items: TabsProps['items'] = [
        {
            key: `1`,
            icon: <UploadOutlined style={{ display: "inline-flex" }} />,
            label: t("Form Bank Account"),
            children: <><div className={`containprocess`} style={{ padding: "0 20px" }}>
                <div className='text-center h5 mb-3'>{t("Details Bank Account")}</div>
                <table align="center" className="accountofuser">
                    <tbody>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank Account")} :</td>
                            <td className="item-list" style={{ textTransform: "uppercase" }} onClick={() => handleCopy(t(getBadge_bank(isFromAccount?.bankId)))}> {t(getBadge_bank(isFromAccount?.bankId))}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.accountNumber)}>{isFromAccount?.accountNumber || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Name")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.accountName)}>{isFromAccount?.accountName || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Type")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.balance)}>{isFromAccount?.accountType || t("No data")}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Channel")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.channel)}>{isFromAccount?.channel || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Type Deposit")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.type_Deposit)}>{isFromAccount?.type_Deposit || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("isActive")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.isActive)}>{isFromAccount?.isActive == true ? "true" : "false"}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Status")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.status_bank)}>{isFromAccount?.status_bank || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank account group")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterGroup(isFromAccount?.bankAccountGroupId))}>{fillterGroup(isFromAccount?.bankAccountGroupId) || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Merchant")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDatamerchant(isFromAccount?.merchantId, "merchant"))}>{fillterDatamerchant(isFromAccount?.merchantId, "merchant")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("MerchantId")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.merchantId)}>{isFromAccount?.merchantId || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Balance")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.balance)}>{!isFromAccount?.balance ? t('No data') : Intl.NumberFormat().format(isFromAccount?.balance)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("limit Left")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.limit_Left)}>{!isFromAccount?.limit_Left ? t('No data') : Intl.NumberFormat().format(isFromAccount?.limit_Left)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Same bank withdrawal limit")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.sameBankLimit)}>{!isFromAccount?.sameBankLimit ? t('No data') : Intl.NumberFormat().format(isFromAccount?.sameBankLimit)}.-</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Other Bank Withdrawal Limit")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.otherBankLimit)}>{!isFromAccount?.otherBankLimit ? t('No data') : Intl.NumberFormat().format(isFromAccount?.otherBankLimit)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Telephone Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.telephoneNumber)}>{!isFromAccount?.telephoneNumber ? <span style={{ color: "#88888880" }}>{t("No data")}</span> : isFromAccount?.telephoneNumber}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Created At")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.created_at)}>{moment(isFromAccount?.created_at).format("YYYY/MM/DD HH:mm:ss")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Updated At")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isFromAccount?.updated_at)}>{moment(isFromAccount?.updated_at).format("YYYY/MM/DD HH:mm:ss")}</td>
                        </tr>

                    </tbody>
                </table>
            </div></>,
        },
        {
            key: `2`,
            icon: <DownloadOutlined style={{ display: "inline-flex" }} />,
            label: t("To Bank Account"),
            children: <><div className={`containprocess`} style={{ padding: "0 20px" }}>
                <div className='text-center h5 mb-3'>{t("Details Bank Account")}</div>
                <table align="center" className="accountofuser">
                    <tbody>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank Account")} :</td>
                            <td className="item-list" style={{ textTransform: "uppercase" }} onClick={() => handleCopy(t(getBadge_bank(isToAccount?.bankId)))}> {t(getBadge_bank(isToAccount?.bankId))}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.accountNumber)}>{isToAccount?.accountNumber || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Name")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.accountName)}>{isToAccount?.accountName || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Type")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.accountType)}>{isToAccount?.accountType || t("No data")}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Channel")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.channel)}>{isToAccount?.channel || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Type Deposit")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.type_Deposit)}>{isToAccount?.type_Deposit || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("isActive")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.isActive)}>{isToAccount?.isActive == true ? "true" : "false"}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Status")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.status_bank)}>{isToAccount?.status_bank || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank account group")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterGroup(isToAccount?.bankAccountGroupId))}>{fillterGroup(isToAccount?.bankAccountGroupId) || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Merchant")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDatamerchant(isToAccount?.merchantId, "merchant"))}>{fillterDatamerchant(isToAccount?.merchantId, "merchant")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("MerchantId")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.merchantId)}>{isToAccount?.merchantId || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Balance")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.balance)}>{!isToAccount?.balance ? t('No data') : Intl.NumberFormat().format(isToAccount?.balance)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("limit Left")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.limit_Left)}>{!isToAccount?.limit_Left ? t('No data') : Intl.NumberFormat().format(isToAccount?.limit_Left)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Same bank withdrawal limit")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.sameBankLimit)}>{!isToAccount?.sameBankLimit ? t('No data') : Intl.NumberFormat().format(isToAccount?.sameBankLimit)}.-</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Other Bank Withdrawal Limit")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.otherBankLimit)}>{!isToAccount?.otherBankLimit ? t('No data') : Intl.NumberFormat().format(isToAccount?.otherBankLimit)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Telephone Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.telephoneNumber)}>{!isToAccount?.telephoneNumber ? <span style={{ color: "#88888880" }}>{t("No data")}</span> : isToAccount?.telephoneNumber}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Created At")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.created_at)}>{moment(isToAccount?.created_at).format("YYYY/MM/DD HH:mm:ss")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Updated At")} :</td>
                            <td className="item-list" onClick={() => handleCopy(isToAccount?.updated_at)}>{moment(isToAccount?.updated_at).format("YYYY/MM/DD HH:mm:ss")}</td>
                        </tr>

                    </tbody>
                </table>
            </div></>,
        },
        {
            key: '3',
            label: `${t("QRcode")}`,
            icon: <QrcodeOutlined style={{ display: "inline-flex" }} />,
            children: <>
                <div className='container' >
                    <p className='text-truncate' style={{ cursor: "copy" }} onClick={() => handleCopy(jsonString?.data?.transactionId)}><b>{"Transaction Id : "}</b> {jsonString?.data?.transactionId || t("No data")}</p>
                    <p className='text-truncate' style={{ cursor: "copy" }} onClick={() => handleCopy(jsonString?.data?.additionalMetaData?.paymentInfo[0]?.QRstring)}><b>{"QrString : "}</b> {jsonString?.data?.additionalMetaData?.paymentInfo[0]?.QRstring || t("No data")}</p>
                    <Space id="myqrcode" direction="vertical">
                        <p></p>
                        {jsonString?.data?.additionalMetaData?.paymentInfo?.length > 0 && <>
                            <QRCode
                                type={renderType}
                                value={jsonString?.data?.additionalMetaData?.paymentInfo[0]?.QRstring}
                                bgColor="#fff"
                                style={{ marginBottom: 16 }}
                            />
                            <Button
                                type="primary"
                                onClick={renderType === 'canvas' ? downloadCanvasQRCode : downloadSvgQRCode}
                            >
                                Download
                            </Button>
                            <br />
                        </>}
                    </Space>
                    {jsonString?.data?.additionalMetaData?.paymentInfo?.length > 0 && <>
                        <Alert message="Notes : ผู้รับเงินสามารถสแกนคิวอาร์โค้ดนี้เพื่อตรวจสอบสถานะการโอนเงิน" type="warning" showIcon />
                    </>}
                </div>
            </>,
        },


    ];
    return (
        <>
            {contextHolder}
            <CModal
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                size='lg'
                aria-labelledby="StaticBackdropExampleLabel"
            >
                <CModalHeader>
                    <CModalTitle>{t("Details")}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol sm={12}>
                            {/* <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div> */}
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                onChange={onChange}
                                centered={true}
                                animated={{ inkBar: true, tabPane: true }}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                    <p>{t("version")}: {config?.version}</p>
                </CModalFooter>
            </CModal>
        </>
    )
}
const MoneyTransfer = () => {
    const [messageApi, contextHolder]: any = message.useMessage();
    const [visible, setVisible] = useState<boolean>(false)
    const { t } = useTranslation("");
    const [activePage, setActivePage]: any = useState(1)
    const [startDate, setStartDate]: any = useState("")
    const [endDate, setEndDate]: any = useState("")
    const [columnFilter, setColumnFilter]: any = useState({})
    const [columnSorter, setColumnSorter]: any = useState()
    const [itemsPerPage, setItemsPerPage]: any = useState(10)
    const [records, setRecords]: any = useState(0)
    const [recordsToday, setRecordsToday]: any = useState(0)
    const [isDataItem, setIsDataItem]: any = useState([])
    const [isDataItemToday, setIsDataItemToday]: any = useState([])
    const success = (msg: any) => {
        messageApi.open({
            type: 'success',
            content: `${msg}`,
        });
    };
    const error = (msg: any) => {
        messageApi.open({
            type: 'error',
            content: `${msg}`,
        });
    };

    const [startDate2, setStartDate2]: any = useState()
    const [endDate2, setEndDate2]: any = useState()
    const minDate = new Date(Math.min(...isDataItemToday?.map((element: any) => Date.parse(element.created_at))))
    const maxDate = new Date(Math.max(...isDataItemToday?.map((element: any) => Date.parse(element.created_at))))
    const convertToDate = (date: string) => {
        const _date = new Date(Date.parse(date))
        return _date.toLocaleDateString()
    }



    function filterTranfer(data: any, startDate?: any, endDate?: any) {
        //

        if (data?.length == 0) {
            return []
        }
        let o: any = []
        data?.map((item: any) => {
            const itemDate = new Date(Date.parse(item.created_at))
            if (startDate && endDate) {
                if (itemDate >= startDate && itemDate <= endDate) {
                    o.push(item)
                }
            }
        })
        return o
    }
    const isData: any = filterTranfer(isDataItem, startDate2, endDate2);
    // console.log(isData)
    const columns: any[] = [

        {
            key: 'id',
            label: `${t('ID')}`,
            filter: false,
            sorter: false,
        },

        {
            key: 'FormBankAccount',
            label: `${t('Form Bank Account')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },

        {
            key: 'ToBankAccount',
            label: `${t('To Bank Account')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },
        {
            key: 'Amount',
            label: `${t('Amount')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },

        {
            key: 'Status',
            label: `${t('Status')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },
        {
            key: 'reqby_admin_id',
            label: `${t('Listed by')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },
        {
            key: 'nodere',
            label: `${t('Note')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },
        {
            key: 'created_at',
            label: `${t('Created At')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },


    ]
    const columnsSelect: any[] = [

        {
            key: 'id',
            label: `${t('ID')}`,
            filter: false,
            sorter: false,
        },

        {
            key: 'FormBankAccount',
            label: `${t('Form Bank Account')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },

        {
            key: 'ToBankAccount',
            label: `${t('To Bank Account')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },
        {
            key: 'Amount',
            label: `${t('Amount')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },

        {
            key: 'Status',
            label: `${t('Status')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },
        {
            key: 'reqby_admin_id',
            label: `${t('Listed by')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },
        {
            key: 'nodere',
            label: `${t('Note')}`,
            _style: { width: '' },
            filter: false,
            sorter: false,
        },
        {
            key: 'created_at',
            label: `${t('Created At')}`,
            _style: { width: '' },
        },


    ]
    function handleOnclick(params: any, item: any) {
        if (params) {
        }
    }
    const getBadge = (status: any) => {
        switch (status) {
            case 'ฝากเงิน':
                return 'success'
            case 'ถอนเงิน':
                return 'danger'
            case '1':
                return 'success'
            case '0':
                return 'danger'
            case 'success':
                return 'success'
            case 'failed':
                return 'danger'

            default:
                return 'danger'
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
            case 'inq_manual':
                return '#f50'
            case 'pending':
                return '#faad14'
            case 'cancel':
                return 'rgb(245, 34, 45)'
            case "confirm":
                return 'green'
            case "inq":
                return 'rgb(103, 58, 183)'
            // return '#673ab7'

            default:
                return 'primary'
        }
    }
    function formatAccnumID(numberAcc: any) {
        //console.log(numberAcc?.length)
        // ตรวจสอบความยาวของเลขบัญชี
        if (numberAcc?.length < 9) {
            return `${!numberAcc ? '' : `xx ${numberAcc}`} `;
        }

        let length = numberAcc?.length;

        const middleFour = numberAcc?.slice(6, length);

        return `${!middleFour ? '' : `xx ${middleFour}`} `;
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
    const [loadding, setLoadding]: any = useState(false)
    const handleModel = (data: any) => {
        // console.log(data)
        if (data) {
            setVisible(!visible)
            setStateData(data)
        }
    };
    const itemContext: any = useContext<any>(DataContext)
    const handleCopy = (text: any, data: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                handleModel(data)
                setStateData(data)
                success('Copied : ' + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
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
    var roles: any = funCheckRole(itemContext?.dataAdmin?.name);
    const [stateData, setStateData] = useState<any>("")
    function formatData(data: any) {
        const jsonString: any = JSON.parse(data?.QrScanner);
        return jsonString?.data?.transactionId
    }
    const onChange = (key: any) => {
        setActivePage(1)
        setLoadding(true)
        setTimeout(() => {
            setLoadding(false)
        }, 1000)
    };
    const onChangeStartDate = (date: any) => {
        setStartDate2(date)
        setLoadding(true)
        setTimeout(() => {
            setLoadding(false)
        }, 1000)
    };
    const onChangeEndDate = (date: any) => {
        setEndDate2(date)
        setLoadding(true)
        setTimeout(() => {
            setLoadding(false)
        }, 1000)
    };
    function MainContainer(data: any, dataToday: any, handleCopy: any) {
        const items: TabsProps['items'] = [
            {
                key: '1',
                label: `รายการโอนเงิน วันนี้ ( ${Intl.NumberFormat().format(recordsToday)} รายการ ) `,
                children: <Card
                    style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                    extra={<>{roles && <Button type="primary" ghost onClick={() => window.location.assign(`/#/money-transfer/create-money-transfer`)} disabled={visible} color='primary'><svg xmlns="http://www.w3.org/2000/svg" className="icon me-1" width={24} height={24} viewBox="0 0 24 24" style={{ fill: '"#fff"', transform: '', }}><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                        {t('Create Transfer Money')}
                    </Button>} </>}
                    // loading={loadding}
                    title={<></>}
                    // styles={{ header: { display: "none" } }}
                    children={<CSmartTable
                        items={dataToday}
                        columns={columns}
                        // columnSorter
                        loading={loadding}
                        footer={false}
                        columnFilter={false}
                        itemsPerPageSelect={true}
                        tableFilter
                        itemsPerPage={itemsPerPage}
                        pagination={{
                            external: true,
                        }}
                        paginationProps={{
                            activePage,
                            pages: recordsToday > 0 ? Math.ceil(recordsToday / itemsPerPage) : 1,
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
                        onSorterChange={(value) => setColumnSorter(value)}
                        scopedColumns={{

                            id: (item: any) => (
                                <td onClick={(e: any) => handleCopy(item?.id, item)} className={`text-truncate`} style={{ maxWidth: "250px", cursor: "copy" }}>
                                    {item?.id}
                                </td>
                            ),
                            Amount: (item: any) => (
                                <td onClick={(e: any) => handleModel(item)} className={`text-${getBadge(item?.status)}`} style={{ fontWeight: "700" }}>
                                    {/* <CAvatar src={item?.bank.imageUrl} /> */}
                                    {Intl.NumberFormat().format(item?.amount)}.-
                                </td>
                            ),
                            Type: (item: any) => (
                                <td style={{ textTransform: "uppercase" }} onClick={(e: any) => handleModel(item)}>
                                    <CBadge color={getBadge(item?.type_status)}>{t(item?.type_status == "ฝากเงิน" ? `${t('Deposit')}` : `${t('Withdrawal')}`)}</CBadge>
                                </td>
                            ),
                            FormBankAccount: (item: any) => (
                                <td onClick={() => handleCopy(item?.FormAccount?.accountNumber, item)}>
                                    <span style={{ color: `${item?.type_status == "ฝากเงิน" ? '#51cc8a' : '#f5222d'}`, fontWeight: "700" }}>[{t(item?.type_status == "ฝากเงิน" ? `${t('Deposit')}` : `${t('Withdrawal')}`)}]  </span>, {<span style={{ textTransform: "uppercase" }}> {getBadge_bank(item?.FormAccount?.bankId)}</span>},<br />   {removeTitle(item?.FormAccount?.accountName)}
                                    , {formatAccnumID(item?.FormAccount?.accountNumber)}
                                </td>
                            ),
                            ToBankAccount: (item: any) => (
                                <td onClick={() => handleModel(item)}>
                                    <span style={{ color: `${item?.type_status == "ฝากเงิน" ? '#51cc8a' : '#f5222d'}`, fontWeight: "700" }}>[{t(item?.type_status == "ฝากเงิน" ? `${t('Deposit')}` : `${t('Withdrawal')}`)}]  </span>, {<span style={{ textTransform: "uppercase" }}> {getBadge_bank(item?.TOAccount?.bankId)}</span>},<br /> {removeTitle(item?.TOAccount?.accountName)} ,
                                    {formatAccnumID(item?.TOAccount?.accountNumber)}
                                </td>
                            ),
                            remark: (item: any) => (
                                <td className='text-truncate' style={{ maxWidth: "100px", color: `${!item?.remark ? '#888' : ""}` }} onClick={() => handleCopy(item?.remark, item)}>
                                    {item?.remark || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                                </td>
                            ),
                            nodere: (item: any) => (
                                <td className='text-truncate' style={{ maxWidth: "100px", color: `${!item?.nodere ? '#888' : ""}` }} onClick={() => handleCopy(item?.nodere, item)}>
                                    {item?.nodere || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                                </td>
                            ),
                            Status: (item: any) => (
                                <td style={{ textTransform: "uppercase" }} onClick={(e: any) => handleModel(item)}>
                                    <Tag color={getBadgeTags(item?.status)}>{item?.status == 'success' ? `${t('success')}` : `${t('failed')}`}</Tag>
                                </td>
                            ),
                            created_at: (item: any) => (
                                <td onClick={(e: any) => handleCopy(item?.created_at, item)} style={{ cursor: "copy" }}>
                                    <Tooltip title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                                </td>
                            ),
                            reqby_admin_id: (item: any) => (
                                <td onClick={(e: any) => handleCopy(item?.admin?.id, item)} style={{ cursor: "copy" }}>
                                    <UserSwitchOutlined className="fs-16" />   {item?.admin?.username || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                                </td>
                            ),
                            action: (items: any) => {
                                return (
                                    <>
                                        <td className="py-1">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-left">
                                                <CButton
                                                    color="primary"
                                                    variant="outline"
                                                    shape="square"
                                                    size="sm"
                                                    onClick={(e: any) => handleModel(items)}
                                                >
                                                    <strong>{t('Details')}</strong>
                                                </CButton>
                                            </div>
                                        </td>
                                    </>
                                )
                            },
                        }}
                        onFilteredItemsChange={(items) => {
                            // ค้นหา
                            //console.log(items)
                        }}
                        onSelectedItemsChange={(items) => {
                            //console.log(items)
                        }}
                        tableBodyProps={{
                            className: 'align-middle   font-500',

                        }}
                        tableProps={{
                            className: 'add-this-class  aninationleft',
                            responsive: true,
                            striped: false,
                            hover: true,
                            bordered: true,
                            borderless: false,
                        }}
                    />}
                />,
            },
            {
                key: '2',
                label: `${startDate2 && endDate2 ? `รายการโอนเงินวันที่ - ${moment(startDate2).format("D/M/YYYY")} - ${moment(endDate2).format("D/M/YYYY")} : ( ${Intl.NumberFormat().format(isData?.length)} รายการ )` : 'เลือกดูรายการตามช่วงเวลา'}`,
                children: <Card

                    style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                    extra={<>{roles && <Button type="primary" ghost onClick={() => window.location.assign(`/#/money-transfer/create-money-transfer`)} disabled={visible} color='primary'><svg xmlns="http://www.w3.org/2000/svg" className="icon me-1" width={24} height={24} viewBox="0 0 24 24" style={{ fill: '"#fff"', transform: '', }}><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                        {t('Create Transfer Money')}
                    </Button>} </>}
                    title={<>
                        <div className='d-flex'>
                            <span className='me-1' style={{ color: "#272727b5" }}>{"เลือก: "}</span>
                            <CDateRangePicker
                                footer
                                size="sm"
                                className='me-1'
                                startDate={startDate2}
                                endDate={endDate2}
                                closeOnSelect={false}
                                defaultChecked
                                onStartDateChange={(date: any) => {
                                    onChangeStartDate(date)
                                    setRecords(isData?.length)
                                }}
                                onEndDateChange={(date: any) => {
                                    onChangeEndDate(date);
                                    setRecords(isData?.length)

                                }}
                            />
                        </div>
                    </>}
                    // title={<span style={{color:"#272727b5"}}>{isData?.length == 0 ? null : <>{t(`รายการโอนเงินวันที่ : ${moment(startDate2).format("l")} - ${moment(endDate2).format("l")}`)}</>}</span>}
                    // styles={{ header: { display: "none" } }}
                    children={<CSmartTable
                        items={isData}
                        columns={columnsSelect}
                        // columnSorter
                        loading={loadding}
                        footer={false}
                        columnFilter={false}
                        tableFilter
                        itemsPerPage={100}
                        pagination
                        scopedColumns={{

                            id: (item: any) => (
                                <td onClick={(e: any) => handleCopy(item?.id, item)} className={`text-truncate`} style={{ maxWidth: "250px", cursor: "copy" }}>
                                    {item?.id}
                                </td>
                            ),
                            Amount: (item: any) => (
                                <td onClick={(e: any) => handleModel(item)} className={`text-${getBadge(item?.status)}`} style={{ fontWeight: "700" }}>
                                    {/* <CAvatar src={item?.bank.imageUrl} /> */}
                                    {Intl.NumberFormat().format(item?.amount)}.-
                                </td>
                            ),
                            Type: (item: any) => (
                                <td style={{ textTransform: "uppercase" }} onClick={(e: any) => handleModel(item)}>
                                    <CBadge color={getBadge(item?.type_status)}>{t(item?.type_status == "ฝากเงิน" ? `${t('Deposit')}` : `${t('Withdrawal')}`)}</CBadge>
                                </td>
                            ),
                            FormBankAccount: (item: any) => (
                                <td onClick={() => handleCopy(item?.FormAccount?.accountNumber, item)}>
                                    <span style={{ color: `${item?.FormAccount?.accountType == "deposit" ? '#51cc8a' : '#f5222d'}`, fontWeight: "700" }}>{`[ ${t(item?.FormAccount?.accountType)} ]`}  </span>, {<span style={{ textTransform: "uppercase" }}> {getBadge_bank(item?.FormAccount?.bankId)}</span>},<br />   {removeTitle(item?.FormAccount?.accountName)}
                                    , {formatAccnumID(item?.FormAccount?.accountNumber)}
                                </td>
                            ),
                            ToBankAccount: (item: any) => (
                                <td onClick={() => handleModel(item)}>
                                    <span style={{ color: `${item?.TOAccount?.accountType == "deposit" ? '#51cc8a' : '#f5222d'}`, fontWeight: "700" }}>{`[${t(item?.TOAccount?.accountType)}]`}  </span>, {<span style={{ textTransform: "uppercase" }}> {getBadge_bank(item?.TOAccount?.bankId)}</span>},<br /> {removeTitle(item?.TOAccount?.accountName)} ,
                                    {formatAccnumID(item?.TOAccount?.accountNumber)}
                                </td>
                            ),
                            remark: (item: any) => (
                                <td className='text-truncate' style={{ maxWidth: "100px", color: `${!item?.remark ? '#888' : ""}` }} onClick={() => handleCopy(item?.remark, item)}>
                                    {item?.remark || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                                </td>
                            ),
                            nodere: (item: any) => (
                                <td className='text-truncate' style={{ maxWidth: "100px", color: `${!item?.nodere ? '#888' : ""}` }} onClick={() => handleCopy(item?.nodere, item)}>
                                    {item?.nodere || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                                </td>
                            ),
                            Status: (item: any) => (
                                <td style={{ textTransform: "uppercase" }} onClick={(e: any) => handleModel(item)}>
                                    <Tag color={getBadgeTags(item?.status)}>{item?.status == 'success' ? `${t('success')}` : `${t('failed')}`}</Tag>
                                </td>
                            ),
                            created_at: (item: any) => (
                                <td onClick={(e: any) => handleCopy(item?.created_at, item)} style={{ cursor: "copy" }}>
                                    {/* {convertToDate(item.created_at)} */}
                                    <Tooltip title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                                </td>
                            ),
                            reqby_admin_id: (item: any) => (
                                <td onClick={(e: any) => handleCopy(item?.admin?.id, item)} style={{ cursor: "copy" }}>
                                    <UserSwitchOutlined className="fs-16" />   {item?.admin?.username || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                                </td>
                            ),
                            action: (items: any) => {
                                return (
                                    <>
                                        <td className="py-1">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-left">
                                                <CButton
                                                    color="primary"
                                                    variant="outline"
                                                    shape="square"
                                                    size="sm"
                                                    onClick={(e: any) => handleModel(items)}
                                                >
                                                    <strong>{t('Details')}</strong>
                                                </CButton>
                                            </div>
                                        </td>
                                    </>
                                )
                            },
                        }}
                        onFilteredItemsChange={(items) => {
                            // ค้นหา
                            //console.log(items)
                        }}
                        onSelectedItemsChange={(items) => {
                            //console.log(items)
                        }}
                        tableBodyProps={{
                            className: 'align-middle text-truncate text-center  font-500',

                        }}
                        tableProps={{
                            className: 'add-this-class text-truncate text-center aninationleft',
                            responsive: true,
                            striped: false,
                            hover: true,
                            bordered: true,
                            borderless: false,
                        }}
                    />}
                />,
            },

        ];
        return <>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>
       
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadding(true)
                const offset = (activePage - 1) * itemsPerPage
                const params = new URLSearchParams()
                // console.log(columnSorter?.column)
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${getToken()}`);
                const raw = JSON.stringify({
                    "offset": offset,
                    "limit": itemsPerPage,
                    "startDate": moment().format("YYYY-MM-DD"),
                    "endDate": moment().format("YYYY-MM-DD"),
                });
                const requestOptions: any = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };
                fetch(`${config.apiURL}/api/v1/admin/getdata_transaction_tranfer`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        // console.log(result?.data?.rows?.lastItem?.created_at)
                        if (result.success) {
                            setTimeout(() => {
                                setLoadding(false)
                                // setRecords(result?.data?.count)
                                setRecordsToday(result?.dataToday?.count)
                                setStartDate(result?.startDate)
                                // setStartDate2(result?.data?.rows?.lastItem?.created_at)
                                setEndDate(result?.endDate)
                                setIsDataItem(result?.data?.count ? result?.data?.rows : [])
                                setIsDataItemToday(result?.dataToday?.count ? result?.dataToday?.rows : [])
                                // itemContext?.getAllMembers()
                                itemContext?.getDataProfileAdmin?.()
                            }, 1000)
                        }
                    })
                    .catch((error) => console.error(error));
            } catch (error) {
                console.log('Error fetching isData:', error)
                setLoadding(false)
                setIsDataItem([])
                setIsDataItemToday([])
            } finally {
                return true
            }
        }
        fetchData()
    }, [activePage, columnFilter, columnSorter, itemsPerPage, roles])
    // console.log(activePage)
    return (
        <>
            {contextHolder}
            <ModalDetailsMoneyTransfer getBadge_bank={getBadge_bank} moment={moment} data={stateData} itemContext={itemContext} setVisible={setVisible} visible={visible} config={config} t={t} />
            <div className='w-100 row' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row-reverse" }}>
                <div className='col-12'>
                    <Divider orientation="left" className='mt-0 w-100 text-truncate'></Divider>
                </div>
            </div>
            {MainContainer(isData || [], isDataItemToday || [], handleCopy)}
        </>);
}

export default MoneyTransfer;