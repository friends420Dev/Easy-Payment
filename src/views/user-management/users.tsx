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
import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'
import Moment from 'moment'
import moment from 'moment'
import 'moment/locale/th'
import { useTranslation } from 'react-i18next'
import { DataContext } from 'src/layout/DefaultLayout';
import { Alert, Flex, Spin, notification } from 'antd';
import Apiauth from 'src/api/Apiauth';
import { Logout, getUserID } from 'src/Token';
import Link from 'antd/es/typography/Link'
import EditRole from './role';
import usersData from './data'
import type { CheckboxProps } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
import { PlusOutlined, LeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Radio, Space, Tooltip, Form, Input, Card, Tag } from 'antd';
import config from 'src/config/app.config';
import type { TabsProps } from 'antd';
type Props = {
    setVisible?: any
    visible?: any
    updateDataEdit?: any
    dataEdit?: any
    t?: any
    openNotificationWithIcon?: any
    config?: any
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
type DataType2 = {
    setVisible2?: any
    visible2?: any
    handleCloseModel?: any
    data?: any
    t?: any
    config?: any
    itemContext?: any
    moment?: any
}
export const ModelEditInfoAdmin = ({ setVisible, visible, updateDataEdit, dataEdit, t, openNotificationWithIcon, config }: Props) => {
    if (dataEdit == "" || !dataEdit) {
        return false
    }
    let Admin = getUserID()
    //console.log(Admin)
    const [loading, setLoading] = React.useState<boolean>(false);
    const [Status, SetStatus] = React.useState<any>(null);
    const [handleInput, setHandleInput]: any = useState<any>({
        name: undefined,
        admin_type: undefined,
        merchantId: undefined,
    })
    function handleOnchangSwitch(status: any) {
        let s = status == true ? 1 : 0
        SetStatus(s)
    }
    function handleOnchang(event: any) {
        setHandleInput({ ...handleInput, [event.target.name]: event.target.value })
    }
    const funOnsubmitEditAdmin = (event: any) => {
        event.preventDefault()
        setLoading(true)
        let data = {
            name: handleInput.name,
            admin_status: Status,
            id: dataEdit?.data?.id,
            merchantId: parseInt(handleInput.merchantId),
            admin_type: handleInput.admin_type
        }

        if (data?.id) {
            Apiauth.editAdmin(data)
                .then((res) => {
                    if (res.data.success == true) {
                        updateDataEdit()
                        openNotificationWithIcon("success", res.data.message)
                        setTimeout(() => {
                            setLoading(false)

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
        //console.log(data)

    }

    const [Checked, setChecked] = React.useState<any>("");
    const [navData, setNavData]: any = useState(null);
    function handleOnchangRadio(event: any) {
        let data = {
            id: parseInt(event.target.value),
            isPublic: event.target.checked,
            admin_id: dataEdit?.data?.id,    //  id ของ admin
            admin_type: dataEdit?.data?.admin_type
        }
        openNotificationWithIcon("success", data.isPublic ? "เปิด สิทธิ์การเข้าถึง" : "ปิด สิทธิ์การเข้าถึง")
        setChecked(data)
    }

    useEffect(() => {
        usersData.datAaccessRights()
            .then(data => setNavData(data))
            .catch(error => console.error(error));
    }, []);
    //console.log(Checked)
    function AccessRights_dashboard() {
        return (<>
            {navData?.data?.map((item: any, id: any) => {
                return <div key={id} className="mb-2">
                    {item?.resource == "dashboard" && <>
                        <label className="container-chekbox" onChange={(e) => handleOnchangRadio(e)}>{item?.description}
                            <input datatype={item} type="checkbox" value={item?.id} defaultChecked={item?.isPublic} />
                            <span className="checkmark" />
                        </label>
                    </>}
                </div>
            })}
        </>)
    }
    function AccessRights_Finance() {
        return (<>
            {navData?.data?.map((item: any, id: any) => {
                return <div key={id} className="mb-2">
                    {item?.resource == "FinanceandAccounting" && <>
                        <label className="container-chekbox" onChange={(e) => handleOnchangRadio(e)}>{item?.description}
                            <input type="checkbox" value={item?.id} defaultChecked={item?.isPublic} />
                            <span className="checkmark" />
                        </label>
                    </>}
                </div>
            })}
        </>)
    }
    function AccessRights_member() {
        return (<>
            {navData?.data?.map((item: any, id: any) => {
                return <div key={id} className="mb-2">
                    {item?.resource == "members" && <>
                        <label className="container-chekbox" onChange={(e) => handleOnchangRadio(e)}>{item?.description}
                            <input type="checkbox" value={item?.id} defaultChecked={item?.isPublic} />
                            <span className="checkmark" />
                        </label>
                    </>}
                </div>
            })}
        </>)
    }
    function AccessRights_admin() {
        return (<>
            {navData?.data?.map((item: any, id: any) => {
                return <div key={id} className="mb-2">
                    {item?.resource == "admin" && <>
                        <label className="container-chekbox" onChange={(e) => handleOnchangRadio(e)}>{item?.description}
                            <input type="checkbox" value={item?.id} defaultChecked={item?.isPublic} />
                            <span className="checkmark" />
                        </label>
                    </>}
                </div>
            })}
        </>)
    }
    function AccessRights_report() {
        return (<>
            {navData?.data?.map((item: any, id: any) => {
                return <div key={id} className="mb-2">
                    {item?.resource == "report" && <>
                        <label className="container-chekbox" onChange={(e) => handleOnchangRadio(e)}>{item?.description}
                            <input type="checkbox" value={item?.id} defaultChecked={item?.isPublic} />
                            <span className="checkmark" />
                        </label>
                    </>}
                </div>
            })}
        </>)
    }


    return (

        <>
            <Spin spinning={loading}>
                <CModal
                    alignment="top"
                    size="xl"
                    visible={visible}
                    onClose={() => setVisible(!visible)}
                    aria-labelledby="VerticallyCenteredExample"
                >
                    <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample"> แก้ไขข้อมูลพนักงาน</CModalTitle>
                    </CModalHeader>
                    <CRow>
                        <CCol xs={12}>
                            <CCol xs>
                                <div className="container">
                                    <CForm onSubmit={funOnsubmitEditAdmin}>
                                        <CRow>
                                            <CCol sm={12} md={6} lg={6} style={{ display: "grid", alignItems: "center" }}>
                                                <br />
                                                <Divider orientation="left" plain>
                                                    <span className='h5'>{t("ข้อมูลตำแหน่ง")}</span>
                                                </Divider>
                                                <CModalBody>
                                                    <CFormInput
                                                        type="text"
                                                        id="floatingInputGrid"
                                                        floatingLabel={t("Username")}
                                                        name='username'
                                                        placeholder=""
                                                        defaultValue={dataEdit?.data?.username}
                                                        readOnly
                                                        disabled
                                                    />
                                                    <p></p>
                                                    <CFormInput
                                                        type="text"
                                                        id="floatingInputGrid"
                                                        floatingLabel={t("Name")}
                                                        name='name'
                                                        placeholder=""
                                                        defaultValue={dataEdit?.data?.name}
                                                        readOnly={Admin?.admin_type != "superadmin" && true}
                                                        disabled={Admin?.admin_type != "superadmin" && true}
                                                        value={handleInput?.name}
                                                        onChange={handleOnchang}
                                                        title={Admin?.admin_type != "superadmin" ? 'Superadmin เท่านั้นถึงจะแก้ไขข้อมูลได้' : ''}
                                                    />
                                                    <br />
                                                    <CFormSelect
                                                        id="floatingSelectGrid"
                                                        floatingLabel={t("Merchang")}
                                                        aria-label="Works with selects"
                                                        name='merchantId'
                                                        placeholder=""
                                                        defaultValue={dataEdit?.merchant}
                                                        readOnly={Admin?.admin_type != "superadmin" && true}
                                                        disabled={Admin?.admin_type != "superadmin" && true}
                                                        title={Admin?.admin_type != "superadmin" ? 'Superadmin เท่านั้นถึงจะแก้ไขข้อมูลได้' : ''}
                                                        value={handleInput?.merchantId}
                                                        onChange={handleOnchang}
                                                    >
                                                        <option value={""}>{!dataEdit?.merchant ? t("Merchang") : dataEdit?.merchant}</option>
                                                        {dataEdit?.dataMerchang?.data.map((item: any, id: any) => {
                                                            return <option key={id} value={item.id} selected={dataEdit?.data?.id == item.id ? true : false}>{item.name}</option>
                                                        })}
                                                    </CFormSelect>
                                                    <br />
                                                    <CFormSelect
                                                        id="floatingSelectGrid"
                                                        floatingLabel={t("Type")}
                                                        aria-label="Works with selects"
                                                        name='admin_type'
                                                        defaultValue={dataEdit?.data?.admin_type}
                                                        readOnly={Admin?.admin_type != "superadmin" && true}
                                                        disabled={Admin?.admin_type != "superadmin" && true}
                                                        title={Admin?.admin_type != "superadmin" ? 'Superadmin เท่านั้นถึงจะแก้ไขข้อมูลได้' : ''}
                                                        value={handleInput?.admin_type}
                                                        onChange={handleOnchang}
                                                    >
                                                        <option>{!Admin?.admin_type ? t("Select") : Admin?.admin_type}</option>
                                                        {/* <option value="superadmin">Superadmin</option> */}
                                                        <option value="admin">Admin</option>
                                                        {/* <option value="programer">Programer</option> */}
                                                    </CFormSelect>

                                                    <p className='mb-0 mt-3'>Admin Status :</p>
                                                    <Switch className='mt-2' id={`1`} loading={loading} disabled={Admin?.admin_type != "superadmin" && true} onChange={(e: any) => handleOnchangSwitch(e)} defaultChecked={dataEdit?.data?.admin_status == 1 ? true : false} />
                                                </CModalBody>
                                                <Flex wrap style={{ alignItems: "flex-start", flexWrap: "wrap" }} gap="small">
                                                    <CButton title={Admin?.admin_type != "superadmin" ? 'Superadmin เท่านั้นถึงจะแก้ไขข้อมูลได้' : ''} disabled={Admin?.admin_type != "superadmin" && true} style={{ color: "#fff" }} type='reset' color="danger">
                                                        {t("cancel")}
                                                    </CButton>
                                                    <CButton title={Admin?.admin_type != "superadmin" ? 'Superadmin เท่านั้นถึงจะแก้ไขข้อมูลได้' : ''} disabled={Admin?.admin_type != "superadmin" && true} style={{ color: "#fff" }} type='submit' color="primary">{t("confirm")}</CButton>
                                                </Flex>
                                            </CCol>
                                        </CRow>
                                        <p></p>
                                    </CForm>
                                </div>
                            </CCol>
                        </CCol>
                    </CRow>
                </CModal>
            </Spin>
        </>
    )
}
export const ModelDetails = ({ setVisible2, visible2, handleCloseModel, t, config, data, itemContext, moment }: DataType2) => {
    // console.log(data);
    // console.log(itemContext);
    if (data == "" || !data) {
        return false
    }
    const [messageApi, contextHolder]: any = message.useMessage();
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
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success2('Copied : ' + text);
            })
            .catch(() => {
                error2('Copied Something went wrong.');
            });
    };
    function fillterDatamerchant(id: any, type: any) {
        if (!id) {
            return t("No data")
        }
        if (type == 'merchant') {
            const c: any = itemContext?.stateMerchang?.data?.filter((user: any) => user.id == id);
            // console.log(c)
            if (c?.length > 0) {
                return t(c[0]?.name)
            }
            return t("No data");

        }

    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("Details"),
            children: <div className="container">
                <div className="containprocess" style={{ padding: "0 20px" }}>
                    <table align="center" className="accountofuser">
                        <tbody>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Username")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.username)}>{data?.username || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Type")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.admin_type)}>{data?.admin_type || <span style={{ color: "#88888880" }}>{t("No data")}</span>}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Status")} :</td>
                                <td className="item-list" onClick={() => handleCopy(data?.admin_status)}>{!data?.admin_status ? t("No data") : data?.admin_status == 1 ? t("Active") : t("Inactive")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Role")} :</td>
                                <td className="item-list" style={{ textTransform: "capitalize" }} onClick={() => handleCopy(data?.role)}>{data?.role || t("No data")}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Merchant")} :</td>
                                <td className="item-list" style={{ textTransform: "uppercase" }} onClick={() => handleCopy(fillterDatamerchant(data?.merchantId, 'merchant'))}>{!data?.merchantId ? <span style={{ color: "#88888880" }}>{t("No data")}</span> : fillterDatamerchant(data?.merchantId, 'merchant')}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("MerchantId")} :</td>
                                <td className="item-list" style={{ textTransform: "uppercase" }} onClick={() => handleCopy(fillterDatamerchant(data?.merchantId, 'merchant'))}>{data?.merchantId}</td>
                            </tr>
                            <tr className="trofaccount">
                                <td className="headeraccount me-3">{t("Created At")} :</td> {" "}
                                <td className="item-list" onClick={() => handleCopy(data?.created_at)}>{moment(data?.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>,
        },
    ];
    return (
        <>
            {contextHolder}
            <CModal
                alignment="top"
                size="lg"
                visible={visible2}
                onClose={() => setVisible2(!visible2)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle >{t("Details")}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol sm={12}>
                            {/* <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div> */}
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                onChange={onChange}
                                centered={true}
                                animated={{ inkBar: true, tabPane: true }}
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter className='w-100' style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
                    <p>{t("version")}: {config?.version}</p>
                </CModalFooter>
            </CModal>
        </>
    )
}
const Users = () => {
    const itemContext: any = useContext<any>(DataContext)
    const [messageApi, contextHolder]: any = message.useMessage();
    const [api, contextHolder2] = notification.useNotification();
    const [visible, setVisible] = useState<boolean>(false)
    const [visible2, setVisible2] = useState<boolean>(false)
    const [switchLoadding, setSwitchLoadding]: any = useState(0)
    const { t } = useTranslation("")
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
            key: 'username',
            label: `${t("Username")}`,
            filter: true,
            sorter: false,
        },
        {
            key: 'Role',
            label: `${t("Role")}`,
            filter: true,
            sorter: false,
        },
        // {
        //     key: 'admin_type',
        //     label: `${t("Type")}`,
        //     _style: { width: '10%' },
        //     filter: (values: any, onChange: any) => {
        //         const unique = [...new Set(values)].sort()
        //         return (
        //             <CMultiSelect
        //                 size="sm"
        //                 onChange={(selected: any) => {
        //                     const _selected = selected.map((element: any) => {
        //                         return element.value
        //                     })
        //                     onChange((item: any) => {
        //                         return Array.isArray(_selected) && _selected.length
        //                             ? _selected.includes(item.toLowerCase())
        //                             : true
        //                     })
        //                 }}
        //                 options={unique.map((element: any) => {
        //                     return {
        //                         value: element.toLowerCase(),
        //                         label: element,
        //                     }
        //                 })}
        //             />
        //         )
        //     },
        //     sorter: false,
        // },
        {
            key: 'merchantId',
            label: `${t("Merchant")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'Status',
            label: `${t("Status")}`,
            _style: { width: '' },
            filter: true,
            sorter: false,
        },
        {
            key: 'createdAt',
            label: `${t("Created At")}`,
            _style: { width: '' },
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
        itemContext?.getallAdmins?.()
        itemContext?.gegetdataMerchangs?.()
        itemContext?.getDataProfileAdmin?.()
    }, [])
    const [dataEdit, setDataEdit]: any = useState({ data: '', merchant: '' })
    const [dataDetails, setDataDetails]: any = useState("")
    const [loadding, setLoadding] = useState<boolean>(true)
    function handleOnclick(params: any, item: any) {
        setVisible(!visible)
        setDataEdit({
            data: item,
            merchant: formatMerchang(item.merchantId),
            dataMerchang: itemContext?.stateMerchang
        })
    }
    function getRandomColor() {
        // สร้างค่า RGB แบบสุ่ม โดยแต่ละค่าอยู่ในช่วง 0-255
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // สร้างค่าสีในรูปแบบ hex
        return `rgb(${r}, ${g}, ${b}, 70%)`;
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
        } else if (role == "Head_Cs") {
            return true
        } else {
            return false
        }
    }
    var roles: any = funCheckRole(itemContext?.dataAdmin?.name);
    //console.log(roles)
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
            .then(() => {
                success('Copied : ' + text);
            })
            .catch(() => {
                error('Copied Something went wrong.');
            });
    };
    const getDataDetails = (data: any, text: any) => {
        if (data) {
            handleCopy(text)
            setDataDetails(data)
            setVisible2(!visible2)
        }
    }
    function formatMerchang(id: any) {
        const merchang: any = itemContext?.stateMerchang?.data.filter((item: any) => item.id == id)
        if (merchang.length < 0) {
            return "No data"
        }
        // console.log(merchang[0]?.name)
        return merchang[0]?.name
    }
    function updateDataEdit() {

        itemContext?.getallAdmins()
    }
    function MainContainer(data: any, role: any) {
        setTimeout(() => {
            setLoadding(false)
        }, 1000)
        if (data?.length == 0) {
            return <Card
                style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                extra={roles && <>
                    <Divider orientation="right" className='w-100' children={<Button ghost type='primary' onClick={() => window.location.assign(`/#/user-management/add-admin`)} className={`me-2 `} disabled={visible}><svg xmlns="http://www.w3.org/2000/svg" className="icon me-1" width={24} height={24} viewBox="0 0 24 24" style={{ fill: '"#fff"', transform: '', }}><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                        {t("add admin")}
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
            var l: any = "Head_Cs";
            var lx: any = role;
            let isData: any = data?.filter((o: any) => {
                if (l == lx) {
                    return o?.role == "Cs";
                }
                return o
            });
            //console.log(lx)
            return <>
                <Card
                    style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
                    extra={roles && <>
                        <Divider orientation="right" className='w-100' children={<Button ghost type='primary' onClick={() => window.location.assign(`/#/user-management/add-admin`)} className={`me-2`} disabled={visible}>
                            <PlusOutlined className='me-1' style={{ display: "inline-flex" }} />   {t("add admin")}
                        </Button>} />
                    </>}
                    loading={loadding}
                    title={<></>}
                    styles={{ header: { display: `${roles ? 'flex' : 'none'}` } }}
                    children={<CSmartTable
                        items={isData}
                        columns={columns}
                        // columnSorter
                        columnFilter={false}
                        footer={false}
                        // loading={loadding}
                        itemsPerPageSelect
                        tableFilter
                        pagination
                        itemsPerPage={10}
                        scopedColumns={{
                            username: (item: any) => (
                                <td style={{ cursor: "copy", textTransform: "capitalize" }} onClick={() => getDataDetails(item, item?.username)}>
                                    {item?.username}
                                </td>
                            ),
                            Role: (item: any) => (
                                <td onClick={() => getDataDetails(item, item?.role)} style={{ textTransform: "capitalize" }}>
                                    <Tag bordered={false} color={`${getBadge(item?.role)}`}>
                                        {item?.role}
                                    </Tag>
                                </td>

                            ),
                            Status: (item: any) => (
                                <td style={{ textTransform: "uppercase", cursor: "copy" }} onClick={() => getDataDetails(item, item?.admin_status == 1 ? "Active" : "Inactive")}>
                                    <Tag color={`${item?.admin_status == 1 ? "success" : "error"}`}>{item?.admin_status == 1 ? "Active" : "Inactive"}</Tag>
                                </td>
                            ),
                            admin_type: (item: any) => (
                                <td style={{ textTransform: "capitalize", cursor: "copy" }} onClick={() => getDataDetails(item, item?.admin_type)}>
                                    <CBadge color={getBadge(item?.admin_type)}>{item?.admin_type}</CBadge>

                                </td>
                            ),
                            createdAt: (item: any) => (
                                <td style={{ cursor: "copy" }} onClick={() => getDataDetails(item, item?.created_at)}>
                                    {item?.created_at ? Moment(item?.created_at).format("YYYY/MM/DD HH:mm:ss") : t("No data")}
                                </td>
                            ),
                            merchantId: (item: any) => (
                                <td style={{ textTransform: "capitalize", cursor: "copy" }} onClick={() => getDataDetails(item, formatMerchang(item?.merchantId))}>
                                    {formatMerchang(item?.merchantId)}
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
                                                </> : <> <CButton
                                                    color="secondary"
                                                    variant="outline"
                                                    shape="square"
                                                    size="sm"
                                                    disabled
                                                    style={{ cursor: "no-drop" }}
                                                >
                                                    <strong>{t("Edit")}</strong>
                                                </CButton></>}
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
                            className: 'align-middle text-truncate text-center   font-400',

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
            {contextHolder}
            <ModelEditInfoAdmin config={config} setVisible={setVisible} visible={visible} updateDataEdit={updateDataEdit} dataEdit={dataEdit} t={t} openNotificationWithIcon={openNotificationWithIcon} />
            <ModelDetails moment={moment} itemContext={itemContext} config={config} setVisible2={setVisible2} visible2={visible2} data={dataDetails} t={t} />
            <div className='w-100 row' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row-reverse" }}>
                <div className='col-12'>
                    <Divider orientation="left" className='mt-0 w-100 text-truncate'>{t("Total Admin", { counter: loadding ? 0 : itemContext?.stateAdmin?.data?.length })}</Divider>
                </div>
            </div>
            {MainContainer(itemContext?.stateAdmin?.data?.length < 0 ? [] : itemContext?.stateAdmin?.data, itemContext?.dataAdmin?.name)}
        </>);
}

export default Users;