import {
    CAvatar,
    CButton,
    CCard,
    CCardBody,
    CCardSubtitle,
    CCardTitle,
    CCol,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CLoadingButton,
    CModalFooter,
    CModalBody,
    CModalTitle,
    CBadge,
    CModalHeader,
    CSmartTable,
    CCollapse,
    CModal,
    CFormInput,
    CFormSelect,
    CMultiSelect,
    CForm
} from '@coreui/react-pro'
import React, {useEffect, useReducer, useState} from 'react';
import { Alert } from 'antd';
import { Logout, getUserID, checkError } from 'src/Token';
import Apisetting from '../../api/Apisetting'
import Apiauth from 'src/api/Apiauth';
import { useNavigate, useLocation } from 'react-router-dom'
import Api from '../../api/Api'
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { useTranslation } from 'react-i18next'
import { Flex, Spin, notification, Divider, Tabs, Space, Tag, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined, SolutionOutlined, LockOutlined, FileSearchOutlined, ApartmentOutlined, CheckCircleOutlined, CloseCircleOutlined, UserSwitchOutlined, KeyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
const Profile = () => {
    const getDataInfo: any = getUserID()
    const [api, contextHolder2] = notification.useNotification();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate: any = useNavigate()
    const { t } = useTranslation("")
    const success = (msg: any) => {
        api.open({
            type: 'success',
            message: `${msg}`,
        })
    }
    const error = (msg: any) => {
        api.open({
            type: 'error',
            message: `${msg}`,
        })
    }
    const [loadding, setLoadding]: any = useState(false)
    const [spinUpdate, setSpinUpdate]: any = useState(false)
    const openNotificationWithIcon = (type: NotificationType, msg: any) => {
        api[type]({
            message: 'Notification',
            description: msg,
        });
    };
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success('Copied : ' + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
    const gegetdataMerchangs = () => {
        Api.getdataMerchang()
            .then((res) => {
                if (res.data.success) {
                    setDatastateMerchang(res.data)
                }
            }).catch((err: any) => {

                setLoadding(false)
                if (err.status == 401) {
                    openNotificationWithIcon("error", "Token หมดอายุ")
                    Logout()
                    navigate("/login");
                } if (err.code == "ERR_NETWORK") {
                    openNotificationWithIcon("error", err.message)
                } else {
                    console.log(err)
                }
            })
    }
    useEffect(() => {
        gegetdataMerchangs?.()
        getDataPermissions?.()
        getProfileAdmins?.()
    }, [])
    const [stateMerchang, setDatastateMerchang]: any = useReducer(
        (stateMerchang: any, newstateMerchang: any) => ({ ...stateMerchang, ...newstateMerchang }),
        {
            data: [],
        },
    )
    const getDataPermissions = () => {
        setLoadding(true)
        Apiauth.getRole()
            .then((res) => {
                if (res.data.success) {
                    setStateRole({ data: res.data.data })
                    setTimeout(() => {
                        setLoadding(false)
                    }, 2000)
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    const [stateRole, setStateRole]: any = useReducer(
        (stateRole: any, newState_Role: any) => ({ ...stateRole, ...newState_Role }),
        {
            data: [],
        },
    )
    const [handleInput, setHandleInput]: any = useState<any>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    function handleOnchang(event: any) {
        setHandleInput({ ...handleInput, [event.target.name]: event.target.value })
    }
    const funOnsubmitEditAdmin = (event: any) => {
        event.preventDefault()
        setLoadding(true)
        let data = {
            currentPassword: handleInput.currentPassword,
            newPassword: handleInput.newPassword,
            confirmPassword: handleInput.confirmPassword,
        }
        if (!data?.currentPassword || !data?.newPassword || !data?.confirmPassword) {
            openNotificationWithIcon("error", "กรุณาตรวจสอบข้อมูลให้ถูกต้อง")
            setTimeout(() => {
                setLoadding(false)
            }, 3000)

            return
        }
        if (data?.newPassword != data?.confirmPassword) {
            openNotificationWithIcon("error", "ยืนยันรหัสผ่านใหม่ไม่ตรงกัน")
            setTimeout(() => {
                setLoadding(false)
            }, 3000)

            return
        }
        Apiauth.postChangPassword(data)
            .then((res) => {
                if (res.data.success == true) {
                    openNotificationWithIcon("success", res.data.message)
                    setTimeout(() => {
                        setLoadding(false)
                    }, 3000)
                } else {
                    openNotificationWithIcon("error", res.data.message)
                    setTimeout(() => {
                        setLoadding(false)
                    }, 3000)
                }
            }).catch((err) => {
                openNotificationWithIcon("error", err.message)
                setTimeout(() => {
                    setLoadding(false)
                }, 3000)
                console.log(err)
            })
        //console.log(data)
    }
    function fillterDatamerchant(id: any) {
        if (!id) {
            return undefined
        }
        const c: any = stateMerchang?.data?.filter((user: any) => user.id == id);
        //console.log(admin)
        if (c?.length > 0) {
            return { name: c[0]?.name, status: c[0]?.isActive }
        }
        return undefined;
    }
    function fillterRole(item: any, id: any) {
        if (!item || !id) {
            return undefined
        }
        const c: any = item?.data?.filter((user: any) => user?.id == id);
        if (c?.length > 0) {
            return c[0]
        }
        return undefined;
    }

    const getProfileAdmins = () => {
        Apiauth.getProfileAdmin()
            .then((res: any) => setDataAdmin(res?.data?.user))
            .catch((error: any) => console.error(error));
    }
    const UpdateInfo = (e: any) => {
       // console.log()
        if (e?.type == "click") {
            gegetdataMerchangs()
            getDataPermissions()
            getProfileAdmins()
            setHandleInput({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
            return true
        }
        return false
    }

    const [dataAdmin, setDataAdmin]: any = useState("")
    let merchang: any = fillterDatamerchant(dataAdmin?.merchantId)
    let role: any = fillterRole(stateRole, dataAdmin?.roleID)
    function MainPermission(data: any) {
        if (!data || !data?.permissions) {
            return <Alert className='mb-3 d-flex w-100' style={{ color: "#f0b800" }} message="Notes: ! ไม่พบข้อมูล" type="warning" showIcon />
        }
        return data?.permissions?.map((item: any, id: any) => {
            return <>
                <div key={id} data-v-767084c4 className="permission-container">
                    <label data-v-767084c4>- {item?.permission?.description}</label>
                    <span data-v-767084c4 className="ant-tag ant-tag-green">
                        <Tag style={{ textTransform: "uppercase", fontSize: 15, padding: '5px 8px' }} icon={item?.permission?.ispublic == true ? <CheckCircleOutlined style={{ display: "inline-flex" }} /> : <CloseCircleOutlined style={{ display: "inline-flex" }} />} color={item?.permission?.ispublic == true ? "success" : "error"}>{item?.permission?.ispublic == true ? "ได้รับอนุญาต" : "ไม่รับอนุญาต"}</Tag>
                    </span>
                </div>
            </>
        })
    }
    return (<>
        {contextHolder2}
        <Spin spinning={loadding} fullscreen />
        
        <div className='container-main'>
            {/* <Alert className='mb-3' message="Notes: นี้เป็นเพียง Demo UI ยังไม่ได้เชื่อมต่อ API *เมื่อเชื่อมต่อระบบ ข้อความนี้จะหายไป" type="warning" showIcon /> */}
            <CRow>
                <CCol xs={12}>
                    <CCol xs>
                        <div className="container-main">
                            <CForm onSubmit={funOnsubmitEditAdmin}>
                                <CRow >
                                    <Flex className='list-flex' gap="middle" horizontal={true}>
                                        <CCol sm={12} md={6} lg={6}>
                                            <Tabs
                                                defaultActiveKey="1"
                                                centered={false}
                                                items={[SolutionOutlined, FileSearchOutlined].map((Icon, i) => {
                                                    const id: any = String(i + 1);
                                                    return {
                                                        key: id,
                                                        label: `${id == 1 ? t("บัญชี") : t("สิทธิ์เข้าถึง")}`,
                                                        children: <>{id == 1 ?
                                                            <div className={`${id == 1 ? 'in' : 'out'}`}>
                                                                <div className="main-container">
                                                                    <h1 data-v-66746f8d className="title" style={{ marginTop: 10 }}>{"ข้อมูลส่วนตัว"}</h1>
                                                                    <div data-v-66746f8d className="divider" />
                                                                    <Flex gap="middle" horizontal={false}>
                                                                        <div data-v-66746f8d className="ant-col ant-col-6">
                                                                            <label className='d-block mb-3' data-v-66746f8d><UserOutlined style={{ fontSize: "16px", display: "inline-flex" }} /> {"ชื่อพนักงาน :"}</label>
                                                                            <label className='d-block mb-3' data-v-66746f8d><ApartmentOutlined style={{ fontSize: "16px", display: "inline-flex" }} /> {"ตำเหน่ง :"}</label>
                                                                            <label className='d-block' data-v-66746f8d><CheckCircleOutlined style={{ fontSize: "16px", display: "inline-flex" }} /> {"สถานะพนักงาน :"}</label>
                                                                        </div>
                                                                        <div data-v-66746f8d className="ant-col ant-col-18">
                                                                            <label className='d-block mb-3' data-v-66746f8d style={{ cursor: "copy" }} onClick={() => handleCopy(dataAdmin?.username)}>{dataAdmin?.username}</label>
                                                                            <label className='d-block mb-3' data-v-66746f8d style={{ cursor: "copy" }} onClick={() => handleCopy(dataAdmin?.role)}>{dataAdmin?.role}</label>
                                                                            <label className='d-block' data-v-66746f8d style={{ cursor: "copy" }} onClick={() => handleCopy(dataAdmin?.admin_status == 1 ? "Active" : "Inactive")}><Tag style={{ textTransform: "uppercase" }} icon={dataAdmin?.admin_status == 1 ? <CheckCircleOutlined style={{ display: "inline-flex" }} /> : <CloseCircleOutlined style={{ display: "inline-flex" }} />} color={dataAdmin?.admin_status == 1 ? "success" : "error"}>{dataAdmin?.admin_status == 1 ? "Active" : "Inactive"}</Tag></label>
                                                                        </div>
                                                                    </Flex>
                                                                    <Divider />
                                                                    {/* <Divider orientation="left">{"ข้อมูลผู้ให้บริการ"}</Divider> */}
                                                                    <h1 data-v-66746f8d className="title" style={{ marginTop: 10 }}>{"ข้อมูลผู้ให้บริการ"}</h1>
                                                                    <div data-v-66746f8d className="divider" />
                                                                    <Flex gap="middle" horizontal={false}>
                                                                        <div data-v-66746f8d className="ant-col ant-col-6">
                                                                            <label className='d-block mb-3' data-v-66746f8d><UserSwitchOutlined style={{ fontSize: "16px", display: "inline-flex" }} /> {"ผู้ให้บริการ :"}</label>
                                                                            <label className='d-block' data-v-66746f8d><CheckCircleOutlined style={{ fontSize: "16px", display: "inline-flex" }} /> {"สถานะผู้ให้บริการ :"}</label>
                                                                        </div>
                                                                        <div data-v-66746f8d className="ant-col ant-col-18">
                                                                            <label className='d-block mb-3' data-v-66746f8d style={{ cursor: "copy", textTransform: "uppercase" }} onClick={() => handleCopy(merchang?.name)}>{merchang?.name}</label>
                                                                            <label className='d-block' data-v-66746f8d style={{ cursor: "copy" }} onClick={() => handleCopy(merchang?.status == true ? "Active" : "Inactive")}><Tag style={{ textTransform: "uppercase" }} icon={merchang?.status == true ? <CheckCircleOutlined style={{ display: "inline-flex" }} /> : <CloseCircleOutlined style={{ display: "inline-flex" }} />} color={merchang?.status == true ? "success" : "error"}>{merchang?.status == true ? "Active" : "Inactive"}</Tag></label>
                                                                        </div>
                                                                    </Flex>
                                                                </div>
                                                            </div> :
                                                            <div className={`${id == 1 ? 'in' : 'out'}`}>
                                                                <div className="main-container " style={{ marginTop: 10 }}>
                                                                    {MainPermission(role)}
                                                                </div>
                                                            </div>}</>,
                                                        icon: <Icon style={{ fontSize: "18px", display: "inline-flex" }} />,
                                                    };
                                                })}
                                            />
                                        </CCol>
                                        <CCol sm={12} md={6} lg={6} className='main-changpass'>
                                            <Tabs
                                                defaultActiveKey="1"
                                                items={[LockOutlined].map((Icon, i) => {
                                                    const id: any = String(i + 1);
                                                    return {
                                                        key: id,
                                                        label: `ความปลอดภัย`,
                                                        children: <div>
                                                            <div className="main-container" >
                                                                <h1 data-v-66746f8d className="title" style={{ marginTop: 10 }}>{"เปลี่ยนรหัสผ่าน"}</h1>
                                                                <div data-v-66746f8d className="divider  mt-3" />
                                                                <Space className='px-3 d-block' >
                                                                    <div className="ant-col ant-form-item-label"><label title="รหัสผ่านปัจจุบัน" >รหัสผ่านปัจจุบัน :</label></div>
                                                                    <Input.Password
                                                                        size="large"
                                                                        id='currentPassword'
                                                                        type='password'
                                                                        name='currentPassword'
                                                                        onChange={handleOnchang}
                                                                        value={handleInput.currentPassword}
                                                                        placeholder="รหัสผ่านปัจจุบัน"
                                                                        prefix={<LockOutlined style={{ marginRight: "5px", color: "#888" }} />}
                                                                    />
                                                                    <div className="ant-col ant-form-item-label mt-3"><label title="รหัสผ่านใหม่" >รหัสผ่านใหม่ :</label></div>
                                                                    <Input.Password
                                                                        size="large"
                                                                        id='newPassword'
                                                                        type='password'
                                                                        name='newPassword'
                                                                        onChange={handleOnchang}
                                                                        value={handleInput.newPassword}
                                                                        placeholder="รหัสผ่านใหม่"
                                                                        prefix={<LockOutlined style={{ marginRight: "5px", color: "#888" }} />}
                                                                    />
                                                                    <div className="ant-col ant-form-item-label mt-2"><label title="ยืนยันรหัสผ่านใหม่" >ยืนยันรหัสผ่านใหม่ :</label></div>
                                                                    <Input.Password
                                                                        size="large"
                                                                        id='confirmPassword'
                                                                        type='password'
                                                                        name='confirmPassword'
                                                                        onChange={handleOnchang}
                                                                        value={handleInput.confirmPassword}
                                                                        placeholder="ยืนยันรหัสผ่านใหม่"
                                                                        prefix={<LockOutlined style={{ marginRight: "5px", color: "#888" }} />}
                                                                    />
                                                                    <p className='mt-2'><span className='text-danger' >{handleInput.newPassword != handleInput.confirmPassword && <><Alert message="รหัสยืนยันไม่ตรงกัน" type="error" showIcon closable /></>}</span></p>
                                                                    <br />
                                                                    <div className="d-grid gap-2 d-flex justify-content-start" >
                                                                        <CButton disabled={!handleInput.currentPassword || !handleInput.newPassword || !handleInput.confirmPassword || handleInput.newPassword != handleInput.confirmPassword || false} type='submit' color="primary" className='' style={{ color: "#f3f4f7" }}> {!loadding ? "ยืนยันการเปลี่ยนรหัสใหม่" : "กำลังตรวจสอบ..."}</CButton>
                                                                        <CButton disabled={loadding} type='reset' color="danger" className="text" style={{ color: "#f3f4f7" }}>ยกเลิก</CButton>
                                                                    </div>
                                                                </Space>
                                                                <Divider />
                                                                <div data-v-41b49d39 className="info-container">
                                                                    <div data-v-41b49d39 className="ant-row">
                                                                        <div data-v-41b49d39 className="ant-col ant-col-24">
                                                                            <label data-v-41b49d39 style={{ fontWeight: "700" }}><em>* อัพเดทข้อมูลครั้งล่าสุด  {moment(dataAdmin?.updated_at).format("YYYY/MM/DD HH:mm:ss")}</em></label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>,
                                                        icon: <Icon style={{ fontSize: "18px", display: "inline-flex" }} />,
                                                    };
                                                })}
                                            />
                                        </CCol>
                                    </Flex>
                                </CRow>
                                <p></p>
                            </CForm>
                        </div>
                    </CCol>
                </CCol>
            </CRow>
        </div>


    </>);
}

export default Profile;