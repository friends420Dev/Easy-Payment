import React, { useState } from 'react';
import './slip.css'; // Import CSS file

interface SlipData {
    status: string;
    dateTime: string;
    referenceId: string;
    fromName: string;
    fromAccount: string;
    toName: string;
    toAccount: string;
    amount: number;
    qrCodeText: string;
}
import { CopyOutlined, DownloadOutlined, CheckOutlined } from '@ant-design/icons';
import { QRCode, Button } from 'antd';
import moment from 'moment';


export const downloadTransferInfoAsImage = ({ params }: any) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
        console.error('ไม่สามารถสร้าง Context ของ Canvas ได้');
        return;
    }
    // กำหนดขนาด Canvas (ปรับตามเนื้อหา)
    canvas.width = 400;
    canvas.height = 350;
    // กำหนดพื้นหลัง (ถ้าต้องการ)
    context.fillStyle = '#f9f9f9';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // กำหนดสไตล์ข้อความเริ่มต้น
    context.fillStyle = '#333';
    context.font = '16px sans-serif';
    let yOffset = 20;
    const lineHeight = 20;
    // วาดข้อความต่างๆ ลงบน Canvas
    context.fillText('ตรวจสอบสถานะการโอนเงิน', 20, yOffset);
    yOffset += lineHeight * 1.5;

    context.font = 'bold 16px sans-serif';
    context.fillText('สถานะการโอนเงิน', 20, yOffset);
    context.fillStyle = '#27ae60';
    context.fillText('✓ รายการสำเร็จ', 200, yOffset);
    yOffset += lineHeight * 1.5;
    context.fillStyle = '#333';
    context.font = '16px sans-serif';

    context.fillText(`วันที่/เวลา: ${params?.dateTime}`, 20, yOffset);
    yOffset += lineHeight;
    context.fillText(`Ref: ${params?.ref}`, 20, yOffset);
    yOffset += lineHeight;
    context.fillText(`InstructionRefNo: ${params?.instructionRefNo}`, 20, yOffset);
    yOffset += lineHeight * 1.5;

    context.fillText(`จาก: ${params?.fromName} , ${params?.fromAcc}`, 20, yOffset);
    yOffset += lineHeight;
    context.fillText(`ไปยัง: ${params?.fromToAcc}, ${params?.fromToName}`, 20, yOffset);
    yOffset += lineHeight * 1.5;

    context.font = 'bold 20px sans-serif';
    context.fillText(`จำนวนเงิน: ${params?.amount} บาท`, 20, yOffset);
    // แปลง Canvas เป็น Data URL
    const dataURL = canvas.toDataURL('image/png');

    // สร้าง Link Element สำหรับดาวน์โหลด
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = `ข้อมูลการโอน_${params?.dateTime}.png`; // กำหนดชื่อไฟล์
    // จำลองการคลิก Link เพื่อดาวน์โหลด
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
const TransactionSlip = ({ SlipData, config, openNotification }: any) => {
    const [stateCopy, setStateCopy] = useState(false)
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                openNotification('success', text);
            })
            .catch((err) => {
                openNotification('error', err?.message);
            });
    };
    const handleCopySlip = (text: any) => {
        setStateCopy(true)
        navigator?.clipboard?.writeText(text)
            .then(() => {
                openNotification('success', 'คัดลอกข้อมูลสำเร็จ');
                setTimeout(() => {
                    setStateCopy(false)
                }, 2500)
            })
            .catch((err) => {
                openNotification('error', err?.message);
            });
    };
    let dataSlip: any = {
        status: SlipData?.data?.data?.instructionStatus?.value,
        label: SlipData?.data?.data?.instructionStatus?.label,
        dateTime: moment(SlipData?.data?.data?.creationDatetime).format("YYYY-MM-DD HH:mm:ss"),
        ref: SlipData?.datatranfer?.ref,
        instructionRefNo: SlipData?.datatranfer?.uuid,
        fromName: SlipData?.data?.data?.payerInformation?.name,
        fromAcc: SlipData?.data?.data?.payerInformation?.accountNo,

        fromToAcc: SlipData?.data?.data?.payeeInformation?.accountNo,
        fromToName: SlipData?.data?.data?.payeeInformation?.name,
        fromToImg: SlipData?.datatranfer?.members?.banks?.imageUrl,

        amount: Intl.NumberFormat().format(SlipData?.data?.data?.amount)
    }
    const handleDownloadImage = () => {
        downloadTransferInfoAsImage({ params: dataSlip });
    };
    return (
        <div className="slip-container">
            <div className="slip-header">
                <div className="bank-logo">สถานะการโอนเงิน</div>
                <div className={`status-container ${SlipData?.data?.data?.instructionStatus?.value === "SUCCESSFUL" ? 'success' : 'error'}`}>
                    <span className="status-text"><CheckOutlined /> {SlipData?.data?.data?.instructionStatus?.label}</span>
                </div>
            </div>
            <div className="slip-details">
                <div className="detail-row">
                    <span className="label">วันที่/เวลา:</span>
                    <span className="value">{moment(SlipData?.data?.data?.creationDatetime).format("YYYY-MM-DD HH:mm:ss")}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Ref:</span>
                    <span className="value" style={{ cursor: "copy" }} onClick={() => handleCopy(SlipData?.datatranfer?.ref)}>{SlipData?.datatranfer?.ref}</span>
                </div>
                <div className="detail-row">
                    <span className="label">InstructionRefNo:</span>
                    <span className="value" style={{ cursor: "copy" }} onClick={() => handleCopy(SlipData?.datatranfer?.uuid)}>{SlipData?.datatranfer?.uuid}</span>
                </div>
                <div className="detail-row from-to amount-row">
                    <div className="detail-row">
                        <span className="label">จาก</span>
                        <span className="value with-icon">
                            <span className="icon bank"></span>
                            {SlipData?.data?.data?.payerInformation?.name}
                            <span className="account-number">{SlipData?.data?.data?.payerInformation?.accountNo}</span>
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="label">ไปยัง</span>
                        <span className="value with-icon">
                            <span className="icon user"></span>
                            <img src={SlipData?.datatranfer?.members?.banks?.imageUrl} alt="" height={25} /> {SlipData?.data?.data?.payeeInformation?.name},
                            <span className="account-number"> {SlipData?.data?.data?.payeeInformation?.accountNo}</span>
                        </span>
                    </div>
                </div>
                <div className="detail-row">
                    <span className="label">จำนวนเงิน</span>
                    <span className="value amount">{Intl.NumberFormat().format(SlipData?.data?.data?.amount)} {SlipData?.data?.data?.currency?.label}</span>
                </div>
            </div>
            <div className="qr-code-section mt-5">
                {!stateCopy ? <Button onClick={() => handleCopySlip(`
🧾 ข้อมูลการโอนเงิน 🧾
--------------------------------------
สถานะการโอนเงิน => ${SlipData?.data?.data?.instructionStatus?.value === "SUCCESSFUL" ? `✅ ${SlipData?.data?.data?.instructionStatus?.label}` : `❌ ${SlipData?.data?.data?.instructionStatus?.label}`}
วันที่/เวลา => ${moment(SlipData?.data?.data?.creationDatetime).format("YYYY-MM-DD HH:mm:ss")}
Ref => ${SlipData?.datatranfer?.ref}
InstructionRefNo => ${SlipData?.datatranfer?.uuid}
จาก => ${SlipData?.data?.data?.payerInformation?.name}, ${SlipData?.data?.data?.payerInformation?.accountNo}
ไปยัง => ${SlipData?.data?.data?.payeeInformation?.name}, ${SlipData?.data?.data?.payeeInformation?.accountNo}
จำนวนเงิน => ${Intl.NumberFormat().format(SlipData?.data?.data?.amount)} ${SlipData?.data?.data?.currency?.label}
--------------------------------------
ขอขอบคุณที่ใช้บริการ ${config?.merchant}
                    `)}
                    icon={<CopyOutlined className='me-1' />}
                    style={{ color: '#1677ff', borderColor: "#1677ff", cursor: "copy" }}
                    size={"large"}
                >
                    {'คัดลอกข้อมูลส่งลูกค้า'}
                </Button> :
                    <Button style={{ color: 'green', borderColor: "green" }} disabled type="text" icon={<CheckOutlined className='me-1' />} size={"large"}>
                        {`คัดลอกสำเร็จ`}
                    </Button>}
            </div>
            <div className="slip-footer">
                <p>Version: {config?.version}</p>
            </div>
        </div>
    );
};
export default TransactionSlip;