import React, { useEffect, useState } from 'react';
import moment from 'moment';
interface PaymentQRProps {
    // orderAmount: number;
    // payableAmount: number;
    // qrCodeImageUrl: string; 
    data?: {
        id?: number,
        uuid: string,
        qrCode: string,
        customerName: null | string,
        customerAccountNo: string,
        customerBankCode: null | string,
        qrExpireTime: any,
        qrType: string,
        bankAccountId: number,
        transferAmount: string,
        amount: string,
        status: string,
        userId: null | string,
        referenceId: null | string,
        remark: null | string,
        note: null | string,
        created_at: string,
        updated_at: string
    }
    // onDownloadQR: () => void;
}
import { Button, QRCode, Segmented, Space, notification } from 'antd';
import type { QRCodeProps } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { CheckCircleFilled, CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';
const PaymentQR = ({ data }: PaymentQRProps) => {
    console.log(data)
    function doDownload(url: string, fileName: string) {
        const a = document.createElement('a');
        a.download = fileName;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const [api, contextHolder_Notify] = notification.useNotification();

    const openNotification = (type: NotificationType, msg: any) => {
        api[type]({
            message: 'Notification',
            description:
                msg,
        });
    };
    const downloadCanvasQRCode = () => {
        const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            doDownload(url, `QRCode_${data?.qrCode}.png`);
        }
    };

    const downloadSvgQRCode = () => {
        const svg = document.getElementById('myqrcode')?.querySelector<SVGElement>('svg');
        const svgData = new XMLSerializer().serializeToString(svg!);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        doDownload(url, `QRCode_${data?.qrCode}.svg`);
    };
    const [renderType, setRenderType] = useState<QRCodeProps['type']>('canvas');
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (data?.qrExpireTime) {
            const expiryTimeMs = data.qrExpireTime;

            const interval = setInterval(() => {
                const now = Date.now();
                const differenceMs = expiryTimeMs - now;

                if (differenceMs <= 0) {
                    setTimeLeft('QR Code หมดอายุแล้ว');
                    clearInterval(interval);
                } else {
                    const durationObj = dayjs.duration(differenceMs);
                    const formattedTime = `${durationObj.minutes().toString().padStart(2, '0')}:${durationObj
                        .seconds()
                        .toString()
                        .padStart(2, '0')}`;
                    setTimeLeft(`QRCode หมดอายุใน: ${formattedTime}`);
                }
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on component unmount
        } else {
            setTimeLeft('ไม่พบเวลาหมดอายุ QR Code');
        }
    }, [data?.qrExpireTime]);
    const customStatusRender: QRCodeProps['statusRender'] = (info) => {
        switch (info.status) {
            case 'expired':
                return (
                    <div>
                        <CloseCircleFilled style={{ color: 'red' }} /> {info.locale?.expired}
                        {/* <p>
                            <Button type="link" onClick={info.onRefresh}>
                                <ReloadOutlined /> {info.locale?.refresh}
                            </Button>
                        </p> */}
                    </div>
                );
            default:
                return null;
        }
    };

    function getStatusRender(params: any) {
        let exe = params
        if (exe == "QR Code หมดอายุแล้ว") {
            exe = 'expired'
        } else if (exe == "ไม่พบเวลาหมดอายุ QR Code") {
            exe = 'expired'
        } else {
            exe = 'active'
        }
        return exe
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
    return (
        <>
            {contextHolder_Notify}
            <div style={styles.container}>
                <div style={styles.qrCodeContainer}>
                    <Space id="myqrcode" direction="vertical">
                        <Segmented options={['canvas', 'svg']} value={renderType} onChange={setRenderType} />
                        <div>
                            <QRCode
                                value={`${data?.qrCode}`}
                                status={getStatusRender(timeLeft)}
                                // onRefresh={() => console.log('refresh')}
                                style={{ marginBottom: 16 }}
                                bgColor="#fff"
                                statusRender={customStatusRender}
                            />
                            <Button
                                type="primary"
                                className='mb-3'
                                disabled={getStatusRender(timeLeft) == 'expired'}
                                onClick={renderType === 'canvas' ? downloadCanvasQRCode : downloadSvgQRCode}
                            >
                                Download
                            </Button>
                            <div style={styles.expiryContainer}>
                                <p style={styles.expiryText}><b style={{ color: `${timeLeft == 'QR Code หมดอายุแล้ว' ? 'red' : timeLeft == 'ไม่พบเวลาหมดอายุ QR Code' ? 'red' : '#2196f3'}` }}>{timeLeft}</b></p>
                            </div>
                        </div>
                    </Space>
                </div>
                <div style={styles.detailsContainer}>
                    <p style={styles.detailItem} className='text-truncate' onClick={() => handleCopy(data?.qrCode)}>
                        QRCodeString: <span style={styles.bold}>{data?.qrCode}</span>
                    </p>
                    <p style={styles.detailItem} onClick={() => handleCopy(data?.amount)}>
                        จำนวนเงิน: <span style={styles.bold}>{data?.amount} บาท</span>
                    </p>
                </div>
                <div style={styles.noticeContainer}>
                    <h3 style={styles.noticeTitle}>คำเตือน (กรุณาอ่าน!)</h3>
                    <ul style={styles.noticeList}>
                        <li style={styles.noticeItem}>
                            สามารถสแกน QR และชำระเงินได้เพียงครั้งเดียว อย่ากลับมาใช้ซ้ำ
                        </li>
                        <li style={styles.noticeItem}>
                            กรุณา <span style={styles.bold}>อย่า</span> อย่ากด ยืนยันการทำรายการ หากยังทำรายการไม่สำเร็จ
                        </li>
                        <li style={styles.noticeItem}>
                            กรุณา <span style={styles.bold}>อย่า</span> ดำเนินการชำระเงินหาก QR Code หมดอายุ
                        </li>
                    </ul>
                </div>

            </div>
        </>

    );
};

const styles: any = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: 'none',
        borderRadius: '8px',
        width: '100%', // ปรับขนาดตามต้องการ
        fontFamily: 'sans-serif', // เลือก font ที่เหมาะสม
    },
    header: {
        marginBottom: '20px',

    },
    logo: {
        height: '50px', // ปรับขนาดโลโก้ตามต้องการ
    },
    qrCodeContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
    },
    qrCodeImage: {
        width: '200px', // ปรับขนาด QR Code ตามต้องการ
        height: '200px',
        marginBottom: '10px',
        border: '1px solid #eee',
    },
    downloadButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff', // สีปุ่มตามภาพ
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    detailsContainer: {
        marginBottom: '20px',
        textAlign: 'left',
        width: '100%',
    },
    detailItem: {
        marginBottom: '5px',
    },
    bold: {
        fontWeight: 'bold',
    },
    noticeContainer: {
        backgroundColor: '#fdecea', // สีพื้นหลังคำเตือน
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '15px',
        width: '100%',
    },
    noticeTitle: {
        color: '#d9534f', // สีหัวข้อคำเตือน
        marginBottom: '10px',
    },
    noticeList: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#333',
    },
    noticeItem: {
        marginBottom: '5px',
    },
    expiryContainer: {
        marginTop: '10px',
        color: '#777',
    },
    expiryText: {
        fontSize: '0.9em',
    },
};

export default PaymentQR;