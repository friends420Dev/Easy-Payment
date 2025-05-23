import React, { useEffect, useRef, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro';
import Moment from 'moment';
import 'moment/locale/th';
import { DataContext } from 'src/layout/DefaultLayout';
import { Card, message, Space, Divider, Avatar, Badge, Collapse } from 'antd';
import { SyncOutlined, UserOutlined, BankOutlined, AlertOutlined } from '@ant-design/icons';
import ApiBank from 'src/api/Apibank';
import type { CollapseProps } from 'antd';
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
interface DataTypeRequest_Alls {
  accnum: any;
  amount: any;
  name: any;
  bankAccount_id: any;
  date_creat: any;
  description: any;
  fron_bank: any;
  id: any;
  insert_time: any;
  remark: any;
  status: any;
  status_pay: any;
  status_show: any;
  time_creat: any;
  to_bank: any;
  type_status: any;
}

interface DataTypeBankAccounts {
  Request_Alls: DataTypeRequest_Alls[];
  accountName: any;
  accountNumber: any;
  accountType: 'deposit' | 'withdrawal'; // กำหนด type ให้ accountType
  auth: any;
  balance: any;
  bank: any;
  bankAccountGroupId: any;
  bankId: any;
  channel: any;
  created_at: any;
  id: any;
  isActive: boolean; // กำหนด type ให้ isActive
  latestPollingStatus: any;
  limit_Left: any;
  litmit_status: any;
  merchantId: any;
  name: any;
  otherBankLimit: any;
  prefix: any;
  run_from: any;
  sameBankLimit: any;
  setting: any;
  settings: any;
  status_bank: 'Active' | string; // กำหนด type ให้ status_bank
  telephoneNumber: any;
  updated_at: any;
  Botlog_limittimes?: any[]; // เพิ่ม type สำหรับ Botlog_limittimes
}

interface DataType {
  bankAccounts: DataTypeBankAccounts[];
  created_at: any;
  id: any;
  isActive: boolean; // กำหนด type ให้ isActive
  merchantId: any;
  name: any;
  numberOfMemberInBankAccountGroup: any;
  prefix: any;
  updated_at: any;
}

const Dashboard = () => {
  const { t }: any = useTranslation<any>('');
  const itemContext: any = useContext<any>(DataContext);
  const [messageApi, contextHolder]: any = message.useMessage();
  const [loadding, setLoadding] = useState<boolean>(true);
  const success = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
    });
  };
  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: `${msg}`,
    });
  };

  function formatAccnumID(numberAcc: string) {
    const length = numberAcc?.length;
    const middleFour = numberAcc?.slice(6, length);
    return `xx ${middleFour}`;
  }
  const handleCopy = (text: string) => {
    navigator?.clipboard?.writeText(text).then(() => {
      success('Copied : ' + text);
    }).catch(() => {
      error('Copied Something went wrong.');
    });
  };
  function calculateAccountUsage(data: any) {
    const createdAt = data?.created_at;
    const limitDays = 120;

    if (!createdAt) {
      return 0;
    }

    const createdDate = Moment(createdAt);
    const now = Moment();
    const usedDays = now.diff(createdDate, 'days');
    return usedDays >= 0 ? usedDays : 0;
  };
  function calculateAccountRemainingDays(data: any) {
    const createdAt = data?.created_at;
    const limitDays = 120;

    if (!createdAt) {
      return 0;
    }

    const createdDate = Moment(createdAt);
    const now = Moment();
    const usedDays = now.diff(createdDate, 'days');
    const remainingDays = limitDays - usedDays;

    return remainingDays >= 0 ? remainingDays : 0;
  };
  function removeTitle(fullName: any) {
    //console.log(fullName?.slice(3))
    if (fullName == "PayoneX") {
      return fullName
    }
    if (fullName?.startsWith('นาย ')) {
      return fullName?.slice(3);
    } else if (fullName?.startsWith('นาย')) {
      return fullName?.slice(3);
    } else if (fullName?.startsWith('นางสาว')) {
      return fullName?.slice(6);
    } else if (fullName?.startsWith('นางสาว ')) {
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
  function mainBankAcc(data: DataType[]): JSX.Element {
    if (!data || data.length === 0) {
      return (
        <CCard className="mb-4">
          <CCardBody className="p-4">
            <CCol md={4} xl={12}>
              <em className="alert alert-nodata w-100">No active bank accounts found.</em>
            </CCol>
          </CCardBody>
        </CCard>
      );
    }
    const dataBank = data?.filter((items) => items?.isActive);
    const accDeposit: DataTypeBankAccounts[] = [];
    const accWithdrawal: DataTypeBankAccounts[] = [];
    const a: { data: DataTypeBankAccounts[] }[] = [];

    dataBank.forEach((item) => {
      if (item?.bankAccounts) {
        a.push({ data: item.bankAccounts });
      }
    });

    a.forEach((o) => {
      o?.data?.forEach((c) => {
        if (c?.accountType === 'withdrawal' && c?.status_bank === 'Active') {
          accWithdrawal.push(c);
        }
        if (c?.accountType === 'deposit' && c?.status_bank === 'Active') {
          accDeposit.push(c);
        }
      });
    });

    setTimeout(() => {
      setLoadding(false);
    }, 1000);


    return <>

      <Divider orientation="left" className='mt-0'>{t("Bank account status")}</Divider>
      <CCol xl={6} md={6}>
        {accDeposit?.length > 0 ?
          a?.map((isItem: any) => {
            return isItem?.data?.map((items: any, index: any) => {
              return (
                <>
                  {items?.accountType == "deposit" && <>
                    <CCol xl={12} key={index} className={`${items?.status_bank != "Active" && "d-none"}`}>
                      <Badge.Ribbon text={t('Deposit Account')} color="green">
                        <Card
                          style={{ borderRadius: "10px", border: "none" }}
                          // extra={<Button type="dashed"><SettingOutlined className='me-1' style={{ display: "inline-flex" }} /> {`Payment Config`}</Button>}
                          loading={loadding}
                          title={<></>}
                          className={`mb-3 ${items?.status_bank != "Active" && "d-none"}`}
                          styles={{ header: { display: "none" } }}
                          children={<CCardBody className="text-truncate">
                            <CRow>
                              <CCol >
                                {/* <h5 className='mb-2 text-truncate' style={{ textTransform: "uppercase" }}>{t(items?.bank?.bank_id)}</h5> */}
                                <h5 className='text-truncate mb-2 d-flex' style={{ textTransform: "uppercase", alignItems: "center" }}><Avatar size="small" src={<img src={items?.bank?.imageUrl} alt={t(items?.bank?.bank_id)} />} />  <span className='me-1'></span>  {t(items?.bank?.bank_id)}</h5>
                              </CCol>
                              <CCol >
                                <div className="btn-group float-end me-3">
                                  <p
                                    className=" btn-successs  text-white text-truncate  mb-2"
                                    style={{ textTransform: "uppercase", fontSize: "12px", padding: "5px 10px", fontWeight: "bold" }}
                                  >
                                    {/* {t('Deposit Account')} */}
                                  </p>
                                </div>
                              </CCol>
                            </CRow>
                            <CCol><UserOutlined style={{ fontSize: "16px" }} /> ชื่อบัญชี : <span style={{ fontWeight: "500" }}>{removeTitle(items?.accountName)}</span></CCol>
                            <CCol><BankOutlined style={{ fontSize: "16px" }} /> เลขบัญชี : <span style={{ fontWeight: "500" }}>{formatAccnumID(items?.accountNumber)}</span></CCol>
                            <CRow>
                              <p className="d-grid gap-0">
                                <span className='d-flex  justify-content-end'><span className='me-1' style={{ fontWeight: "500" }}>{t('ใช้งานมาแล้ว  :')}</span> <b>{calculateAccountUsage(items)} วัน</b></span>
                                <span className='d-flex justify-content-end'><span className='me-1' style={{ fontWeight: "500" }}>{t('เหลือเวลาใช้งาน :')}</span> <span className={`${calculateAccountRemainingDays(items) < 10 ? 'text-danger' : ''}`}>{items?.accountName == "PayoneX" ? <b>{'Forever'}</b> : <b>{calculateAccountRemainingDays(items)} วัน</b>}</span></span>
                              </p>
                              <p className="d-grid gap-2 d-md-flex justify-content-md-end">
                                {t('Latest update')} {Moment(items?.updated_at).format('YYYY/MM/DD HH:mm:ss')}{' '}
                              </p>
                            </CRow>
                            <CCard className="mb-0">
                              <CTable className=''>
                                <CTableHead>
                                  <CTableRow>
                                    <CTableHeaderCell scope="col">
                                      {t('Total retrieval time')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className='text-center' scope="col">{t('Status')}</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {items?.Botlog_limittimes?.length > 0 ?
                                    items?.Botlog_limittimes?.map((row: any, index: any) => {
                                      return (
                                        <>
                                          <CTableRow key={index} className='aninationleft'>
                                            <CTableHeaderCell scope="row">
                                              {Moment(row?.created_at).format('YYYY-MM-DD HH:mm')}{' '}
                                            </CTableHeaderCell>
                                            <CTableDataCell className='text-center'>
                                              <span
                                                data-v-a4b01f76
                                                className="status  ant-tag ant-tag-has-color btn-damgers"
                                                style={{
                                                  backgroundColor:
                                                    row?.bot_status === "SUCCESS"
                                                      ? 'rgb(82, 196, 26)'
                                                      : row?.status === '0'
                                                        ? 'rgb(237 175 46) '
                                                        : 'transparent',
                                                  color: "#fff"
                                                }}
                                              >
                                                {row?.bot_status === "SUCCESS"
                                                  ? `${t('Success')}`
                                                  : row?.bot_status === '0'
                                                    ? `${t('failed')}`
                                                    : `${t('failed')}`}
                                              </span>
                                            </CTableDataCell>
                                          </CTableRow>
                                        </>
                                      )
                                    }) : <div><Empty /></div>}
                                </CTableBody>
                              </CTable>
                            </CCard>
                          </CCardBody>}
                        />
                      </Badge.Ribbon>
                    </CCol>
                  </>}


                </>
              )
            })
          })
          : <><CCard className='mb-4'><CCardBody className="p-4"><CCol md={4} xl={12}><Empty children={<em className='alert alert-nodata w-100' style={{ color: "#888" }}>No active deposit accounts found.</em>} /></CCol></CCardBody></CCard></>}
      </CCol>
      <CCol xl={6} md={6}>
        <CRow>
          {accWithdrawal?.length > 0 ?
            a?.map((isItem: any) => {
              return isItem?.data?.map((items: any, index: any) => {
                return (
                  <>
                    {items?.accountType == 'withdrawal' && (
                      <>
                        <CCol xl={12} key={index} className={`${items?.status_bank != "Active" && "d-none"}`}>
                          <Badge.Ribbon text={t('Withdrawal Account')} color="red">
                            <Card
                              style={{ borderRadius: "10px" }}
                              // extra={<Button type="dashed"><SettingOutlined className='me-1' style={{ display: "inline-flex" }} /> {`Payment Config`}</Button>}
                              loading={loadding}
                              title={<></>}
                              className={`mb-3 ${items?.status_bank != "Active" && "d-none"}`}
                              styles={{ header: { display: "none" } }}
                              children={<CCardBody className="text-truncate">
                                <CRow>
                                  <CCol >
                                    <h5 className='text-truncate mb-2 d-flex' style={{ textTransform: "uppercase", alignItems: "center" }}><Avatar size="small" src={<img src={items?.bank?.imageUrl} alt={t(items?.bank?.bank_id)} />} />  <span className='me-1'></span>  {t(items?.bank?.bank_id)}</h5>
                                  </CCol>
                                  <CCol  >
                                    <div className="btn-group float-end me-3">
                                      <p style={{ textTransform: "uppercase", fontSize: "12px", padding: "5px 10px", fontWeight: "bold" }}
                                        className=" btn-dangerss  text-white text-truncate mb-2"
                                      >
                                        {/* {t('Withdrawal Account')} */}
                                      </p>
                                    </div>
                                  </CCol>
                                </CRow>
                                <CCol><UserOutlined style={{ fontSize: "16px" }} /> ชื่อบัญชี : <span style={{ fontWeight: "500" }}>{removeTitle(items?.accountName)}</span></CCol>
                                <CCol>
                                  <BankOutlined style={{ fontSize: "16px" }} /> เลขบัญชี : <span style={{ fontWeight: "500" }}>{formatAccnumID(items?.accountNumber) == "xx X" ? '-' : formatAccnumID(items?.accountNumber)}</span>
                                  {/* <p>{t('Account Number')} : {formatAccnumID(items?.accountNumber)}</p>{' '} */}
                                  <h2 className="d-grid d-flex justify-content-end">
                                    <span id='Balance'>฿ {Intl.NumberFormat().format(items?.balance) + '.-' || '-'}</span>
                                  </h2>
                                  <span className="d-grid d-flex justify-content-end" style={{ fontSize: "16px" }}><b className='me-2' >{t('limit Left')} :</b> <code style={{ color: items?.limit_Left < 5000 ? "red" : "green" }}>{" "}{Intl.NumberFormat().format(items?.limit_Left) + '.-' || '-'} {" "}</code> <Space className='me-2 '> <SyncOutlined onClick={() => get_balance_summerys(items?.id)} spin={itemContext?.loadding} style={{ color: '#03A9F4', cursor: "pointer", display: "inline-flex" }} /></Space></span>
                                  <span className="d-grid d-flex justify-content-end" style={{ fontSize: "16px" }}><b className='me-2'>{t('Other Bank Limit')} : </b> {Intl.NumberFormat().format(items?.otherBankLimit) + '.-' || '-'}  </span>
                                </CCol>
                                <p className='mt-3'></p>
                                <CRow>
                                  <div className="d-grid gap-0 mt-2 mb-2">
                                    <span className='d-flex  justify-content-end mb-0'><span className='me-1' style={{ fontWeight: "500" }}>{t('ใช้งานมาแล้ว  :')}</span> <b>{calculateAccountUsage(items)} วัน</b></span>
                                    <span className='d-flex justify-content-end mb-0'><span className='me-1' style={{ fontWeight: "500" }}>{t('เหลือเวลาใช้งาน :')}</span> <span className={`${calculateAccountRemainingDays(items) < 10 ? 'text-danger' : ''}`}>{items?.accountName == "PayoneX" ? <b>{'Forever'}</b> : <b>{calculateAccountRemainingDays(items)} วัน</b>}</span></span>
                                  </div>
                                  <p className="d-grid gap-2 d-flex  justify-content-end">
                                    <span className='d-flex  justify-content-start'>{t('Latest update')} {Moment(items?.updated_at).locale("th").format('YYYY/MM/DD HH:mm:ss')}</span>
                                  </p>
                                </CRow>
                              </CCardBody>}
                            />
                          </Badge.Ribbon>
                        </CCol>
                      </>
                    )}
                  </>
                )
              })
            })
            : <><CCard className='mb-4'><CCardBody className="p-4"><CCol md={4} xl={12}><Empty children={<em className='alert alert-nodata w-100' style={{ color: "#888" }}>No active withdrawal accounts found.</em>} /></CCol></CCardBody></CCard></>}
        </CRow>
      </CCol>
    </>
  }
  const get_balance_summerys = (params: any) => {
    //console.log(params)
    itemContext?.setLoadding(true)
    ApiBank.get_balance_summery({ id: params })
      .then((res: any) => {
        //
        if (res.data.success) {
          itemContext?.getBankAccount()
          itemContext?.setLoadding(false)
        } else {
          itemContext?.setLoadding(false)
        }
      }).catch((error: any) => {
        itemContext?.setLoadding(false)
        error(error.message)
      })
  }
  const [highlightedTimes, setHighlightedTimes] = useState<string[]>([]);
  useEffect(() => {
    const updateHighlight = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}.${minutes}`;
      const shouldHighlight = [
        '23.00-02.00',
        '00.00-22.00',
        '22.00-23.30',
        '01.30-22.35',
        '01.30-23.00',
        '22.30-02.00',
        '23.00-01.30',
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
    // Update highlight every minute
    const intervalId = setInterval(updateHighlight, 60 * 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const mainHTML1 = (
    <>
      <h5>ตารางช่วงเวลา การเปิดใช้งานบัญชี</h5>
      <p style={{ marginLeft: "10px" }}>ตารางนี้แสดงช่วงเวลาการเปิดใช้งานบัญชีเพื่อให้ระบบทำงานได้อย่างมีประสิทธิภาพ</p>
      <table className="table timeTable table-bordered  table-hover">
        <thead>
          <tr>
            <th>ช่วงเวลา</th>
            <th>ธนาคาร</th>
            <th>ประเภท</th>
            <th>หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td className={highlightedTimes.includes('23.00-02.00') ? 'highlight-active Deposit' : 'highlight'}><span className='text-success'>23.00-02.00</span></td>
            <td className={highlightedTimes.includes('23.00-02.00') ? 'highlight-active Deposit' : 'highlight'}><span className='text-success'>ไทยพาณิชย์</span></td>
            <td className={highlightedTimes.includes('23.00-02.00') ? 'highlight-active Deposit text-success' : 'highlight text-success'}><span className='text-success'>ฝากเงิน</span></td>
            <td className={highlightedTimes.includes('23.00-02.00') ? 'highlight-active Deposit' : 'highlight'}><span className='text-success'>{highlightedTimes.includes('23.00-02.00') ? "ใช้งานปกติ" : null}</span></td>
          </tr>
          <tr>
            <td className={`highlight-active Deposit`}><span  className='text-success'>ได้ตลอด</span></td>
            <td className={`highlight-active Deposit`}><span  className='text-success'>กสิกรไทย</span></td>
            <td className={`highlight-active Deposit text-success`}><span className='text-success'>ฝากเงิน</span></td>
            <td className={`highlight-active Deposit`}><span className='text-success'>ใช้งานปกติ</span></td>
          </tr>
          <tr>
            <td className={highlightedTimes.includes('22.00-23.30') ? 'highlight-active Deposit' : 'highlight'}><span className='text-success'>22.00-23.30</span></td>
            <td className={highlightedTimes.includes('22.00-23.30') ? 'highlight-active Deposit' : 'highlight'}><span className='text-success'>กรุงไทย</span></td>
            <td className={highlightedTimes.includes('22.00-23.30') ? 'highlight-active Deposit text-success' : 'highlight text-success'}><span className='text-success'>ฝากเงิน</span></td>
            <td className={highlightedTimes.includes('22.00-23.30') ? 'highlight-active Deposit' : 'highlight'}><span  className='text-success'>{highlightedTimes.includes('22.00-23.30') ? "ใช้งานปกติ" : null}</span></td>
          </tr>
          
          <tr>
            <td className={highlightedTimes.includes('22.30-03.00') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>22.30-03.00</></td>
            <td className={highlightedTimes.includes('22.30-03.00') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>ไทยพาณิชย์ (ถอน)</></td>
            <td className={highlightedTimes.includes('22.30-03.00') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>ถอนเงิน</></td>
            <td className={highlightedTimes.includes('22.30-03.00') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>{highlightedTimes.includes('22.30-03.00') ? <span className='text-danger'>ใช้งานปกติ</span> : null}</></td>
          </tr>
          <tr>
            <td className={highlightedTimes.includes('01.30-23.00') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>01.30-23.00</></td>
            <td className={highlightedTimes.includes('01.30-23.00') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>กรุงไทย (ถอน)</></td> 
            <td className={highlightedTimes.includes('01.30-23.00') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>ถอนเงิน</></td>
            <td className={highlightedTimes.includes('01.30-23.00') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>{highlightedTimes.includes('01.30-23.00') ? <span className='text-danger'>ใช้งานปกติ <small className='text-dark'>( *ห้ามใช้คู่กับ PayoneX (ถอน) )</small></span> : null}</></td>
          </tr>
          <tr>
            <td className={highlightedTimes.includes('01.30-22.35') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>01.30-22.35</></td>
            <td className={highlightedTimes.includes('01.30-22.35') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>PayoneX</></td>
            <td className={highlightedTimes.includes('01.30-22.35') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>ถอนเงิน</></td>
            <td className={highlightedTimes.includes('01.30-22.35') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>{highlightedTimes.includes('01.30-22.35') ? <span className='text-danger'>ใช้งานปกติ <small className='text-dark'>( *ห้ามใช้คู่กับธ.กรุงไทย (ถอน) )</small></span> : null}</></td>
          </tr>
          <tr>
            <td className={highlightedTimes.includes('23.00-01.30') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>23.00-01.30</></td>
            <td className={highlightedTimes.includes('23.00-01.30') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>ถอน Manual</></td>
            <td className={highlightedTimes.includes('23.00-01.30') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>ถอนเงิน</></td>
            <td className={highlightedTimes.includes('23.00-01.30') ? 'highlight-active Withdrawal text-danger' : 'highlight text-danger'}><>{highlightedTimes.includes('23.00-01.30') ? <span className='text-danger'>ใช้งานปกติ</span> : null}</></td>
          </tr>
        </tbody>
      </table>

      <p><b>หมายเหตุ :</b></p>
      <ul>
        <li>ช่วงเวลาทำการปกติของธนาคารส่วนใหญ่มักจะเป็นวันจันทร์ถึงวันศุกร์ ในช่วงเวลาประมาณ 8:30 น. ถึง 16:30 น. แต่อาจแตกต่างกันไปในแต่ละธนาคารและสาขา โปรดตรวจสอบกับธนาคารที่คุณใช้งาน</li>
        <li>ระบบธนาคารออนไลน์และตู้ ATM อาจมีการปิดปรับปรุงระบบเป็นครั้งคราว โปรดตรวจสอบประกาศจากธนาคาร</li>
        <li>คำแนะนำในตารางนี้เป็นเพียงแนวทางทั่วไป โปรดพิจารณาตามความสะดวกและความจำเป็นของท่าน</li>
      </ul>
    </>
  );

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <b><AlertOutlined style={{ display: "inline-flex" }} /> ตารางช่วงเวลา การเปิดใช้งานบัญชี</b>,
      children: <p>{mainHTML1}</p>,
    },

  ];
  const onChange = (key: string | string[]) => {
    let dateTime = new Date()
  };
  return (
    <>
      {contextHolder}
      <CRow>
        <div className="mb-3">
          <Collapse items={items} onChange={onChange} />
        </div>
        {mainBankAcc(itemContext?.bankAccount?.data || [])}
      </CRow>
    </>
  )

}

export default Dashboard
