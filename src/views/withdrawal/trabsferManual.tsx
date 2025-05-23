import React, { useState } from 'react';
import { QuestionOutlined } from '@ant-design/icons';
import { Button, Upload, Image, Alert, Flex, Result, DatePicker, Divider, Spin } from 'antd';
import type { UploadProps } from 'antd';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/locale/th_TH';
import Swal from 'sweetalert2'
import Apibank from 'src/api/Apibank';
import moment from 'moment';
import { QuestionCircleFilled, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import type { DatePickerProps, GetProps } from 'antd';
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
import { useTranslation } from 'react-i18next'
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
type Props = {
    data?: any
    dataMember?: any
    openNotification?: any
    config?: any
}
export const TransferManual = ({ data, dataMember, openNotification, config,}: Props) => {
    const { t }: any = useTranslation("");
    const getBadge_bank = (bank_id: any) => {
        switch (bank_id) {
            case 1:
                return t('bbl')
            case 2:
                return t('scb')
            case 3:
                return t('kbank')
            case 4:
                return t('bay')
            case 5:
                return t('ktb')
            case 6:
                return t('ttb')
            case 8:
                return t('gsb')
            case 9:
                return t('baac')
            case 10:
                return t('uob')
            case 11:
                return t('tisco')
            case 12:
                return t('cimb')
            case 13:
                return t('lhb')
            case 14:
                return t('TRUE')
            case 15:
                return t('Bonus')
            case 16:
                return t('truewallet')
            case 17:
                return t('tcrb')
            case 18:
                return t('GHB')
            case 19:
                return t('CITI')
            case 20:
                return t('DB')
            case 21:
                return t('HSBC')
            case 22:
                return t('ICBC')
            case 23:
                return t('ISBT')
            case 24:
                return t('kkp')
            case 25:
                return t('MHCB')
            case 26:
                return t('SCBT')
            case 27:
                return t('SMBC')

            default:
                return 'No data'
        }
    }
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                openNotification('success', `Copied: ${text}`);
            })
            .catch((err) => {
                openNotification('error', err?.message);
            });
    };
    const items: CollapseProps['items'] = [

        {
            key: '2',
            label: 'ข้อมูลบัญชีผู้รับเงิน-ผู้โอนเงิน',
            className: 'main-accForm',
            children: <>

                <div className="row">
                    <label><b>บัญชีผู้รับ</b></label>
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="bankId">ธนาคาร</label>
                    </div>
                    <div className="col-75">
                        <input type="text" onClick={() => handleCopy(getBadge_bank(dataMember?.members.bankId))} readOnly value={getBadge_bank(dataMember?.members.bankId)} className='qrCodeInput accFormTo' id="bankId" name="bankId" placeholder="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="fname">ชื่อบัญชี</label>
                    </div>
                    <div className="col-75">
                        <input onClick={() => handleCopy(dataMember?.members?.bankAccountName)} type="text" value={dataMember?.members?.bankAccountName} readOnly className='qrCodeInput accFormTo' id="fname" name="firstname" placeholder="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="bankAccountNumber">เลขบัญชี</label>
                    </div>
                    <div className="col-75">
                        <input onClick={() => handleCopy(dataMember?.members?.bankAccountNumber)} readOnly type="text" value={dataMember?.members?.bankAccountNumber} className='qrCodeInput accFormTo' id="bankAccountNumber" name="bankAccountNumber" placeholder="" />
                    </div>
                </div>
                <br />
                <hr />
                <div className="row">
                    <label><b>บัญชีผู้โอน</b></label>
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="fromAccountName">ชื่อบัญชี</label>
                    </div>
                    <div className="col-75">
                        <input onClick={() => handleCopy(data?.data?.data?.fromAccountName)} type="text" readOnly value={data?.data?.data?.fromAccountName} className='qrCodeInput accForm' id="fromAccountName" name="fromAccountName" placeholder="" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="fromAccountNo">เลขบัญชี</label>
                    </div>
                    <div className="col-75">
                        <input onClick={() => handleCopy(data?.data?.data?.fromAccountNo)} type="text" readOnly value={data?.data?.data?.fromAccountNo} className='qrCodeInput accForm' id="fromAccountNo" name="fromAccountNo" placeholder="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="amount">จำนวนเงิน(บาท)</label>
                    </div>
                    <div className="col-75">
                        <input onClick={() => handleCopy(Intl.NumberFormat().format(data?.data?.data?.amount))} type="text" readOnly value={Intl.NumberFormat().format(data?.data?.data?.amount)} className='qrCodeInput accForm' id="amount" name="amount" placeholder="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="reqRefNo">reqRefNo</label>
                    </div>
                    <div className="col-75 d-flex" style={{ alignItems: "center" }}>
                        <input onClick={() => handleCopy(data?.data?.data?.reqRefNo)} type="text" readOnly value={data?.data?.data?.reqRefNo} className='qrCodeInput accForm' id="reqRefNo" name="reqRefNo" placeholder="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="createDate">createDate</label>
                    </div>
                    <div className="col-75  d-flex" style={{ alignItems: "center" }}>
                        <input onClick={() => handleCopy(data?.data?.data?.createDate)} type="text" readOnly value={moment(data?.data?.data?.createDate).format("YYYY-MM-DD HH:mm:ss")} className='qrCodeInput accForm' id="createDate" name="createDate" placeholder="" />
                    </div>
                </div>
                <div className={`${data?.data?.data?.qrBase64 ? 'row' : data?.data?.data?.link ? 'row' : 'd-none'}`}>
                    <div className="col-25 text-truncate">
                        <label className='qrCodeLabel' htmlFor="qrBase64">{data?.data?.data?.qrBase64 ? 'QRCode' : 'ลิ้งค์โอนเงิน'}</label>
                    </div>
                    <div className="col-75   d-flex" style={{ alignItems: "center" }}>
                        <div className='qrCodeSelect' style={{ marginTop: '16px' }}>
                            {data?.data?.data?.qrBase64 ? <Image
                                width={200}
                                src={`${data?.data?.data?.qrBase64}`}
                            /> : data?.data?.data?.link ? <Button onClick={() => window.open(data?.data?.data?.link)}>โอนเงิน</Button> : null}
                        </div>
                    </div>
                </div>
                <br />
                <Alert
                    description={<>{data?.data?.data?.qrBase64 ? <b>สแกนคิวอาร์โค้ดนี้เพื่อทำการโอนเงิน</b> : data?.data?.data?.link ? <b>คลิกที่ "ลิ้งค์โอนเงิน" เพื่อนำทางไปยังหน้าโอนเงิน</b> : <>! ห้ามกดปิดจนกว่าจะทำรายการสำเร็จ</>}</>}
                    type="info"
                    icon={<><QuestionCircleFilled className='me-2' /></>}
                    showIcon
                />
                <br />
                

            </>,
        },

    ];
    return (
        <Flex align='start' vertical>
            <div style={{ display: "" }} className="container qrCodeContainer">
                <form>
                     <Collapse defaultActiveKey={['2']} accordion items={items} />
                </form>

            </div>
        </Flex>
    );
}