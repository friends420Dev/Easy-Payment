import React from 'react';
import config from 'src/config/app.config';
import type { CollapseProps } from 'antd';
import { Collapse, Image, Divider, Tooltip, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    InfoCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const Instruction = () => {
    const { t } = useTranslation("")
    const itemsExe: CollapseProps['items'] = [
        {
            key: '1',
            label: 'ตัวอย่างหน้าจอ สถานะบัญชี',
            children: <div style={{ width: '100%', overflow: 'auto', borderRadius: 10 }}>
                {/* <iframe src="/#/dashboard" frameBorder={0} width="100%" height="100%" style={{ border: 'none', pointerEvents: 'none' }}>
                    &lt;p&gt;Your browser does not support iframes.&lt;/p&gt;
                    <p>Your browser does not support iframes.</p>
                </iframe> */}

                <div>
                    <Image
                        width={200}
                        src={`https://img5.pic.in.th/file/secure-sv1/104b0c9dc9dc76cc67.md.png`}
                    />
                    <small className='text- d-block'>ภาพตัวอย่าง ยอดเงินคงเหลือ/วงเงิน</small>
                </div>
            </div>,
        },

    ];

    const onChangeExe = (key: string | string[]) => {
        console.log(key);
    };
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <b>{t('Bank account status')}</b>,
            children: <>
                <div className="container">
                    <main>
                        <section>
                            <Divider orientation="left" plain children={<h5 className=''>1. ภาพรวมหน้าจอสถานะบัญชี</h5>} />
                            <div className="subsection">
                                <div>
                                    {/* <Collapse items={itemsExe} defaultActiveKey={['1']} onChange={onChangeExe} /> */}
                                    <Image
                                        width={200}
                                        src={`https://img5.pic.in.th/file/secure-sv1/104b0c9dc9dc76cc67.png`}
                                    />
                                    <small className='text- d-block'>ภาพตัวอย่าง ยอดเงินคงเหลือ/วงเงิน</small>
                                </div>
                            </div>
                        </section>
                        <section>
                            <Divider orientation="left" plain children={<h5 className=''>2. การตรวจสอบ</h5>} />
                            <div className="subsection">
                                <h6 className='h3-Instruction'>การดูยอดเงินคงเหลือ / วงเงิน</h6>
                                <ul>
                                    <li>1. ยอดเงินคงเหลือ ฿ x,xxx.xx.-</li>
                                    <li>2. limit Left x,xxx.xx.-</li>
                                    <li>ไอคอน <SyncOutlined style={{ color: "#1677ff" }} /> อัปเดตยอดเงินคงเหลือ/วงเงิน ปัจจุบัน <em className='text-danger'>( ซึ่งจะอัพเดทอัตโนมัติทุก 2 นาที )</em></li>

                                    <div className="subsection">

                                        <div>
                                            <Image
                                                width={200}
                                                src={`https://img2.pic.in.th/pic/14b01402610ca71ec3.png`}
                                            />
                                            <small className='text- d-block'>ภาพตัวอย่าง ยอดเงินคงเหลือ/วงเงิน</small>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <div className="subsection">
                                <h6 className='h3-Instruction'>ดึงยอด (บัญชีฝาก)</h6>
                                <ul>
                                    <li>ดึงยอด ทุก 2 นาที</li>
                                    <li>แสดง 10 รายการล่าสุด</li>
                                    <div className="subsection">
                                        <div>
                                            <Image
                                                width={200}
                                                src={`https://img2.pic.in.th/pic/11cc035caf43b0a161.png`}
                                            />
                                            <small className='text- d-block'>ภาพตัวอย่าง ดึงยอด</small>
                                        </div>
                                    </div>
                                </ul>
                            </div>

                        </section>

                        <section>
                            <h6 className='h2-Instruction'>ข้อควรทราบและคำแนะนำในการใช้งาน</h6>
                            <ul>
                                <li>ข้อมูลเป็นปัจจุบัน ณ เวลาที่อัปเดตล่าสุด</li>
                                <li>หากข้อมูลไม่ถูกต้อง โปรดติดต่อผู้ดูแลระบบ</li>
                                <li>การปิด Switch : "Auto Update" แอดมินจะต้อง กดปุ่ม "อัพเดทข้อมูล" ด้วยตัวเอง</li>
                                <li>เมื่อกด <SyncOutlined style={{ color: "#1677ff" }} />  "อัพเดทยอด/วงเงิน" ไม่สำเร็จ ( <SyncOutlined spin style={{ color: "#1677ff" }} /> ไอคอนจะหมุนไม่หยุด ) โปรดติดต่อผู้ดูแลระบบ</li>
                                <li>ติดต่อผู้ดูแลระบบหากมีข้อสงสัย หรือ ระบบมีปัญหา</li>
                            </ul>
                        </section>
                    </main>

                    <hr />
                    <footer>
                        <p style={{ color: "#888" }}>© {`${moment().format("YYYY")} Powered by ${config.web_name} support team.`}</p>
                    </footer>
                </div>

            </>,
        },
        {
            key: '2',
            label: <b>{t('Deposit List')}</b>,
            children: <>
                <div className="container">
                    <main>
                        <main>
                            <section>
                                <h2>1. ภาพรวมหน้าจอรายการฝากเงิน</h2>
                                <div className="subsection">
                                    <div>
                                        <div className='d-inline-flex '>
                                            <div className='me-3'>
                                                <Tooltip title="ภาพตัวอย่าง รายการฝากเงิน (ทั้งหมด)">
                                                    <Image
                                                        width={600}
                                                        height={239}
                                                        className=''
                                                        src={`https://img5.pic.in.th/file/secure-sv1/Screenshot_3e44b1b7966ae62c2.png`}
                                                    />
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="ภาพตัวอย่าง รายการฝากรอตรวจสอบ">
                                                    <Image
                                                        width={600}
                                                        height={239}
                                                        className=''
                                                        src={`https://img2.pic.in.th/pic/Screenshot_4b7264467df437522.png`}
                                                    />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    <p className='mt-3'>หน้าจอรายการฝากเงินแสดงข้อมูลสรุปและรายละเอียดเกี่ยวกับการฝากเงินต่างๆ แบ่งตามสถานะ ดังนี้:</p>
                                    <ul>
                                        <li><strong>รายการฝากเงิน (ทั้งหมด):</strong> แสดงจำนวนรายการฝากเงินทั้งหมด (ในรูปคือ **2,728 รายการ**)</li>
                                        <li><strong>รายการฝากรอตรวจสอบ:</strong> แสดงจำนวนรายการฝากเงินที่กำลังอยู่ในสถานะรอตรวจสอบ (ในรูปคือ **0 รายการ** ที่แท็บ "รอตรวจสอบ")</li>
                                        <li><strong>ตารางรายการฝากเงิน:</strong> แสดงรายละเอียดของแต่ละรายการฝากเงิน ประกอบด้วย Member Id, ช่องทางฝาก, Name, Amount, Status, Ref, Remark, Note, และ Created At</li>
                                        <li><strong>ตัวกรอง (Filter):</strong> ช่องค้นหาด้านขวาบน (Search) สำหรับกรองข้อมูลในตาราง</li>
                                        <li><strong>ช่วงวันที่ (Date Range):</strong> ตัวเลือกสำหรับเลือกช่วงวันที่ที่ต้องการดูรายการ</li>
                                        <li><strong>จำนวนต่อหน้า (Items per page):</strong> ตัวเลือกสำหรับกำหนดจำนวนรายการที่แสดงในแต่ละหน้า</li>
                                        <li><strong>การนำทาง (Pagination):</strong> ส่วนสำหรับเปลี่ยนหน้าของรายการ</li>
                                        <li><strong>ปุ่ม "อัปเดตข้อมูล":</strong> (ไอคอน <i className="fas fa-sync blue-icon" />) สำหรับรีเฟรชข้อมูลด้วยตนเอง</li>
                                        <li><strong>Auto Update:</strong> แสดงสถานะการอัปเดตอัตโนมัติ</li>
                                    </ul>

                                    <h5>1.1 รายการฝากเงิน (ทั้งหมด)</h5>
                                    <p>เมื่อคลิกที่แท็บ <strong>รายการฝากเงิน (<span className="blue-text">2,728</span> / <span className="red-text">0</span> รายการ)</strong> จะแสดงรายการฝากเงินทั้งหมด โดยมีรายละเอียดดังนี้:</p>
                                    <ul>
                                        <li>แสดงจำนวนรายการทั้งหมดที่พบ (**2,728 รายการ**)</li>
                                        <li>ตารางแสดงข้อมูล Member Id (เช่น 22690), **บัญชีธนาคาร** (เช่น scb xx 6009), Name (เช่น นาย อุบล ตั้งศรีเจริญ), Amount (เช่น 100.-), Status (ส่วนใหญ่คือ "สำเร็จ" สีเขียว), Ref (เช่น c7699fd6-7e13-49f0...), Remark (เช่น ไม่ระบุ), Note (เช่น ออโต้), และ Created At (เช่น 38 นาทีที่แล้ว)</li>
                                    </ul>
                                    <div className="subsection">
                                        <div>
                                            <Image
                                                width={600}
                                                height={239}
                                                className=''
                                                src={`https://img5.pic.in.th/file/secure-sv1/Screenshot_3e44b1b7966ae62c2.png`}
                                            />
                                            <small className="d-block">ภาพตัวอย่าง ตารางรายการฝากเงิน (ทั้งหมด)</small>
                                        </div>
                                    </div>

                                    <h5>1.2 รายการฝากรอตรวจสอบ</h5>
                                    <p>เมื่อคลิกที่แท็บ <strong>รอตรวจสอบ (<span className="blue-text">0</span> / <span className="red-text">0</span> รายการ)</strong> จะแสดงเฉพาะรายการฝากเงินที่อยู่ในสถานะรอตรวจสอบ:</p>
                                    <ul>
                                        <li>แสดงจำนวนรายการที่กำลังรอตรวจสอบ (**0 รายการ** ในรูปภาพนี้)</li>
                                        <li>ในรูปภาพนี้ ตารางรายการฝากรอตรวจสอบจะว่างเปล่า เนื่องจากไม่มีรายการใดอยู่ในสถานะนี้</li>
                                    </ul>
                                    <div className="subsection">
                                        <div>
                                            <Image
                                                width={600}
                                                height={239}
                                                className=''
                                                src={`https://img2.pic.in.th/pic/Screenshot_4b7264467df437522.png`}
                                            />
                                            <small className="d-block">ภาพตัวอย่าง ตารางรายการฝากรอตรวจสอบ (ไม่มีรายการ)</small>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h2>2. การตรวจสอบ</h2>
                                <div className="subsection">
                                    <h5>2.1 การดูข้อมูลรายการฝากเงิน</h5>
                                    <p>ตารางรายการฝากเงินจะแสดงข้อมูลโดยละเอียดของแต่ละรายการ:</p>
                                    <ul>
                                        <li><strong>Member Id:</strong> รหัสสมาชิก (เช่น 22690)</li>
                                        <li><strong>บัญชีธนาคาร:</strong> วิธีการที่ลูกค้าใช้ในการฝากเงิน (เช่น scb xx 6009)</li>
                                        <li><strong>Name:</strong> ชื่อผู้ฝาก (เช่น นาย อุบล ตั้งศรีเจริญ)</li>
                                        <li><strong>Amount:</strong> จำนวนเงินที่ฝาก (เช่น 100.-)</li>
                                        <li><strong>Status:</strong> สถานะของรายการ (ในรูปคือ "สำเร็จ" สีเขียว)</li>
                                        <li><strong>Ref:</strong> รหัสอ้างอิงของรายการ (เช่น c7699fd6-7e13-49f0...)</li>
                                        <li><strong>Note:</strong> หมายเหตุ (เช่น ออโต้)</li>
                                        <li><strong>Created At:</strong> วันและเวลาที่รายการถูกสร้าง (เช่น 34 นาทีที่แล้ว)</li>
                                    </ul>
                                    <div className="subsection">
                                        <div>
                                            <Image
                                                width={600}
                                                height={239}
                                                className=''
                                                src={`https://img5.pic.in.th/file/secure-sv1/Screenshot_3e44b1b7966ae62c2.png`}
                                            />
                                            <small className="d-block">ภาพตัวอย่าง ตารางรายการฝากเงิน (ทั้งหมด)</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="subsection">
                                    <h3>2.2 การกรองข้อมูล</h3>
                                    <p>ท่านสามารถใช้ช่องค้นหาด้านขวาบน (ที่มีคำว่า "Ref." และช่อง Search...) เพื่อค้นหาหรือกรองข้อมูลในตารางตามคำที่ต้องการได้ เช่น ค้นหาด้วย Member Id, ชื่อ, หรือ Ref.</p>
                                    
                                </div>
                                <div className="subsection">
                                    <h3>2.3 การเลือกช่วงวันที่</h3>
                                    <p>ท่านสามารถเลือกช่วงวันที่ที่ต้องการดูรายการฝากเงินได้ โดยคลิกที่ช่อง **ช่วงเวลาการค้นหา:** ที่อยู่เหนือตาราง และเลือกวันที่เริ่มต้นและวันที่สิ้นสุด (ในรูปคือ **09-05-2025** ถึง **09-05-2025**)</p>
                                    
                                </div>
                                <div className="subsection">
                                    <h3>2.4 การเปลี่ยนหน้าและจำนวนรายการต่อหน้า</h3>
                                    <p>ใช้ส่วนของการนำทาง (ด้านล่างตาราง) เพื่อเปลี่ยนหน้าของรายการ (ปุ่มหมายเลข **1**, **2**, **3**, **4**, **...**) และใช้ตัวเลือก **Items per page:** (**5**, **10**, **20**, **50**) เพื่อกำหนดจำนวนรายการที่แสดงในแต่ละหน้า (ในรูปคือเลือก **5**)</p>
                                    
                                </div>
                            </section>
                            <section>
                                <h2>3. การใช้งานปุ่มและฟังก์ชันเพิ่มเติม</h2>
                                <div className="subsection">
                                    <h3>3.1 ปุ่ม "อัปเดตข้อมูล"</h3>
                                    <p>คลิกที่ปุ่ม <i className="fas fa-sync blue-icon" /> <strong>อัปเดตข้อมูล</strong> ที่อยู่บริเวณด้านบนขวาของตาราง เพื่อดึงข้อมูลรายการฝากเงินล่าสุดด้วยตนเอง</p>
                                </div>
                                <div className="subsection">
                                    <h3>3.2 "Auto Update"</h3>
                                    <p>ส่วน <strong>Auto Update</strong> ที่อยู่บริเวณด้านบนขวาของตาราง แสดงสถานะการอัปเดตอัตโนมัติ หากเปิดใช้งาน (ในรูปคือ **เปิด**) ระบบจะทำการอัปเดตข้อมูลเป็นระยะ</p>
                                    <p className="text-danger">หากปิดใช้งาน ท่านจะต้องกดปุ่ม <i className="fas fa-sync blue-icon" /> <strong>อัปเดตข้อมูล</strong> ด้วยตนเองเพื่อดูข้อมูลล่าสุด</p>
                                </div>
                            </section>
                            <section>
                                <h2>4. ข้อควรทราบและคำแนะนำในการใช้งาน</h2>
                                <ul>
                                    <li>ข้อมูลที่แสดงเป็นปัจจุบัน ณ เวลาที่อัปเดตล่าสุด</li>
                                    <li>หากพบข้อมูลที่ไม่ถูกต้อง โปรดติดต่อผู้ดูแลระบบ</li>
                                    <li>ตรวจสอบช่วงวันที่ที่เลือก หากไม่พบรายการที่ต้องการ</li>
                                    <li>หากการอัปเดตข้อมูลไม่สำเร็จ (สังเกตจากสัญลักษณ์โหลดค้าง) โปรดติดต่อผู้ดูแลระบบ</li>
                                    <li>ติดต่อผู้ดูแลระบบหากมีข้อสงสัย หรือ ระบบมีปัญหา</li>
                                </ul>
                            </section>
                        </main>
                    </main>

                    <hr />
                    <footer>
                        <p style={{ color: "#888" }}>© {`${moment().format("YYYY")} Powered by ${config.web_name} support team.`}</p>
                    </footer>
                </div>

            </>,
        },
        {
            key: '3',
            label: <b>{t('Withdrawal List')}</b>,
            children: <><div className="container">
                <main>

                    <section>
                        <h2>1. ภาพรวมหน้าจอรายการถอนเงิน</h2>
                        <div className="subsection">
                            <div>
                                <div className='d-inline-flex '>
                                    <div className='me-3'>
                                        <Tooltip title="ภาพตัวอย่าง รายการถอนเงิน (ทั้งหมด)">
                                            <Image
                                                width={500}
                                                height={239}
                                                className=''
                                                src={`https://img2.pic.in.th/pic/Screenshot_14c271b2b907e9650.png`}
                                            />
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="ภาพตัวอย่าง รายการถอนรอดำเนินการ">
                                            <Image
                                                width={500}
                                                height={239}
                                                className=''
                                                src={`https://img2.pic.in.th/pic/Screenshot_2debbb09af44b6dd6.png`}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                            <p className='mt-3'>หน้าจอรายการถอนเงินแสดงข้อมูลสรุปและรายละเอียดเกี่ยวกับการถอนเงินต่างๆ แบ่งตามสถานะ ดังนี้:</p>
                            <ul>
                                <li><strong>รายการถอนเงิน (ทั้งหมด):</strong> แสดงจำนวนรายการถอนเงินทั้งหมด (ในรูปที่ 1 คือ **650 รายการ**, ในรูปที่ 2 คือ **659 รายการ**)</li>
                                <li><strong>รายการถอนรอดำเนินการ:</strong> แสดงจำนวนรายการถอนเงินที่กำลังอยู่ในสถานะรอดำเนินการ (ในรูปที่ 1 คือ **1 รายการ**, ในรูปที่ 2 คือ **2 รายการ** ที่แท็บ "รอดำเนินการ")</li>
                                <li><strong>ตารางรายการถอนเงิน:</strong> แสดงรายละเอียดของแต่ละรายการถอนเงิน ประกอบด้วย Member Id, Bank Account (แสดงบางส่วน), Name, Amount, Status, Ref, Remark, Note, และ Created At (และ Advanced ในรูปที่ 2)</li>
                                <li><strong>ตัวกรอง (Filter):</strong> ช่องค้นหาด้านขวาบน (Search) สำหรับกรองข้อมูลในตาราง</li>
                                <li><strong>ช่วงวันที่ (Date Range):</strong> ตัวเลือกสำหรับเลือกช่วงวันที่ที่ต้องการดูรายการ</li>
                                <li><strong>จำนวนต่อหน้า (Items per page):</strong> ตัวเลือกสำหรับกำหนดจำนวนรายการที่แสดงในแต่ละหน้า</li>
                                <li><strong>การนำทาง (Pagination):</strong> ส่วนสำหรับเปลี่ยนหน้าของรายการ</li>
                                <li><strong>ปุ่ม "อัปเดตข้อมูล":</strong> (ไอคอน <i className="fas fa-sync blue-icon" />) สำหรับรีเฟรชข้อมูลด้วยตนเอง</li>
                                <li><strong>Auto Update:</strong> แสดงสถานะการอัปเดตอัตโนมัติ</li>
                            </ul>

                            <h5>1.1 รายการถอนเงิน (ทั้งหมด)</h5>
                            <p>เมื่อคลิกที่แท็บ <strong>รายการถอนเงิน (<span className="blue-text">650</span> / <span className="red-text">659</span> รายการ)</strong> (รูปที่ 1 และ 2) จะแสดงรายการถอนเงินทั้งหมด โดยมีรายละเอียดดังนี้:</p>
                            <ul>
                                <li>แสดงจำนวนรายการทั้งหมดที่พบ</li>
                                <li>ตารางแสดงข้อมูล Member Id, Bank Account, Name, Amount, Status (ส่วนใหญ่คือ "สำเร็จ" สีเขียว), Ref, Remark, Note, และ Created At</li>
                            </ul>
                            <div className="subsection">
                                <div>
                                    <Image
                                        width={600}
                                        className=''
                                        src={`https://img2.pic.in.th/pic/Screenshot_14c271b2b907e9650.png`}
                                    />
                                    <small className="d-block">ภาพตัวอย่าง ตารางรายการถอนเงิน (ทั้งหมด)</small>
                                </div>
                            </div>

                            <h5>1.2 รายการถอนรอดำเนินการ</h5>
                            <p>เมื่อคลิกที่แท็บ <strong>รอดำเนินการ (<span className="blue-text">1</span> / <span className="red-text">2</span> รายการ)</strong> (รูปที่ 1 และ 2) จะแสดงเฉพาะรายการถอนเงินที่อยู่ในสถานะรอดำเนินการ โดยมีรายละเอียดเพิ่มเติมดังนี้:</p>
                            <ul>
                                <li>แสดงจำนวนรายการที่กำลังรอดำเนินการ</li>
                                <li>ตารางแสดงข้อมูล Member Id, Bank Account, Name, Amount, Status (เช่น "In_Queue" สีฟ้า, "Processing" สีม่วง), Ref, Remark, Note, Created At และคอลัมน์ <strong>Advanced</strong> (รูปที่ 2) ซึ่งอาจมีปุ่มหรือข้อมูลเพิ่มเติม เช่น "Rejected" สีแดง และ "Manual" สีเทา</li>
                            </ul>
                            <div className="subsection">
                                <div>
                                    <Image
                                        width={600}
                                        className=''
                                        src={`https://img2.pic.in.th/pic/Screenshot_2debbb09af44b6dd6.png`}
                                    />
                                    <small className="d-block">ภาพตัวอย่าง ตารางรายการถอนรอดำเนินการ</small>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2>2. การตรวจสอบ</h2>
                        <div className="subsection">
                            <h5>2.1 การดูข้อมูลรายการถอนเงิน</h5>
                            <p>ตารางรายการถอนเงินจะแสดงข้อมูลโดยละเอียดของแต่ละรายการ:</p>
                            <ul>
                                <li><strong>Member Id:</strong> รหัสสมาชิก (เช่น 23992)</li>
                                <li><strong>Bank Account:</strong> หมายเลขบัญชีธนาคาร (แสดงบางส่วน เช่น ktb, vx 0748)</li>
                                <li><strong>Name:</strong> ชื่อผู้ถอน (เช่น บรรจบ งามเงิน)</li>
                                <li><strong>Amount:</strong> จำนวนเงินที่ถอน (เช่น 100.-)</li>
                                <li><strong>Status:</strong> สถานะของรายการ (ในรูปส่วนใหญ่คือ **"สำเร็จ"** ที่เป็นปุ่มสีเขียว)</li>
                                <li><strong>Ref:</strong> รหัสอ้างอิงของรายการ (เช่น 9e2cb9e6-0aa9-43da...)</li>
                                <li><strong>Note:</strong> หมายเหตุ (เช่น ถอน Auto)</li>
                                <li><strong>Created At:</strong> วันและเวลาที่รายการถูกสร้าง (เช่น 3 นาทีที่แล้ว)</li>
                            </ul>
                            <div className="subsection">
                                <div>
                                    {/* โค้ดส่วนนี้อ้างอิงรูปภาพจาก `src/assets/images/avatars/10.png` ซึ่งไม่ตรงกับรูปภาพที่ให้มา */}
                                    {/* ผมจะอธิบายโดยอิงจากรูปภาพหน้าจอรายการถอนเงิน */}
                                    <img src="https://img2.pic.in.th/pic/Screenshot_14c271b2b907e9650.png" alt="ภาพตัวอย่าง ตารางรายการถอนเงิน" width={600} />
                                    <small className="d-block">ภาพตัวอย่าง ตารางรายการถอนเงิน</small>
                                </div>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>2.2 การกรองข้อมูล</h3>
                            <p>ท่านสามารถใช้ช่อง **Filter** หรือช่องค้นหาด้านขวาบน (ที่มีคำว่า "Search...") เพื่อค้นหาหรือกรองข้อมูลในตารางตามคำที่ต้องการได้ เช่น ค้นหาด้วย Member Id หรือชื่อ</p>
                            <div className="subsection">
                                <div>
                                    {/* โค้ดส่วนนี้อ้างอิงรูปภาพจาก `src/assets/images/avatars/filter.png` ซึ่งอาจจะไม่ตรงกับตำแหน่งในรูปภาพ */}
                                    {/* ในรูปภาพ ช่องค้นหาจะอยู่ด้านขวาบน */}
                                    {/* <img src="https://img2.pic.in.th/pic/search_box_example.png" alt="ภาพตัวอย่าง ช่องกรองข้อมูล" width={300} /> */}
                                    {/* <small className="d-block">ภาพตัวอย่าง ช่องกรองข้อมูล (ช่องค้นหาด้านขวาบน)</small> */}
                                </div>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>2.3 การเลือกช่วงวันที่</h3>
                            <p>ท่านสามารถเลือกช่วงวันที่ที่ต้องการดูรายการถอนเงินได้ โดยคลิกที่ช่อง **ช่วงเวลาการค้นหา:** ที่อยู่เหนือตาราง และเลือกวันที่เริ่มต้นและวันที่สิ้นสุด</p>
                            <div className="subsection">
                                <div>
                                    {/* โค้ดส่วนนี้อ้างอิงรูปภาพจาก `src/assets/images/avatars/date-range.png` ซึ่งตรงกับตัวเลือกช่วงวันที่ในรูปภาพ */}
                                    {/* <img src="https://img2.pic.in.th/pic/date_range_picker_example.png" alt="ภาพตัวอย่าง การเลือกช่วงวันที่" width={400} /> */}
                                    {/* <small className="d-block">ภาพตัวอย่าง การเลือกช่วงวันที่</small> */}
                                </div>
                            </div>
                        </div>
                        <div className="subsection">
                            <h3>2.4 การเปลี่ยนหน้าและจำนวนรายการต่อหน้า</h3>
                            <p>ใช้ส่วนของการนำทาง (ด้านล่างตาราง) เพื่อเปลี่ยนหน้าของรายการ (ปุ่มหมายเลข **1**, **2**, **3**, **4**, **...**) และใช้ตัวเลือก **Items per page:*5*,*10*,*20*,*50*, (ในรูปคือเลือก **5**) เพื่อกำหนดจำนวนรายการที่แสดงในแต่ละหน้า</p>
                            <div className="subsection">
                                <div>
                                    {/* โค้ดส่วนนี้อ้างอิงรูปภาพจาก `src/assets/images/avatars/pagination.png` ซึ่งตรงกับส่วนการนำทางและตัวเลือกจำนวนต่อหน้าในรูปภาพ */}
                                    {/* <img src="https://img2.pic.in.th/pic/pagination_example.png" alt="ภาพตัวอย่าง การเปลี่ยนหน้าและจำนวนรายการต่อหน้า" width={400} /> */}
                                    {/* <small className="d-block">ภาพตัวอย่าง การเปลี่ยนหน้าและจำนวนรายการต่อหน้า</small> */}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2>3. การใช้งานปุ่มและฟังก์ชันเพิ่มเติม</h2>
                        <div className="subsection">
                            <h3>3.1 ปุ่ม "อัปเดตข้อมูล"</h3>
                            <p>คลิกที่ปุ่ม <i className="fas fa-sync blue-icon" /> <strong>อัปเดตข้อมูล</strong> ที่อยู่บริเวณด้านบนขวาของตาราง เพื่อดึงข้อมูลรายการถอนเงินล่าสุดด้วยตนเอง</p>
                        </div>
                        <div className="subsection">
                            <h3>3.2 "Auto Update"</h3>
                            <p>ส่วน <strong>Auto Update</strong> ที่อยู่บริเวณด้านบนขวาของตาราง แสดงสถานะการอัปเดตอัตโนมัติ หากเปิดใช้งาน (ในรูปคือ **เปิด**) ระบบจะทำการอัปเดตข้อมูลเป็นระยะ</p>
                            <p className="text-danger">หากปิดใช้งาน ท่านจะต้องกดปุ่ม <i className="fas fa-sync blue-icon" /> <strong>อัปเดตข้อมูล</strong> ด้วยตนเองเพื่อดูข้อมูลล่าสุด</p>
                        </div>
                    </section>
                    <section>
                        <h2>4. ข้อควรทราบและคำแนะนำในการใช้งาน</h2>
                        <ul>
                            <li>ข้อมูลที่แสดงเป็นปัจจุบัน ณ เวลาที่อัปเดตล่าสุด</li>
                            <li>หากพบข้อมูลที่ไม่ถูกต้อง โปรดติดต่อผู้ดูแลระบบ</li>
                            <li>ตรวจสอบช่วงวันที่ที่เลือก หากไม่พบรายการที่ต้องการ</li>
                            <li>หากการอัปเดตข้อมูลไม่สำเร็จ (สังเกตจากสัญลักษณ์โหลดค้าง) โปรดติดต่อผู้ดูแลระบบ</li>
                            <li>ติดต่อผู้ดูแลระบบหากมีข้อสงสัย หรือ ระบบมีปัญหา</li>
                        </ul>
                    </section>
                </main>

                <hr />
                <footer>
                    <p style={{ color: "#888" }}>© {`${moment().format("YYYY")} Powered by ${config.web_name} support team.`}</p>
                </footer>
            </div></>,
        },
    ];

    return (<>
        <Alert message="กำลังดำเนินการ..." type="warning" showIcon />
        <p></p>
        <div>
            <div className="container">
                <header style={{ textTransform: "uppercase" }}>
                    <h1 >คู่มือการใช้งานระบบ {config?.web_name}</h1>
                    <p>เอกสารนี้จัดทำขึ้นเพื่อเป็นคู่มือการใช้งานระบบ {config?.web_name} สำหรับผู้ใช้งานทุกท่าน</p>
                </header>
                <main className='mt-5'>
                    <Collapse accordion items={items} />
                </main>
            </div>
        </div >

    </>);
}

export default Instruction;