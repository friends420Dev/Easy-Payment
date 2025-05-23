import { UpdateBtn } from '../../components/updateBtn/updateBtn'
import { Tabs, Switch, message } from 'antd';
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
import { CIcon } from '@coreui/icons-react';
import { cilPlus, cilMediaRecord, cilLayers } from '@coreui/icons';
import React, { useEffect, useRef, useContext, useReducer, useState } from 'react'
import Moment from 'moment'
import 'moment/locale/th'
import { DataContext } from 'src/layout/DefaultLayout';
import { useTranslation } from 'react-i18next'
import { ModelDepositBankStatement } from '../model';
import config from 'src/config/app.config';
import type { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { Card, Tooltip, notification, Divider, Tag } from 'antd';
import Apisetting from 'src/api/Apisetting'
import { StopOutlined, CloseOutlined, ToolOutlined } from '@ant-design/icons';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';

import type { TabsProps } from 'antd';
const Bank_statement = () => {
    const [messageApi, contextHolder]: any = message.useMessage();
    const [visible, setVisible] = useState<boolean>(false)
    const { t } = useTranslation("")

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
    const itemContext: any = useContext<any>(DataContext)
    const [loadding, setLoadding]: any = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            setLoadding(true); // Set loading to true before fetching
            try {
                await Promise.all([
                    itemContext?.getBankAccount?.(),
                    itemContext?.getdata_BankAccount?.(),
                    itemContext?.getall_BankGrop?.(),
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadding(false); // Set loading to false after fetching (success or error)
            }
        };
        fetchData();
    }, [])

    // const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
    //     data: [],
    // })
    const [stateGroup, setStateGroup] = useReducer((stateGroup: any, newStateGroup: any) => ({ ...stateGroup, ...newStateGroup }), {
        data: [],
    })
    let state: any[] = itemContext?.statement?.data.length < 0 ? [] : itemContext?.statement?.data
    const columns = [

        // {
        //     key: 'Group',
        //     label: `${t("Group")}`,
        //     _style: { width: '' },
        //     sorter: false,
        // },
        {
            key: 'accountName',
            label: `${t("Account Name ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'Bank',
            label: `${t("Bank ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountNumber',
            label: `${t("Account Number ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'accountType',
            label: `${t("Type ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'balance',
            label: `${t("Balance ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'limit_Left',
            label: `${t("limit left")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'status_bank',
            label: `${t("Status Account ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },

    ]
    const [currentPage, setCurrentPage] = useState(1)

    // console.log(itemContext?.statement)
    function handleChenkStatusBank(status: any) {
        if (status == "") {
            return
        }
    }
    const getIconsView = (icon: any) => {
        switch (icon) {
            case 'Active':
                return <i className="bx bxs-circle bx-flashing" style={{ color: '#389e0d', fontSize: "10px" }} />
            case 'Inactive':
                return <i className="bx bxs-circle" style={{ fontSize: "10px" }} />
            case 'Delete':
                return <CloseOutlined />
            case 'Banned':
                return <StopOutlined />
            case "Vault":
                return <ToolOutlined />

            default:
                return ''
        }
    }
    const getBadgeTags = (status: any) => {
        switch (status) {
            case 'deposit':
                return 'rgb(82, 196, 26)'
            case 'withdrawal':
                return 'rgb(245, 34, 45)'
            case 'processing':
                return '#1677ff'
            case 'inq_manual':
                return '#f50'
            case 'pending':
                return '#faad14'
            case 'cancel':
                return 'rgb(245, 34, 45)'
            case "savings":
                return '#faad14'
            case "verifying_account":
                return 'rgb(24, 144, 255)'
            // return '#673ab7'

            default:
                return 'primary'
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
        //console.log(itemContext?.bankAccount)
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
    const handleCopy = (text: any, data: any) => {

        navigator?.clipboard?.writeText(text)
            .then(() => {
                handleModel(data)
                setStateData(data)
                success(`Copied : ${text}`);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
    const [stateData, setStateData] = useState<any>("")

    const handleModel = (data: any) => {
        if (data) {
            setVisible(!visible)
        }

    };
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
    const onChange = (key: string) => {
        console.log(key);
    };
    const item: TabsProps['items'] = [
        {
            key: '1',
            label: `${t("Current Account")} ( ${state?.length} ${t("items")} )`,
            children: <>

            </>,
        },

    ];
    //console.log(itemContext?.stateBankGrop?.data)
    function checkGroup(id: number) {
        let item: any = itemContext?.stateBankGrop?.data?.filter((o: any) => o?.id == id)
        //console.log(item?.length)
        if (item?.length == 0) {
            return t("No data")
        }
        let name: any = item[0]?.name
        //   console.log(item)
        return name
    }
    function MainContainer(data: any) {
        //console.log(data)
        setTimeout(() => {
            setLoadding(false)
        }, 1000)
        if (data?.length < 0) {
            return <Card
                style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                // extra={<Button type="dashed"><SettingOutlined className='me-1' style={{ display: "inline-flex" }} /> {`Payment Config`}</Button>}
                loading={loadding}
                title={<></>}

                styles={{ header: { display: "none" } }}
                children={<CSmartTable
                    className='mt-3'
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
                    }} columns={columns} />}
            />
        }
        return <>
            <Card
                style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                // extra={<Button type="dashed"><SettingOutlined className='me-1' style={{ display: "inline-flex" }} /> {`Payment Config`}</Button>}
                loading={loadding}
                title={<></>}
                styles={{ header: { display: "none" } }}
                children={<CSmartTable
                    columns={columns}
                    // columnFilter
                    columnSorter={true}
                    // loading={loadding}
                    footer={false}
                    items={data || []}
                    itemsPerPageSelect
                    tableFilter={true}
                    // selectable
                    itemsPerPage={10}
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
                        Bank: (item: any) => (
                            // (console.log(item))
                            <td onClick={(e) => handleCopy(item?.bank?.bank_id, item)} style={{ textTransform: "uppercase" }}>
                                {item?.bank?.bank_id}
                            </td>
                        ),
                        balance: (item: any) => (
                            // (console.log(item))
                            <td onClick={(e) => handleCopy(item?.balance, item)}>
                                <b style={{ color: `${item?.balance == 0 ? 'rgb(224, 6, 6)' : 'rgb(82, 196, 26)'}` }}>{Intl.NumberFormat().format(item?.balance)}.-</b>
                            </td>
                        ),
                        limit_Left: (item: any) => (
                            <td className="" style={{ textTransform: "uppercase", fontWeight: "700" }} onClick={(e) => handleCopy(item?.limit_Left, item)}>
                                <b style={{ color: `${item?.limit_Left == 0 ? 'rgb(224, 6, 6)' : item?.limit_Left > 100000 ? 'rgb(24, 144, 255)' : item?.limit_Left > 500000 && "rgb(82, 196, 26)"}` }}>{Intl.NumberFormat().format(item?.limit_Left)}.-</b>
                            </td>
                        ),
                        accountName: (item: any) => (
                            <td style={{ cursor: "copy" }} onClick={(e) => handleCopy(item?.accountName, item)}>
                                {hideLastName(item?.accountName)}
                            </td>
                        ),
                        accountNumber: (item: any) => (
                            <td style={{ cursor: "copy" }} onClick={(e) => handleCopy(item?.accountNumber, item)}>
                                {formatAccnumID(item?.accountNumber)}
                            </td>
                        ),
                        status_bank: (item: any) => (

                            <td style={{ cursor: "copy", textTransform: "uppercase" }} onClick={(e) => handleCopy(item?.status_bank, item)}>
                                <Tag color={getBadge(item?.status_bank)} className='font-500'>{getIconsView(item?.status_bank)} {t(item?.status_bank)}</Tag>
                            </td>
                        ),
                        Group: (item: any) => (
                            <td style={{ textTransform: "uppercase" }} onClick={(e) => handleCopy(checkGroup(item?.bankAccountGroupId), item)}>
                                {checkGroup(item?.bankAccountGroupId)}
                            </td>
                        ),
                        accountType: (item: any) => (
                            <td style={{ textTransform: "capitalize" }} onClick={(e) => handleCopy(item?.accountType, item)}>
                                <Tag color={getBadgeTags(item?.accountType)}>{t(item?.accountType)}</Tag>
                            </td>
                        ),

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
                        caption: "top"
                    }}
                    sorterValue={{ column: 'accountType', state: 'asc' }}
                />}
            />
        </>
    }
    function MainModel(stateGroup: any, visible: any, setVisible: any, data: any, t: any, config: any, itemContext: any) {
        return <ModelDepositBankStatement stateGroup={stateGroup} visible={visible} setVisible={setVisible} data={stateData} t={t} config={config} itemContext={itemContext} />
    }
    return (
        <>
            {contextHolder}
            {MainModel(stateGroup, visible, setVisible, stateData, t, config, itemContext)}
            <Divider orientation="left" className='mt-0' children={t("Total Bank Account", { counter: loadding ? 0 : state?.length })} />
            {MainContainer(state?.length < 0 ? [] : state)}
        </>);
}

export default Bank_statement;