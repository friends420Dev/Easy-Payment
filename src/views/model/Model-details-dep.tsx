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
import moment from 'moment'
import { useState } from 'react'
import type { TabsProps } from 'antd';
import { Tabs, Empty } from 'antd';
type Props = {
    setVisible?: any
    visible?: any
    data?: any
    t?: any
    config?: any
    itemContext?: any
}
import { Switch, message } from 'antd';
const ModelDepositDetails = ({ setVisible, visible, data, t, config, itemContext }: Props) => {
    // console.log("data", data)
    if (!data || data == "") {
        return false
    }
    const [state, setState]: any = useState(1);
    const onChange = (key: string) => {
        setState(key);
    };
    const [messageApi, contextHolder]: any = message.useMessage();
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
                success('Copied : ' + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
    //console.log("data", data)
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
            default:
                return 'primary'
        }
    }
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
    function fillterData(id: any) {
        if (!id) {
            return t("No data")
        }
        const admin: any = itemContext?.stateAdmin?.data?.filter((user: any) => user.id == id);
        //console.log(admin)
        return !admin[0]?.name ? t("No data") : admin[0]?.name + " (" + admin[0]?.admin_type + ")";
    }
    //console.log(xx)
    function fillterFromAccount(id: any) {
        if (!id) {
            return t("Nodata")
        }
        var acc: any[] = itemContext?.bankAccount?.data?.filter((bank: any) => bank?.isActive === true);

        if (acc?.length == 0) {
            return t("Nodata")
        }
        let c: any = acc[0]?.bankAccounts?.filter((o: any) => o?.id === id)
        if (c?.length == 0) {
            return t("Nodata")
        }
        return c[0]
    }
    var xx: any = fillterFromAccount(data?.transaction_bank?.bankAccount_id || 0)
    function fillterDatamerchant(id: any, type: any) {
        if (!id) {
            return t("No data")
        }

        if (type == 'merchant') {
            const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
            //console.log(admin)

            return c?.length > 0 ? c[0]?.name : t("No data");

        }
        const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
        //console.log(admin)

        return c?.length > 0 ? c[0]?.name : t("No data");
    }
    function fillterDataBank(id: any) {
        if (!id) {
            return t("No data")
        }
        const c: any = itemContext?.bankList?.data?.filter((user: any) => user.id == id);
        //console.log(admin)
        return !c[0]?.bank_id ? t("No data") : t(c[0]?.bank_id);
    }
    const getBadge2 = (status: any) => {
        switch (status) {
            case 'ฝาก':
                return 'success'
            case 'ถอน':
                return 'danger'
            case 'success':
                return 'success'
            case 'pending':
                return 'warning'
            case 'rejected':
                return 'danger'
            case 'cancel':
                return 'danger'
            default:
                return 'primary'
        }
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("Details Transaction"),
            children: <CCol sm={12}>
                {/* <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div> */}
                <div className="containprocess" style={{ padding: "0 20px" }}>
                    <table align="center" className="accountofuser">
                        <tbody>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Date Time")} :</td> {" "}
                                <td className="item-list" onClick={() => handleCopy(data?.created_at)}>{moment(data?.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Type")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.type_option)}><CBadge color={getBadge2(data?.type_option)}>{t(data?.type_option == 'ฝาก' ? "Deposit" : "Withdrawal")}</CBadge></td>
                            </tr>


                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Account Number")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.members?.bankAccountNumber)}>{data?.members?.bankAccountNumber || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Account Name")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.members?.bankAccountName)}>{data?.members?.bankAccountName || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Amount")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.amount)}>{!data?.amount ? 0 : Intl.NumberFormat().format(data?.amount)}.-</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Ref")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.ref)}>{data?.ref || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("remark")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.remark)}>{data?.remark ? <em className={ data?.remark == "ฝากเงิน" ? `text-success`: `text-danger`}>{data?.remark}</em> :<em style={{ color: `${data?.nodere == "ฝากเงินแบบ Manual ไม่มีสลิป" ? '#39f' : 'red'}` }}>{data?.nodere}</em>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Status")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.status)}><CBadge color={getBadge2(data?.status)}>{t(data?.status || t("No data"))}</CBadge></td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Member Id")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.members?.userId)}>{data?.members?.userId || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("MerchantId")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.members?.merchantId)}>{data?.members?.merchantId || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Telephone Number")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.members?.telephoneNumber)} >{data?.members?.telephoneNumber || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <br />
                            {/* <tr className="trofaccount">
                          <td className="headeraccount me-3" style={{ fontWeight: "700" }}>{t("Create by")} :</td>
                          <td  onClick={() => handleCopy(data?.reqby_admin_id)}>{t('No data')}</td>
                         
                         
                      </tr> */}

                        </tbody>
                    </table>
                </div>
            </CCol>,
        },
        {
            key: '2',
            label: t("Recipient Account"),
            children: <CCol sm={12}>
                {/* <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div> */}
                {xx == "Nodata" ? <Empty children={<em style={{ color: "rgb(51, 153, 255)" }}><b>Note :</b> {data?.nodere} </em>} /> : <div className={`containprocess`} style={{ padding: "0 20px" }}>
                    <div className='text-center h5 mb-3'>{t("Details Bank Account")}</div>
                    <table align="center" className="accountofuser">
                        <tbody>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Bank Account")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.bank?.bank_id)}> {t(xx?.bank?.bank_id)}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Account Number")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.accountNumber)}>{xx?.accountNumber || t("No data")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Account Name")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.accountName)}>{xx?.accountName || t("No data")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Acc Type")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.balance)}><CBadge color={getBadge(xx?.accountType)}>{t(xx?.accountType || t("No data"))}</CBadge></td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Channel")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.channel)}>{xx?.channel || t("No data")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("isActive")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.isActive)}>{xx?.isActive == true ? "true" : "false"}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Status Account")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.status_bank)}>{xx?.status_bank || t("No data")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Bank account group")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.bankAccountGroupId)}>{xx?.bankAccountGroupId || t("No data")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Merchant")} :</td>
                                <td className="item-list" onClick={() => handleCopy(fillterDatamerchant(xx?.merchantId, "merchant"))}>{fillterDatamerchant(xx?.merchantId, "merchant")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("MerchantId")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.merchantId)}>{xx?.merchantId || t("No data")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Balance")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.balance)}>{!xx?.balance ? t('No data') : Intl.NumberFormat().format(xx?.balance)}.-</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("limit Left")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.limit_Left)}>{!xx?.limit_Left ? t('No data') : Intl.NumberFormat().format(xx?.limit_Left)}.-</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Same bank withdrawal limit")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.sameBankLimit)}>{!xx?.sameBankLimit ? t('No data') : Intl.NumberFormat().format(xx?.sameBankLimit)}.-</td>
                            </tr>

                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Other Bank Withdrawal Limit")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.otherBankLimit)}>{!xx?.otherBankLimit ? t('No data') : Intl.NumberFormat().format(xx?.otherBankLimit)}.-</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Telephone Number")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.telephoneNumber)}>{!xx?.telephoneNumber ? <span style={{ color: "#88888880" }}></span> : xx?.telephoneNumber}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Created At")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.created_at)}>{moment(xx?.created_at).format("YYYY/MM/DD HH:mm:ss")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Updated At")} :</td>
                                <td className="item-list" onClick={() => handleCopy(xx?.updated_at)}>{moment(xx?.updated_at).format("YYYY/MM/DD HH:mm:ss")}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>}
            </CCol>,
        },
        {
            key: '3',
            label: 'Member Info',
            children: <div className="containprocess" style={{ padding: "0 20px" }}>
                <table align="center" className="accountofuser">
                    <tbody>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("userID")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.userId)}>{data?.members?.userId || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank Account")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDataBank(data?.members?.bankId))}>{fillterDataBank(data?.members?.bankId) || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(formatAccnumID(data?.members?.bankAccountNumber))}>{formatAccnumID(data?.members?.bankAccountNumber) || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Name")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.bankAccountName)}>{data?.members?.bankAccountName || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("merchant")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDatamerchant(data?.members?.merchantId, "merchant"))}>{fillterDatamerchant(data?.members?.merchantId, "merchant") || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Telephone Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.telephoneNumber)}>{data?.members?.telephoneNumber || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Status")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.userStatus)}>{!data?.members?.userStatus ? t("No data") : data?.members?.userStatus == 1 ? t("Active") : t("Inactive")}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Created At")} :</td> {" "}
                            <td className="item-list" onClick={() => handleCopy(data?.members?.created_at)}>{moment(data?.members?.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>,
        },
    ];
    return (
        <>
            {contextHolder}
            <CModal
                alignment="top"
                size='lg'
                visible={visible}
                onClose={() => setVisible(!visible)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle>{t("Details")}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </CRow>
                </CModalBody>
                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                    <p>{t("version")}: {config?.version}</p>
                </CModalFooter>
            </CModal></>
    );
}

export default ModelDepositDetails;