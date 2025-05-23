import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Image, Space } from 'antd';
export const Learn = () => {

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: '1. เปิดแอป Google Authenticator',
            children: <ul style={{ fontWeight: "500" }}>
                <li>
                    ในแอปฯ Google Authenticator ให้แตะ 'เริ่มต้นใช้งาน'
                </li>
                <br />
                <Image
                    style={{ margin: "0 auto" }}
                    width={200}
                    src="https://img2.pic.in.th/pic/1ec154ed7203af131.md.png"
                />
                <em className='d-block text-left mx-5'><u>รูปตัวอย่างที่ 1</u></em>
            </ul>,
        },
        {
            key: '2',
            label: '2. ลงทะเบียนใช้งาน',
            children: <ul style={{ fontWeight: "500" }}>
                <>
                    <em className='d-block'>* <u>นี้จะเป็นการยกตัวอย่าง การใช้งานแบบไม่มีบัญชี</u></em>
                    <em>
                        * สำหรับการใช้งาน Google Authenticator สามารถใช้ได้ทั้ง <b>ลงทะเบียนบัญชี Gmail</b> หรือ <b>ใช้งานแบบไม่มีบัญชี...</b>
                    </em>
                </>

                <li className='mt-3'>
                    ให้แตะที่  "<b>ใช้งาน Authenticator โดยไม่มีบัญชี</b>"
                </li>

                <br />
                <Image
                    style={{ margin: "0 auto" }}
                    width={200}
                    src="https://img5.pic.in.th/file/secure-sv1/2c599e1f8f7f1b374.md.png"
                />
                <em className='d-block text-left mx-5'><u>รูปตัวอย่างที่ 2</u></em>
            </ul>,
        },
        {
            key: '3',
            label: '3. สแกน QRcode',
            children: <ul style={{ fontWeight: "500" }}>
                <li>
                    ให้แตะ 'ไอคอนบวก +' ดังรูปตัวอย่างที่ 3
                </li>
                <li className='mt-3'>
                    ให้เลือกที่เมนู 'สแกนคิวอาร์โค้ด' ดังรูปตัวอย่างที่ 4
                </li>
                <li className='mt-3'>
                    สแกนคิวอาร์โค้ดที่แสดงหน้าเว็ป
                </li>
                <br />
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    <Image className='me-2' width={200} src="https://img2.pic.in.th/pic/3fe95633b501ef8b1.md.jpg" />

                    <Image
                        width={200}
                        src="https://img5.pic.in.th/file/secure-sv1/49b3967cd1d5611b1.md.jpg"
                    />
                    <br />

                </Image.PreviewGroup>
                <em className='d-inline-block text-left mx-5'><u>รูปตัวอย่างที่ 3</u></em>
                <em className='d-inline-block text-left mx-5'><u>รูปตัวอย่างที่ 4</u></em>
            </ul>,
        },
        {
            key: '4',
            label: '4. กรอกรหัสผ่านยืนยัน',
            children: <ul>
                <li>
                    เมื่อสแกนคิวอาร์โค้ดแล้ว จะได้รับรหัส 6 หลัก ( <em style={{ fontWeight: "500" }}>รหัส 6 หลัก จากแอป Google Authenticatorจะ
                        เปลี่ยนทุก 20วินาที</em> ) ดังรูปตัวอย่างที่ 5
                </li>
                <li className='mt-3'>
                    กรอกรหัส 6 หลัก จากแอปฯ
                    Google Authenticator แล้วกด "Verify" เข้าสู่ระบบ สำเร็จ ! ดังรูปตัวอย่างที่ 6
                </li>

                <br />
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    <Image className='me-2' width={200} src="https://img5.pic.in.th/file/secure-sv1/53608b9259ab8aebe.md.png" />

                    <Image
                        width={200}
                        src="https://img2.pic.in.th/pic/66783bcb72c52454b.png"
                    />
                </Image.PreviewGroup>
                <br />
                <p className='d-inline-block text-left mx-5'><p>รูปตัวอย่างที่ 5</p></p>
                <em className='d-inline-block  text-left mx-5'><u>รูปตัวอย่างที่ 6</u></em>
            </ul>,
        },
    ];
    return (
        <div className='row mx-2'>
            <h5 className="text-darkblue p-0 mx-3 mt-1 mb-3 ">ขั้นตอนเข้าสู่ระบบ 2FA ด้วย Google Authentication</h5>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Collapse className='w-100' accordion items={items} />
            </Space>
        </div>
    );
}