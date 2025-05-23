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
    CCardText
} from '@coreui/react-pro'
import { FileSearchOutlined, UserOutlined, QrcodeOutlined } from '@ant-design/icons';
import moment from 'moment'
import { LoadingOutlined, CalendarOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { Tabs, } from 'antd';
import type { TabsProps } from 'antd';
// import QRCode from 'qrcode';
import { FormatTimeAgo, calculateTimeDifference } from 'src/helpers/formatTimeAgo';
import React, { useState, useEffect, useRef } from 'react';
import { Space, Tag, Alert, Tooltip } from 'antd';
import { Button, QRCode, Empty } from 'antd';
import type { QRCodeProps } from 'antd';
type Props = {
    setVisiblem2?: any
    visiblem2?: any
    data?: any
    t?: any
    config?: any
    handleCopy?: any
    itemContext?: any
    getBadgeTags: any
}


const ModelWithdrawalDetails = ({ visiblem2, setVisiblem2, data, config, t, handleCopy, itemContext, getBadgeTags }: Props) => {
    if (!data || data == "") {
        return false
    }
    const onChange = (key: string) => {
        console.log(key);
    }
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
    function fillterDatamerchant(id: any, type: any) {
        if (!id) {
            return t("No data")
        }

        let i = 0
        if (type == 'merchant') {
            const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
            //console.log(admin)
            if (c?.length < 0) {
                return t("No data")
            }
            let n: any = c[i]

            return n?.name;

        }
        const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
        //console.log(admin)

        return c?.length > 0 ? c[0]?.name : t("No data");
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
        let t;
        if (txt == "ถอนโดยระบบออโต้") {
            t = '#2db7f5'
        } else if (txt == "PayoneX") {
            t = `#41e197`
        } else if (txt == "ถอนแบบระบบ manual กรุณาตรวจสอบ และ ยืนยันการถอนอีกครั้ง") {
            t = '#f50'
        } else if (txt == "อนุมัติถอน รอดำเนินการ") {
            t = `#57b04e`
        } else {
            t = '#f50'
        }
        return t
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `${t("Details")}`,
            icon: <FileSearchOutlined style={{ display: "inline-flex" }} />,
            children: <>
                <CRow>
                    <CCol sm={12}>
                        {/* <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div> */}
                        <div className="containprocess" style={{ padding: "0 20px" }}>
                            <table align="center" className="accountofuser" style={{ borderBottom: "none" }}>
                                <tbody>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("แจ้งทำรายการเมื่อ")} :</td> {" "}
                                        <td className="item-list" onClick={() => handleCopy(data?.created_at)}>{<Tooltip title={FormatTimeAgo(data?.created_at)}>{moment(data?.created_at).format('DD-MM-YYYY HH:mm:ss')}</Tooltip>}</td>
                                    </tr>
                                    <tr className={`trofaccount ${data?.status == 'success' ? '' : data?.status == 'rejected' ? '' : 'd-none'}`}>
                                        <td className="headeraccount me-3">{t("ทำรายการสำเร็จเมื่อ")} :</td> {" "}
                                        <td className="item-list" onClick={() => handleCopy(data?.Transaction_withdraws?.created_at)}>{<Tooltip title={FormatTimeAgo(data?.Transaction_withdraws?.created_at)}>{moment(data?.Transaction_withdraws?.created_at).format('DD-MM-YYYY HH:mm:ss')} </Tooltip>}</td>
                                    </tr>
                                    <tr className={`trofaccount ${data?.status == 'success' ? '' : data?.status == 'rejected' ? '' : 'd-none'}`}>
                                        <td className="headeraccount me-3">{t("เฉลี่ยเวลาทำรายการ")} :</td> {" "}
                                        <td className="item-list">{<Tooltip  title={calculateTimeDifference(new Date(data?.created_at), new Date(data?.Transaction_withdraws?.created_at))}> <span style={{ color: data?.status == "success" ? "#39f": "rgb(245, 34, 45)" }}>{calculateTimeDifference(new Date(data?.created_at), new Date(data?.Transaction_withdraws?.created_at))}</span></Tooltip>}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("UUID")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.uuid)}>{data?.uuid || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Ref ")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.ref)}>{data?.ref}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Transaction Id")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.Transaction_withdraws?.transaction_id)}>{data?.Transaction_withdraws?.transaction_id || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                                    </tr>


                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Type ")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.type_option)}>{t(data?.type_option == 'ฝาก' ? "Deposit " : "Withdrawal ")}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Status ")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.status)}><Tag icon={data?.status == "inq" ? <ClockCircleOutlined /> : data?.status == "processing" ? <SyncOutlined spin /> : ""} color={getBadgeTags(data?.status)}>{t(data?.status == "inq" ? "in_Queue" : data?.status)}</Tag></td>
                                    </tr>

                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Member id")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.member_id)}>{data?.member_id}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Recipient Account")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.Transaction_withdraws?.recipientAccount)}> {data?.Transaction_withdraws?.recipientAccount || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                                    </tr>

                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Recipient Name")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.members?.bankAccountName)}>{data?.members?.bankAccountName}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Recipient Bank")} :</td>
                                        <td className="item-list" style={{ textTransform: "capitalize" }} onClick={() => handleCopy(data?.members?.bankId)}>{getBadge_bank(data?.members?.bankId)}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Amount ")} :</td>
                                        <td className="item-list" style={{ color: data?.status == "success" ? "#39f": "rgb(245, 34, 45)" }} onClick={() => handleCopy(data?.amount)}>{!data?.amount ? 0 : Intl.NumberFormat().format(data?.amount)}.-</td>
                                    </tr>


                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Remark ")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.remark)}>{data?.remark ? <span className='text-danger'>{data?.remark}</span> : <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Note ")} :</td>
                                        <td className="item-list">
                                            <span style={{ color: `${funcColorNodere(data?.nodere, data?.status)}` }}>
                                                {funcTxtNodere(data?.nodere, data?.status)}
                                            </span>
                                        </td>
                                    </tr>

                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Merchant ID ")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.members?.merchantId)}>{data?.members?.merchantId}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Merchant Name")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.members?.merchantId)}>{fillterDatamerchant(data?.members?.merchantId, "merchant")}</td>
                                    </tr>
                                    <br />
                                    {/* <tr className="trofaccount">
                                            <td className="headeraccount me-3" style={{fontWeight:"700"}}>{t("Create by")} :</td>
                                            <td className="item-list" onClick={() => handleCopy(data?.Admins?.name)} >{t("No data")}</td>
                                        </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </>,
        },
        {
            key: '2',
            icon: <UserOutlined style={{ display: "inline-flex" }} />,
            label: `${t("Members")}`,
            children: <>
                <CRow>
                    <CCol sm={12}>
                        {/* <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div> */}
                        <div className="containprocess" style={{ padding: "0 20px" }}>
                            <table align="center" className="accountofuser" style={{ borderBottom: "none" }}>
                                <tbody>

                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("USERID")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.members?.userId)}>{data?.members?.userId || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Bank Account")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(t(getBadge_bank(data?.members?.bankId)))}> {t(getBadge_bank(data?.members?.bankId))}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Account Number")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.members?.bankAccountNumber)}>{data?.members?.bankAccountNumber}</td>
                                    </tr>
                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Account Name")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.members?.bankAccountName)}>{data?.members?.bankAccountName}</td>
                                    </tr>

                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("User Status")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.userStatus?.members?.userStatus)}>{data?.members?.userStatus == 1 ? "Active" : "Inactive"}</td>
                                    </tr>

                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3">{t("Telephone Number")} :</td>
                                        <td className="item-list" onClick={() => handleCopy(data?.members?.telephoneNumber)} >{!data?.members?.telephoneNumber ? <span style={{ color: "#88888880" }}>{t("No data")}</span> : data?.members?.telephoneNumber}</td>
                                    </tr>

                                    <tr className="trofaccount">
                                        <td className="headeraccount me-3" style={{ fontWeight: "700" }}>{t("สมัครเมื่อ")} :</td>
                                        <td className="item-list"><Tooltip title={moment(data?.members?.created_at).format("DD-MM-YYYY HH:mm:ss")}>{FormatTimeAgo(data?.members?.created_at)}</Tooltip></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </>,
        },
        {
            key: '3',
            label: `${t("QRcode")}`,
            icon: <QrcodeOutlined style={{ display: "inline-flex" }} />,
            children: <>

                <div className={`container ${!data?.Transaction_withdraws?.qrString && "text-center"}`} >
                    {data?.Transaction_withdraws?.qrString && <>
                        <p className='text-truncate' style={{ cursor: "copy" }} onClick={() => handleCopy(data?.Transaction_withdraws?.transactionId)}><b>{"Transaction Id : "}</b> {data?.Transaction_withdraws?.transactionId || t("No data")}</p>
                        <p className='text-truncate' style={{ cursor: "copy" }} onClick={() => handleCopy(data?.Transaction_withdraws?.qrString)}><b>{"QrString : "}</b> {data?.Transaction_withdraws?.qrString || t("No data")}</p>
                    </>}
                    <Space id="myqrcode" direction="vertical">
                        <p></p>

                        {!data?.Transaction_withdraws?.qrString ?
                            <>
                                <Empty children={<em style={{ color: "rgb(51, 153, 255)" }}></em>} />
                            </>
                            :
                            <>
                                {data?.Transaction_withdraws?.qrString && <>
                                    <QRCode
                                        type={renderType}
                                        value={data?.Transaction_withdraws?.qrString}
                                        bgColor="#fff"
                                        style={{ marginBottom: 16 }}
                                        icon={data?.bank?.imageUrl}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={renderType === 'canvas' ? downloadCanvasQRCode : downloadSvgQRCode}
                                    >
                                        Download
                                    </Button>
                                    <br />
                                </>}
                                {data?.Transaction_withdraws?.qrString && <>
                                    <Alert message="Notes : สแกนคิวอาร์โค้ดนี้เพื่อตรวจสอบสถานะการเงิน" type="warning" showIcon />
                                </>}
                            </>}
                    </Space>
                </div>
            </>,
        },
    ];
    return (
        <>
            <CModal
                alignment="top"
                size='lg'
                visible={visiblem2}
                onClose={() => setVisiblem2(!visiblem2)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle>{t("Details")}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Tabs defaultActiveKey="1" style={{ margin: "0px" }} items={items} onChange={onChange} />
                </CModalBody>
                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#777", borderTop: 'none' }}>
                    <p>{t("version")}: {config?.version}</p>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default ModelWithdrawalDetails;