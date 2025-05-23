import { UpdateBtn } from '../../components/updateBtn/updateBtn'
import { Tabs, Switch, message } from 'antd';
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
import { CIcon } from '@coreui/icons-react';
import { cilPlus, cilMediaRecord, cilLayers } from '@coreui/icons';
import React, { useEffect, useRef, useContext, Fragment, useState, useReducer } from 'react'
import Moment from 'moment'
import 'moment/locale/th'
import { useTranslation } from 'react-i18next'
import { DataContext } from 'src/layout/DefaultLayout';
import { Alert, Flex, Spin, notification } from 'antd';
import Apiauth from 'src/api/Apiauth';
import { Logout, getUserID } from 'src/Token';
import Link from 'antd/es/typography/Link'
import usersData, { TypeTrans, MenuItem } from './data'
import type { CheckboxProps } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { PlusOutlined, LeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Tag, Space, Tooltip, Form, Input, Card, } from 'antd';
import { FileSearchOutlined, FileDoneOutlined } from '@ant-design/icons';
import config from 'src/config/app.config';
import moment from 'moment';
type Props = {
    setVisible?: any
    visible?: any
    getDataPermissions?: any
    dataEdit?: any
    t?: any
    openNotificationWithIcon?: any
    itemContext?: any
    stateRole: any
}
interface DataType {

