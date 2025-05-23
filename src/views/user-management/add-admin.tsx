import React, { useState, useReducer, useEffect, useContext } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardGroup,
    CCardHeader,
    CCardImage,
    CCardLink,
    CCardSubtitle,
    CCardText,
    CCardTitle,
    CListGroup,
    CListGroupItem,
    CNav,
    CNavItem,
    CNavLink,
    CForm,
    CCol,
    CRow,
    CFormTextarea,
    CFormInput,
    CFormLabel,
    CFormSelect,
} from '@coreui/react-pro'
import { DocsExample } from 'src/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Select from 'react-select'
import { Collapse, Upload, message, Alert } from 'antd'
import { CDatePicker } from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import Api from 'src/api/Api'
import Apibank from 'src/api/Apibank'
import { AddLoadding } from 'src/components'
import Dropzone from 'react-dropzone';
import usersData from './data'
import { SearchOutlined, LeftOutlined, InfoCircleOutlined, CopyOutlined, UserOutlined, KeyOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Space, Tooltip, Spin, Input, notification, Result } from 'antd';
import Apiauth from 'src/api/Apiauth';
import { DataContext } from 'src/layout/DefaultLayout';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
interface TypeAdmin {
    username?: string | undefined;
    password?: string | undefined;
    url_login?: string | undefined;
}
const AddAdmin = () => {
    const itemContext: any = useContext<any>(DataContext)
    const [IP, setIP] = useState('')
    const [isAdminResponse, setIsAdminResponse]: any = useState<TypeAdmin>({})
    const [messageApi, contextHolder]: any = notification.useNotification();
    const jsonString: any = localStorage.getItem("user")
    const myObject = JSON.parse(jsonString);
    const openNotificationWithIcon = (type: NotificationType, msg: any) => {
        messageApi[type]({
            message: 'Notification',
            description: msg,
        });
    };
    const [stateAlert, setStateAlert] = useState(false)
    const { t }: any = useTranslation('')
    const [handleInput, setHandleInput]: any = useState<any>({
        admin_type: "admin",
        roleID: "",
    })
    function handleOnchang(event: any) {
        setHandleInput({ ...handleInput, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        itemContext?.gegetdataMerchangs?.()
        getIP()
    }, [])
    function filterMerchang(item: any) {
        if (item?.length == 0) {
            return undefined
        }
        let e = item?.filter((res: any) => res?.isActive == true)
        if (e?.length == 0) {
            return undefined
        }
        return e[0]?.id
    }
    function filterRole(item: any, id: any) {
        if (!item) {
            return undefined
        }
        let e = item?.filter((res: any) => res?.id == id)
        if (e?.length == 0) {
            return undefined
        }
        return e[0]?.name
    }
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                openNotificationWithIcon("success", `Copied : ${text}`);
            })
            .catch(() => {
                openNotificationWithIcon("success", 'Copied Something went wrong.');
            });
    };
    function MainSelectedRole(data: any) {
        if (data?.length == 0) {
            return <>
                <option value="1">{t("No data")}</option>
            </>
        }
        return data?.data?.map((res: any) => {
            return <>
                <option value={res?.id}>{res?.roleName}</option>
            </>
        })
    }
    async function getIP(): Promise<string> {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setIP(data?.ip)
            return await data?.ip;
        } catch (error) {
            console.error('Error fetching IP:', error);
            return '';
        }
    }
    const roleName: any = filterRole(itemContext?.stateRole?.data, parseInt(handleInput?.roleID))
    const Merchang: any = filterMerchang(itemContext?.stateMerchang?.data)
    const [loading, setLoading] = useState<boolean>(false);
    const onSubmitAddadmin = (e: React.FormEvent) => {
        const item = {
            username: "", // Username system generate for you automatically.
            password: "", // password system generate for you automatically.
            admin_type: handleInput?.admin_type,
            merchantId: Merchang,
            role: roleName,
            roleID: parseInt(handleInput?.roleID),
            IP: IP
        }
        if (item?.admin_type == "" || !item?.merchantId || !item?.roleID || !item?.role) {
            alert("ตรวจสอบข้อมูลให้ถูกต้อง")
        }
        e.preventDefault()
        setLoading(true)
        setIsAdminResponse({})
        Apiauth.podtAddadmin(item)
            .then((res) => {
                if (res.data.success) {
                    setTimeout(() => {
                        setLoading(false)
                        setStateAlert(true)
                        setIsAdminResponse(res?.data?.userAdmin)
                        openNotificationWithIcon("success", res?.data?.message)
                    }, 1500)
                } else {
                    openNotificationWithIcon("error", res?.statusText)
                    setLoading(false)
                }
            }).catch((err) => {
                openNotificationWithIcon("error", err?.message)
                setLoading(false)
            })
    }
    let LINK_LOGIN = !loading ? `${window.location.origin}/#login?username=${isAdminResponse?.username}&password=${isAdminResponse?.password}` : ""
    return (
        <>
            {contextHolder}
            <CRow>
                <CCol xs={12}>
                    <CCol xs>
                        <CCard className="row flex-column flex-md-row align-items-md-center">
                            <CCardBody>
                                <CRow>
                                    <CCol sm={12} md={6} lg={6} style={{ display: "grid", alignItems: "center" }}>
                                        <Space>
                                            <Tooltip title="backward" className='me-2'>
                                                <Button onClick={() => window.location.assign(`/#/user-management/users`)} shape="circle" icon={<LeftOutlined style={{ display: "block" }} />} />
                                            </Tooltip>
                                            <b className='h5' >{t("add admin")}</b>
                                        </Space>
                                        <Divider orientation="left" plain>
                                            <span className='h5'>{t("admin info")}</span>
                                        </Divider>
                                        <CForm className="row g-3" onSubmit={onSubmitAddadmin}>
                                            <Flex gap="small" vertical >
                                                <p className='mt-2 mb-0 text-danger' style={{ fontSize: "14px" }}><b>* Username & password system generate for you automatically.</b></p>
                                                <CFormInput
                                                    type="text"
                                                    id="floatingInputValid"
                                                    floatingClassName="mb-3"
                                                    floatingLabel={`${t("Username")}`}
                                                    placeholder="Enter your username"
                                                    defaultValue="system will generate for you automatically"
                                                    disabled
                                                    valid
                                                    readOnly
                                                />
                                                <CFormSelect
                                                    id="floatingSelectRole"
                                                    floatingLabel={`${t("Role")}`}
                                                    floatingClassName="mb-3"
                                                    onChange={handleOnchang}
                                                    disabled={loading}
                                                    name='roleID'
                                                    value={handleInput?.roleID}
                                                    aria-label="Floating label select example"
                                                >
                                                    <option selected>{t("Select")}</option>
                                                    {MainSelectedRole(itemContext?.stateRole)}
                                                </CFormSelect>
                                                <CFormSelect
                                                    id="floatingSelectType"
                                                    floatingLabel={`${t("Type")}`}
                                                    aria-label="Floating label select example"
                                                    disabled={loading}
                                                    value={handleInput?.admin_type}
                                                    name='admin_type'
                                                    onChange={handleOnchang}
                                                >
                                                    <option selected>{t("Select")}</option>
                                                    <option value="admin">{"Admin"}</option>
                                                    {/* <option value="programer">{"Programer"}</option>
                                                    <option value="superadmin">{"Superadmin"}</option> */}
                                                </CFormSelect>
                                            </Flex>
                                            <Flex wrap gap="small" justify='start'>
                                                <CButton disabled={loading} type='reset' color={`danger`} style={{ color: "#fff" }}>{t("cancel")}</CButton>
                                                <CButton disabled={loading} color="primary" style={{ color: "#fff" }} type="submit"> {loading ? "Loading..." : t("confirm")}</CButton>
                                            </Flex>
                                        </CForm>
                                    </CCol>
                                    <CCol sm={12} md={6} lg={6} style={{ display: "grid", alignItems: "center" }}>
                                        <Spin spinning={loading} tip="Loading">
                                            <div className='out'>
                                                {stateAlert &&
                                                    <Result
                                                        status="success"
                                                        title="Successfully!"
                                                        className={loading ? `d-none` : `out`}
                                                        children={<>
                                                            <Flex wrap gap="small" justify='center'>
                                                                <Input
                                                                    readOnly={!loading}
                                                                    width={100}
                                                                    addonBefore={<UserOutlined />}
                                                                    suffix={<Tooltip title="Copy username">
                                                                        <CopyOutlined onClick={() => handleCopy(isAdminResponse?.username)} style={{ cursor: "copy", color: "#2196f3" }} />
                                                                    </Tooltip>}
                                                                    value={isAdminResponse?.username}
                                                                />
                                                                <Input
                                                                    readOnly={!loading}
                                                                    width={100}
                                                                    addonBefore={<KeyOutlined />}
                                                                    suffix={<Tooltip title="Copy password">
                                                                        <CopyOutlined onClick={() => handleCopy(isAdminResponse?.password)} style={{ cursor: "copy", color: "#2196f3" }} />
                                                                    </Tooltip>}
                                                                    value={isAdminResponse?.password}
                                                                />
                                                                <Input
                                                                    width={100}
                                                                    autoFocus={!loading}
                                                                    readOnly={!loading}
                                                                    addonBefore={<LinkOutlined />}
                                                                    suffix={<Tooltip title="Copy link">
                                                                        <CopyOutlined onClick={() => handleCopy(LINK_LOGIN)} style={{ cursor: "copy", color: "#2196f3" }} />
                                                                    </Tooltip>}
                                                                    value={LINK_LOGIN}
                                                                />
                                                            </Flex>
                                                        </>}
                                                    />}
                                            </div>
                                        </Spin>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CCol>
            </CRow >
        </>
    )
}

export default AddAdmin
