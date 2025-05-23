import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Image, Alert, Flex, Result, DatePicker } from 'antd';
import type { UploadProps } from 'antd';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/locale/th_TH';
import Swal from 'sweetalert2'
import Apibank from 'src/api/Apibank';
import moment from 'moment';
import { SearchOutlined, CloudUploadOutlined } from '@ant-design/icons';
import type { DatePickerProps, GetProps } from 'antd';
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
import { useTranslation } from 'react-i18next'
// import { ConvertToPng } from 'src/helpers/convertToPng';
const AppUploadSlip = ({ data, itemContext, openNotification, dataMember, toggleBtnOk_Slip}: any) => {
    //console.log(dataMember)
    const { t }: any = useTranslation("");
    const [fileList, setFileList]: any = useState<File[]>([]);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null | any>(null);
    const [selectedTime, setSelectedTime]: any = useState<Dayjs | null>(dayjs());
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showAlert, setShowAlert] = React.useState<boolean>(false);
    const [responseData, setResponseData] = React.useState<any>("");
    const [preview, setPreview] = React.useState<boolean>(false);
    const [responseStatus, setResponseStatus] = React.useState<boolean>(false);
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
    const handleTimeChange = (value: Dayjs | null) => {
        setSelectedTime(value);
    };
    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        setSelectedTime(value);
    };
    const handleUpload = async () => {
        setLoading(true);
        if (fileList.length === 0) {
            openNotification("error", 'กรุณาเลือกรูปภาพ')
            setLoading(false);
            return;
        }
        if (!selectedTime) {
            openNotification("error", 'กรุณาเลือกวันที่และเวลา')
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('img_url', fileList[0]);
        formData.append('transaction_id', data?.id);
        formData.append('time_slib', selectedTime.toISOString());
        Apibank.getManualUploadSlip(formData)
            .then((res) => {
                if (res.data.success) {
                    openNotification("success", res.data.message)
                    toggleBtnOk_Slip(data?.id)
                    itemContext?.get_data_wit?.()
                    setResponseData(res.data)
                    setFileList([]);
                    setPreviewImageUrl(null);
                    setLoading(false);
                    setResponseStatus(true)
                } else {
                    openNotification("info", res.data.message)
                    setLoading(false);
                }
            }).catch((err) => {
                console.log(err);
                openNotification("error", err.message)
                setLoading(false);
            })
    };
    const uploadProps: UploadProps = {
        onRemove: (file: any) => {
            setFileList((prevFileList: any) => {
                const index = prevFileList.indexOf(file);
                const newFileList = [...prevFileList.slice(0, index), ...prevFileList.slice(index + 1)];
                return newFileList;
            });
            setPreviewImageUrl(null); // ล้าง URL ตัวอย่างเมื่อลบไฟล์
        },
        beforeUpload: (file) => {
            // const isPNG = file.type === 'image/png';
            // if (!isPNG) {
            //     openNotification('error', 'กรุณาอัปโหลดไฟล์ PNG เท่านั้น');
            //     setShowAlert(true)
            //     setTimeout(() => {
            //         setShowAlert(false)
            //     }, 5000)
            //     return false; // ไม่อนุญาตให้อัปโหลดไฟล์นี้
            // }
            setFileList([file]);
            // สร้าง URL สำหรับแสดงตัวอย่างรูปภาพ
            setPreview(false)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            return false; // Prevent default upload
        },
        fileList,
        listType: 'picture',
        showUploadList: true, // ซ่อนรายการอัปโหลดเริ่มต้นของ Ant Design
    };
    return (
        <>
            {!responseStatus ? <>
                <Flex align='start' vertical>
                    <div style={{ display: "" }} className="container qrCodeContainer">
                        <form>
                            <div className="row">
                                <div className="col-25 text-truncate">
                                    <label className='qrCodeLabel' htmlFor="bank">ธนาคาร</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" readOnly value={getBadge_bank(dataMember?.members?.bankId)} className='qrCodeInput' id="bank" name="bank" placeholder="bank..." />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25 text-truncate">
                                    <label className='qrCodeLabel' htmlFor="fname">ชื่อบัญชี</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" value={dataMember?.members?.bankAccountName} readOnly className='qrCodeInput' id="fname" name="firstname" placeholder="Your name.." />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25 text-truncate">
                                    <label className='qrCodeLabel' htmlFor="lname">เลขบัญชี</label>
                                </div>
                                <div className="col-75">
                                    <input readOnly type="text" value={dataMember?.members?.bankAccountNumber} className='qrCodeInput' id="lname" name="lastname" placeholder="Your last name.." />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25 text-truncate">
                                    <label className='qrCodeLabel' htmlFor="country">อัปโหลดสลิป</label>
                                </div>
                                <div className="col-75">
                                    <Upload {...uploadProps} >
                                        {fileList.length < 1 && (
                                            <Button icon={<UploadOutlined className="me-1" />}>เลือกรูปภาพ</Button>
                                        )}
                                    </Upload>
                                    {fileList.length > 0 && <Button style={{ color: "#1677ff" }} color="primary" variant="outlined" onClick={() => setPreview(!preview)} className='mt-2'>
                                        ดูตัวอย่าง
                                    </Button>}

                                    {preview && (
                                        <div className='qrCodeSelect' style={{ marginTop: '16px' }}>
                                            <Image
                                                width={200}
                                                src={previewImageUrl}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25 text-truncate">
                                    <label className='qrCodeLabel' htmlFor="subject">วันที่ตามสลิป</label>
                                </div>
                                <div className="col-75">
                                    {/* <textarea id="subject" className='qrCodeTextarea' name="subject" placeholder="Write something.." style={{ height: 50 }} defaultValue={""} /> */}
                                    <DatePicker
                                        id='dateTime'
                                        showTime
                                        format="YYYY-MM-DD HH:mm"
                                        value={selectedTime}
                                        onChange={handleTimeChange}
                                        onOk={onOk}
                                    />
                                </div>
                            </div>
                            {showAlert && <Alert message="Note!: กรุณาอัปโหลดไฟล์ PNG เท่านั้น" type="warning" showIcon closable />}
                            <div className="row d-flex" style={{ justifyContent: "flex-end" }}>
                                <Button className='qrCodeInputSubmit' type="primary" onClick={handleUpload} disabled={fileList.length === 0 || !selectedTime} loading={loading}>
                                    Create Withdrawal Manual
                                </Button>
                            </div>
                        </form>
                    </div>
                </Flex>

            </> : <>
                <Result
                    status="success"
                    title="Successfully!"
                    subTitle=""
                // extra={[
                //     <Button type="primary" key="console">
                //         Go Console
                //     </Button>,
                //     <Button key="buy">Buy Again</Button>,
                // ]}
                />

            </>}
        </>



    );
};

export default AppUploadSlip;