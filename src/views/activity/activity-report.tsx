import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'
import Apiauth from "src/api/Apiauth";
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import 'moment/locale/th'
import { CIcon } from '@coreui/icons-react';
import { cilPlus, cilMediaRecord, cilLayers, cilTransfer, cilLibraryBuilding, cilInputPower } from '@coreui/icons';
import { DataContext } from 'src/layout/DefaultLayout';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { Tooltip, Switch, message, Divider, Tag, notification, Card, Flex } from 'antd';
import { CSmartTable, CButton } from '@coreui/react-pro'
import { getToken } from "../../Token";
import config from 'src/config/app.config';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';

const Activity = () => {
    const itemContext: any = useContext<any>(DataContext)
    const { t } = useTranslation("")
    const [api, contextHolder_Notify] = notification.useNotification();
    const [loading, setLoading] = useState(false)
    const [isData, setIsData]: any = useState([])
    const getBadge = (status: any) => {
        switch (status) {
            case 'Active': {
                return 'success'
            }
            case 1: {
                return 'success'
            }
            case 'Inactive': {
                return 'secondary'
            }
            case 'Pending': {
                return 'warning'
            }
            case 'Banned': {
                return 'danger'
            }
            case 0: {
                return 'error'
            }
            default: {
                return 'primary'
            }
        }
    }
    const getBadgeTag = (status: any) => {
        switch (status) {
            case 'login': {
                return '#388e3c'
            }
            case 'logout': {
                return '#e83e3d'
            }
            case 'created': {
                return '#2db7f5'
            }
            case 'first_time_login': {
                return '#108ee9'
            }
            case 'update_status_bank': {
                return '#6e1db3'
            }
            case "Switch_bank_type": {
                return 'rgb(85, 172, 238)'
            } case "onSwitch": {
                return '#f50'
            } case "addBankAccount": {
                return '#3b5999'
            }
            default: {
                return 'primary'
            }
        }
    }
    const columns = [
        { key: 'username', label: 'Username', filter: true, },
        { key: 'description', label: 'Activity',  _style: { width: '350px' }, filter: true, }, 
        { key: 'types', label: 'Type',  _style: { width: '' }, filter: true, },
        { key: 'status', label: 'Status', _style: { width: '' }, filter: true, },
        { key: 'note', label: 'Note', filter: true, },
        { key: 'IP', label: 'IP', filter: true, },
        { key: 'created_at', label: 'Date',  _style: { width: '' }, filter: true, },
    ]

    const openNotification = (type: NotificationType, msg: any) => {
        api[type]({
            message: 'Notification',
            description:
                msg,
        });
    };
    //console.log(isData)
    // const startDate = moment(isData?.startDate).format("DD/MM/YYYY");
    // const endDate = moment(isData?.endDate).format("DD/MM/YYYY");
    const itemsCount: any = isData?.dataToday?.length || 0
    const [loadding, setLoadding]: any = useState(true)
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

    // ************************************************* //
    const [activePage, setActivePage]: any = useState(1)
    const [startDate, setStartDate]: any = useState("")
    const [endDate, setEndDate]: any = useState("")
    const [columnFilter, setColumnFilter]: any = useState({})
    const [columnSorter, setColumnSorter]: any = useState()
    const [itemsPerPage, setItemsPerPage]: any = useState(10)
    const [records, setRecords]: any = useState(0)
    const [isDataItem, setIsDataItem]: any = useState([])

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
                    "sort": "id"
                });
                const requestOptions: any = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };
                fetch(`${config.apiURL}/api/v1/admin/getActivity_system`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        // console.log(result?.data)
                        if (result.success) {
                            setTimeout(() => {
                                setLoadding(false)
                                setRecords(result?.data?.count)
                                setStartDate(result?.startDate)
                                setEndDate(result?.endDate)
                                setIsDataItem(result?.data?.count ? result?.data?.rows : [])
                            }, 1000)
                        }
                    })
                    .catch((error) => console.error(error));
            } catch (error) {
                console.log('Error fetching isData:', error)
                setLoadding(false)
                setIsDataItem([]) // Optionally show an error state
            } finally {
                return true
            }
        }
        fetchData()
    }, [activePage, columnFilter, columnSorter, itemsPerPage])

    return (<>
        {contextHolder}
        <Flex gap="middle" vertical justify='flex-start' className='mb-3'>
            <div className="w-100" >
                {/* <div><u><b>{t("Activity Report Date", { startDate: moment(startDate).subtract(1, 'days').format("DD/MM/YYYY"), endDate: moment(startDate).subtract(0, 'days').format("DD/MM/YYYY"), counter: loadding ? 0 : Intl.NumberFormat().format(records) })}</b></u></div> */}
                {/* <div><><b>{t("Activity Report Total", {counter: loadding ? 0 : Intl.NumberFormat().format(records)})}</b></></div> */}

                <Divider orientation="left" plain>
                    <div><><b>{t("Activity Report Totale")}</b></></div>
                </Divider>

            </div>
        </Flex>
        <Card
            style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
            // extra={<Button type="dashed"><SettingOutlined className='me-1' style={{ display: "inline-flex" }} /> {`Payment Config`}</Button>}
            // loading={loadding}
            title={<></>}
            styles={{ header: { display: "none" } }}
            children={<CSmartTable
                columns={columns}
                columnFilter={false}
                columnSorter={false}
                footer={false}
                items={isDataItem}
                itemsPerPageSelect
                loading={loadding}
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
                    username: (item: any) => (
                        <td style={{ cursor: "copy" }} onClick={() => handleCopy(item?.username)}>
                            {item?.username || <span style={{ color: "#88888887" }}>{t("No data")}</span>}
                        </td>
                    ),
                    IP: (item: any) => (
                        <td style={{ cursor: "copy" }} onClick={() => handleCopy(item?.IP)}>
                            {item?.IP || <span style={{ color: "#88888887" }}>{t("No data")}</span>}
                        </td>
                    ),
                    description: (item: any) => (
                        <td onClick={() => handleCopy(item?.description)} className='' style={{ maxWidth: "230px", cursor: "copy" }}>

                            <Tooltip arrow title={item?.description || <span style={{ color: "#88888887" }}>{t("No data")}</span>}>{item?.description || <span style={{ color: "#88888887" }}>{t("No data")}</span>}</Tooltip>
                        </td>
                    ),
                    created_at: (item: any) => (
                        <td onClick={() => handleCopy(item?.created_at)} style={{ cursor: "copy" }}>
                            <Tooltip placement="topLeft" title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                        </td>
                    ),
                    status: (item: any) => (
                        <td style={{ textTransform: "capitalize" }}>
                            <Tag color={getBadge(item?.status)}>{item?.status == 1 ? 'Success' : 'failed'}</Tag>
                        </td>
                    ),
                    types: (item: any) => (
                        <td style={{ textTransform: "capitalize" }}>
                            <Tag color={getBadgeTag(item?.types)}>{item?.types}</Tag>
                        </td>
                    ),
                    note: (item: any) => (
                        <td title={item?.note} onClick={() => handleCopy(item?.note)} className=' text-truncate' style={{ textTransform: "capitalize", maxWidth: "230px", cursor: "copy" }} >
                            {item?.note || <em style={{ color: "#88888887" }}>{t("No data")}</em>}
                        </td>
                    ),
                }}
                tableBodyProps={{
                    className: 'align-middle  font-400',

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
        />

    </>);
}

export default Activity;