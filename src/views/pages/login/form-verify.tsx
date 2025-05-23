import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CAlert
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import Apisetting from '../../../api/Apisetting'
import { setToken } from '../../../Token';
import config from 'src/config/app.config'
import { Input, message, Flex, Image, Typography, Alert } from 'antd';
import { KeyOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import type { GetProps } from 'antd';
type OTPProps = GetProps<typeof Input.OTP>;
const { Title } = Typography;
type Props = {
    form_verify?: any
    ip?: any
    setForm_verify?: any
    setForm_login?: any
    setForm_set?: any
    openNotification: any
    dataURL?: any
    txtAlert?: any
    userName?: any
    showLoading: any
    showLoader: any
    setSpinning: any
}

const Form_verify = ({ setForm_verify, ip, form_verify, setForm_login, openNotification, dataURL, txtAlert, userName, showLoading, showLoader, setSpinning }: Props) => {
    const [Lang, setLang]: any = React.useState(false)
    const [messageApi, contextHolder]: any = message.useMessage();
    const [err, setError] = useState('')
    const [errs, setErrors] = useState('')
    const [data, setData] = useState({
        token: '',
    })
    let { token } = data
    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setError('')
    }
    const onChange: OTPProps['onChange'] = (text) => {

        if (text?.length == 6) {
            setData({ token: text })
            // setLang(true)
            // const datapost = {
            //     IP: ip,
            //     token: text,
            //     username: userName?.data?.username,
            //     user_device_id: userName?.data?.user_device_id,
            // }
            // // console.log('onChange:', text);
            // Apisetting.Postlogin_verify(datapost)
            //     .then((res) => {
            //         console.log(res.data)
            //         if (res.data.success) {
            //             openNotification("success", res.data.message)
            //             setForm_verify(false)
            //             setForm_login(true)
            //             const payload = {
            //                 token: res.data.token,
            //                 userInfo: res.data.user,
            //             }
            //             const sessionData = {
            //                 token: res.data.token,
            //                 loginTime: new Date().getTime()
            //             };
            //             localStorage.setItem('loginTime', JSON.stringify(sessionData));
            //             setErrors(res.data.message)
            //             setToken(payload)
            //             setTimeout(function () {
            //                 window.location.assign('/#/dashboard')
            //                 setLang(false)
            //             }, 2500)

            //         } else {
            //             openNotification("error", res.data.message)
            //             setLang(false)
            //         }
            //     })
            //     .catch((err) => {
            //         setLang(false)
            //         openNotification("error", err.message)
            //         console.log(err)
            //     })
        }
    };

    const onInput: OTPProps['onInput'] = (value) => {
        console.log('onInput:', value);
    };
    const sharedProps: OTPProps = {
        onChange,
        onInput,
    };
    ///console.log(data)
    const Verify = (e: any) => {
        e.preventDefault()
        setLang(true)
        showLoader()
        setSpinning(true)
        const datapost = {
            IP: ip,
            token: data?.token,
            username: userName?.data?.username,
            user_device_id: userName?.data?.user_device_id,
        }
        // socket.emit("search_team", datapost);
        Apisetting.Postlogin_verify(datapost)
            .then((res) => {
                //console.log(res.data)
                if (res.data.success) {
                    openNotification("success", res.data.message)
                    setForm_verify(false)
                    setForm_login(true)
                    const payload = {
                        token: res.data.token,
                        userInfo: res.data.user,
                    }
                    const sessionData = {
                        token: res.data.token,
                        loginTime: new Date().getTime()
                    };
                    localStorage.setItem('loginTime', JSON.stringify(sessionData));
                    setErrors(res.data.message)
                    setToken(payload)
                    setTimeout(function () {
                        window.location.assign('/#/dashboard')
                        setLang(false)
                        setSpinning(false)
                    }, 2100)

                } else {
                    setTimeout(function () {
                        setSpinning(false)
                    }, 2100)
                    openNotification("error", res.data.message)
                    setLang(false)
                }
            })
            .catch((err) => {
                setLang(false)
                openNotification("error", err.message)
                console.log(err)
                setTimeout(function () {
                    setSpinning(false)
                }, 2100)
            })
        // auth.signInWithusernameAndPassword(username, password).then(
        //   user => {console.log(user);routeChange()}).catch(err => {console.log(err);setError(err.message)})
    }
    return (<>
        {form_verify && <>

            <CForm onSubmit={Verify}>
                <p className="h1 fw-semibold mb-0 text-center">  Two-factor</p>
                {/* <p className="h3 text-center mt-1"></p> */}
                <p className="mb-3 h5 text-muted op-7 fw-normal text-center">
                    authentication
                </p>
                {dataURL &&
                    <>
                        <div className='text-center'>
                            <Image
                                width={200}
                                src={dataURL || `data:image/png;base64,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`}
                            />
                        </div>
                    </>
                }
                {/* <p className="text-body-secondary mt-4">{txtAlert ? txtAlert : `Verify IP Address In to your`}</p> */}
                {/* <p className="text-body-secondary mt-4">Enter the security code from your authenticator app</p> */}
                {dataURL && <p className='text-danger'><u>{`!! อย่ารีเฟรชหน้าจอ จนกว่าจะล็อคอินสำเร็จ`}</u></p>}
                {dataURL && <><p className="text-danger  mb-3 mb-1">* ท่านยังไม่มีแอปฯ Google Authenticator ใช่ไหม ? <span><span style={{ color: "#3399ff", cursor: "pointer" }} onClick={showLoading}><CloudDownloadOutlined style={{ display: "inline-flex" }} /> <b id='download'>ดาวน์โหลดเลย !!</b></span></span></p></>}

                <CInputGroup className="mb-3">
                    <Flex gap="middle" align="flex-start" vertical>
                        <Title className='mb-0' level={5}>กรอกรหัส 6 หลัก จากแอปฯ <br /> Google Authenticator</Title>
                        <Input.OTP style={{ fontWeight: "bold" }} autoFocus formatter={(str) => str.toUpperCase()} {...sharedProps} />
                    </Flex>
                </CInputGroup>
                <CRow>
                    <CButton id='verrify' color="primary" style={{ color: "#fff" }} disabled={Lang} type='submit' className="px-4">
                        {!Lang ? "Verify" : "loading..."}
                    </CButton>
                </CRow>
            </CForm>
        </>}
    </>);
}

export default Form_verify;