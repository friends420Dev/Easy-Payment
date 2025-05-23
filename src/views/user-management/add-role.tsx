import React, { useState, useReducer, useEffect } from 'react'
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
    CModalHeader,
    CSmartTable,
    CModalTitle,
    CModalBody
} from '@coreui/react-pro'
import { Collapse, Upload, message } from 'antd'
import { useTranslation } from 'react-i18next'
import Api from 'src/api/Api'
import Apibank from 'src/api/Apibank'
import { AddLoadding } from 'src/components'
import Dropzone from 'react-dropzone';
import { SearchOutlined, LeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Radio, Space, Tooltip, Form, Input } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { Alert, Spin, notification, Flex } from 'antd';
import Apiauth from 'src/api/Apiauth';
const AddRole = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const { t } = useTranslation("")

    const [handleInput, setHandleInput]: any = useState<any>({
        name: "",
        role_name: "",
        uuid: "",
    })
    function handleOnchang(event: any) {
        setHandleInput({ ...handleInput, [event.target.name]: event.target.value })
    }
    const openNotificationWithIcon = (type: NotificationType, msg: any) => {
        api[type]({
            message: 'Notification',
            description: msg,
        });
    };
    const [permissionData, setPermissionData]: any = useState(null);
    const [selectedPermissions1, setSelectedPermissions1]: any = useState([]);
    const handlePermissionChange = (event: any) => {
        //console.log(event.target.id)
        const permissionId = event.target.value;
       // console.log(permissionId)
        if (event.target.checked) {
            setSelectedPermissions1([...selectedPermissions1, parseInt(permissionId)]);
        } else {
            setSelectedPermissions1(selectedPermissions1.filter((id: any) => id != parseInt(permissionId)));
            selectedPermissions1?.includes(permissionId)
        }
    };
    useEffect(() => {
        Apiauth.getDataPermissions()
            .then(data => setPermissionData(data?.data))
            .catch(error => console.log(error));
    }, []);
    //console.log(selectedPermissions1)
    useEffect(() => {
        Apiauth.getRole()
            .then(res => setStateRole({ data: res.data }))
            .catch(error => console.log(error));
    }, []);
    const [stateRole, setStateRole] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
        data: [],
    })
    const funOnsubmitEditAdmin = (event: any) => {
        event.preventDefault()
        setLoading(true)
        let data = {
            name: handleInput.name,
            roleName: handleInput.role_name,
            permission: selectedPermissions1
        }
        if (event?.type == "submit") {
            Apiauth.addRoles(data)
                .then((res) => {
                    //console.log(res?.data)
                    if (res.data.success == true) {
                        openNotificationWithIcon("success", res.data.message)
                        setTimeout(() => {
                            setLoading(false)
                            setHandleInput({
                                name: "",
                                role_name: "",
                                uuid: "",
                            })
                        }, 3000)
                    } else {
                        openNotificationWithIcon("error", res.data.message)
                        setTimeout(() => {
                            setLoading(false)
                        }, 3000)
                    }
                }).catch((err) => {
                    openNotificationWithIcon("error", err.message)
                    setTimeout(() => {
                        setLoading(false)

                    }, 3000)
                    console.log(err)
                })
        }
    }
    function AccessRights_dashboard(data: any) {
        //console.log(data);
        if (!data || data?.length == 0) {
            return <Alert className='mb-3' message="No data" type="warning" showIcon />
        }
        return (<>
            {data?.map((item: any, id: any) => {
                return <div key={id} className="mb-2">
                    <label className="container-chekbox">{item?.description}
                        <input id={item?.id}  type="checkbox" value={item?.id} defaultChecked={item?.isPublic} onChange={handlePermissionChange} />
                        <span className="checkmark" />
                    </label>
                </div>
            })}
        </>)
    }
    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <CRow>
                    <CCol xs={12}>
                        <CCol xs>
                            <div className="container-role">
                                {/* <Alert className='mb-3' message="Notes: นี้เป็นเพียง Demo UI ยังไม่ได้เชื่อมต่อ API *เมื่อเชื่อมต่อระบบ ข้อความนี้จะหายไป" type="warning" showIcon /> */}
                                <Space>
                                    <Tooltip title="backward" className='me-2'>
                                        <Button onClick={() => window.location.assign(`/#/user-management/role`)} shape="circle" icon={<LeftOutlined  style={{display:"block"}}  />} />
                                    </Tooltip>
                                    <b className='h5' >{t("add role")}</b>
                                </Space>
                                <CForm onSubmit={funOnsubmitEditAdmin}>
                                    <CRow>
                                        <Flex className='list-flex' gap="middle" horizontal={true}>
                                            <CCol sm={12} md={6} lg={6} style={{ display: "flex", flexDirection: "column" }}>
                                                <Divider orientation="left" plain>
                                                    <span className='h5'>{t("info system")}</span>
                                                </Divider>
                                                {/* <CModalBody> */}
                                                <CFormInput
                                                    type="text"
                                                    id="floatingInputGrid"
                                                    floatingLabel={t("Name ")}
                                                    name='name'
                                                    placeholder="Enter Roles Name"
                                                    value={handleInput?.name}
                                                    onChange={handleOnchang}
                                                    
                                                />
                                                <p></p>
                                                <CFormInput
                                                    type="text"
                                                    id="floatingInputGrid"
                                                    floatingLabel={t("Roles Name")}
                                                    name='role_name'
                                                    placeholder="Enter Roles Name"
                                                    value={handleInput?.role_name}
                                                    onChange={handleOnchang}

                                                />
                                                <p></p>
                                                <CFormInput
                                                    type="text"
                                                    id="floatingInputGrid"
                                                    floatingLabel={t("UUID ")}
                                                    name='uuid'
                                                    placeholder="Enter UUID"
                                                    defaultValue={``}
                                                    readOnly
                                                    disabled
                                                    onChange={handleOnchang}
                                                />
                                                <p className='mt-2 text-danger'><b>* UUID the system will generate for you automatically.</b></p>
                                                {/* </CModalBody> */}
                                                <Flex wrap style={{ alignItems: "flex-start", flexWrap: "wrap" }} gap="small">
                                                    <CButton disabled={false} style={{ color: "#fff" }} type='reset' color="danger">
                                                        {t("cancel")}
                                                    </CButton>
                                                    <CButton disabled={false} style={{ color: "#fff" }} type='submit' color="primary">{t("confirm")}</CButton>
                                                </Flex>
                                            </CCol>
                                            <CCol sm={12} md={6} lg={6}>
                                                <Flex gap="middle" vertical>
                                                    <Divider orientation="left" plain>
                                                        <span className='h5'>{t("accessible")}</span>
                                                    </Divider>
                                                    <div className="container ml-md-25" style={{zIndex: 100, height: "auto"}}>
                                                        <div className='mb-2'>
                                                            {AccessRights_dashboard(permissionData?.data)}
                                                        </div>
                                                    </div>
                                                </Flex>
                                            </CCol>
                                        </Flex>
                                    </CRow>
                                    <p></p>
                                </CForm>
                            </div>
                        </CCol>
                    </CCol>
                </CRow>
            </Spin>
        </>
    )
}

export default AddRole
