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
import { Tabs, Avatar, Space } from 'antd';
type Props = {
    setVisible?: any
    visible?: any
    data?: any
    t?: any
    config?: any
    itemContext?: any
}
import { Switch, message } from 'antd';

const ModelDetailsDepositManual = ({ setVisible, visible, data, t, config, itemContext }: Props) => {
    //console.log(data)
    //console.log(itemContext?.stateMerchang)
    if (!data || data == "") {
        return false
    }
    //console.log(itemContext?.stateMember)
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
        const admin: any = itemContext?.stateAdmin?.data?.filter((user: any) => user?.id == id);
        //console.log(admin)

        return !admin[0]?.name ? t("No data") : admin[0]?.name + " (" + admin[0]?.admin_type + ")";
    }
    function fillterDataBank(id: any) {
        if (!id) {
            return t("No data")
        }
        const c: any = itemContext?.bankList?.data?.filter((user: any) => user.id == id);
        //console.log(admin)

        return !c[0]?.bank_id ? t("No data") : t(c[0]?.bank_id);
    }
    function fillterDatamerchant(id: any, type: any) {
        if (!id) {
            return t("No data")
        }

        if (type == 'merchant') {
            const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
            //console.log(admin)

            return !c[0]?.name ? t("No data") : t(c[0]?.name);

        } else if (type == 'member') {
            const c: any = itemContext?.stateMember?.data?.filter((user: any) => user.id == id);
            //console.log(admin)

            return !c[0]?.bankAccountName ? t("No data") : t(c[0]?.bankAccountName);
        }
        //console.log(admin)

        return t("No data");
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("Details"),
            children: <div className="containprocess" style={{ padding: "0 20px" }}>
                <table align="center" className="accountofuser">
                    <tbody>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Date Time")} :</td> {" "}
                            <td className="item-list" onClick={() => handleCopy(data?.created_at)}>{moment(data?.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Type")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.type_option)}>{t(data?.type_option == 'ฝาก' ? t("Deposits") : t("Withdrawals"))}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Ref")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.ref)}>{data?.ref || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Member Bank Account")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDataBank(data?.members?.bankId))}>{fillterDataBank(data?.members?.bankId) || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Member Account Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.bankAccountNumber)}>{data?.members?.bankAccountNumber || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Member Account Name")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.bankAccountName)}>{data?.members?.bankAccountName || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Amount")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.amount)}>{!data?.amount ? 0 : Intl.NumberFormat().format(data?.amount)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Status")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.status)}>{!data?.status ? <span style={{ color: "#88888880" }}>{t('No data')}</span> : t(data?.status)}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("remark")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.remark)}> {t(data?.remark) || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Description")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.description)}>{data?.description || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                        </tr>
                    </tbody>
                </table>
            </div>,
        },
        {
            key: '2',
            label: t('Member'),
            children: <div className={`containprocess`} style={{ padding: "0 20px" }}>
                <div className='text-center h5 mb-3'>{t("Details Member")}</div>
                <table align="center" className="accountofuser">
                    <tbody>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Member ID")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.userId)}>{data?.members?.userId}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Member Status")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.userStatus)}>{t(!data?.members?.userStatus ? 'No data' : data?.members?.userStatus == 1 ? "Active" : "Inactive")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank Account")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.bankId)}> {fillterDataBank(data?.members?.bankId)}</td>
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
                            <td className="headeraccount me-3">{t("Merchant")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDatamerchant(data?.members?.merchantId, "merchant"))}>{fillterDatamerchant(data?.members?.merchantId, "merchant")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("MerchantId")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.merchantId)}>{data?.members?.merchantId}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Status")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.members?.userStatus)}>{data?.members?.userStatus == 1 ?  "Active":"Inactive"}</td>
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
            </CModal></>
    );
}

export default ModelDetailsDepositManual;