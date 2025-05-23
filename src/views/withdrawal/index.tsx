
import { Tabs, Statistic, message, Divider, Table, Card, Tag, Tooltip, Input, Select, Modal, Button, notification, Flex, Dropdown, Space, Spin } from 'antd';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
import {
    CSmartTable,
} from '@coreui/react-pro'
import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'
import 'moment/locale/th'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { DataContext } from 'src/layout/DefaultLayout'
import { useTranslation } from 'react-i18next'
import Apibank from 'src/api/Apibank'
import { ModelDetailsVerifyWithdraw, ModelWithdrawalDetails } from "src/views/model/index"
import config from 'src/config/app.config';
import moment from 'moment'
import { LoadingOutlined, CloseOutlined, SyncOutlined, ClockCircleOutlined, FileDoneOutlined, CloudUploadOutlined, CheckOutlined, QrcodeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { TabsProps, TableProps } from 'antd';
import PickerDate from './pickerDate'
import { TabelData } from './tabelData';
import type { StatisticProps } from 'antd';
import CountUp from 'react-countup';
import type { GetProps } from 'antd';
import Apiauth from 'src/api/Apiauth';
import AppUploadSlip from './uploadSlip';
type SearchProps = GetProps<typeof Input.Search>;
type Item = {
    member_id: any
    ref: any
    remark: any
    nodere: any
    amount: any
    members: {
        bankId: any
        bankAccountNumber: any
        name_member: any
    }
    name_member: any
    status: any
    created_at: any
    transaction_bank: {
        status_pay: any
    }
}
import type { NotificationArgsProps } from 'antd';
type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { TransferManual } from './trabsferManual';
import TransactionSlip from './transactionSlip';
import { TableTableSearch } from './tableDataSearch';
const Withdrawal = () => {
    const itemContext: any = useContext<any | []>(DataContext)
    const [messageApi, contextHolder]: any = message.useMessage()
    const [loadding, setLoadding]: any = useState(false)
    const [visible, setVisible] = useState<boolean>(false)
    const [visiblem2, setVisiblem2] = useState<boolean>(false)
    const [isData, setIsData] = useState<any>('')
    const [data_itmsm, setData_itmsm] = useState<any>('')
    const [showTableSearch, setShowTableSearch] = useState<boolean>(false);
    const [tableDataSearch, setTableDataSearch] = useState<any | []>([])

    const { t }: any = useTranslation("");
    const { Search } = Input;
    const { Option } = Select;
    const success = (msg: any) => {
        messageApi.open({
            type: 'success',
            content: `${msg}`,
        })
    }
    const error = (msg: any) => {
        messageApi.open({
            type: 'error',
            content: `${msg}`,
        })
    }
    const [api, contextHolderNotification] = notification.useNotification();

    const openNotification = (type: NotificationType, msg: any) => {
        api[type]({
            message: `Notification`,
            description: msg,
            placement: "topRight",
        });
    };
    const columns2 = [
        { key: 'member_id', filter: true, sorter: false },
        {
            key: 'BankAccount',
            label: `${t('Bank Account ')}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        { key: 'name_member', label: `${t('Name ')}`, _style: { width: '250px' }, },
        { key: 'amount', },
        { key: 'status', },
        { key: 'ref', },
        { key: 'remark', label: `${t('Remark')}`, _style: { width: '250px' }, },
        { key: 'nodere', label: `${t('Note')}`, _style: { width: '250px' }, },
        { key: 'created_at', },
        { key: 'Advanced', },
    ]

    const transferconfirmation = (data: any) => {
        setLoadding(true)
        Apibank.transferconfirmation(data)
            .then((res) => {
                if (res.data.success) {
                    itemContext?.get_data_wit()
                    setLoadding(false)
                    setVisible(!visible)
                    success(res.data.message)
                } else {
                    setLoadding(false)
                    setVisible(!visible)
                    error(res?.data?.message)
                }
                //
            })
            .catch((err: any) => {
                error(err.message)
                setLoadding(false)
                setVisible(!visible)
                console.log(err)
            })
        // console.log(data)
    }
    function handleOnclickInfo(params: any) {
        //console.log(params)
        if (params) {
            setIsData(params)
            setVisiblem2(!visiblem2)
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
            return `xxx ${numberAcc}`;
        }
        let length = numberAcc?.length;
        const middleFour = numberAcc?.slice(6, length);
        return `xxx ${middleFour}`;
    }
    const handleCopy = (text: any, data: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                handleOnclickInfo(data)
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
    // ************************************************* //
    const [columnFilter, setColumnFilter]: any = useState({})
    const [columnSorter, setColumnSorter]: any = useState()
    function getCheckStatus(status: any) {
        if (status == "inq") {
            return "in_Queue"
        }
        return status
    }
    const fetchDatePicker = (event: any) => {
        const offset = (itemContext?.activePageWit - 1) * itemContext?.itemsPerPageWit
        let data = {
            offset: offset,
            limit: itemContext?.itemsPerPageWit,
            sort: "id",
            startDate: event?.startDate,
            endDate: event?.endDate,
        }
        if (event?.startDate && event?.endDate) {
            itemContext?.setLoadding(true)
            Apibank.gtdata_withdraws(data)
                .then((res) => {
                    if (res?.data?.success == true) {
                        setTimeout(() => {
                            itemContext?.setLoadding(false)
                            itemContext?.setRecordsWithdraws(res?.data?.data?.count)
                            itemContext?.setRecordsPandingWithdraws(res?.data?.datapanding?.count)
                            itemContext?.setIsDataItemWithdraw(res?.data?.data?.count ? res?.data?.data?.rows : [])
                            itemContext?.setIsDataItemPendingWithdraw(res?.data?.datapanding?.count ? res?.data?.datapanding?.rows : [])
                        }, 1000)
                        //console.log(res?.data);
                        // 
                    } else {
                        setLoadding(false)
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
        // console.log(key)
        itemContext?.setActivePageWit?.(1);
        itemContext?.setOpenUpdate(true)
    };
    const [handleName, setHandleName]: any = useState<any>("ref")
    const [handleTypeInput, setHandleTypeInput]: any = useState<any>("search")
    const [inputValue, setInputValue] = useState('');
    const onSearchselect = (event: any) => {
        setHandleName(event)
    }
    const [xClose, setXClose] = useState<boolean>(false)
    const clearInput = () => {
        setInputValue('');
        setXClose(false);
        setShowTableSearch(false)
        itemContext?.setActivePageWit?.(1)
        itemContext?.get_data_wit()
    };
    const onInputChange = (event: any) => {
        setInputValue(event.target.value);
    };
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
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
                        setXClose(true)
                        setShowTableSearch(true)
                        setTimeout(() => {
                            itemContext?.setLoadding(false);
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
    const operations = <div className='col-sm-auto col-md-100 '>
        {/* <label className='d-flex mb-1' style={{ marginLeft: 5, marginRight: 5 }}><CalendarOutlined className='me-1' style={{ display: "inline-grid" }} /> {t('Search')} : </label> */}
        <p></p>
        <PickerDate fetchDatePicker={fetchDatePicker} t={t} startDate={moment().format("YYYY-MM-DD")} endDate={moment().format("YYYY-MM-DD")} />
    </div>;
    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp end={value as number} separator="," />
    );
    const footer: any = [

        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: `Page : ${itemContext?.activePageWit}`,
        },
        {
            _style: {
                fontWeight: '700'
            },
            _props: {
                align: 'middle',
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
            },
            label: `${t(`ยอดรวม`)}`,
        },
        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: `( ${itemContext?.itemsPerPageWit} รายการ )`,
        },
        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: ``,
        },
        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: ``,
        },
        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: ``,
        },
        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: ``,
        },
        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: ``,
        },
        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: ``,
        },
        {
            _props: {
                color: `${itemContext?.totalPending > 0 && 'info' || itemContext?.totalPending < 0 && 'info' || itemContext?.totalPending == 0 && 'success'}`,
                align: 'middle'
            },
            label: itemContext?.loadding ? <><i className='bx bx-loader-circle bx-spin' style={{ color: "#888888" }}  ></i></> : <Statistic valueStyle={{ color: "#888" }} value={`-${itemContext?.totalPending}`} precision={2} formatter={formatter} />,
        },

    ]
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
    const [switchLoadding, setSwitchLoadding]: any = useState(0)
    const [switchLoadding2, setSwitchLoadding2]: any = useState(0)
    const [VerifyInfoLoadding, setVerifyInfoLoadding]: any = useState(false)
    const [loadingModel, setLoadingModel]: any = useState(false)
    const [modal, contextHolderManual] = Modal.useModal();
    const Manual_QR = (item: any) => {
        setVerifyInfoLoadding(true)
        setSwitchLoadding(item?.id)
        setSwitchLoadding2(item?.id)
        setLoadingModel(true)
        if (item?.id) {
            Apibank.getUpdate_autokbank({ transaction_id: item?.id })
                .then((res) => {

                    if (res.data.success) {
                        toggleBtnOk_QR(item?.id)
                        setLoadingModel(false)

                        modelManual_QR(res?.data, item)
                        setSwitchLoadding2(0)
                        setSwitchLoadding(0)
                        setVerifyInfoLoadding(false)
                        openNotification("success", res.data.message)
                    } else {
                        openNotification("error", res.data.message == "Error ไม่สามารถ login ได้" ? `ไม่สามารถ login ได้ กรุณาเปิดใช้บัญชี kbank (ถอน) อื่นก่อนค่ะ` : res.data.message)
                        itemContext?.get_data_wit()
                        setSwitchLoadding2(0)
                        setSwitchLoadding(0)
                        setVerifyInfoLoadding(false)
                    }
                }).catch((err) => {
                    setVerifyInfoLoadding(false)
                    setSwitchLoadding(0)
                    setSwitchLoadding2(0)
                    openNotification("error", err.message)
                })
            return
        } else {
            openNotification("error", "ข้อมูลไม่ถูกต้อง")
            setSwitchLoadding2(0)
            setSwitchLoadding(0)
        }
    };
    const Manual_Slip = (item: any) => {
        setVerifyInfoLoadding(true)
        setSwitchLoadding2(item?.id)
        setSwitchLoadding(item?.id)
        setLoadingModel(true)
        if (item?.id) {
            Apibank.getUpdate_stust_Manual({ transaction_id: item?.id })
                .then((res) => {

                    if (res.data.success) {
                        const msg: any = res?.data?.message;
                        const targetWord: any = msg?.split(" ").pop();
                        if (itemContext?.dataAdmin?.data?.name !== targetWord) {
                            openNotification("error", `แอดมิน ${targetWord} กำลังทำรายการ`)
                            return
                        }
                        toggleBtnOk_Slip(item?.id)
                        setLoadingModel(false)
                        itemContext?.get_data_wit()
                        modelManual_Slip(item)
                        setSwitchLoadding2(0)
                        setSwitchLoadding(0)
                        setVerifyInfoLoadding(false)
                        openNotification("success", res.data.message)
                    } else {

                        setSwitchLoadding2(0)
                        setSwitchLoadding(0)
                        modelManual_Slip(item)
                        openNotification("error", res.data.message)
                        setVerifyInfoLoadding(false)
                    }
                }).catch((err) => {
                    console.log(err)
                    setVerifyInfoLoadding(false)
                    setSwitchLoadding(0)
                    setSwitchLoadding2(0)
                    openNotification("error", err.message)
                })
            return
        } else {
            openNotification("error", "ข้อมูลไม่ถูกต้อง")
            setSwitchLoadding(0)
            setSwitchLoadding2(0)
        }
    }
    const onChangeModel = (id: any) => {
        setSwitchLoadding(0)
        if (id) {
            CheckStatusManual_Tranfer(id)
        }
    }
    const CheckStatusManual_Tranfer = (id: any) => {
        setSwitchLoadding(id)
        setVerifyInfoLoadding(true)
        setLoadingModel(true)
        Apibank.getChack_stuaus_kbank({ transaction_id: id })
            .then((res) => {
                if (res.data.success) {
                    itemContext?.get_data_wit()
                    toggleBtnOk_QR(id)
                    setLoadingModel(false)
                    setVerifyInfoLoadding(false)
                    openNotification("success", res.data.message)
                    setSwitchLoadding(0)
                } else {
                    openNotification("error", res.data.message)
                    setVerifyInfoLoadding(false)
                    setSwitchLoadding(0)
                    setLoadingModel(false)
                }
            }).catch((err) => {
                setVerifyInfoLoadding(false)
                openNotification("error", err.message)
                setLoadingModel(false)
                setSwitchLoadding(0)
            })
    }
    const [btnOk_QR, setBtnOk_QR]: any = useState<number | []>([])
    const toggleBtnOk_QR = (index: any) => {
        const position = btnOk_QR.indexOf(index)
        let newDetails = btnOk_QR.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
            localStorage.removeItem(`toggleBtnOkQR-id-${index}`)
        } else {
            localStorage.setItem(`toggleBtnOkQR-id-${index}`, `true`)
            newDetails = [...btnOk_QR, index]
        }
        setBtnOk_QR(newDetails)
    }
    const [btnOk_Slip, setBtnOk_Slip]: any = useState<number | []>([])
    const toggleBtnOk_Slip = (index: any) => {
        const position = btnOk_Slip.indexOf(index)
        let newDetails = btnOk_Slip.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
            localStorage.removeItem(`toggleBtnOkSlip-id-${index}`)
        } else {
            localStorage.setItem(`toggleBtnOkSlip-id-${index}`, `true`)
            newDetails = [...btnOk_Slip, index]
        }
        setBtnOk_Slip(newDetails)
    }
    const modelManual_QR = (item: any, dataMember: any) => {
        modal.confirm({
            title: <Divider orientation="left" plain> <span style={{ color: "#888" }}><QrcodeOutlined /> {t('QRCode transfer')}</span></Divider>,
            icon: null,
            className: "main-trans",
            width: "545px",
            content: <>
                <TransferManual data={item} dataMember={dataMember} openNotification={openNotification} config={config} />
                <br />
            </>,

            style: { justifyContent: "center" },
            cancelText: "ปิด",
            // okButtonProps: { style: { display: 'none' } },
            onCancel: () => onChangeModel(item?.data_tranfer?.id),
            onOk: () => CheckStatusManual_Tranfer(item?.data_tranfer?.id),
            okText: <>{loadingModel ? ' Loading...' : "ยืนยันรายการสำเร็จแล้ว"}</>
        });
    }
    const modelManual_Slip = (item: any) => {
        modal.confirm({
            title: <Divider orientation="left" plain> <span style={{ color: "#888" }}><CloudUploadOutlined /> {t('Upload Slip')}</span></Divider>,
            icon: null,
            className: "main-trans",
            width: "545px",
            content: <>
                <AppUploadSlip data={item} dataMember={item} toggleBtnOk_Slip={toggleBtnOk_Slip} openNotification={openNotification} config={config} />
                <br />
            </>,
            style: { justifyContent: "center" },
            cancelText: "ปิด",
            okButtonProps: { style: { display: 'none' } },
            onCancel: () => onChangeModel(null),
        });
    }
    const funcVerifyInfo = (item: any) => {
        setSwitchLoadding2(item?.id)
        setVerifyInfoLoadding(true)
        let postData = {
            transaction_id: item?.id,
        }
        Apibank.getVerifyInfo(postData)
            .then((res) => {
                if (res.data.success) {
                    itemContext?.get_data_wit()
                    setVerifyInfoLoadding(false)
                    setSwitchLoadding2(0)
                    openNotification("success", res.data.message)
                } else {
                    itemContext?.get_data_wit()
                    openNotification("warning", res.data.message)
                    setSwitchLoadding2(0)
                    setVerifyInfoLoadding(false)
                }
            }).catch((err) => {
                setSwitchLoadding2(0)
                openNotification("error", err.message)
                setVerifyInfoLoadding(false)
            })
    }
    const getStatusTransfer = (item: any) => {
        if (!item) {
            openNotification("error", 'ข้อมูลไม่ถูกต้อง')
            return
        }
        setVerifyInfoLoadding(true)
        let uuid = {
            instructionRefNo: item?.uuid
        }
        Apibank.getInstructionViewType(uuid)
            .then((res) => {
                if (res?.data?.success) {
                    getDetailTrans(res?.data)
                    setVerifyInfoLoadding(false)
                } else {
                    openNotification("error", res?.data?.message)
                    setVerifyInfoLoadding(false)
                }

            }).catch((err) => {
                openNotification("error", err.message)
                setVerifyInfoLoadding(false)
            })
    }
    function getTargetWord(txt: any) {
        const msg: any = txt;
        if (!msg) {
            return null
        }
        const targetWord: any = msg?.split(" ").pop();
        return targetWord
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
    function extractWithdrawalInfo(text: any, status: any) {
        const prefix = 'รอถอน manual โดย แอดมิน';
        if (text?.startsWith?.(prefix)) {
            return <>{getTargetStatus?.(status) ? <>Manual system By <b>{getTargetWord?.(text)}</b></> : `แอดมิน ${getTargetWord?.(text)} กำลังทำรายการ...`}</>;
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
    const getDetailTrans = (item: any) => {
        if (!item) {
            openNotification("error", 'ข้อมูลไม่ถูกต้อง')
            return
        }
        modelDetailTrans(item)
    }
    const modelDetailTrans = (item: any) => {
        modal.confirm({
            title: <Divider orientation="left" plain> <span style={{ color: "#888", fontStyle: "20px" }}><CheckOutlined /> {t('ตรวจสอบสถานะการโอนเงิน')}</span></Divider>,
            icon: null,
            className: "",
            width: "464px",
            content: <>
                <TransactionSlip SlipData={item} config={config} openNotification={openNotification} />
            </>,
            cancelText: "ปิด",
        });
    }
    const [highlightedTimes, setHighlightedTimes] = useState<string[]>([]);
    useEffect(() => {
        const updateHighlight = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const currentTime = `${hours}.${minutes}`;
            const shouldHighlight = [
                '23.00-01.25',
            ].filter(range => {
                const [start, end] = range.split('-');
                const [startHour, startMinute] = start.split('.').map(Number);
                const [endHour, endMinute] = end.split('.').map(Number);
                const [currentHour, currentMinute] = currentTime.split('.').map(Number);
                const startTimeInMinutes = startHour * 60 + startMinute;
                const endTimeInMinutes = endHour * 60 + endMinute;
                const currentTimeInMinutes = currentHour * 60 + currentMinute;
                if (startHour > endHour) {
                    return currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes < endTimeInMinutes;
                } else {
                    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
                }
            });
            setHighlightedTimes(shouldHighlight);
        };
        updateHighlight();
        const intervalId = setInterval(updateHighlight, 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);
    function MainContainer() {
        const items: TabsProps['items'] = [
            {
                key: '1',
                label: `${t("Withdrawal List")} : ( ${itemContext?.recordsWithdraws < 0 ? 0 : Intl.NumberFormat().format(itemContext?.recordsWithdraws)} )`,
                children: <>
                    <TabelData t={t} getStatusTransfer={getStatusTransfer} itemContext={itemContext} loadding={itemContext?.loadding} setVisiblem2={setVisiblem2} setVisible={setVisible} visible={visible} visiblem2={visiblem2} setIsData={setIsData} />
                </>,
            },
            {
                key: '2',
                label: `${t("pending")} : ( ${itemContext?.recordsPandingWithdraws < 0 ? 0 : Intl.NumberFormat().format(itemContext?.recordsPandingWithdraws)} )`,
                children: <>
                    <CSmartTable
                        items={itemContext?.isDataItemPendingWithdraw || []}
                        columns={columns2}
                        loading={itemContext?.loadding}
                        footer={footer}
                        itemsPerPage={itemContext?.itemsPerPageWit}
                        itemsPerPageSelect
                        pagination={{
                            external: true,
                        }}
                        paginationProps={{
                            activePage: itemContext?.activePageWit,
                            pages: itemContext?.recordsPandingWithdraws > 0 ? Math.ceil(itemContext?.recordsPandingWithdraws / itemContext?.itemsPerPageWit) : 1,
                        }}
                        onActivePageChange={(page) => {
                            itemContext?.setActivePageWit(page);
                            itemContext?.setOpenUpdate(true)
                        }}
                        onColumnFilterChange={(filter) => {
                            itemContext?.setActivePageWit(1)
                            setColumnFilter(filter)
                        }}
                        onItemsPerPageChange={(pageSize) => {
                            itemContext?.setActivePageWit(1)
                            itemContext?.setItemsPerPageWit(pageSize)
                        }}
                        onSorterChange={(value) => setColumnSorter(value)}
                        tableFilter={false}
                        scopedColumns={{
                            member_id: (item: Item) => (
                                <td className='text-truncate' style={{ maxWidth: "100px", cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.member_id, item)}>
                                    {item?.member_id}
                                </td>
                            ),
                            ref: (item: Item) => (
                                <td className='text-truncate' style={{ maxWidth: "100px", cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.ref, item)}>
                                    {item?.ref || <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                                </td>
                            ),
                            remark: (item: Item) => (
                                <td title={item?.remark} style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.status, item)}>
                                    {item?.remark ? <span className='text-danger'>{item?.remark}</span> : <em style={{ color: "#88888880" }}>{t("No data")}</em>}
                                </td>
                            ),
                            nodere: (item: Item) => (
                                <td title={item?.nodere} style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={() => handleCopy(item?.nodere, item)}>
                                    <span style={{ color: `${funcColorNodere(item?.nodere, item?.status)}` }}>
                                        {item?.nodere == 'ถอนโดยระบบออโต้' ? <span style={{ color: `${item?.status == "inq" ? '#531dab' : '#1677ff'}` }}>{item?.status == "inq" ? 'อยู่ในคิว โอนเงิน...' : 'กำลังตรวจสอบ...'}</span> : item?.nodere == 'อยู่ในคิว รอดำเนิการ...' ? 'อยู่ในคิวรอโอน' : funcTxtNodere(item?.nodere, item?.status)}
                                    </span>
                                </td>
                            ),
                            amount: (item: Item) => (
                                <td onClick={(e: any) => handleCopy(item?.amount, item)} style={{ fontWeight: "700", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                                    {Intl.NumberFormat().format(item?.amount)}.-
                                </td>
                            ),
                            BankAccount: (item: Item) => (
                                <td onClick={(e: any) => handleCopy(item?.members?.bankId, item)} style={{ background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                                    <b>{getBadge_bank(item?.members?.bankId)}</b>
                                    , {formatAccnumID(item?.members?.bankAccountNumber)}<br />
                                </td>
                            ),
                            name_member: (item: Item) => (
                                <td onClick={() => handleCopy(item?.name_member, item)} style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} >
                                    {item?.name_member}
                                </td>
                            ),
                            status: (item: Item) => (
                                <td onClick={(e: any) => handleCopy(item?.status, item)} style={{ textTransform: "capitalize", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }}>
                                    <Tag icon={item?.status == "inq" ? <ClockCircleOutlined /> : item?.status == "inq_manual" ? <ClockCircleOutlined /> : <SyncOutlined spin />} color={getBadgeTags(item?.status)}><b>{getCheckStatus(item?.status)}</b></Tag>
                                </td>
                            ),
                            created_at: (item: Item) => (
                                <td style={{ cursor: "copy", background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}` }} onClick={(e: any) => handleCopy(item?.created_at, item)}>
                                    <Tooltip title={moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss")}>{FormatTimeAgo(item?.created_at)}</Tooltip>
                                </td>
                            ),
                            Advanced: (item: any) => {
                                return (
                                    <>
                                        <td className="py-1" style={{ background: `${getBgTags(item?.status)}`, color: `${getColorTags(item?.status)}`, cursor: "pointer" }}>
                                            <Flex vertical gap="small">
                                                {item?.status == "inq" || item?.status == "inq_manual" ? <>
                                                    <Tooltip title={`Note: รายการค้าง 10 นาที หรือ มากกว่า ให้กด rejected รายการออกไป`} color={"red"}>
                                                        <Button
                                                            loading={switchLoadding2 == item?.id}
                                                            type={item?.status == "inq" ? 'primary' : item?.status == "inq_manual" ? 'link' : 'default'}
                                                            onClick={() => funcVerifyInfo(item)}
                                                            style={{ borderColor: `${item?.status == "inq_manual" ? 'red' : item?.status == "inq" ? '#1890ff00' : ''}`, padding: "0px 10px", color: `${item?.status == "inq_manual" && 'red'}`, background: `${item?.status == "inq" && 'red'}` }}
                                                        >
                                                            {switchLoadding2 == item?.id ? " loading..." : <>{item?.status == "inq" ? <><CloseOutlined /> {"rejected"}</> : item?.status == "inq_manual" ? <><CloseOutlined /> {"rejected"}</> : item?.status}</>}
                                                        </Button>
                                                    </Tooltip>
                                                    {item?.status == "inq" && <Button
                                                        style={{ textTransform: "capitalize", padding: "0px 10px" }}
                                                        onClick={() => Manual_QR(item)}
                                                        className={`${highlightedTimes.includes("23.00-01.25") ? '' : 'd-none'}`}
                                                    >
                                                        {switchLoadding == item?.id ? ' loading...' : <><QrcodeOutlined /> {"Manual QR"}</>}
                                                    </Button>}
                                                    {/* Manual_QR */}
                                                    {localStorage?.getItem?.(`toggleBtnOkQR-id-${item?.id}`) == "true" && <>
                                                        <Button
                                                            loading={switchLoadding == item?.id}
                                                            style={{ textTransform: "capitalize", padding: "0px 10px", background: "#1677ff", color: "#fff" }}
                                                            onClick={() => onChangeModel(item?.id)}
                                                        >
                                                            {switchLoadding == item?.id ? ' loading...' : <><QrcodeOutlined /> {"ยืนยัน"}</>}
                                                        </Button>
                                                    </>}
                                                    {/* Manual_Slip */}
                                                    {localStorage?.getItem?.(`toggleBtnOkSlip-id-${item?.id}`) == "true" && <>
                                                        <Button
                                                            loading={switchLoadding == item?.id}
                                                            style={{ textTransform: "capitalize", padding: "0px 10px", background: "#1677ff", color: "#fff" }}
                                                            onClick={() => modelManual_Slip(item)}
                                                        >
                                                            {switchLoadding == item?.id ? ' loading...' : <><CloudUploadOutlined /> {"ทำต่อ"}</>}
                                                        </Button>
                                                    </>}
                                                </> : null}
                                                {item?.status == "processing" ?
                                                    <>
                                                        <Tooltip title={`Note: โอนเงินผ่านแอพ แล้วอัพสลิปเพื่อยืนยันการทำรายการ (ไม่แนะนำ)`} color={"red"}>
                                                            <Button
                                                                style={{ textTransform: "capitalize", padding: "0px 10px" }}
                                                                onClick={() => Manual_Slip(item)}
                                                            >
                                                                {switchLoadding == item?.id ? ' loading...' : <><CloudUploadOutlined /> {"Manual Slip"}</>}
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title={`Note: เข้าแอพ K-biz สแกนคิวอาร์โค้ดที่แสดงหน้าเว็ป แล้วกด ยืนยันการทำรายการ (แนะนำ)`} color={"geekblue"}>
                                                            <Button
                                                                style={{ textTransform: "capitalize", padding: "0px 10px" }}
                                                                onClick={() => Manual_QR(item)}
                                                            >
                                                                {switchLoadding == item?.id ? ' loading...' : <><QrcodeOutlined /> {"Manual QR"}</>}
                                                            </Button>
                                                        </Tooltip>
                                                    </>
                                                    : null
                                                }
                                                {item?.status == "success" ? <>
                                                    <Tooltip title="เช็คสถานะการโอนเงิน" >
                                                        <Button onClick={() => getStatusTransfer(item)} disabled={item?.status != "success"} shape="circle" icon={<FileDoneOutlined />} />
                                                    </Tooltip>
                                                </> : null}
                                            </Flex>
                                        </td>
                                    </>
                                )
                            },
                        }}
                        onFilteredItemsChange={(items) => {
                            // ค้นหา
                        }}
                        onSelectedItemsChange={(items) => {
                            // console.log(items)
                        }}
                        tableBodyProps={{
                            className: 'align-middle font-500',
                        }}
                        tableProps={{
                            className: 'add-this-classaninationleft aninationleft',
                            responsive: true,
                            striped: false,
                            hover: true,
                            bordered: true,
                            borderless: false,
                        }}
                    // sorterValue={{ column: 'created_at', state: 'asc' }}
                    />,
                </>
            },
        ];
        //console.log(data)
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
                    addonBefore={selectAfter}
                />}
                // loading={loadding}
                title={operations}
                styles={{ header: { display: "" } }}
                children={<>
                    {!showTableSearch ? <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        :
                        <TableTableSearch 
                        data={tableDataSearch} 
                        handleCopy={handleCopy} 
                        t={t} 
                        getStatusTransfer={getStatusTransfer}
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
                         />
                    }
                </>}
            />
        </>
    }
    function MainModel(isData: any) {
        if (!isData) {
            return
        }
        return <>
            <ModelWithdrawalDetails t={t} getBadgeTags={getBadgeTags} data={isData} itemContext={itemContext} visiblem2={visiblem2} setVisiblem2={setVisiblem2} config={config} handleCopy={handleCopy} />
            <ModelDetailsVerifyWithdraw
                setVisible={setVisible}
                visible={visible}
                data_itmsms={data_itmsm}
                setLoadding={setLoadding}
                transferconfirmation={transferconfirmation}
                t={t}
                
            />
        </>
    }
    return (
        <>
            {contextHolder}
            {contextHolderManual}
            {contextHolderNotification}
            <Spin spinning={VerifyInfoLoadding} fullscreen />
            {MainModel(isData)}
            <Divider orientation="left" className='mt-0'>{t("Total withdrawal list", { counter: Intl.NumberFormat().format(itemContext?.recordsWithdraws) + ' / ' + itemContext?.recordsPandingWithdraws })}</Divider>
            {MainContainer()}
        </>
    )
}
export default Withdrawal
