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
} from '@coreui/react-pro';
import moment from 'moment';
import Moment from 'moment';
import { useState } from 'react';
import type { TabsProps } from 'antd';
import { Tabs, Alert } from 'antd';
import { TFunction } from 'i18next';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Switch, message } from 'antd';

interface Props {
    setVisible?: any;
    visible?: boolean;
    data: any;
    t?: TFunction | any;
    config?: any;
    itemContext?: any;
    stateGroup?: any;
}

interface DataType {
    key: React.Key;
    name: string;
    age: string | number;
    address: string;
    tags: string[];
    balance: string | number;
    status_bank: string;
}

interface Props2 {
    data: {
        created_at?: string | null;
    } | null | undefined;
    t: TFunction;
}

interface DataTypeTrans {
    accnum: string;
    amount: any;
    bankAccount_id: number;
    date_creat: string;
    description: string;
    fron_bank: string;
    id: number;
    insert_time: string;
    name_to: string;
    remark: string;
    req_tpye: string;
    status: string;
    status_pay: string;
    status_show: string;
    time_creat: string;
    to_bank: string;
    type_status: string;
    key: React.Key;
}

export type TypeTrans = {
    class: any;
    heading_1: string;
    heading_2: any;
    _props: any;
    _cellProps: any;
    id: any;
};

interface AccountUsage {
    usedDays: number | 'N/A'  | any;
    remainingDays: number | 'N/A' | any;
    limitDays: number  | any;
}

