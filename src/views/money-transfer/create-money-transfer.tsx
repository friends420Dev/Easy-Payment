import React, { useState, useReducer, useEffect, useContext, useRef } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CForm,
    CCol,
    CRow,
    CFormInput,
    CFormSelect,
} from '@coreui/react-pro'
// import Select from 'react-select'
import { Alert, Upload, message, Spin, Select, Button, Divider, Flex, Image, Space, Tooltip, QRCode, Input, notification, Empty, Result } from 'antd'
import { useTranslation } from 'react-i18next'
import Api from 'src/api/Api'
import Swal from 'sweetalert2/src/sweetalert2.js'
import Apibank from 'src/api/Apibank'
import Apisetting from 'src/api/Apisetting'
import { AddLoadding } from 'src/components'
import { CheckCircleOutlined, LeftOutlined, LoadingOutlined, ReloadOutlined, SyncOutlined, } from '@ant-design/icons';
import { DataContext } from 'src/layout/DefaultLayout';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import config from 'src/config/app.config'
const { TextArea } = Input;
var document: Document
import ImageSelectFromBankaccount, { ImageSelectToBankaccount } from './imageSelect'; // แทนที่ด้วย path ที่ถูกต้อง
import moment from 'moment'
const CreateMoneyTransfer = () => {
    const itemContext: any = useContext<any>(DataContext)
    const [api, contextHolder] = notification.useNotification();

    //  รวม Array
    function combineArraysUnique(array1: any, array2: any) {
        const uniqueSet = new Set();
        array1.forEach((item: any) => uniqueSet.add(JSON.stringify(item)));
        array2.forEach((item: any) => uniqueSet.add(JSON.stringify(item)));
        return Array.from(uniqueSet).map((item: any) => JSON.parse(item));
    }
    const [bankGroupId, setBankGroupId]: any = useState("")

    function getActiveBankAccounts(): any[] {
        const activeBankAccounts = itemContext?.bankAccount?.data?.filter((bank: any) => bank?.isActive === true) || [];
        setBankGroupId(activeBankAccounts?.length > 0 ? activeBankAccounts[0]?.name || [] : [])
        setState({
            data: activeBankAccounts?.length > 0 ? activeBankAccounts[0]?.bankAccounts || [] : [],
        })
        return activeBankAccounts?.length > 0 ? activeBankAccounts[0]?.bankAccounts || [] : [];
    }

    const [loadding, setLoadding]: any = useState(false)
    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
        data: [],
    })
   
    const openNotificationWithIcon = (type: NotificationType, msg: any) => {
        api[type]({
            message: type,
            description:
                msg,
        });
    };
    const { t }: any = useTranslation('')
    const [loading, setLoading] = useState<boolean>(false);
    const [spinLoading, setSpinLoading] = useState<number>(0);
    const [statusEmpty, setStatusEmpty] = useState<boolean>(true);
    const [statusResult, setStatusResult] = useState<boolean>(false);
    const [txtRemark, setTxtRemark]: any = useState<any>("")
    const [selectedOptions, setSelectedOptions] = useState<any>({
        FormAccountNumber: "",
        amount: "",
        ToAccountNumber: "",
    })
    const [dataFormBankAccount, setDataFormBankAccount]: any = useState<any>("")
    const [dataToBankAccount, setDataToBankAccount]: any = useState<any>("")
    function fillterAccnumber(accountNumber: any) {
        const item = state?.data?.filter((acc: any) => (acc?.accountNumber === accountNumber));
        if (item?.length == 0) {
            return t("No data")
        }
        let name: any = item[0]
        return name
    }
    function fillterDataAccTo(id: any) {
        const item = state?.data?.filter((acc: any) => (acc?.id != id));
        if (item?.length == 0) {
            return t("No data")
        }
        return item
    }
    function handleSelect(event: any) {
        setSelectedOptions({ ...selectedOptions, [event.target.name]: event.target.value })
        setStatusEmpty(false)
    }
    //
    function checkAmount(amount: any) {
        // ตรวจสอบว่า amount เป็นตัวเลขหรือไม่
        if (isNaN(amount)) {
            console.log('กรุณากรอกจำนวนเงินเป็นตัวเลข');
            setSelectedOptions({
                amount: "",
            })
            return false;
        }
        // ตรวจสอบว่า amount มีค่ามากกว่าหรือเท่ากับ 1
        if (amount < 1) {
            console.log('จำนวนเงินต้องมากกว่าหรือเท่ากับ 1 บาท');
            setSelectedOptions({
                amount: "",
            })
            return false;
        }
        // ตรวจสอบเลข 0 นำหน้า
        if (amount.toString().startsWith('0')) {
            console.log('จำนวนเงินไม่สามารถมีเลข 0 นำหน้าได้');
            setSelectedOptions({
                amount: "",
            })
            return false;
        }
        return true;
    }
    function handleReset() {
        setDataFormBankAccount("")
        setSelectedValue("")
        setSelectedValueToAccount("")
        setDataToBankAccount("")
        setDataResult("")
        setStatusEmpty(true)
        setStatusResult(false)
        setSelectedOptions({
            amount: "",
        });
        itemContext?.getBankAccount()
    }
    const onChangeRemark = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTxtRemark(e.target.value)
        // console.log('Change:', e.target.value);
    };

    function funCheckRole(role: any) {
        if (!role) {
            return false
        }
        if (role == "Owner") {
            return true
        } else if (role == "Subowner") {
            return true
        } else if (role == "Manager") {
            return true
        } else if (role == "Accounting") {
            return true
        } else if (role == "Head_Accounting") {
            return true
        } else if (role == "Head_Cs") {
            return true
        } else {
            return false
        }
    }
    var roles: any = funCheckRole(itemContext?.dataAdmin?.name);
    // ******************************************* //
    useEffect(() => {
        getActiveBankAccounts?.()
    }, []);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValueToAccount, setSelectedValueToAccount] = useState('');
    const [FormAccountNumber, setFormAccountNumber] = useState('');
    const [ToAccountNumber, setToAccountNumber] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [dataResult, setDataResult] = useState<any>('');

    const [dataSelectToAccount, setDataSelectToAccount] = useState([]);
    let postData = {
        FormAccountNumber: FormAccountNumber,
        FormAccountId: selectedValue,
        amount: parseInt(selectedOptions?.amount || 0), //จำนวนเงิน
        ToAccountNumber: ToAccountNumber,
        ToAccountId: selectedValueToAccount,
        remark: txtRemark // หมายเหตุ
    }
    const [dataFormAccount, setDataFormAccount]: any = useState<any>("")
    const [dataToAccount, setDataToAccount]: any = useState<any>("")

    const handleSelectChange = (event: any, data: any) => {
        let d = fillterDataAccTo(data?.id)
        if (d?.length > 0) {
            setDataSelectToAccount(d)
            setStatusEmpty(false)
        }
        setDataFormBankAccount(data)
        setSelectedValue(data?.id);
        setFormAccountNumber(data?.accountNumber)
        setDataFormAccount(data)
        setIsOpen(!isOpen)
    };
    const handleSelectChangeToAccount = (event: any, data: any) => {
        setDataToBankAccount(data)
        setDataToAccount(data)
        if (data) {
            setStatusEmpty(false)
        }
        setSelectedValueToAccount(data?.id);
        setToAccountNumber(data?.accountNumber)
        setIsOpenSelect(!isOpenSelect)
    };
    const [dissabled, setDissabled] = useState<number>(0)
    const funOnSubmit = async (event: any) => {
        event.preventDefault()
        setLoading(true)
        if (!postData?.FormAccountId || !postData?.ToAccountId || !postData?.amount || postData?.amount == 0) {
            openNotificationWithIcon("error", 'ตรวจสอบข้อมูลให้ถูกต้อง')
            setTimeout(() => {
                setLoading(false)
            }, 2500)
            return
        }
        if (dissabled != 0) {
            alert("!!คำเตือน : การยิง require ติดๆกัน อาจทำให้ บัณชีถูกแบบ ท่านจะอัพเดทยอดได้หลังจากเวลาผ่านไป 2 นาที นับจากที่ทำรายการสำเร็จก่อนน้านี้") 
            setLoading(false)
            return
        }
        let item = {
            FormAccountId: postData?.FormAccountId,
            amount: postData?.amount,
            ToAccountId: postData?.ToAccountId,
        }
        //console.log(postData)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success me-2 text-white",
                cancelButton: "btn btn-danger me-2 text-white"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "คุณแน่ใจที่จะทำรายการ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: " Yes! confirm",
            cancelButtonText: " No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Apibank.transferMoney(item)
                    .then((res) => {
                        //console.log(res?.data)
                        itemContext?.getBankAccount()
                        if (res.data.success) {
                            setDissabled(1)
                            setDataFormBankAccount("")
                            setDataToBankAccount("")
                            setSelectedValue("")
                            setSelectedValueToAccount("")
                            setDataResult(res.data.data)
                            setStatusResult(true)
                            openNotificationWithIcon("success", res.data.message)
                            setLoading(false)
                            setSelectedOptions({
                                amount: "",
                            })
                            setTimeout(() => {
                                setDissabled(0)
                            }, 120000)
                        } else {
                            setSelectedOptions({
                                amount: "",
                            })
                            setDataFormBankAccount("")
                            setDataToBankAccount("")
                            setStatusResult(false)
                            openNotificationWithIcon("error", res.data.message)
                            setLoading(false)
                        }
                    }).catch((err) => {
                        openNotificationWithIcon("error", err.message)
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                setLoading(false)
                openNotificationWithIcon("error", "!! ยกเลิกการทำรายการแล้ว")
                setDataFormBankAccount("")
                setDataToBankAccount("")
                setSelectedValue("")
                setSelectedValueToAccount("")
                setSelectedOptions({
                    amount: "",
                })
                setTimeout(() => {
                    setStatusEmpty(true)
                    setStatusResult(false)
                }, 2000)
            }
        });
        //console.log(data)
    }
    function ReList() {
        setDataFormBankAccount("")
        setSelectedValue("")
        setSelectedValueToAccount("")
        setDataToBankAccount("")
        setDataResult("")
        setStatusEmpty(true)
        setStatusResult(false)
        setSelectedOptions({
            amount: "",
        });
        itemContext?.getBankAccount()
    }
    function formatAccnumID(numberAcc: any) {
        //console.log(numberAcc)
        if (numberAcc?.length < 9) {
            return `xxx xxx ${numberAcc}`;
        }
        let length: any = numberAcc?.length;
        const middleFour: any = numberAcc?.slice(6, length);
        return `xxx xxx ${middleFour} `;
    }
    function downloadImageFromUrl(imageUrl: any) {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `downloaded_image_${moment().format("YYYY-MM-DD")}.svg`; // กำหนดชื่อไฟล์และนามสกุล
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url); // ล้าง object URL
                document.body.removeChild(a); // ลบ element a ออกจาก DOM
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    }

    const get_balance_summerys = (id: number) => {
        //console.log(params)
        setSpinLoading(id)
        if (dissabled != 0) {
            alert("!!คำเตือน : การยิง require ติดๆกัน อาจทำให้ บัณชีถูกแบบ ท่านจะอัพเดทยอดได้หลังจากเวลาผ่านไป 2 นาที นับจากที่อัพเดทยอดสำเร็จก่อนน้านี้")
            setSpinLoading(0)
            return
        }
        Apibank.get_balance_summery({ id: id })
            .then((res: any) => {
                //
                if (res.data.success) {
                    setDissabled(id)
                    itemContext?.getBankAccount()
                    setTimeout(() => {
                        setSpinLoading(0)
                    }, 1000)
                    setTimeout(() => {
                        setDissabled(0)
                    }, 120000)
                } else {
                    setSpinLoading(0)
                    setTimeout(() => {
                        setDissabled(0)
                    }, 120000)
                }
            }).catch((error: any) => {
                error(error.message)
            })
    }
    function mainResult(res: any) {
        if (!res) {
            return false
        }

        return <>
            <div id='slip' className={`slip  ${statusResult && "aninationright"}`} >

                <div className="header-slip">
                    <h5 style={{ color: "#52c41a" }}><CheckCircleOutlined style={{ color: "#52c41a" }} /> Successfully!</h5>
                </div>
                <Divider orientation="center" plain>
                    <span className='h5'>{t("รายละเอียด")}</span>
                </Divider>
                <div className="info-slip">
                    <p><strong>วันที่:</strong> {moment(res?.QrScanner?.data?.transactionDateTime).format("YYYY-MM-DD HH:mm:ss")}</p>
                    <p><strong>transId:</strong> {dataResult?.QrScanner?.data?.transactionId}</p>
                    <p><strong>จากบัญชี:</strong>

                        <span style={{ fontWeight: "600" }}><img src={dataFormAccount?.bank?.imageUrl} alt={dataFormAccount?.accountName} style={{ width: '20px', height: '20px', marginRight: '8px', }} /> {dataFormAccount?.accountName}</span>
                    </p>
                    <p><strong></strong>
                        {formatAccnumID(dataFormAccount?.accountNumber)}
                    </p>
                    <p><strong>ไปยังบัญชี:</strong>

                        <span style={{ fontWeight: "600" }}><img src={dataToAccount?.bank?.imageUrl} alt={dataToAccount?.accountName} style={{ width: '20px', height: '20px', marginRight: '8px', }} /> {dataToAccount?.accountName}</span>
                    </p>
                    <p><strong></strong>
                        {formatAccnumID(dataToAccount?.accountNumber)}
                    </p>
                    <p><strong>จำนวนเงิน:</strong> {Intl.NumberFormat().format(res?.amount)} ฿</p>
                </div>
                {/* <Divider></Divider> */}
                <div className="text-left d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    {/* <p><strong>{res?.QrScanner?.data?.additionalMetaData?.paymentInfo[0]?.type || 'QR Code'} :</strong></p> */}
                    {res?.QrScanner?.status?.code != 1000 ? '-' :
                        <>
                            <QRCode onClick={() => downloadImageFromUrl(res?.QrScanner?.data?.additionalMetaData?.paymentInfo[0]?.type)} className="me-3" style={{ overflow: "unset", }} value={`${res?.QrScanner?.data?.additionalMetaData?.paymentInfo[0]?.QRstring}`} />
                            <p style={{ fontSize: "13px" }}>{'ผู้รับเงินสามารถสแกนคิวอาร์โค้ดนี้เพื่อตรวจสอบสถานะการโอนเงิน'}</p>
                        </>
                    }
                </div>
                <p></p>
                <Flex wrap gap="small">
                    
                    <CButton onClick={() => ReList()} variant="outline" type='reset' color="info"><ReloadOutlined /> {t("Re-List")}</CButton>
                </Flex>
                <p></p>
                <div className="footer-slip" style={{ color: "#888" }}>
                    <span>{t("version")} : {config.version}</span>
                </div>
            </div>
        </>
    }
    return (
        <>
            {contextHolder}
            <AddLoadding status={loadding} />
            <CRow>
                {roles && <>
                    <CCol xs={12}>
                        {/* <Alert className='mb-3' message="Notes: นี้เป็นเพียง Demo UI ยังไม่ได้เชื่อมต่อ API *เมื่อเชื่อมต่อระบบ ข้อความนี้จะหายไป" type="warning" showIcon /> */}
                        <CCol xs>
                            <Space>
                                <Tooltip title="backward">
                                    <Button onClick={() => window.location.assign(`/#/money-transfer`)} shape="circle" icon={<LeftOutlined style={{ display: "block" }} />} />
                                </Tooltip>
                                <b className='h5' >{t("Create Transfer Money")}</b>
                            </Space>
                            <CCard className="row flex-column flex-md-row align-items-md-center mt-3" id='vvvvvv'>
                                <CCardBody>
                                    <Spin spinning={loading} >
                                        <CRow>
                                            <CCol sm={12} md={5} lg={5} style={{ display: "grid", alignItems: "center" }}>
                                                <Divider orientation="left" plain>
                                                    <span className='h5'>{t("Create Transfer Money Info")}</span>
                                                </Divider>
                                                <CForm className="row mt-3"
                                                    onSubmit={funOnSubmit}
                                                >
                                                    <Flex gap="small" vertical>
                                                        <CCol className="mb-3">
                                                            <ImageSelectFromBankaccount statusResult={statusResult} options={state?.data} value={selectedValue} onChange={handleSelectChange} setIsOpen={setIsOpen} isOpen={isOpen} t={t} />
                                                        </CCol>
                                                        <CCol className="mb-3">
                                                            {dataSelectToAccount?.length > 0 ? <>
                                                                <ImageSelectToBankaccount statusResult={statusResult} postData={postData} options={dataSelectToAccount} value={selectedValueToAccount} onChange={handleSelectChangeToAccount} setIsOpen={setIsOpenSelect} isOpen={isOpenSelect} t={t} />
                                                            </> : <>
                                                                <CFormSelect
                                                                    autoFocus
                                                                    id="ToAccountNumber"
                                                                    name='ToAccountNumber'
                                                                    floatingLabel={t("To Bank Account")}
                                                                    aria-label="Floating label select example"
                                                                    disabled={selectedOptions?.FormAccountNumber == "" || selectedOptions?.FormAccountNumber == "-- เลือก --" || false}
                                                                >
                                                                    <option selected={!selectedOptions?.FormAccountNumber || !selectedOptions?.ToAccountNumber || !selectedOptions?.amount || true}>{t("Select")}</option>
                                                                </CFormSelect>
                                                            </>}
                                                        </CCol>
                                                        <CFormInput
                                                            type="number"
                                                            id="Amount"
                                                            name='amount'
                                                            autoFocus
                                                            floatingClassName="mb-3"
                                                            floatingLabel={t('Amount')}
                                                            placeholder="Enter Amount"
                                                            value={selectedOptions?.amount}
                                                            disabled={postData?.ToAccountNumber == "" || postData?.ToAccountNumber == "-- เลือก --" || statusResult || false}
                                                            onChange={handleSelect}
                                                        />
                                                        <label htmlFor='remark'>{"หมายเหตู (ถ้ามี)"}</label>
                                                        <TextArea id='remark' className='mb-3' showCount maxLength={100} name='remark' onChange={onChangeRemark} placeholder="หมายเหตู (ถ้ามี)" />
                                                    </Flex>
                                                    <Divider className='mt-4'></Divider>
                                                    <Flex wrap gap="small">
                                                        <CButton onClick={() => handleReset()} disabled={loading || statusResult || false} variant="outline" type='reset' color="danger">{t("cancel")}</CButton>
                                                        <CButton disabled={selectedOptions?.amount == "" || selectedOptions?.amount == "0" || statusResult || false} variant="outline" type='submit' color="primary">{!loading ? t("Confirm") : <Spin size="small" indicator={<LoadingOutlined spin />} />}</CButton>
                                                    </Flex>
                                                </CForm>
                                            </CCol>
                                            <CCol sm={12} md={7} lg={7} style={{ display: "grid", alignItems: "center" }}>
                                                {statusResult && <Flex justify='center' className=''>
                                                    {mainResult(dataResult || undefined)}

                                                </Flex>}
                                                {statusEmpty && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                                                {dataFormBankAccount && <Flex justify='center' align='center' className='m-0'>
                                                    <p className="center" >
                                                        <span className='h5'>{t("Create Transfer Money Check")}</span>
                                                    </p>
                                                </Flex>}
                                                <div className="row">
                                                    <Flex gap="small" vertical>
                                                        <div data-v-c164d40c className="accounts-container">
                                                            {dataFormBankAccount &&
                                                                <div data-v-c164d40c className={`from-account-container ${dataFormBankAccount ? 'out' : ``}`}>
                                                                    <h4 data-v-c164d40c>{t("Form Bank Account")}</h4>
                                                                    <img data-v-c164d40c src={dataFormBankAccount?.bank?.imageUrl} width={80} className="bank-logo" />
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c>{t("Account balance")}</label>
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c className="account-number">
                                                                        <strong data-v-c164d40c>{spinLoading !== dataFormBankAccount?.id ? ` ${Intl.NumberFormat().format(dataFormBankAccount?.balance)} .- ` : ``} {spinLoading != dataFormBankAccount?.id ? <Tooltip title={'อัพเดทยอดเงิน'}><SyncOutlined style={{ cursor: "pointer", }} disabled={dissabled != dataFormBankAccount?.id} onClick={() => get_balance_summerys(dataFormBankAccount?.id)} /></Tooltip> : <LoadingOutlined />}</strong>
                                                                    </label> <br data-v-c164d40c />
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c className="account-number">{t("Account Number")}
                                                                        <strong data-v-c164d40c> {dataFormBankAccount?.accountNumber}</strong>
                                                                    </label>
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c>{t(dataFormBankAccount?.bank?.bank_id)}</label>
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c>{t("Name")} : {dataFormBankAccount?.accountName}</label>
                                                                </div>
                                                            }
                                                            {dataToBankAccount &&
                                                                <div data-v-c164d40c className={`to-account-container ${dataToBankAccount ? 'in' : ``}`}>
                                                                    <h4 data-v-c164d40c>{t("To Bank Account")}</h4>
                                                                    <img data-v-c164d40c src={dataToBankAccount?.bank?.imageUrl} width={80} className="bank-logo" /> <br data-v-c164d40c />
                                                                    <label data-v-c164d40c>{t("Account balance")}</label>
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c className="account-number">
                                                                        <strong data-v-c164d40c>{spinLoading !== dataToBankAccount?.id ? ` ${Intl.NumberFormat().format(dataToBankAccount?.balance)} .- ` : ``} {spinLoading != dataToBankAccount?.id ? <Tooltip title={'อัพเดทยอดเงิน'}><SyncOutlined style={{ cursor: "pointer", }} disabled={dissabled != dataToBankAccount?.id} onClick={() => get_balance_summerys(dataToBankAccount?.id)} /></Tooltip> : <LoadingOutlined />}</strong>
                                                                    </label> <br data-v-c164d40c />
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c className="account-number">{t("Account Number")}
                                                                        <strong data-v-c164d40c> {dataToBankAccount?.accountNumber}</strong>
                                                                    </label>
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c>{t(dataToBankAccount?.bank?.bank_id)}</label>
                                                                    <br data-v-c164d40c />
                                                                    <label data-v-c164d40c>{t("Name")} : {dataToBankAccount?.accountName}</label>
                                                                </div>
                                                            }
                                                            {dataFormBankAccount && <div data-v-c164d40c className="amount-container">
                                                                <label data-v-c164d40c>{t("Transfer amount")}</label>
                                                                <br data-v-c164d40c />
                                                                <i data-v-c164d40c aria-label="icon: swap-right" className="anticon anticon-swap-right" style={{ fontSize: 60 }}>
                                                                    <svg viewBox="0 0 1024 1024" data-icon="swap-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" className="">
                                                                        <path d="M873.1 596.2l-164-208A32 32 0 0 0 684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z" /></svg></i>
                                                                <br data-v-c164d40c />
                                                                <label data-v-c164d40c className={`font-700 amount text-${selectedOptions?.amount && 'success'}`}>฿ {!selectedOptions?.amount ? "0.00" : Intl.NumberFormat().format(selectedOptions?.amount) + `.00`}</label>
                                                            </div>}
                                                        </div>
                                                    </Flex>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </Spin>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CCol>
                </>}
            </CRow>
        </>
    )
}
export default CreateMoneyTransfer;