import { useTranslation } from 'react-i18next'
import { CBadge, CSmartTable } from '@coreui/react-pro'
import { DataContext } from 'src/layout/DefaultLayout'
import { useContext } from 'react'
import { Tooltip, message, Card, Divider, Spin } from 'antd';
import { useEffect, useReducer, useState } from 'react'
import { ModelDetailsDepositManual } from '../model';
import config from 'src/config/app.config'
import moment from 'moment';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // Import Thai locale
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('th'); // Set Thai as the global locale
import { Tag } from "antd";
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';

interface Transaction {
    id: number;
    amount: number;
    remark: string | null;
    bank_from: string | null;
    acc_from: string | null;
    qrString: string | null;
    txn_type: string | null;
    add_from: string | null;
    ref: string;
    description: string | null;
    type_option: string;
    status: string;
    member_id: number;
    nodere: string | null;
    time_creat: string | null;
    transaction_time: string | null;
    reqby_admin_id: number;
    created_at: string;
    updated_at: string;
    members?: any; // Adjust type as needed
}
interface Props {
    itemContext?: {
        stateTransaction_manual?: {
            data?: Transaction[];
            isLoading?: boolean;
            isError?: boolean;
            error?: any;
            refetch?: () => void; // Assuming a refetch function exists
        };
    };
}
const Index = () => {
    const { t }: any = useTranslation("")
    const itemContext: any = useContext<any | []>?.(DataContext)
    const [messageApi, contextHolder]: any = message.useMessage();
    useEffect(() => {
        const fetchData = async () => {
            itemContext?.setLoadding(true)
            try {
                await Promise.all([
                    itemContext?.getall_Transaction_manual?.(),
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                console.log("Bank_accounts finally fetching data");
            }
        };
        fetchData();
        const intervalId = setInterval(() => {
            itemContext?.getall_Transaction_manual();
        }, 1 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);
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
    const getBadge = (status: any) => {
        switch (status) {
            case 'pending': {
                return 'warning'
            }
            case 'success': {
                return 'success'
            }
            case 'rejected': {
                return 'danger'
            }
            case 'cancel': {
                return 'danger'
            }
            case 'ฝาก': {
                return 'success'
            }
            case 'ถอน': {
                return 'danger'
            }
            default: {
                return 'primary'
            }
        }
    }
    const getBadgeTags = (status: any) => {
        switch (status) {
            case 'success':
                return 'rgb(82, 196, 26)'
            case 'rejected':
                return 'rgb(245, 34, 45)'
            case 'processing':
                return 'processing'
            case 'pending':
                return 'warning'
            case 'cancel':
                return 'rgb(245, 34, 45)'
            case "confirm":
                return 'green'
            case "inq":
                return 'purple'
            // return '#673ab7'

            default:
                return 'primary'
        }
    }
    const handleCopy = (text: any, data: any) => {
        if (data) {
            handleOnclick(text, data)
        }
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success('Copied : ' + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
    function formatAccnumID(numberAcc: any) {
        //console.log(numberAcc)
        if (numberAcc?.length < 9) {
            return `xxx ${numberAcc}`;
        }
        let length: any = numberAcc?.length;

        const middleFour: any = numberAcc?.slice(6, length);

        return `xxx ${middleFour} `;
    }
    function formatBank(id: any) {
        // console.log(id)
        let bank: any = itemContext?.bankList?.data?.filter((item: any) => item?.id == id)
        var databank: any = bank[0]
        return databank?.bank_id
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
    const columns = [
        {
            key: 'ref',
            label: t('Ref'),
            filter: true,
            _style: { width: '' },
        },

        {
            key: 'FromAccount',
            label: t('Bank Account '),
            filter: true,
            _style: { width: '' },
        },
        {
            key: 'Amount',
            label: t('Amount'),
            filter: true,
            _style: { width: '' },
        },

        {
            key: 'status',
            label: t('Status'),
            filter: true,
            _style: { width: '' },
        },
        {
            key: 'remark',
            label: t('Remark'),
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'note',
            label: t('Note'),
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'created_at',
            label: t('Date Time'),
            filter: true,
            sorter: false,
        },
    ]
    //var items: any = itemContext?.stateTransaction_manual?.data?.length < 0 ? [] : itemContext?.stateTransaction_manual?.data
    const [loadding, setLoadding] = useState<boolean>(true)
    const [visible, setVisible] = useState<boolean>(false)
    const [isData, setIsData]: any = useState("")
    function handleOnclick(params: any, item: any) {
        //console.log(params, item)
        if (params) {
            setVisible(!visible)
            setIsData(item)
        }
    }
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        const updateTransactions = () => {
            if (itemContext?.stateTransaction_manual?.data) {
                const todayStart = dayjs().startOf('day');
                const todayEnd = dayjs().endOf('day');

                const filteredTransactions = itemContext?.stateTransaction_manual?.data?.filter((transaction: Transaction) => {
                    // Use transaction_time if available, otherwise fallback to created_at
                    const transactionDate = transaction?.transaction_time
                        ? dayjs(transaction?.transaction_time)
                        : dayjs(transaction?.created_at);

                    return transactionDate.isSame(todayStart, 'day');
                });
                setRecentTransactions(filteredTransactions);
            } else {
                setRecentTransactions([]);
            }
        };
        updateTransactions?.();
    }, [itemContext?.stateTransaction_manual?.data]);
    const start = moment().subtract(0, 'days').format("YYYY-MM-DD");
    // const end = moment().subtract(0, 'days').format("YYYY-MM-DD");
    function MainContainer(data: any[]) {
        setTimeout(() => {
            setLoadding(false)
        }, 1000)
        if (data?.length == 0) {
            return <>
                <Card
                    style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                    // extra={<Button type="dashed"><SettingOutlined className='me-1' style={{ display: "inline-flex" }} /> {`Payment Config`}</Button>}

                    title={<></>}
                    styles={{ header: { display: "none" } }}
                    children={<CSmartTable
                        loading={loadding}
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
            </>
        } else {
            return <>
                <Card
                    style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                    title={<></>}
                    styles={{ header: { display: "none" } }}
                    children={<CSmartTable
                        activePage={1}
                        clickableRows
                        columns={columns}
                        loading={loadding}
                        footer={false}
                        items={data}
                        itemsPerPageSelect
                        itemsPerPage={10}
                        pagination
                        onFilteredItemsChange={(items) => {
                            //console.log('onFilteredItemsChange')
                            //console.table(items)
                        }}
                        onSelectedItemsChange={(items) => {
                            //console.log('onSelectedItemsChange')
                            //console.table(items)
                        }}
                        scopedColumns={{
                            typeOption: (item: any) => (
                                <td onClick={(e) => handleOnclick(e, item)}>
                                    <CBadge color={getBadge(item?.type_option)}>{item?.type_option == "ฝาก" ? t("Deposits") : t("Withdrawals")}</CBadge>
                                </td>
                            ),
                            FromAccount: (item: any) => (
                                <td onClick={(e) => handleOnclick(e, item)}>
                                    <b>{formatBank(item?.members?.bankId)}, {" "}</b>
                                    {formatAccnumID(item?.members?.bankAccountNumber)}, {" "}
                                    {hideLastName(item?.members?.bankAccountName)}
                                </td>
                            ),
                            ToFromAccount: (item: any) => (
                                <td onClick={(e) => handleOnclick(e, item)}>
                                    {formatBank(item?.bank_from)}, {" "}{formatAccnumID(item?.acc_from)}
                                </td>
                            ),
                            Amount: (item: any) => (
                                <td onClick={(e: any) => handleOnclick(e, item)} className={`text-${getBadge(item?.transaction_bank?.status_pay)}`} style={{ fontWeight: "700" }}>
                                    {Intl.NumberFormat().format(item?.amount)}.-
                                </td>
                            ),
                            ref: (item: any) => (
                                <td className='text-truncate' style={{ cursor: 'copy', maxWidth: "100px" }} onClick={() => handleCopy(item?.ref, item)}>
                                    {item?.ref}
                                </td>
                            ),
                            status: (item: any) => (
                                <td onClick={(e) => handleOnclick(e, item)}>
                                    <Tag color={getBadgeTags(item?.status)}>{t(item?.status)}</Tag>
                                </td>
                            ),
                            created_at: (item: any) => (
                                <td onClick={(e) => handleOnclick(e, item)}>
                                    <Tooltip title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                                </td>
                            ),
                            remark: (item: any) => {
                                return (
                                    <td onClick={(e) => handleOnclick(e, item)} className="py-2">
                                        {item?.remark ? <span className='text-danger'>{item?.remark}</span> : <em style={{ color: "#888" }}>{t("No data")}</em>}
                                    </td>
                                )
                            },
                            note: (item: any) => {
                                return (
                                    <td onClick={(e) => handleOnclick(e, item)} className="py-2">
                                        {item?.nodere ? <span className='text-danger'>{item?.nodere}</span> : <em style={{ color: "#888" }}>{t("No data")}</em>}
                                    </td>
                                )
                            },
                        }}
                        // selectable
                        sorterValue={{ column: 'created_at', state: 'desc' }}
                        tableFilter
                        tableBodyProps={{
                            className: 'align-middle    font-400',

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
                />
            </>
        }
    }
    return (<>
        {contextHolder}
        <ModelDetailsDepositManual setVisible={setVisible} visible={visible} data={isData} t={t} config={config} itemContext={itemContext} />
        <Divider orientation="left" className='mt-0'>{t(`รายการฝาก (มือ) วันที่ ${start} -  ${recentTransactions?.length} รายการ`)}</Divider>
        {MainContainer(recentTransactions || [])}

    </>);
}

export default Index;