const ModelDepositBankStatement = ({ setVisible, visible, data, t, config, itemContext, stateGroup }: Props) => {
    if (!data) {
        return null; // Or some other appropriate return for when data is undefined/null
    }

    const [state, setState] = useState<string | number>('1');
    const onChange = (key: string) => {
        setState(key);
    };
    const [messageApi, contextHolder] = message.useMessage();
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

    const getBadge = (status: any) => {
        switch (status) {
            case 'Active':
                return 'green'
            case 'Inactive':
                return 'error'
            case 'Pending':
                return 'warning'
            case 'Banned':
                return 'red'
            case "deposit":
                return 'success'
            case "withdrawal":
                return 'danger'
            case "Delete":
                return '#cd201f'
            case "Banned2":
                return 'danger'
            case "verifying_account":
                return 'primary'
            case "Vault":
                return 'rgb(103, 58, 183)'
            case "savings":
                return 'primary'
            default:
                return 'primary'
        }
    }

    function formatAccnumID(numberAcc: any) {
        if (!numberAcc) {
            return t('No data');
        }
        if (numberAcc.length < 9) {
            return `xxx ${numberAcc}`;
        }
        const length = numberAcc.length;
        const middleFour = numberAcc.slice(6, length);
        return `xxx xxx ${middleFour}`;
    }

    function removeTitle(fullName: any) {
        if (!fullName) return '';
        if (fullName.startsWith('นาย ')) return fullName.slice(3);
        if (fullName.startsWith('นาย')) return fullName.slice(3);
        if (fullName.startsWith('นางสาว')) return fullName.slice(6);
        if (fullName.startsWith('นาง ')) return fullName.slice(3);
        if (fullName.startsWith('น.ส.')) return fullName.slice(4);
        if (fullName.startsWith('น.ส. ')) return fullName.slice(5);
        return fullName;
    }

    function fillterData(id: any) {
        if (!id) {
            return t('No data');
        }
        const admin: any[] = itemContext?.stateAdmin?.data?.filter((user: any) => user.id == id) || [];
        return !admin[0]?.name ? t('No data') : `<span class="math-inline">\{admin\[0\]?\.name\} \(</span>{admin[0]?.admin_type})`;
    }

    function fillterDataBank(id: any) {
        if (!id) {
            return t('No data');
        }
        const bank: any[] = itemContext?.bankList?.data?.filter((user: any) => user.id == id) || [];
        return !bank[0]?.bank_id ? t('No data') : t(bank[0]?.bank_id);
    }

    function checkGroup(id: number) {
        if (!id) {
            return t('No data');
        }
        const item: any[] = stateGroup?.data?.filter((o: any) => o?.id == id) || [];
        return !item[0]?.name ? t('No data') : item[0]?.name;
    }

    function fillterDatamerchant(id: any, type: any) {
        if (!id) {
            return t('No data');
        }

        const merchant: any[] = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id) || [];

        if (type === 'merchant') {
            return !merchant[0]?.name ? t('No data') : t(merchant[0]?.name);
        }

        return !merchant[0]?.name ? t('No data') : t(merchant[0]?.name);
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Account Name',
            dataIndex: 'name',
            key: 'name',
            className: 'text-truncate',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Bank',
            dataIndex: 'age',
            key: 'age',
            render: (text) => (
                <td style={{ textTransform: 'uppercase' }}>
                    {t(text)}
                </td>
            ),
        },
        {
            title: 'Account Number',
            className: 'text-truncate',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Type',
            key: 'tags',
            dataIndex: 'tags',
            render: (text) => (
                <td style={{ textTransform: 'uppercase' }}>
                    <CBadge color={getBadge(text)}>{t(text)}</CBadge>
                </td>
            ),
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            render: (text) => (
                <b style={{ color: `${Number(text) === 0 ? 'rgb(224, 6, 6)' : 'rgb(82, 196, 26)'}` }}>
                    {Intl.NumberFormat().format(Number(text))}.
                </b>
            ),
        },
        {
            title: 'Status Bank',
            dataIndex: 'status_bank',
            key: 'status_bank',
            render: (text) => <Tag color={getBadge(text)}>{t(text)}</Tag>,
        },
    ];

    const calculateAccountUsage = ({ data, t }: Props2): AccountUsage => {
        const createdAt = data?.created_at;
        const limitDays = 120;

        if (!createdAt) {
            return {
                usedDays: 'N/A',
                remainingDays: 'N/A',
                limitDays: limitDays,
            };
        }

        const createdDate = moment(createdAt);
        const now = moment();
        const usedDays = now.diff(createdDate, 'days');
        const remainingDays = limitDays - usedDays;

        return {
            usedDays: usedDays >= 0 ? usedDays : 'N/A',
            remainingDays: remainingDays >= 0 ? remainingDays : 'N/A',
            limitDays: limitDays,
        };
    };

    const { usedDays, remainingDays, limitDays }: AccountUsage = calculateAccountUsage({ data, t } as Props2);
    

    const dataTabel: DataType[] = [
        {
            key: '1',
            name: data?.accountName,
            age: data?.bank?.bank_id,
            address: data?.accountNumber,
            tags: data?.accountType,
            balance: data?.balance,
            status_bank: data?.status_bank,
        },
    ];

    const columnsTrans = [
        {
            key: 'Remark',
            label: 'TXN Remark',
            _props: { scope: 'col' },
            _style: { width: '50%' },
        },
        {
            key: 'Amount',
            label: 'Amount',
            _props: { scope: 'col' },
            _style: { width: '20%' },
        },
        {
            key: 'date_creat',
            label: 'Date Time',
            _props: { scope: 'col' },
            _style: { width: '30%' },
        },
    ];

    const itemsTrans: DataTypeTrans[] = data?.Request_Alls || [];

    function calculateTotal(items: DataTypeTrans[]) {
        let total = 0;
        items.forEach((item) => {
            total += Number(item.amount);
        });
        return { total };
    }

    const result: { total: number } = calculateTotal(itemsTrans);
    const footer = [
        `ยอดรวมทั้งหมด`,
        `${Intl.NumberFormat().format(result?.total || 0)}.-`,
        ``,
    ];

    const items: TabsProps['items'] = [
        {
            key: '2',
            label: t('Bank Account'),
            children: <div className={`containprocess`} style={{ padding: "0 20px" }}>
                <div className='text-center h5 mb-3'>{t("Details Bank Account")}</div>
                <table align="center" className="accountofuser">
                    <tbody>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank Account")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.bankId)}> {fillterDataBank(data?.bankId)}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.accountNumber)}>{data?.accountNumber || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Name")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.accountName)}>{data?.accountName || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Type")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.accountType)}>{t(data?.accountType || 'No data')}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Channel")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.channel)}>{data?.channel}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Status Bank")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.status_bank)}>{data?.status_bank}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("isActive")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.isActive)}>{data?.isActive == true ? "true" : "false"}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank account group")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.bankAccountGroupId)}>{checkGroup(data?.bankAccountGroupId)}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Merchant")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDatamerchant(data?.merchantId, "merchant"))}>{fillterDatamerchant(data?.merchantId, "merchant")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("MerchantId")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.merchantId)}>{data?.merchantId}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Balance")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.balance)}>{!data?.balance ? t('No data') : Intl.NumberFormat().format(data?.balance)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Same bank withdrawal limit")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.sameBankLimit)}>{!data?.sameBankLimit ? t('No data') : Intl.NumberFormat().format(data?.sameBankLimit)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Other Bank Withdrawal Limit")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.otherBankLimit)}>{!data?.otherBankLimit ? t('No data') : Intl.NumberFormat().format(data?.otherBankLimit)}.-</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Telephone Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.telephoneNumber)}>{!data?.telephoneNumber ? <span style={{ color: "#88888880" }}></span> : data?.telephoneNumber}</td>
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
                            <td className="headeraccount me-3">{t("Created At")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.created_at)}>{moment(data?.created_at).format("YYYY/MM/DD HH:mm:ss")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>,
        },
        {
            key: '1',
            label: t("ธุรกรรม"),
            children: <div className="containprocess" style={{ padding: "0 20px" }}>
                {/* <Alert className='mb-3 mt-3' message="Notes: นี้เป็นเพียง Demo UI ยังไม่ได้เชื่อมต่อ API *เมื่อเชื่อมต่อระบบ ข้อความนี้จะหายไป" type="warning" showIcon /> */}

                <div className='text-left h5 mb-3 mt-3'><span className=' me-3'></span>{t(`ธุรกรรมจากบัญชีของ - ${data?.accountName},  ${data?.bank?.bank_id},  ${data?.accountName}`)}</div>
                <Table<DataType> columns={columns} bordered rowHoverable pagination={false} dataSource={dataTabel} />
                <br />
                <div className='text-left h5 mb-3 mt-3'><span className=' me-3'></span>ดึงยอด (10 ครั้งล่าสุด)</div>
                {data?.Request_Alls?.length == 0 ? <><Table
                    style={{ marginTop: 8 }}
                    columns={[
                        { title: 'TXN Remark', dataIndex: 'name', key: 'name' },
                        { title: 'Amount', dataIndex: 'age', key: 'age' },
                        { title: 'Date Time', dataIndex: 'date', key: 'age' },
                    ]}
                /></> : <>
                    <CSmartTable
                        itemsPerPage={50}
                        pagination
                        columns={columnsTrans}
                        items={itemsTrans}
                        // footer={footer}
                        sorterValue={{ column: 'date_creat', state: 'desc' }}
                        tableProps={{
                            hover: true,
                            responsive: true,
                        }}
                        scopedColumns={{

                            date_creat: (item: any) => (
                                // (console.log(item))
                                <td style={{ textTransform: "uppercase" }} className="text-truncate">
                                    {moment(item?.date_creat).format("YYYY/MM/DD HH:mm:ss")}
                                </td>
                            ),
                            Amount: (item: any) => (
                                // (console.log(item))
                                <td style={{ textTransform: "uppercase", fontWeight: "600" }} className="text-truncate">
                                    {item?.amount ? Intl.NumberFormat().format(item?.amount) : <em style={{ color: "#88888880" }}>{"No data"}</em>}.-
                                </td>
                            ),
                            Remark: (item: any) => (
                                // (console.log(item))
                                <td title={`${item?.to_bank} , ${formatAccnumID(item?.accnum)}, ${removeTitle(item?.name_to)}`} style={{ fontWeight: "500" }} className="text-truncate">
                                    {item?.to_bank} , {formatAccnumID(item?.accnum)}, {removeTitle(item?.name_to)}
                                </td>
                            ),
                        }} /></>}

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

export default ModelDepositBankStatement;