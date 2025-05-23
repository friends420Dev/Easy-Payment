import { UpdateBtn } from '../../components/updateBtn/updateBtn'
import { Tabs, Tag, message } from 'antd';
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
    CMultiSelect
} from '@coreui/react-pro'
import { CIcon } from '@coreui/icons-react';
import { cilPlus, cilMediaRecord, cilLayers } from '@coreui/icons';
import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'
import Moment from 'moment'
import 'moment/locale/th'
import { useTranslation } from 'react-i18next'
import { Alert, Flex, Tooltip, notification, Divider, Card } from 'antd';
import type { TabsProps } from 'antd';
import Apiauth from 'src/api/Apiauth';
import { Logout, getUserID } from 'src/Token';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { DataContext } from 'src/layout/DefaultLayout';
import moment from 'moment';
import { getToken } from "../../Token";
import config from 'src/config/app.config';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';

type Props = {
    setVisible?: any
    visible?: any
    data?: any
    t?: any
    handleCloseModel?: any
    itemContext?: any
}
type Model_2 = {
    setVisible2?: any
    visible2?: any
    handleCloseModel?: any
}

export const Model_1 = ({ setVisible, visible, data, t, itemContext }: Props) => {
    let Admin = getUserID()
    // console.log(data)
    if (data == "" || !data) {
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

        }
        const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
        //console.log(admin)

        return !c[0]?.name ? t("No data") : t(c[0]?.name);
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("Details"),
            children: <div className="containprocess" style={{ padding: "0 20px" }}>
                <table align="center" className="accountofuser">
                    <tbody>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("userID")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.userId)}>{data?.userId || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Bank Account")} :</td>
                            <td className="item-list" onClick={() => handleCopy(fillterDataBank(data?.bankId))}>{fillterDataBank(data?.bankId) || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(formatAccnumID(data?.bankAccountNumber))}>{formatAccnumID(data?.bankAccountNumber) || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Account Name")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.bankAccountName)}>{data?.bankAccountName || t("No data")}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("merchant")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.Merchant?.name)}>{!data?.Merchant?.name ? <span style={{ color: "#88888880" }}>{t("No data")}</span> : data?.Merchant?.name}</td>
                        </tr>
                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Telephone Number")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.telephoneNumber)}>{data?.telephoneNumber || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Status")} :</td>
                            <td className="item-list" onClick={() => handleCopy(data?.userStatus)}>{!data?.userStatus ? t("No data") : data?.userStatus == 1 ? t("Active") : t("Inactive")}</td>
                        </tr>

                        <tr className="trofaccount">
                            <td className="headeraccount me-3">{t("Created At")} :</td> {" "}
                            <td className="item-list" onClick={() => handleCopy(data?.created_at)}>{moment(data?.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
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
export const Model_2 = ({ setVisible2, visible2, handleCloseModel }: Model_2) => {
    return (
        <>
            <CModal
                alignment="top"
                size="lg"
                visible={visible2}
                onClose={() => setVisible2(!visible2)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle >รายละเอียดข้อมูลสมาชิก</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                    egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={() => setVisible2(!visible2)} color="primary">Save changes</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}


export const fetchData = async (
    activePage: number,
    itemsPerPage: number,
    columnFilter: any,
    columnSorter: any,
    setLoadding: React.Dispatch<React.SetStateAction<boolean>>,
    setRecords: React.Dispatch<React.SetStateAction<number>>,
    setIsDataItem: React.Dispatch<React.SetStateAction<any[]>>,
    setIsDataItemToday: React.Dispatch<React.SetStateAction<any[]>>,
    setRecordsToday: React.Dispatch<React.SetStateAction<number>>,
    CheckRegisterToday: (data: any) => { count: number; data: any[] },
    keyPage: string,
    itemsPerPageToday: number,
    activePageToday: number
): Promise<boolean> => {
    try {
        setLoadding(true);
        const offset = (activePage - 1) * itemsPerPage;
        const offsetToday = (activePageToday - 1) * itemsPerPageToday;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${getToken()}`);
        const raw = JSON.stringify({
            "offset": keyPage == "1" ? offset : offsetToday,
            "limit": keyPage == "1" ? itemsPerPage : itemsPerPageToday,
            "sort": "id"
        });
        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const response = await fetch(`${config.apiURL}/api/v1/admin/getallMember`, requestOptions);
        const result = await response.json();

        if (result.success) {
            setTimeout(() => {
                setLoadding(false);
                setRecords(result?.data?.count);
                setIsDataItemToday(result?.newMembersToday?.rows || []);
                setRecordsToday(result?.newMembersToday?.count || 0);
                setIsDataItem(result?.data?.count ? result?.data?.rows : []);
            }, 1000);
            return true;
        } else {
            console.error("Fetch data failed:", result);
            setIsDataItem([]);
            setIsDataItemToday([]);
            setLoadding(false);
            return false;
        }
    } catch (error) {
        console.error('Error fetching Data:', error);
        setIsDataItem([]);
        setIsDataItemToday([]);
        setLoadding(false);
        return false;
    } finally {
        return true;
    }
};

const Member = () => {
    Moment.locale("th")
    const { t } = useTranslation("")
    const itemContext: any = useContext<any>(DataContext)
    const [messageApi, contextHolder]: any = message.useMessage();
    const [visible, setVisible] = useState<boolean>(false)
    const [api, contextHolder2] = notification.useNotification();
    const [dataEdit, setDataEdit]: any = useState("")

    const [visible2, setVisible2] = useState<boolean>(false)
    const openNotificationWithIcon = (type: NotificationType, msg: any) => {
        api[type]({
            message: 'Notification',
            description: msg,
        });
    };
    //console.log(itemContext.stateMember.data)
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
    const getBadgeStatus = (status: any) => {
        //console.log(status)
        switch (status) {
            case "1":
                return 'rgb(82, 196, 26)'
            case "0":
                return 'rgb(245, 34, 45)'
            case 1:
                return 'rgb(82, 196, 26)'
            case 0:
                return 'rgb(245, 34, 45)'
            default:
                return '#55acee'
        }
    }
    const columns: any = [
        {
            key: 'userId',
            label: `${t("userID")}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },

        {
            key: 'Merchant',
            label: `${t("merchant")}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },
        {
            key: 'Bank',
            label: `${t("Bank")}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },
        {
            key: 'bankAccountName',
            label: `${t("Account Name")}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },
        {
            key: 'bankAccountNumber',
            label: `${t("Account Number")}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },
        // {
        //     key: 'telephoneNumber',
        //     label: `${t("telephone number")}`,
        //     _style: { width: '' },
        //     sorter: false,
        // },
        {
            key: 'Status',
            label: `${t("Status")}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },
        {
            key: 'createdAt',
            label: `${t("Created At")}`,
            filter: true,
            sorter: false,
            _props: { scope: 'col' },
        },


    ]
    function handleOnclick(params: any, item: any) {
        let data: any = item;
        if (params == "deteils") {
            setDataEdit(data)
            setVisible(!visible2)
        } else {
            return false
        }
    }
    function handleCloseModel() {
        setVisible(false)
        setVisible2(false)
    }
    const handleCopy = (text: any, data: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success('Copied : ' + text);
                if (data) {
                    setDataEdit(data)
                    setVisible(!visible2)
                }

            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
    function formatAccnumID(numberAcc: any) {
        //console.log(numberAcc)
        if (numberAcc?.length < 9) {
            return `xx ${numberAcc}`;
        }

        let length: any = numberAcc?.length;

        const middleFour: any = numberAcc?.slice(6, length);

        return `xxx xxx ${middleFour} `;
    }
    function hideLastName(fullName: any) {
        let formatName: any = removeTitle(fullName)
        const names: any = formatName?.split(' ');
        if (names.length >= 2) {
            const firstName: any = names[0];
            const firstName2: any = names[1];
            const lastName: any = names[2];
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
        const phoneNumberRegex = /^\d{10}$/; // ตรวจสอบรูปแบบหมายเลขโทรศัพท์ 10 หลัก
        if (phoneNumberRegex.test(phoneNumber)) {
            window.location.href = `tel:+66${phoneNumber}`;
        } else {
            error('หมายเลขโทรศัพท์ไม่ถูกต้อง');
        }
    };
    const startDate = moment().subtract(1, 'days').format("DD/MM/YYYY");
    const endDate = moment().subtract(0, 'days').format("DD/MM/YYYY ");
    // ************************************************* //
    const [activePage, setActivePage]: any = useState(1)
    const [keyPage, setKeyPage]: any = useState("1")
    const [loadding, setLoadding]: any = useState(true)
    const [columnFilter, setColumnFilter]: any = useState({})
    const [columnSorter, setColumnSorter]: any = useState()
    const [itemsPerPage, setItemsPerPage]: any = useState(10)
    const [records, setRecords]: any = useState(0)
    const [itemsPerPageToday, setItemsPerPageToday]: any = useState(10)
    const [activePageToday, setActivePageToday]: any = useState(1)
    const [recordsToday, setRecordsToday]: any = useState(0)
    const [isDataItem, setIsDataItem]: any = useState([])
    const [isDataItemToday, setIsDataItemToday]: any = useState([])

    const CheckRegisterToday = (data: any) => {
        const today = moment().format("YYYY-MM-DD");
        const filteredData = data.filter((item: any) => moment(item.created_at).format("YYYY-MM-DD") === today);
        return { count: filteredData.length, data: filteredData };
    };
    
    useEffect(() => {
        fetchData(
            activePage,
            itemsPerPage,
            columnFilter,
            columnSorter,
            setLoadding,
            setRecords,
            setIsDataItem,
            setIsDataItemToday,
            setRecordsToday,
            CheckRegisterToday,
            keyPage,
            itemsPerPageToday,
            activePageToday
        );
       
    }, [activePage, columnFilter, columnSorter, itemsPerPage, activePageToday, itemsPerPageToday, keyPage]);

    function MainContainer(data: any[]) {
        const onChange = (key: string) => {
            setKeyPage(key)
            setActivePageToday(1)
            setActivePage(1)
        };
        if (data?.length == 0) {
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
        } else {
            const items: TabsProps['items'] = [
                {
                    key: '1',
                    label: <Tooltip placement="topLeft" title={"สมาชิกทั้งหมด"} color="blue">
                        {t("Total member list", { startDate: startDate, endDate: endDate, counter: loadding ? 0 : Intl.NumberFormat().format(records) })}
                    </Tooltip>,
                    children: <Card
                        style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                        // extra={<Button type="dashed"><SettingOutlined className='me-1' style={{ display: "inline-flex" }} /> {`Payment Config`}</Button>}
                        // loading={loadding}
                        title={<></>}
                        styles={{ header: { display: "none" } }}
                        children={<CSmartTable
                            items={data}
                            columns={columns}
                            // columnSorter
                            footer={false}
                            loading={loadding}
                            columnFilter={false}
                            itemsPerPageSelect={true}
                            tableFilter
                            itemsPerPage={itemsPerPage}
                            pagination={{
                                external: true,
                            }}
                            paginationProps={{
                                activePage,
                                pages: records > 0 ? Math.ceil(records / itemsPerPage) : 1,
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
                                userId: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td className='text-truncate' style={{ cursor: "copy", maxWidth: "150px" }} onClick={() => handleCopy(item?.userId, item)}>
                                            {item?.userId}
                                        </td>
                                    </>
                                ),
                                Merchant: (item: any) => (
                                    //  (console.log(item))
                                    <>
                                        <td style={{ textTransform: "capitalize", cursor: "copy" }} onClick={() => handleCopy(hideLastName(item?.Merchant?.name), item)}>
                                            {item?.Merchant?.name}
                                        </td>
                                    </>
                                ),
                                bankAccountName: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td style={{ cursor: "copy" }} onClick={() => handleCopy(item?.bankAccountName, item)}>
                                            {hideLastName(item?.bankAccountName)}
                                        </td>
                                    </>
                                ),
                                bankAccountNumber: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td style={{ cursor: "copy" }} onClick={() => handleCopy(item?.bankAccountNumber, item)}>
                                            {formatAccnumID(item?.bankAccountNumber)}
                                        </td>
                                    </>
                                ),
                                telephoneNumber: (item: any) => (
                                    <td style={{ textTransform: "uppercase", cursor: "help" }} onClick={() => handleCall(item?.telephoneNumber)}>
                                        {item?.telephoneNumber == "" || item?.telephoneNumber == null ? <em style={{ color: "#88888880" }}>{t("No data")}</em> : item?.telephoneNumber}
                                    </td>
                                ),
                                prefix: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td onClick={() => handleOnclick("deteils", item)}>
                                            {item?.Merchant?.prefix}
                                        </td>
                                    </>
                                ),
                                Bank: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td onClick={() => handleOnclick("deteils", item)}>
                                            <Tooltip title={t(item?.Bank?.bank_id)}>  <CAvatar src={item?.Bank?.imageUrl || `https://img2.pic.in.th/pic/noimage4x4.th.jpeg`} /></Tooltip>
                                        </td>
                                    </>
                                ),
                                createdAt: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td onClick={() => handleOnclick("deteils", item)}>
                                            <Tooltip title={Moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                                        </td>
                                    </>
                                ),
                                action: (items: any) => {
                                    return (
                                        <>
                                            <td className="py-1">
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-left">
                                                    <CButton
                                                        color="secondary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => handleOnclick("Details", items)}
                                                    >
                                                        <strong>{t("Details")}</strong>
                                                    </CButton>
                                                </div>
                                            </td>
                                        </>
                                    )
                                },
                                Status: (item: any) => (
                                    <td style={{ textTransform: "uppercase" }} onClick={() => handleOnclick("deteils", item)}>
                                        <Tag color={getBadgeStatus(item?.userStatus)}>{item?.userStatus == 1 ? `${t("Active")}` : `${t("Inactive")}`}</Tag>
                                    </td>
                                ),
                            }}
                            onFilteredItemsChange={(items) => {
                                // ค้นหา
                                //console.log(items)
                            }}
                            onSelectedItemsChange={(items) => {
                                //console.log(items)
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
                        />}
                    />,
                },
                {
                    key: '2',
                    label: <Tooltip placement="topLeft" title={"สมาชิกใหม่"} color="blue">
                        {t("Total newMember list", { startDate: startDate, endDate: endDate, counter: loadding ? 0 : Intl.NumberFormat().format(recordsToday) })}
                    </Tooltip>,
                    children: <Card
                        style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                        // extra={<Button type="dashed"><SettingOutlined className='me-1' style={{ display: "inline-flex" }} /> {`Payment Config`}</Button>}
                        // loading={loadding}
                        title={<></>}
                        styles={{ header: { display: "none" } }}
                        children={<CSmartTable
                            items={isDataItemToday || []}
                            columns={columns}
                            // columnSorter
                            footer={false}
                            loading={loadding}
                            columnFilter={false}
                            itemsPerPageSelect={true}
                            tableFilter
                            itemsPerPage={itemsPerPageToday}
                            pagination={{
                                external: true,
                            }}
                            paginationProps={{
                                activePage: activePageToday,
                                pages: recordsToday > 0 ? Math.ceil(recordsToday / itemsPerPageToday) : 1,
                            }}
                            onActivePageChange={(page) => setActivePageToday(page)}
                            onColumnFilterChange={(filter) => {
                                setActivePageToday(1)
                                setColumnFilter(filter)
                            }}
                            onItemsPerPageChange={(pageSize) => {
                                setActivePageToday(1)
                                setItemsPerPageToday(pageSize)
                            }}
                            onSorterChange={(value) => setColumnSorter(value)}
                            scopedColumns={{
                                userId: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td className='text-truncate' style={{ cursor: "copy", maxWidth: "150px" }} onClick={() => handleCopy(item?.userId, item)}>
                                            {/* <CAvatar src={item?.bank.imageUrl} /> */}
                                            {item?.userId}
                                        </td>
                                    </>
                                ),
                                Merchant: (item: any) => (
                                    //  (console.log(item))
                                    <>
                                        <td style={{ textTransform: "capitalize", cursor: "copy" }} onClick={() => handleCopy(hideLastName(item?.Merchant?.name), item)}>
                                            {item?.Merchant?.name}
                                        </td>
                                    </>
                                ),
                                bankAccountName: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td style={{ cursor: "copy" }} onClick={() => handleCopy(item?.bankAccountName, item)}>
                                            {hideLastName(item?.bankAccountName)}
                                        </td>
                                    </>
                                ),
                                bankAccountNumber: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td style={{ cursor: "copy" }} onClick={() => handleCopy(item?.bankAccountNumber, item)}>
                                            {formatAccnumID(item?.bankAccountNumber)}
                                        </td>
                                    </>
                                ),
                                telephoneNumber: (item: any) => (
                                    <td style={{ textTransform: "uppercase", cursor: "help" }} onClick={() => handleCall(item?.telephoneNumber)}>
                                        {item?.telephoneNumber == "" || item?.telephoneNumber == null ? <em style={{ color: "#88888880" }}>{t("No data")}</em> : item?.telephoneNumber}
                                    </td>
                                ),
                                prefix: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td onClick={() => handleOnclick("deteils", item)}>
                                            {item?.Merchant?.prefix}
                                        </td>
                                    </>
                                ),
                                Bank: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td onClick={() => handleOnclick("deteils", item)}>
                                            <Tooltip title={t(item?.Bank?.bank_id)}>  <CAvatar src={item?.Bank?.imageUrl || `https://img2.pic.in.th/pic/noimage4x4.th.jpeg`} /></Tooltip>
                                        </td>
                                    </>
                                ),
                                createdAt: (item: any) => (
                                    // (console.log(item))
                                    <>
                                        <td onClick={() => handleOnclick("deteils", item)}>
                                            <Tooltip title={Moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                                        </td>
                                    </>
                                ),
                                action: (items: any) => {
                                    return (
                                        <>
                                            <td className="py-1">
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-left">
                                                    <CButton
                                                        color="secondary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => handleOnclick("Details", items)}
                                                    >
                                                        <strong>{t("Details")}</strong>
                                                    </CButton>
                                                </div>
                                            </td>
                                        </>
                                    )
                                },
                                Status: (item: any) => (
                                    <td style={{ textTransform: "uppercase" }} onClick={() => handleOnclick("deteils", item)}>
                                        <Tag color={getBadgeStatus(item?.userStatus)}>{item?.userStatus == 1 ? `${t("Active")}` : `${t("Inactive")}`}</Tag>
                                    </td>
                                ),
                            }}
                            onFilteredItemsChange={(items) => {
                                // ค้นหา
                                //console.log(items)
                            }}
                            onSelectedItemsChange={(items) => {
                                //console.log(items)
                            }}
                            tableBodyProps={{
                                className: 'align-middle    font-400',

                            }}
                            tableProps={{
                                className: 'add-this-class   aninationleft',
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
    }
    return (
        <>
            {contextHolder2}
            {contextHolder}
            <Model_1 setVisible={setVisible} visible={visible} data={dataEdit} t={t} itemContext={itemContext} />
            <Model_2 setVisible2={setVisible2} visible2={visible2} handleCloseModel={handleCloseModel} />
            {MainContainer(isDataItem || [])}
        </>);
}

export default Member;