    id: any
    username: any
    name: any
    merchantId: any
    admin_type: any
    admin_status: any
    created_at: any

}
type TypeRole = {
    setVisible?: any
    visible?: any
    data?: any
    t?: any
    itemContext?: any
    stateRole: any
}
export const ModelEditRoles = ({ setVisible, visible, dataEdit, t, openNotificationWithIcon, itemContext, getDataPermissions }: Props) => {
    if (dataEdit == "" || !dataEdit) {
        return false
    }
    const [loading, setLoading] = React.useState<boolean>(false);
    const [Status, SetStatus] = React.useState<any>(null);
    const [handleInput, setHandleInput]: any = useState<any>({
        name: dataEdit?.name,
        role_name: dataEdit?.roleName,
        roleId: dataEdit?.id,
    })
    function handleOnchang(event: any) {
        setHandleInput({ ...handleInput, [event.target.name]: event.target.value })
    }
    const [selectedPermissions1, setSelectedPermissions1]: any = useState([]);
    const handlePermissionChange = (event: any) => {
        //
        const permissionId = event.target.value;
        if (!event.target.checked) {
            setSelectedPermissions1([...selectedPermissions1, parseInt(permissionId)]);
        } else {
            setSelectedPermissions1(selectedPermissions1.filter((id: any) => id != parseInt(permissionId)));
            selectedPermissions1?.includes(permissionId)
        }
    };

    const [handleInputPermission, setHandleInputPermission]: any = useState<any>({
        permissionId: "",
    })
    function handleOnchangPermission(event: any) {
        setHandleInputPermission({ ...handleInputPermission, [event.target.name]: event.target.value })

        if (handleInputPermission.permissionId != "" || event?.type == "change") {
            //console.log(event.target.checked)
            Apiauth.editPermission({ permissionId: parseInt(event.target.value), roleId: dataEdit?.id, isPublic: event.target.checked == true ? 1 : 0 })
                .then((res) => {
                    if (res.data.success == true) {
                        openNotificationWithIcon("success", res.data.message)
                        setLoading(false)
                        setTimeout(() => {
                            getDataPermissions()
                        }, 5000)
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
    const handlePermissionChange2 = (event: any) => {
        //
        const permissionId = event.target.value;
        if (event.target.checked) {
            setSelectedPermissions1([...selectedPermissions1, parseInt(permissionId)]);
        } else {
            setSelectedPermissions1(selectedPermissions1.filter((id: any) => id != parseInt(permissionId)));
            selectedPermissions1?.includes(permissionId)
        }
    };

    //console.log(selectedPermissions1)
    const funOnsubmitEditAdmin = (event: any) => {
        event.preventDefault()
        setLoading(true)
        let data = {
            name: handleInput.name,
            roleName: handleInput.role_name,
            roleId: handleInput.roleId,
            // permissionId: selectedPermissions1,
        }
        if (event?.type == "submit") {
            // console.log(data)
            // Apiauth.editRolePermission(data)
            Apiauth.editPermission(data)
                .then((res) => {
                    if (res.data.success == true) {
                        openNotificationWithIcon("success", res.data.message)
                        setTimeout(() => {
                            setLoading(false)
                            setSelectedPermissions1([])
                            getDataPermissions()
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
        //
    }
    //console.log(navItems)
   
    function fillterDatamerchant(id: any) {
        if (!id) {
            return t("No data")
        }
        const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
        //console.log(admin)
        if (c?.length > 0) {
            return t(c[0]?.name);
        }
        return t("No data");
    }
    function MainEditPermission(data: any) {
        if (!data) {
            return false
        }
        return (<>
            {data?.map((item: any, id: any) => {
                //console.log(item)
                if (item?.isPublic == 1) {
                    return <div key={id} className="mb-2">
                        <label className="container-chekbox">{item?.permission?.description}
                            {/* <input type="checkbox" onChange={handlePermissionChange} value={item?.permission?.id} defaultChecked={item?.isPublic} /> */}
                            <input type="checkbox" name='permissionId' onChange={handleOnchangPermission} value={item?.permission?.id} defaultChecked={item?.isPublic} />
                            <span className="checkmark" />
                        </label>
                    </div>
                } else {
                    return <div key={id} className="mb-2">
                        <label className="container-chekbox">{item?.permission?.description}
                            {/* <input type="checkbox" onChange={handlePermissionChange2} value={item?.permission?.id} defaultChecked={item?.isPublic} /> */}
                            <input type="checkbox" name='permissionId' onChange={handleOnchangPermission} value={item?.permission?.id} defaultChecked={item?.isPublic} />
                            <span className="checkmark" />
                        </label>
                    </div>
                }

            })}
        </>)
    }
    return (
        <>

            <CModal
                alignment="top"
                size="xl"
                visible={visible}
                onClose={() => setVisible(!visible)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample"> {t("edit role")}</CModalTitle>
                </CModalHeader>
                <CRow>
                    <Spin spinning={loading}>
                        <CCol xs={12}>
                            <CCol xs>
                                <div className="container">
                                    <CForm onSubmit={funOnsubmitEditAdmin}>
                                        <CRow>
                                            {/* <Alert message="Notes: นี้เป็นเพียง Demo UI ยังไม่ได้เชื่อมต่อ API *เมื่อเชื่อมต่อระบบ ข้อความนี้จะหายไป" type="warning" showIcon /> */}
                                            <Flex className='list-flex' gap="middle" >
                                                <CCol sm={12} md={6} lg={6} style={{ display: "flex", flexDirection: "column" }}>
                                                    <Divider orientation="left" plain>
                                                        <span className='h5'>{t("info system")}</span>
                                                    </Divider>
                                                    <CModalBody>
                                                        <CFormInput
                                                            type="text"
                                                            id="floatingInputGrid"
                                                            floatingLabel={t("Name ")}
                                                            name='name'
                                                            placeholder="Enter Roles Name"
                                                            defaultValue={dataEdit?.name}
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
                                                            defaultValue={dataEdit?.roleName}
                                                            value={handleInput?.role_name}
                                                            onChange={handleOnchang}
                                                            
                                                        />
                                                        <p></p>
                                                        <CFormInput
                                                            type="text"
                                                            id="floatingInputGrid"
                                                            floatingLabel={t("Merchant ")}
                                                            placeholder="Enter Slug"
                                                            value={fillterDatamerchant(dataEdit?.merchantId)}
                                                            disabled
                                                            readOnly
                                                        />
                                                        <br />
                                                        <Flex wrap style={{ alignItems: "flex-start", flexWrap: "wrap" }} gap="small">
                                                            <CButton disabled={false} style={{ color: "#fff" }} type='reset' color="danger">
                                                                {t("cancel")}
                                                            </CButton>
                                                            <CButton disabled={loading} style={{ color: "#fff" }} type='submit' color="primary">{t("confirm")}</CButton>
                                                        </Flex>
                                                    </CModalBody>
                                                </CCol>
                                                <CCol sm={12} md={6} lg={6}>
                                                    <Flex gap="middle" vertical>
                                                        <Divider orientation="left" plain>
                                                            <span className='h5'>{t("accessible")}</span>
                                                        </Divider>
                                                        <div className="container " style={{ overflowY: "hidden", overflowX: "hidden", height: "auto" }}>
                                                            <div className='mb-2' id='dashboard'>
                                                                {/* <p><b className='mb-2' style={{ textTransform: "uppercase" }}>{t("Select")}</b></p> */}
                                                                {MainEditPermission(dataEdit?.permissions)}
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
                    </Spin>
                </CRow>
                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                    <p>{t("version")}: {config?.version}</p>
                </CModalFooter>
            </CModal>

        </>
    )
}
export const ModelDetailsRoles = ({ setVisible, visible, data, t, itemContext, stateRole }: TypeRole) => {
    if (data == "" || !data) {
        return false
    }
    const [messageApi, contextHolder]: any = message.useMessage();
    const success = (msg: any) => {
        messageApi.open({
            type: 'success',
            content: `${msg}`,
        });
    };
    const error = (msg: any) => {
        messageApi.open({
            type: 'error',
            content: `${msg}`,
        });
    };
    const [loading, setLoading] = React.useState<boolean>(false);
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success('Copied : ' + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
    function fillterDatamerchant(id: any) {
        if (!id) {
            return t("No data")
        }
        const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
        //console.log(admin)
        if (c?.length > 0) {
            return t(c[0]?.name);
        }
        return t("No data");
    }
    function MainDetailsPermission(data: any) {
        if (!data) {
            return false
        }
        return (<>
            {data?.map((item: any, id: any) => {
                return <div key={id} className="mb-2">
                    <label style={{ cursor: "no-drop", display: item?.isPublic == true ? "" : "none" }} className="container-chekbox">{item?.permission?.description}
                        <input readOnly disabled type="checkbox" defaultChecked={item?.permission?.ispublic} />
                        <span className="checkmark" />
                    </label>
                </div>
            })}
        </>)
    }
    function MainDetail(data: any) {
        if (!data) {
            return false
        }
        //console.log(data)
        return <>
            <CRow>
                <CCol sm={12}>
                    <div className="containprocess" style={{ padding: "0 20px" }}>
                        <table align="center" className="accountofuser">
                            <tbody>
                                <tr className="trofaccount">
                                    <td className="headeraccount me-3">{t("UUID")} :</td> {" "}
                                    <td className="item-list" onClick={() => handleCopy(data?.uuid)}>{data?.uuid}</td>
                                </tr>
                                <tr className="trofaccount">
                                    <td className="headeraccount me-3">{t("Merchant ")} :</td>
                                    <td className="item-list" onClick={() => handleCopy(fillterDatamerchant(data?.merchantId))}>{fillterDatamerchant(data?.merchantId)}</td>
                                </tr>
                                <tr className="trofaccount">
                                    <td className="headeraccount me-3">{t("Merchant ID ")} :</td>
                                    <td className="item-list" onClick={() => handleCopy(data?.merchantId)}>{data?.merchantId}</td>
                                </tr>
                                <tr className="trofaccount">
                                    <td className="headeraccount me-3">{t("Name ")} :</td>
                                    <td className="item-list" onClick={() => handleCopy(data?.name)}>{data?.name}</td>
                                </tr>
                                <tr className="trofaccount">
                                    <td className="headeraccount me-3">{t("Role Name ")} :</td>
                                    <td className="item-list" onClick={() => handleCopy(data?.roleName)}>{data?.roleName}</td>
                                </tr>
                                <tr className="trofaccount">
                                    <td className="headeraccount me-3">{t("Is Public ")} :</td>
                                    <td className="item-list" onClick={() => handleCopy(data?.isPublic == true ? 'true' : 'false')}>{data?.isPublic == true ? 'true' : 'false'}</td>
                                </tr>
                                {/* <tr className="trofaccount">
                                    <td className="headeraccount me-3">{t("Created At ")} :</td>
                                    <td className="item-list" onClick={() => handleCopy(data?.isPublic == true ? 'true' : 'false')}>{moment().format("YYYY/MM/DD HH:mm:ss")}</td>
                                </tr>
                                <tr className="trofaccount">
                                    <td className="headeraccount me-3">{t("updated At ")} :</td>
                                    <td className="item-list" onClick={() => handleCopy(data?.isPublic == true ? 'true' : 'false')}>{moment().format("YYYY/MM/DD HH:mm:ss")}</td>
                                </tr> */}

                            </tbody>
                        </table>
                    </div>
                </CCol>
            </CRow>
        </>
    }
    function MainPermission(data: any) {
        if (!data) {
            return false
        }
        return <>

            <CCol sm={12} md={12} lg={12}>
                <br />
                <Flex gap="middle" vertical={true}>
                    <div className="container " style={{ overflowY: "hidden", overflowX: "hidden", height: "auto" }}>
                        <div className='mb-2' id='dashboard'>
                            {/* <p><b className='mb-2' style={{ textTransform: "uppercase" }}>{t("Select")}</b></p> */}
                            {MainDetailsPermission(data?.permissions)}
                        </div>
                    </div>
                </Flex>
            </CCol>
        </>
    }
    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <CModal
                    alignment="top"
                    size="lg"
                    visible={visible}
                    onClose={() => setVisible(!visible)}
                    aria-labelledby="VerticallyCenteredExample"
                >
                    <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample"> {t("Role Details")}</CModalTitle>
                    </CModalHeader>
                    <div className='container'>
                        <Tabs
                            defaultActiveKey="1"
                            items={[FileSearchOutlined, FileDoneOutlined].map((Icon, i) => {
                                const id: any = String(i + 1);
                                return {
                                    key: id,
                                    label: `${id == 1 ? 'Details' : 'Permissions'}`,
                                    children: id == 1 ? <>
                                        {/* Details */}
                                        <CModalBody className={`${id == 1 && 'in'}`}>
                                            {MainDetail(data)}
                                        </CModalBody>

                                    </> : <>
                                        {/* Permissions */}
                                        <CModalBody className={` ${id == 2 && 'out'}`}>
                                            {MainPermission(data)}
                                        </CModalBody>
                                    </>,
                                    icon: <Icon style={{ fontSize: "18px", display: "inline-flex" }} />,
                                };
                            })}
                        />
                        <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                            <p>{t("version")}: {config?.version}</p>
                        </CModalFooter>
                    </div>
                </CModal>
            </Spin>
        </>
    )
}
// 
const Role = () => {
    const itemContext: any = useContext<any | []>(DataContext)
    const [messageApi, contextHolder]: any = message.useMessage();
    const [api, contextHolder2] = notification.useNotification();
    const [visible, setVisible] = useState<boolean>(false)
    const [visible2, setVisible2] = useState<boolean>(false)
    const [switchLoadding, setSwitchLoadding]: any = useState(0)
    const { t } = useTranslation("")
    const [spinUpdate, setSpinUpdate]: any = useState(false)
    const success = (msg: any) => {
        messageApi.open({
            type: 'success',
            content: `${msg}`,
        });
    };
    const error = (msg: any) => {
        messageApi.open({
            type: 'error',
            content: `${msg}`,
        });
    };
    const openNotificationWithIcon = (type: NotificationType, msg: any) => {
        api[type]({
            message: 'Notification',
            description: msg,
        });
    };
    const columns = [
        {
            key: 'uuid',
            label: `${t("UUID")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'nameRole',
            label: `${t("Name Role")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'Role',
            label: `${t("Role ")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'action',
            label: `${t("Action ")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },

    ]
    useEffect(() => {
        itemContext?.getDataPermissions?.()
        itemContext?.gegetdataMerchangs?.()
        itemContext?.getDataProfileAdmin?.()
    }, [])
    const [dataEdit, setDataEdit]: any = useState()
    const [data, setData]: any = useState("")
    const getDataPermissions = () => {
        setSpinUpdate(true)
        Apiauth.getRole()
            .then((res) => {
                if (res.data.success) {
                    setStateRole({ data: res.data.data })
                    setTimeout(() => {
                        setSpinUpdate(false)
                    }, 2000)
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    //console.log(itemContext?.stateRole)
    function handleOnclick(params: any, item: any) {
        setVisible(!visible)
        setDataEdit(item)
    }
    function getRandomColor() {
        // สร้างค่า RGB แบบสุ่ม โดยแต่ละค่าอยู่ในช่วง 0-255
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // สร้างค่าสีในรูปแบบ hex
        return `rgb(${r}, ${g}, ${b})`;
    }
    const getBadge = (status: any) => {
        switch (status) {
            case 'superadmin':
                return 'info'
            case 'admin':
                return 'primary'
            case 'programer':
                return 'secondary'
            case 'Cs':
                return 'processing'
            case 'Head_Cs':
                return 'blue'
            case 'Owner':
                return 'purple'
            case 'Subowner':
                return 'geekblue'
            case 'Head_Accounting':
                return 'cyan'
            case 'Accounting':
                return 'volcano'
            case 'Manager':
                return 'magenta'
            default:
                return "default"
        }
    }
    const getBadgeStatus = (status: any) => {
        switch (status) {
            case 1:
                return 'success'
            case 0:
                return 'danger'
            default:
                return 'primary'
        }
    }
    const [stateRole, setStateRole]: any = useReducer(
        (stateRole: any, newState_Role: any) => ({ ...stateRole, ...newState_Role }),
        {
            data: [],
        },
    )
    function formatMerchang(id: any) {
        const merchang: any = itemContext?.stateMerchang?.data.filter((item: any) => item.id == id)
        if (merchang.length < 0) {
            return "No data"
        }
        // console.log(merchang[0]?.name)
        return merchang[0]?.name
    }
    function handleModel(e: any, type: any) {
        if (type == "details") {
            setData(e)
            setVisible2(!visible2)
        }
    }
    function funCheckRole(role: any) {
        if (!role) {
            return false
        }
        if (role == "Owner") {
            return true
        } else if (role == "Subowner") {
            return true
        } else if (role == "Manager") {
            return true
        } else {
            return false
        }
    }
    var roles: any = funCheckRole(itemContext?.dataAdmin?.name);
    const [loadding, setLoadding] = useState<boolean>(true)
    // console.log(roles)
    function MainContainer(data: any) {
        setTimeout(() => {
            setLoadding(false)
        }, 1000)
        if (data?.length == 0) {
            return <Card
                style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                extra={roles && <>
                    <Divider orientation="right" className='w-100' children={<Button ghost type='primary' onClick={() => window.location.assign(`/#/user-management/add-role`)} className={`me-2 `} disabled={visible}>
                        <PlusOutlined className='me-1' style={{ display: "inline-flex" }} />   {t("add role")}
                    </Button>} />
                </>}
                loading={loadding}
                title={<></>}
                styles={{ header: { display: `${roles ? 'flex' : 'none'}` } }}
                children={<CSmartTable
                    className='mt-3'
                    tableBodyProps={{
                        className: 'align-middle text-truncate text-center  font-500',
                    }}
                    tableProps={{
                        className: 'add-this-class text-truncate text-center aninationleft',
                        responsive: true,
                        striped: false,
                        hover: true,
                        bordered: true,
                        borderless: false,
                    }} columns={columns} />}
            />
        } else {
            return <>
                <Card
                    style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                    extra={roles && <>
                        <Divider orientation="right" className='w-100' children={<Button ghost type='primary' onClick={() => window.location.assign(`/#/user-management/add-role`)} className={`me-2 `} disabled={visible}>
                            <PlusOutlined className='me-1' style={{ display: "inline-flex" }} />   {t("add role")}
                        </Button>} />
                    </>}
                    loading={loadding}
                    title={<></>}
                    styles={{ header: { display: `${roles ? 'flex' : 'none'}` } }}
                    children={<CSmartTable
                        items={data}
                        columns={columns}
                        footer={false}
                        // loading={spinUpdate}
                        itemsPerPageSelect
                        tableFilter
                        pagination
                        itemsPerPage={10}
                        scopedColumns={{
                            uuid: (item: any) => (
                                <td onClick={() => handleModel(item, "details")}>
                                    {item?.uuid}
                                </td>
                            ),
                            nameRole: (item: any) => (
                                <td onClick={() => handleModel(item, "details")} style={{ textTransform: "capitalize" }}>

                                    <Tag bordered={false} color={`${getBadge(item?.name)}`}>
                                        {item?.name}
                                    </Tag>
                                </td>
                            ),
                            Role: (item: any) => (
                                <td onClick={() => handleModel(item, "details")} style={{ textTransform: "capitalize" }}>
                                    {item?.roleName}
                                </td>
                            ),
                            action: (items: any) => {
                                return (
                                    <>
                                        <td className="py-1">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-left">
                                                {roles ? <>
                                                    <CButton
                                                        color="secondary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={(e: any) => handleOnclick(e, items)}
                                                    >
                                                        <strong>{t("Edit")}</strong>
                                                    </CButton>
                                                </> : <>
                                                    <CButton
                                                        color="secondary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        disabled
                                                    >
                                                        <strong>{t("Edit")}</strong>
                                                    </CButton>
                                                </>}
                                            </div>
                                        </td>
                                    </>

                                )
                            },
                        }}
                        onFilteredItemsChange={(items) => {
                            // ค้นหา
                            //console.log(items)
                        }}
                        onSelectedItemsChange={(items) => {
                            //console.log(items)
                        }}
                        tableBodyProps={{
                            className: 'align-middle text-truncate font-400',

                        }}
                        tableProps={{
                            className: 'add-this-class text-truncate text-center aninationleft',
                            responsive: true,
                            striped: false,
                            hover: true,
                            bordered: true,
                            borderless: false,
                        }}
                    />}
                />
            </>
        }
    }
    return (
        <>
            {contextHolder2}
            <ModelEditRoles setVisible={setVisible} stateRole={stateRole} visible={visible} getDataPermissions={getDataPermissions} itemContext={itemContext} dataEdit={dataEdit} t={t} openNotificationWithIcon={openNotificationWithIcon} />
            <ModelDetailsRoles setVisible={setVisible2} stateRole={stateRole} visible={visible2} itemContext={itemContext} data={data} t={t} />
            <div className='w-100 row' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row-reverse" }}>

                <div className='col-12'>
                    <Divider orientation="left" className='mt-0 w-100 text-truncate'>{t("roles", { counter: itemContext?.stateRole?.data?.length })}</Divider>
                </div>
            </div>
            {MainContainer(itemContext?.stateRole?.data || [])}
        </>);
}
export default Role;