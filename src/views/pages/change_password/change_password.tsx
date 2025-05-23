import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react-pro';
import { Button, Result, Spin } from 'antd';
import {
    EyeOutlined,
    EyeInvisibleOutlined,
    CloseOutlined,
    CheckOutlined,
} from '@ant-design/icons';
import config from '../../../config/app.config';
import Apisetting from 'src/api/Apisetting';
import Swal from 'sweetalert2';
import { setToken } from '../../../Token';
interface PasswordInput {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

interface ChangePasswordProps {
    password?: string;
    username?: string;
    msg?: string;
    IP?: string;
    user_device_id?: string;
}
const Change_password: React.FC<ChangePasswordProps> = ({ password, username, msg, IP, user_device_id }) => {
    const [type_old_password, setType_Old_password] = useState<boolean>(false);
    const [type_new_password, setType_New_password] = useState<boolean>(false);
    const [spinning, setSpinning] = useState(false);
    const [percent, setPercent] = useState(0);
    const showLoader = () => {
        let ptg = -10;

        const interval = setInterval(() => {
            ptg += 5;
            setPercent(ptg);

            if (ptg > 120) {
                clearInterval(interval);
                setPercent(0);
            }
        }, 100);
    };
    const handleShowOldPassword = () => {
        setType_Old_password(!type_old_password);
    };
    const handleShowPassword = () => {
        setType_New_password(!type_new_password);
    };
    const [handleInput, setHandleInput] = useState<PasswordInput>({
        old_password: "",
        new_password: '',
        confirm_password: '',
    });
    const { old_password, new_password, confirm_password } = handleInput;
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setHandleInput({
            ...handleInput,
            [event.target.name]: event.target.value,
        });
    }
    function validatePassword(password: string): boolean {
        if (password.length < 5 || password.length > 15) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/[a-z]/.test(password)) {
            return false;
        }
        if (!/[0-9]/.test(password)) {
            return false;
        }
        return true;
    }
    function validateNumber(password: string): boolean {
        return /[0-9]/.test(password);
    }
    function validateCapitalEnglish(password: string): boolean {
        return /[A-Z]/.test(password);
    }
    function validateLowercaseEnglish(password: string): boolean {
        return /[a-z]/.test(password);
    }
    function validateCharacterLength(password: string): boolean {
        if (password.length < 5 || password.length > 15) {
            return false;
        }
        return true;
    }
    function validateNewPassword_Confirm_password(new_password: string, confirm_pass: string): boolean {
        if (new_password != confirm_pass) {
            return false;
        }
        if (!new_password || !confirm_pass) {
            return false;
        }
        return true;
    }
    function validateNewPassword_Old_password(new_password: string): boolean {
        let o = old_password || password
        if (!new_password) {
            return false;
        }
        if (new_password == o) {
            return false;
        }
        return true;
    }
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    function Low_balance_alert(status: any, msg: any, redirect: any) {
        if (status) {
            // สร้างเสียงแจ้งเตือน
            const playAudio = new Audio('https://tiengdong.com/wp-content/uploads/Nhac-chuong-thong-bao-iphone-12-www_tiengdong_com.mp3?_=1');
            playAudio.play();
            // แสดงข้อความแจ้งเตือน
            const Notification_message = msg;
            Toast.fire({
                icon: "success",
                title: Notification_message
            });
            setTimeout(function () {
                window.location.assign(redirect)
            }, 2000)
        }
    }
    const onSubmitForgotPassword = (event: any) => {
        event.preventDefault();
        showLoader();
        setSpinning(true);
        let data = {
            current_password: old_password || password,
            new_password: handleInput?.new_password,
            user_device_id: user_device_id,
            IP: IP,
            username: username,
        }
        Apisetting.forgotPassword(data)
            .then((res) => {
                //console.log(res.data)
                if (res.data.success) {
                    setTimeout(() => {
                        setSpinning(false);
                        const payload = {
                            token: res?.data?.token,
                            userInfo: res?.data?.user,
                        }
                        const sessionData = {
                            token: res?.data?.token,
                            loginTime: new Date().getTime()
                        };
                        setToken(payload)
                        localStorage.setItem('loginTime', JSON.stringify(sessionData));
                        Low_balance_alert(res.data.success, res.data.message, res.data.redirect)
                    }, 1500);

                } else {
                    setTimeout(() => {
                        setSpinning(false);
                        Toast.fire({
                            icon: "error",
                            title: `${res.data.message}`
                        });
                    }, 1500)
                }

            }).catch((err) => {
                setTimeout(() => {
                    Toast.fire({
                        icon: "error",
                        title: `${err.message}`
                    });
                }, 1500)
                console.log(err)
            })
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <Spin spinning={spinning} percent={percent} fullscreen />
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={onSubmitForgotPassword}>
                                    <p className="h3 text-center mt-2">{config?.web_name}</p>
                                    <h6 className="text-center  mb-4">Change password</h6>
                                    <p className="text-body-secondary">Create new password.</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>รหัสปัจจุบัน</CInputGroupText>
                                        <CFormInput
                                            type={type_old_password ? 'text' : 'password'}
                                            placeholder="Current password"
                                            name="old_password"
                                            onChange={handleOnChange}
                                            value={old_password || password}
                                        />
                                        <CInputGroupText>
                                            {!type_old_password ? (
                                                <EyeInvisibleOutlined onClick={handleShowOldPassword} />
                                            ) : (
                                                <EyeOutlined onClick={handleShowOldPassword} />
                                            )}
                                        </CInputGroupText>
                                    </CInputGroup>
                                    <CInputGroup className="">
                                        <CInputGroupText>ตั้งรหัสใหม่</CInputGroupText>
                                        <CFormInput
                                            type={type_new_password ? 'text' : 'password'}
                                            onChange={handleOnChange}
                                            placeholder="New password"
                                            id="password_new"
                                            name="new_password"
                                            value={new_password}
                                            autoFocus
                                        />
                                    </CInputGroup>
                                    <b className={`${new_password === password ? 'd-block text-danger mb-2 mt-1' : 'd-none'}`}>
                                        <small>
                                            <CloseOutlined /> {`รหัสผ่านใหม่ ต้องไม่ตรงกับ รหัสผ่านเก่า`}
                                        </small>
                                    </b>
                                    <b className={`${!validatePassword(new_password) ? 'd-block text-danger mb-2 mt-1' : 'd-none'}`}>
                                        <small>
                                            <CloseOutlined /> {`รหัสผ่านประกอบด้วย ( A-z, 0-9, ไม่เกิน 5-15 ตัวอักษร)`}
                                        </small>
                                    </b>
                                    <p id="message"></p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>ยืนยันรหัสใหม่</CInputGroupText>
                                        <CFormInput
                                            type={type_new_password ? 'text' : 'password'}
                                            name="confirm_password"
                                            placeholder="Confirm password"
                                            onChange={handleOnChange}
                                            value={confirm_password}
                                        />
                                        <CInputGroupText>
                                            {!type_new_password ? (
                                                <EyeInvisibleOutlined onClick={handleShowPassword} />
                                            ) : (
                                                <EyeOutlined onClick={handleShowPassword} />
                                            )}
                                        </CInputGroupText>
                                    </CInputGroup>
                                    <ul className="mt-3 p-0" style={{ listStyle: 'none', fontWeight: "600" }}>
                                        <li style={{ color: `${validateNumber(new_password) ? '#51cc8a' : 'red'}` }}>
                                            <small>
                                                {validateNumber(new_password) ? <CheckOutlined className="me-1" /> : <CloseOutlined className="me-1" />} รหัสผ่านต้องตัวเลข 0-9 อย่างน้อย 1 ตัว
                                            </small>
                                        </li>
                                        <li style={{ color: `${validateCapitalEnglish(new_password) ? '#51cc8a' : 'red'}` }}>
                                            <small>
                                                {validateCapitalEnglish(new_password) ? <CheckOutlined className="me-1" /> : <CloseOutlined className="me-1" />} ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่อย่างน้อย 1 ตัวอักษร A-Z
                                            </small>
                                        </li>
                                        <li style={{ color: `${validateLowercaseEnglish(new_password) ? '#51cc8a' : 'red'}` }}>
                                            <small>
                                                {validateLowercaseEnglish(new_password) ? <CheckOutlined className="me-1" /> : <CloseOutlined className="me-1" />} ตัวอักษรภาษาอังกฤษพิมพ์เล็กอย่างน้อย 1 ตัวอักษร a-z
                                            </small>
                                        </li>
                                        <li style={{ color: `${validateCharacterLength(new_password) ? '#51cc8a' : 'red'}` }}>
                                            <small>
                                                {validateCharacterLength(new_password) ? <CheckOutlined className="me-1" /> : <CloseOutlined className="me-1" />} รหัสผ่านต้องมีความยาวไม่เกิน 5-15 ตัวอักษร
                                            </small>
                                        </li>
                                        <li style={{ color: `${validateNewPassword_Confirm_password(new_password, confirm_password) ? '#51cc8a' : 'red'}` }}>
                                            <small>
                                                {validateNewPassword_Confirm_password(new_password, confirm_password) ? <CheckOutlined className="me-1" /> : <CloseOutlined className="me-1" />} ยืนยันรหัสผ่านตรงกับรหัสผ่านใหม่
                                            </small>
                                        </li>
                                        <li style={{ color: `${validateNewPassword_Old_password(new_password) ? '#51cc8a' : 'red'}` }}>
                                            <small>
                                                {validateNewPassword_Old_password(new_password) ? <CheckOutlined className="me-1" /> : <CloseOutlined className="me-1" />} รหัสผ่านใหม่ต้องไม่ตรงกับรหัสปัจจุบัน
                                            </small>
                                        </li>
                                    </ul>
                                    <div className="d-grid mt-4">
                                        <CButton
                                            style={{ color: '#fff' }}
                                            color="success"
                                            type='submit'
                                            disabled={
                                                !validateNumber(new_password) ||
                                                !validateCapitalEnglish(new_password) ||
                                                !validateLowercaseEnglish(new_password) ||
                                                !validateCharacterLength(new_password) ||
                                                !validateNewPassword_Confirm_password(new_password, confirm_password) ||
                                                !validateNewPassword_Old_password(new_password) ||
                                                !new_password ||
                                                !confirm_password ||
                                                false
                                            }
                                        >
                                            Change Password
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                            <p className="versions text-center mb-3" style={{ display: 'flex', justifyContent: 'center', color: '#888', fontSize: '12px' }}>
                                Version: {config?.version}
                            </p>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};
export default Change_password;