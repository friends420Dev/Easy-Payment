import { Tabs, Statistic, message, Divider, Card, Tag, Tooltip, Input, Select, Row, Col } from 'antd';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
import {
    CCol,
    CRow,
    CModalFooter,
    CModalBody,
    CModalTitle,
    CModalHeader,
    CSmartTable,
    CModal,
    CMultiSelect
} from '@coreui/react-pro'
import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'
import 'moment/locale/th'
import { DataContext } from 'src/layout/DefaultLayout';
import { useTranslation } from 'react-i18next'
import { ModelDepositDetails, ModelWithdrawalDetails } from "src/views/model/index"
import config from 'src/config/app.config';
import Apibank from 'src/api/Apibank';
import moment from 'moment'
import { CSmartPagination } from '@coreui/react-pro'
import { LoadingOutlined, CloseOutlined, SyncOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import Apiauth from 'src/api/Apiauth';
import { TableTableSearch } from '../withdrawal/tableDataSearch';
import { getToken } from "../../Token";
import type { TabsProps, TableProps } from 'antd';
import { Dayjs } from 'dayjs';
import { Empty, Table } from 'antd';
import PickerDate from './pickerDate';
import { TabelData } from './tabelData';
import type { GetProps } from 'antd';
type SearchProps = GetProps<typeof Input.Search>;

type Props = {
    setVisible2?: any
    visible2?: any
    data?: any
    t?: any
    config?: any
    itemContext?: any
    setIsData: ItemData
}
interface Item {
    accnum?: string;
    to_bank?: string;
    name_to?: string;
    description?: string;
    remark?: string;
    note?: string;
    amount?: number | any;
    transaction_bank?: {
        status_pay?: string;
    };
    status?: string;
    date_creat?: string;
}
interface Column {
    key: string;
    label: string;
    _style?: { [key: string]: string };
    _props?: { [key: string]: any };
    sorter?: boolean;
    filter?: boolean | { [key: string]: any };
}
interface ItemData {
    id?: string;
    request_All_id?: string;
    status_showadmin?: string;
    status_showmember?: string;
    amount?: number | null;
    remark?: string | undefined;
    bank_from?: any;
    acc_from?: any;
    name_member?: string;
    txn_type?: string;
    datamember?: string;
    bank_to?: string;
    add_from?: string;
    ref?: string;
    c_before?: string;
    c_after?: string;
    description?: string;
    datw_new?: string;
    type_option?: string;
    status?: string;
    longtext_res?: string;
    uuid?: string;
    member_id?: string;
    reqby_admin_id?: string;
    nodere?: string;
    created_at?: string;
    updated_at?: string;
    members?: {
        id?: number | null;
        userId?: string;
        userStatus?: number | null;
        bankAccountNumber?: string;
        bankAccountName?: string;
        telephoneNumber?: string;
        trueWalletUsername?: string;
        bankAccountName_En?: string;
        bankId?: number;
        merchantId?: number;
        created_at?: string;
        updated_at?: string;
    };
    Transaction_withdraws?: {
        id?: number | null;
        transaction_id?: number | null;
        recipientName?: string | undefined;
        recipientAccount?: string;
        amount?: number | null;
        remark?: string;
        recipientBank?: string | null;
        senderAccount?: string | null;
        qrString?: string;
        transactionId?: number;
        transactionDateTime?: string;
        ref?: string;
        description?: string;
        member_id?: number;
        senderAccountId?: number;
        reqby_admin_id?: number;
        created_at?: string;
        updated_at?: string;
    };
    Admins?: {
        id?: number;
        name?: string;
        username?: string;
        password?: string;
        invalid_email_password?: string;
        admin_status?: number;
        admin_type?: string;
        role?: string;
        roleID?: number;
        IP?: string;
        merchantId?: number;
        auth_token?: string;
        added_by?: string;
        user_device_id?: string;
        created_at?: string;
        updated_at?: string;
    };

}
export const ModelDepositPeddingDetails = ({ setVisible2, visible2, data, t, config, itemContext, setIsData }: Props) => {
    if (!data || data == "") {
        return false
    }
    const [messageApi2, contextHolder2]: any = message.useMessage();
    function fillterFromAccountID(id: any) {
        if (!id) {
            return t("No data")
        }
        var acc: any[] = itemContext?.bankAccount?.data?.filter((bank: any) => bank?.isActive === true);

        if (acc?.length == 0) {
            return []
        }
        let c: any = acc[0]?.bankAccounts?.filter((o: any) => o?.id === id)
        if (c?.length == 0) {
            return []
        }
        return c[0]
    }
    var xx: any = fillterFromAccountID(data?.bankAccount_id || "")
    function fillterDatamerchant(id: any, type: any) {
        if (!id) {
            return t("No data")
        }
        if (type == 'merchant') {
            const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user?.id == id);
            //console.log(admin)
            return c?.length > 0 ? c[0]?.name : t("No data");
        }
        const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user?.id == id);
        //console.log(admin)
        return c?.length > 0 ? c[0]?.name : t("No data");
    }
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
    const handleCopy = (text: any) => {
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
            return `${!numberAcc ? t("No data") : `xxx ${numberAcc}`}`;
        }
        let length = numberAcc?.length;
        const middleFour = numberAcc?.slice(6, length);
        return `${!middleFour ? t("No data") : `xxx ${middleFour}`}`;
    }
    function fillterDataBank(id: any) {
        if (!id) {
            return t("No data")
        }
        const c: any = itemContext?.bankList?.data?.filter((user: any) => user?.id == id);
        //console.log(admin)
        return c?.length == 0 ? t("No data") : c[0]?.bank_id;
    }

    function filterIsMember(acc: string | null | undefined) {
        if (!acc) {
            return t("Nodata");
        }
        const members: any[] = itemContext?.stateMember || [];
        const filteredMembers: any = members?.filter?.(
            (user: any) => user?.bankAccountNumber === acc
        );
        if (filteredMembers?.length === 0) {
            return t("Nodata");
        }
        return filteredMembers?.[0];
    }
    var isMember: any = filterIsMember?.(data?.accnum || "0")
    
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("Details Transaction"),
            children: <CCol sm={12}>
                <div className="containprocess" style={{ padding: "0 20px" }}>
                    <table align="center" className="accountofuser">
                        <tbody>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Date Time")} :</td> {" "}
                                <td className="item-list" onClick={() => handleCopy(data?.date_creat)}>{moment(data?.date_creat).format('DD/MM/YYYY HH:mm:ss')}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Type")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.type_status)}>{t(data?.type_status == "ฝากเงิน" ? "Deposits" : "Withdrawals")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Account Number")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.accnum)}>{data?.accnum || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Account Name")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.name_to)}>{data?.name_to || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Amount")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.amount)}>{!data?.amount ? 0 : Intl.NumberFormat().format(data?.amount)}.-</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Description")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.description)}>{data?.description || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("req_tpye")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.req_tpye)}> {data?.req_tpye || <span style={{ color: "#88888880" }}>{t('No data')}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Status")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.status_pay)}>{data?.status_pay == "1" ? "Pending" : data?.status_pay == "0" ? "Success" : data?.status_pay}</td>
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
            label: t("From Bank Account"),
            children: <CCol sm={12}>
                {/* <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div> */}
                <div className={`containprocess`} style={{ padding: "0 20px" }}>
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
                                <td className="item-list" onClick={() => handleCopy(xx?.balance)}>{xx?.accountType || t("No data")}</td>
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
                </div>
            </CCol>,
        },
        {
            key: '3',
            label: 'Member Info',
            children: <div className="containprocess" style={{ padding: "0 20px" }}>
                <table align="center" className="accountofuser">
                    {isMember == "Nodata" ?
                        <Empty children={<>{"!!!ไม่พบข้อมูลสมาชิก เลขที่บัญชี : "} <span style={{ cursor: "copy" }} onClick={() => handleCopy(data?.accnum)}> <><u>{data?.accnum}</u></> </span></>} /> :
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
                    }


                </table>
            </div>,
        },
    ];
    const [state, setState]: any = useState(1);
    const onChange = (key: string) => {
        setState(key);
    };
    const onClose = () => {
        setVisible2(false)
    };
    return (
        <>
            {contextHolder2}
            <CModal
                visible={visible2}
                size='lg'
                onClose={() => onClose()}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader>
                    <CModalTitle id="LiveDemoExampleLabel">{t("Details")}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </CRow>
                </CModalBody>
                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                    <p>{t("version")}: {config?.version}</p>
                </CModalFooter>

            </CModal>
        </>
    )
};
const Deposit = () => {
    const { t }: any = useTranslation("")
    const itemContext: any = useContext<any | []>(DataContext)
    const [messageApi, contextHolder]: any = message.useMessage();
    const [visible, setVisible] = useState<boolean>(false)
    const [visible2, setVisible2] = useState<boolean>(false)
    //console.log(itemContext)
    const { Search } = Input;
    const { Option } = Select;
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
   
    const columns2: Column[] | any = [
        {
            key: 'id',
            label: `${t('Trans ID')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accnum',
            label: `${t('Account Number')}`,
            _style: { width: '' },
            filter: true,
            sorter: true,
        },
        {
            key: 'name_to',
            label: `${t('Name')}`,
            _style: { width: '' },
            filter: true,
            sorter: true,
        },

        {
            key: 'amount',
            label: `${t('Amount')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'status',
            label: `${t('Status')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },

        {
            key: 'remark',
            label: `${t('remark')}`,
            _style: { width: '250px' },
            filter: true,
            sorter: false,
        },
        {
            key: 'date_creat',
            label: `${t('Created At')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
    ];
   
    const [isData, setIsData]: any = useState<any>()
    function handleOnclick(item: any) {
        if (item) {
            setIsData(item)
            setVisible2(!visible2)
        }
    }
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
    function formatAccnumID(numberAcc: any) {
        if (numberAcc?.length < 9) {
            return `${!numberAcc ? 'No data' : `xx ${numberAcc}`}`;
        }
        let length = numberAcc?.length;
        const middleFour = numberAcc?.slice(6, length);
        return `${!middleFour ? 'No data' : `xx ${middleFour}`}`;
    }
    const handleCopy = (text: any, item: any) => {
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
    const handleCopy2 = (text: any, item: any) => {
        itemContext?.getAllMembers()
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success('Copied : ' + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
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
    const start = moment().subtract(0, 'days').format("YYYY-MM-DD");
    const end = moment().subtract(0, 'days').format("YYYY-MM-DD");
    const [columnFilter, setColumnFilter]: any = useState({})
    const [columnSorter, setColumnSorter]: any = useState()
    const [loadding, setLoadding] = useState<boolean>(false)
    const [tabActive, setTabActive]: any = useState("1")
    function fillterIsMember(acc: any) {
        if (!acc) {
            return false
        }
        const c: any = itemContext?.stateMember?.data?.rows?.filter((user: any) => user?.bankAccountNumber == acc);
        return c?.length == 0 ? false : true;
    }
    //console.log(fillterIsMember)
    const fetchDatePicker = (event: any) => {
        const offset = (itemContext?.activePage - 1) * itemContext?.itemsPerPage
        let data = {
            offset: offset,
            limit: itemContext?.itemsPerPage,
            sort: "id",
            startDate: event?.startDate,
            endDate: event?.endDate,
        }
        if (event?.startDate && event?.endDate) {
            setLoadding(true)
            Apibank.get_data_deposit(data)
                .then((res) => {
                    if (res?.data?.success == true) {
                        setTimeout(() => {
                            itemContext?.setLoadding(false)
                            itemContext?.setRecordsDeposit(res?.data?.data?.count)
                            itemContext?.setRecordsPandingDeposit(res?.data?.datapanding?.count)
                            itemContext?.setIsDataItemDeposit(res?.data?.data?.count ? res?.data?.data?.rows : [])
                            itemContext?.setIsDataItemPendingDeposit(res?.data?.datapanding?.count ? res?.data?.datapanding?.rows : [])
                        }, 1000)
                        console.log(res?.data);
                    } else {
                        itemContext?.setLoadding(false)
                        error(res?.data?.message)
                    }
                })
                .catch((err: any) => {
                    itemContext?.setLoadding(false)
                    if (err.status == 401) {
                        //alert("Token หมดอายุ")
                    } if (err.code == "ERR_NETWORK") {
                        error(err.message)
                    } else {
                        console.log(err)
                    }
                })
        }
    }

    const onChange = (key: string) => {
        setTabActive(key)
        itemContext?.setActivePage(1)
        itemContext?.setOpenUpdate(true)
    };
    const [handleName, setHandleName]: any = useState<any>("ref")
    const [handleTypeInput, setHandleTypeInput]: any = useState<any>("search")
    const [inputValue, setInputValue] = useState('');
    const onSearchselect = (event: any) => {
        setHandleName(event)
    }
    const [xClose, setXClose] = useState<boolean>(false);
    const [tableDataSearch, setTableDataSearch] = useState<any | []>([])
    const [showTableSearch, setShowTableSearch] = useState<boolean>(false);

    const clearInput = () => {
        setInputValue('');
        setXClose(false)
        itemContext?.setActivePage?.(1)
        itemContext?.setOpenUpdate(true)
    };
    const onInputChange = (event: any) => {
        setInputValue(event.target.value);
    };
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        _e?.preventDefault()
        if (!value) {
            Toast.fire({
                icon: "error",
                title: `กรุณาระบุเกณฑ์การค้นหา`
            });
            return

        }
        let item = {}
        setInputValue(value)
        itemContext?.setLoadding(true)
        if (handleName == "ref") {
            item = { ref: value }
        } else if (handleName == "created_at") {
            item = { created_at: value }
        } else if (handleName == "name_member") {
            item = { name_member: value }
        } else if (handleName == "member_id") {
            item = { member_id: value }
        } else {
            item = { search: value }
        }
        if (value) {
            Apiauth.searchTransaction({ ...item, type: "deposit" })
                .then((res) => {
                    if (res?.data?.success == true) {
                        setXClose(true);
                        setShowTableSearch(true)
                        setTimeout(() => {
                            itemContext?.setLoadding(false)
                            setTableDataSearch(res?.data?.transaction)
                        }, 1000)
                    } else {
                        itemContext?.setLoadding(false)
                        error(res.data.message)
                    }
                }
                )
                .catch((err: any) => {
                    itemContext?.setLoadding(false)
                    if (err.status == 401) {
                        //alert("Token หมดอายุ")
                    } if (err.code == "ERR_NETWORK") {
                        error(err.message)
                    } else {
                        console.log(err)
                    }
                }
                )
        }
    };
    const selectAfter = (
        <Select onChange={onSearchselect} defaultValue="ref" className='text-left' style={{ color: "#888888", width: 100 }} >
            <Option value="name_member">Name</Option>
            <Option value="member_id">MemberID</Option>
            <Option value="created_at">Created At</Option>
            <Option value="ref">Ref.</Option>
        </Select>
    );
    const suffix = (
        <>
            <CloseOutlined
                title='Clear'
                onClick={() => clearInput()}
                style={{
                    fontSize: 16,
                    color: '#1677ff',
                    display: xClose ? 'block' : 'none',
                    cursor: "pointer"
                }}
            />
        </>
    );
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
            case "inq_manual":
                return '#fff2e8'
            default:
                return ''
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
            case "withdrawal_confirm_queued":
                return '#3b5999'
            // return '#673ab7'

            default:
                return '#108ee9'
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
            case "inq_manual":
                return '#d4380d'
            default:
                return ''
        }
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
    function getTargetWord(txt: any) {
        const msg: any = txt;
        if (!msg) {
            return null
        }
        const targetWord: any = msg?.split(" ").pop();
        return targetWord
    }
    function extractWithdrawalInfo(text: any) {
        const prefix = 'รอถอน manual โดย แอดมิน';
        if (text?.startsWith?.(prefix)) {
            return `แอดมิน ${getTargetWord?.(text)} กำลังทำรายการ...`;
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
            tx = extractWithdrawalInfo(txt)
        }
        return tx
    }
    const operations = <>
        <div className='col-sm-auto col-md-100 '>
            <p></p>
            <PickerDate fetchDatePicker={fetchDatePicker} t={t} startDate={start} endDate={start} />
        </div>
    </>;
    function MainContainer() {
        const items: TabsProps['items'] = [
            {
                key: '1',
                label: `${t("Deposit List")} : ( ${Intl.NumberFormat().format(itemContext?.loadding ? 0 : itemContext?.records)} )`,
                children: <>
                    <TabelData handleOnclick={handleOnclick} t={t} itemContext={itemContext} loadding={itemContext?.loadding} setVisible2={setVisible2} setVisible={setVisible} visible={visible} visible2={visible2} setIsData={setIsData} />
                </>
            },
            {
                key: '2',
                label: `${t("pending")} : ( ${Intl.NumberFormat().format(itemContext?.loadding ? 0 : itemContext?.recordsPandingDeposit)} )`,
                children: <CSmartTable
                    items={itemContext?.isDataItemPendingDeposit || []}
                    columns={columns2}
                    loading={itemContext?.loadding}
                    footer={false}
                    itemsPerPage={itemContext?.itemsPerPage}
                    itemsPerPageSelect
                    pagination={{
                        external: true,
                    }}
                    paginationProps={{
                        activePage: itemContext?.activePage,
                        pages: itemContext?.recordsPandingDeposit > 0 ? Math.ceil(itemContext?.recordsPandingDeposit / itemContext?.itemsPerPage) : 1,
                    }}
                    onActivePageChange={(page) => {
                        itemContext?.setOpenUpdate(true)
                        itemContext?.setActivePage(page)
                    }}
                    onColumnFilterChange={(filter) => {
                        itemContext?.setActivePage(itemContext?.activePage)
                        setColumnFilter(filter)
                    }}
                    onItemsPerPageChange={(pageSize) => {
                        itemContext?.setActivePage(itemContext?.activePage)
                        itemContext?.setItemsPerPage(pageSize)
                    }}
                    onSorterChange={(value) => setColumnSorter(value)}
                    tableFilter={false}
                    scopedColumns={{

                        accnum: (item: Item) => (
                            <td className='text-truncate' onClick={(e: any) => handleCopy2(item?.accnum, item)} style={{ maxWidth: "100px", cursor: "copy" }} >
                                {item?.to_bank}, {formatAccnumID(item?.accnum)}
                            </td>
                        ),
                        name_to: (item: Item) => (
                            <td className='text-truncate' onClick={(e: any) => handleCopy2(item?.name_to, item)} style={{ maxWidth: "100px", cursor: "copy" }} >
                                {item?.name_to || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                            </td>
                        ),

                        description: (item: Item) => (
                            <td className='text-truncate' title={item?.description} style={{ maxWidth: "100px", cursor: "copy" }} onClick={() => handleCopy2(item?.description, item)}>
                                {item?.description || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                            </td>
                        ),
                        remark: (item: Item) => (
                            <td className='' onClick={() => handleOnclick(item)}>

                                {fillterIsMember(item?.accnum) == false ? <em style={{ color: "red" }}>{t(`!!!ไม่พบข้อมูลสมาชิก หรือ เลขที่บัญชีนี้ในระบบ`)}</em> : null}
                            </td>
                        ),
                        amount: (item: Item) => (
                            <td onClick={(e: any) => handleOnclick(item)} className={`text-${getBadge(item?.transaction_bank?.status_pay)}`} style={{ fontWeight: "700" }}>
                                {Intl.NumberFormat().format(item?.amount)}.-
                            </td>
                        ),
                        status: (item: Item) => (
                            <td onClick={(e: any) => handleOnclick(item)} style={{ textTransform: "uppercase" }}>
                                <Tag color={getBadge(item?.status)}>{t(item?.status == "1" ? "Pending" : "Success")}</Tag>
                            </td>
                        ),
                        date_creat: (item: Item) => (
                            <td onClick={(e: any) => handleCopy2(item?.date_creat, item)} style={{ cursor: "copy" }}>
                                <Tooltip title={moment(item?.date_creat).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.date_creat)}</Tooltip>

                            </td>
                        ),

                    }}
                    onFilteredItemsChange={(items) => {
                        // ค้นหา
                        // console.log(items)
                    }}
                    onSelectedItemsChange={(items) => {
                        //console.log(items)
                    }}
                    tableBodyProps={{
                        className: 'align-middle font-500',
                    }}
                    tableProps={{
                        className: 'add-this-class aninationleft aninationleft',
                        responsive: true,
                        striped: false,
                        hover: true,
                        bordered: true,
                        borderless: false,
                    }}
                // sorterValue={{ column: 'created_at', state: 'desc' }}
                />,
            },
        ];
        return <>
            <Card
                style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                extra={<Search
                    suffix={suffix}
                    id='myInput'
                    value={inputValue}
                    className='w-100'
                    type={`${handleTypeInput}`}
                    loading={itemContext?.loadding}
                    disabled={itemContext?.loadding}
                    name={`${handleName}`}
                    placeholder="Search..."
                    onChange={onInputChange}
                    onSearch={onSearch}
                    addonBefore={selectAfter} />}
                // loading={itemContext?.loadding}
                title={operations}
                styles={{ header: { display: "" } }}
                children={<>
                    {!showTableSearch && <Tabs className='col-sm-auto' defaultActiveKey="1" items={items} onChange={onChange} />}
                    {showTableSearch && <TableTableSearch
                        data={tableDataSearch}
                        handleCopy={handleCopy}
                        t={t}
                        getBgTags={getBgTags}
                        getColorTags={getColorTags}
                        getBadge_bank={getBadge_bank}
                        formatAccnumID={formatAccnumID}
                        getBadgeTags={getBadgeTags}
                        funcColorNodere={funcColorNodere}
                        funcTxtNodere={funcTxtNodere}
                        clearInput={clearInput}
                        loadding={itemContext?.loadding}
                        setShowTableSearch={setShowTableSearch}
                    />}

                </>}
            />
        </>
    }
    function MainModel(isData: any) {
        if (!isData) {
            return
        }
        return <>
            <ModelDepositDetails setVisible={setVisible} visible={visible} data={isData} t={t} config={config} itemContext={itemContext} />
            <ModelDepositPeddingDetails setVisible2={setVisible2} visible2={visible2} setIsData={setIsData} data={isData} t={t} config={config} itemContext={itemContext} />
        </>
    }
    return (
        <>
            {contextHolder}
            {MainModel(isData)}
            <Divider orientation="left" className='mt-0'>{t("Total deposit list", { counter: Intl.NumberFormat().format(itemContext?.records) + ' / ' + itemContext?.recordsPandingDeposit })}  </Divider>
            {MainContainer()}
        </>);
}
export default Deposit;