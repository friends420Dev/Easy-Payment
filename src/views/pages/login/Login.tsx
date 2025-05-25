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
import Apilogin from '../../../api/ApiLogin'
import { setToken } from '../../../Token';
import config from 'src/config/app.config'
import { Button, message, Space, notification, Tooltip } from 'antd';
import Form_verify from './form-verify';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { FloatButton } from 'antd';
import Swal from 'sweetalert2'
import {
  AppleOutlined,
  AndroidOutlined,
  GoogleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Modal } from 'antd';
import { Flex, Spin } from 'antd';
import { Tabs, Divider, QRCode, Input, Alert, Result } from 'antd';
import { Learn } from './learn'
import type { TabsProps } from 'antd';
import Change_password from '../change_password/change_password'
type Change_passwordProps = {
  old_password: any;
  old_username: any;
};
const Login = ({ old_password, old_username }: Change_passwordProps) => {
  useEffect(() => {
    getIP()
  }, [])
  const [ip, setIp] = useState<any>({ ip: "" });
  if (old_username && old_password) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    const [msg, setMsg] = useState<any>("");
    const [showMain, setShowmain] = useState<any>(false);
    const [password, setpassword] = useState<any>("");
    const [username, setusername] = useState<any>("");
    const [paramsIP, setParamsIP] = useState<any>("");
    const [params_user_device_id, setParams_user_device_id] = useState<any>("");
    var navigator_info = window.navigator
    var screen_info = window.screen
    var uid: any = navigator_info.mimeTypes.length
    uid += navigator_info.userAgent.replace(/\D+/g, '')
    uid += navigator_info.plugins.length
    uid += screen_info.height || ''
    uid += screen_info.width || ''
    uid += screen_info.pixelDepth || ''
    let user_device_id = uid;
    let isParams: any = {
      password: old_password,
      username: old_username,
      user_device_id: user_device_id,
      IP: ip?.data,
      platform: checkPlatform()
    }
    Apilogin.first_time_login(isParams)
      .then((res) => {
        //console.log(res.data)
        if (res.data.success) {
          if (res.data.redirect == "changepassword") {
            Toast.fire({
              icon: "success",
              title: res.data.message
            });
            setpassword(res?.data?.user?.password)
            setusername(res?.data?.user?.username)
            setParamsIP(res?.data?.user?.IP)
            setParams_user_device_id(res?.data?.user?.user_device_id)
            setShowmain(true)

          }
        } else {
          Toast.fire({
            icon: "error",
            title: res.data.message
          });
          setpassword(isParams.password)
          setusername(isParams.username)
          setShowmain(false)
          setMsg(res.data.message)
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.message
        });
        console.log(err)
        setMsg(err.message)
      })

    return (
      <>
        {showMain ? <>
          <Change_password password={password} username={username} msg={msg} IP={paramsIP} user_device_id={params_user_device_id} />
        </>
          :
          <>
            <Result
              status="403"
              title="error 403"
              subTitle={msg}
            />
          </>
        }

      </>
    );
  }


  // *******************************end URLSearchParams change password************************** //








  const [Key, setKey] = React.useState("1");

  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [percent, setPercent] = React.useState(0);

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
  function checkPlatform() {
    const userAgent: any = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('win') !== -1) {
      return "Windows"
    } else if (userAgent.indexOf('mac') !== -1) {
      return "macOS"
    } else if (userAgent.indexOf('linux') !== -1) {
      return "Linux"
    } else if (userAgent.indexOf('android') !== -1) {
      return "Android"
    } else if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1) {
      return "iOS"
    } else {
      console.log('Unknown platform');
    }
  }
  const showLoading = (e: any) => {
    setOpen(true);
    setLoading(true);
    console.log(e)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (e?.target?.parentElement?.offsetParent?.id == "learn") {
      setKey("3")
    } else {
      setKey("1")
    }
  };
  const [api, contextHolder_Notify] = notification.useNotification();
  const [messageApi, contextHolder]: any = message.useMessage();
  const [err, setError] = useState('')
  const [errs, setErrors] = useState('')
  const [dataURL, setdataURL] = useState(undefined)
  const [txtAlert, setTxtAlert] = useState(undefined)
  const [userName, setUserName] = useState('')
  const [form_verify, setForm_verify] = useState(false)
  const [form_set, setForm_set] = useState(false)
  const [Lang, setLang]: any = React.useState<any>(false);
  const [spinning, setSpinning] = React.useState<any>(false);
  const [form__login, setForm_login] = useState(true)
  const [data, setData] = useState({
    username: '',
    password: '',
  })
  const { username, password } = data
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setError('')
  }
  const openNotification = (type: NotificationType, msg: any) => {
    api[type]({
      message: 'Notification',
      description:
        msg,
    });
  };
  let navigate = useNavigate()
  const routeChange = (data: any) => {
    // let path = `${process.env.PUBLIC_URL}/dashboard/dashboard`;
    // navigate(path);
  }
  const handleCheckboxChange = (event: any) => {
    if (event.target.checked) {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          username: username,
          password: password,
        }),
      )
    } else {
      localStorage.removeItem('userData')
    }
  }
  //console.log(checkPlatform())

  function getIP() {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((result) => {

        setIp({
          data: result.ip
        });
        return
      })
      .catch((error) => console.error(error));
  }

  const Login = (e: any) => {
    e.preventDefault()
    showLoader()
    setLang(true)
    var navigator_info = window.navigator
    var screen_info = window.screen
    var uid: any = navigator_info.mimeTypes.length
    uid += navigator_info.userAgent.replace(/\D+/g, '')
    uid += navigator_info.plugins.length
    uid += screen_info.height || ''
    uid += screen_info.width || ''
    uid += screen_info.pixelDepth || ''
    let user_device_id = uid;
    const datapost = {
      username: username,
      password: password,
      user_device_id: user_device_id,
      IP: ip?.data,
      platform: checkPlatform()
    }
    if (!datapost?.username || !datapost?.password || !datapost?.IP) {
      alert("ข้อมูลที่ส่งไปไม่ถูกต้อง")
      return
    }
    setSpinning(true);
    Apilogin.Postlogin(datapost)
      .then((res) => {

        setTxtAlert(res.data.message)
        if (res.data.redirect == "verify") {
          openNotification("success", res.data.message)
          setTimeout(() => {
            setSpinning(false);
          }, 2100)
          setForm_verify(true)
          setForm_login(false)
          setdataURL(res.data.dataURL)
          setUserName(res.data)
          return
        }
        if (res.data.success) {
          openNotification("success", res.data.message)

          const payload = {
            token: res?.data?.token,
            userInfo: res?.data?.user,
          }
          const sessionData = {
            token: res?.data?.token,
            loginTime: new Date().getTime()
          };
          localStorage.setItem('loginTime', JSON.stringify(sessionData));
          setToken(payload)
          setErrors(res.data.message)
          if (payload?.userInfo?.role == "Cs_Accounting") {
            setTimeout(function () {
              window.location.assign('/#/bank-management/bank-accounts');
              setSpinning(false);
              setLang(false)
            }, 1500)

            return
          } else {
            setTimeout(function () {
              window.location.assign('/#/dashboard');
              setSpinning(false);
              setLang(false)
            }, 1500)
          }
        } else {
          // console.log(data)
          setLang(false)
          setSpinning(false);
          openNotification("error", res.data.message)
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setSpinning(false);
        }, 2100)
        setLang(false)
        openNotification("error", err.message)
        console.log(err)
      })

    // auth.signInWithusernameAndPassword(username, password).then(
    //   user => {console.log(user);routeChange()}).catch(err => {console.log(err);setError(err.message)})
  }
  const onChange = (key: string) => {
    console.log(key);
  };
  const success2 = (msg: any) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
    });
  };
  const error2 = (msg: any) => {
    messageApi.open({
      type: 'error',
      content: `${msg}`,
    });
  };
  ;
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Download สำหรับ IOS',
      icon: <AppleOutlined style={{ display: "inline-flex", fontSize: "16px" }} />,
      children: <>
        <div className='text-center w-100'>
          <div className="download">
            <Divider orientation="center">Google Authenticator Download For IOS</Divider>
            <QRCode style={{ margin: "0 auto" }} value={`https://apps.apple.com/us/app/google-authenticator/id388497605`} />
            <Tooltip title="Download For IOS">
              <Input
                placeholder="-"
                className='mt-3'
                style={{ cursor: "pointer" }}
                onClick={() => window.open(`https://apps.apple.com/us/app/google-authenticator/id388497605`)}
                value={`https://apps.apple.com/us/app/google-authenticator/id388497605`}
                readOnly
              />
            </Tooltip>
          </div>
        </div>
      </>
    },
    {
      key: '2',
      label: 'Download สำหรับ Android',
      icon: <AndroidOutlined style={{ display: "inline-flex", fontSize: "16px" }} />,
      children: <>
        <div className='text-center w-100'>
          <div className="download">
            <Divider orientation="center">Google Authenticator Download For Android</Divider>
            <QRCode style={{ margin: "0 auto" }} value={`https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2`} />
            <Tooltip title="Download For Android">
              <Input
                placeholder="-"
                className='mt-3'
                style={{ cursor: "pointer" }}
                onClick={() => window.open(`https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2`)}
                value={`https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2`}
                readOnly
              />
            </Tooltip>

          </div>
        </div>
      </>,
    },
    {
      key: "3",
      label: `ขั้นตอนเข้าสู่ระบบ 2FA`,
      icon: <GoogleOutlined style={{ display: "inline-flex", fontSize: "16px" }} />,
      children: <Learn />
    }

  ];
  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        {open ? "" : <Tooltip title="วิธีเข้าสู่ระบบ 2FA" style={{ display: `$` }}>
          <FloatButton id={"learn"} onClick={showLoading} icon={<QuestionCircleOutlined style={{ display: "inline-flex" }} />} type="primary" />
        </Tooltip>}
        <Modal
          title={<Divider orientation="left">Google Authenticator Download</Divider>}
          width={750}
          footer={<Divider className='mb-2 mt-3' orientation="center"> <p className='versions text-center mb-0' style={{ display: "flex", justifyContent: "center", color: "#888", fontSize: "12px" }}>Version: {config?.version}</p></Divider>}
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <Flex horizontal justify='center'>
            <Space>
              <Tabs defaultActiveKey={Key} items={items} onChange={onChange} />
            </Space>
          </Flex>
        </Modal>
        {contextHolder}
        {contextHolder_Notify}
        <Spin spinning={spinning} percent={percent} fullscreen />
        <CContainer style={{ maxWidth: "600px" }}>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4" style={{background:"#1677ff", color:"#fff"}}>
                  <CCardBody>
                    <Form_verify showLoading={showLoading} setSpinning={setSpinning} showLoader={showLoader} userName={userName} ip={ip?.data} dataURL={dataURL} txtAlert={txtAlert} openNotification={openNotification} form_verify={form_verify} setForm_verify={setForm_verify} setForm_login={setForm_login} setForm_set={setForm_set} />
                    {form__login && <>
                      <CForm onSubmit={Login}>
                        <p className="h1 fw-semibold mb-2 text-center" style={{ textTransform: "uppercase", color:"#fff" }}>Sign In</p>
                        <p className="h5 text-center mt-2" style={{  color:"#fff" }}>{config?.web_name}</p>
                        <p className="mb-4  op-7 fw-normal text-center"  style={{  color:"#fff" }}>
                          Welcome back admin!
                        </p>
                        <p className="" style={{  color:"#fff" }}>Sign In to your account</p>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput placeholder="Username" autoComplete="username" name="username"
                            type={`text`}
                            value={username}
                            onChange={changeHandler} />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            name="password"
                            //  type={passwordshow1 ? "text" : "password"}
                            value={password}
                            onChange={changeHandler}
                          />
                        </CInputGroup>
                        <CRow>
                          <Button htmlType='submit'  disabled={Lang}  className="px-4">
                            {!Lang ? "Login" : "loading..."}
                          </Button>
                        </CRow>

                      </CForm>
                    </>}
                  </CCardBody>
                  <p className='versions text-center mb-0' style={{ display: "flex", justifyContent: "center", color: "#fefefe", fontSize: "12px" }}>Version: {config?.version}</p>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}
export default Login
