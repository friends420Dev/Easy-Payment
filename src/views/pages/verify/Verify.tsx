import React from 'react'
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
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import QRCode from 'react-qr-code';
import { totp } from "otplib";
import Apisetting from 'src/api/Apisetting';
interface User {
    secret: string;
}
const Verify = () => {
    const [handleInput, setHandleInput]: any = React.useState<any>({
        username: undefined,
        otp: undefined,
    })
   const [qr, setQr]: any = React.useState(false)
 
    function generateQRCodeUrl(secret: string, user: string): string {
        const url = `otpauth://totp/${user}?secret=${secret}&issuer=${window.location.origin}`;
        return url;
    }
    function handleOnChang(event: any) {
        setHandleInput({ ...handleInput, [event.target.name]: event.target.value })
    }
    function QRCodeComponent({ qrCodeUrl }:any) {
        return (
          <QRCode value={qrCodeUrl} />
        );
      }
    const handleVerify = (event: any) => {
        event.preventDefault()
        let data = {
            username: handleInput?.username,
        }
        if (data.username) {
            Apisetting.Postlogin_verify(data)
                .then((res) => {
                    if (res.data.success) {
                        const qrCodeUrl = generateQRCodeUrl(res.data.secret_code, data.username);
                        setQr(qrCodeUrl)
                        console.log(qrCodeUrl)
                    }
                }).catch((err) => {
                    console.log(err)

                })

        }
    }
    console.log(window.location.origin)

    // const secret: any = generateSecret('user1');
    // const otp: any = '123456'; // OTP ที่ผู้ใช้ป้อนเข้ามา
    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <div id="qrcode">
          {qr && <QRCodeComponent qrCodeUrl={qr} />}  
            </div>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={handleVerify}>
                                    <h1>Verify</h1>
                                    <p className="text-body-secondary">Create your Username</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput onChange={handleOnChang} placeholder="Username" name='username' value={handleInput.username} valid={!handleInput.username || true} invalid={!handleInput.username || false} />
                                    </CInputGroup>

                                    <div className="d-grid">
                                        <CButton type='submit' color="success">Verify Username</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Verify
