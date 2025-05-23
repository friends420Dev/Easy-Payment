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
} from '@coreui/react-pro'
import { DocsExample } from 'src/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Select from 'react-select'
import { Collapse, Upload, message } from 'antd'
import { CDatePicker } from '@coreui/react-pro'
import { useTranslation } from 'react-i18next'
import Api from 'src/api/Api'
import Apibank from 'src/api/Apibank'
import { AddLoadding } from 'src/components'
import Dropzone from 'react-dropzone'
const Manual = () => {
    useEffect(() => {
        getdata_memberall()
    }, [])
    const [startDate, setStartDate] = useState('')
    const [loadding, setLoadding]: any = useState(false)
    const [messageApi, contextHolder]: any = message.useMessage();

    const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
        data: [],
    })
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
    const [selectedOptions, setSelectedOptions]: any = useState()
    const { t }: any = useTranslation('')
    const getdata_memberall = () => {
        // Api.getAllMember()
        //     .then((res) => {
        //         // console.log(startDate);

        //         if (res.data.success) {
        //             // console.log(res.data.daauser)
        //             setState({
        //                 data: res.data.data,
        //             })
        //         } else {
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }
    const [selectedFiles, setselectedFiles] = useState<any>('')
    const [isWaiting, setIsWaiting] = useState<any>(false)
    const [filesaa, setFilesaa] = useState('' as any)

    function handleAcceptedFiles(files: any) {
        files.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),

                formattedSize: formatBytes(file.size),
            }),
        )
        setselectedFiles(files)
    }
    const preview = (filess: any) => {
        // files.map((file: any) =>
        //   Object.assign(file, {
        //     preview: URL.createObjectURL(file),
        //     formattedSize: formatBytes(file.size),
        //   }),
        // )
        // preview:
        setselectedFiles(filess)
        setFilesaa(URL.createObjectURL(filess.file))

        // setselectedFiles(file);
    }
    function formatBytes(bytes: any, decimals = 2) {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }

    const optionList = state.data.map((item: any, index: number) => {
        return {
            value: item,
            label: 'ชื่อสมาชิก : ' + item.bankAccountName + '   เลขบัญชี : ' + item.bankAccountNumber,
        }
    })
    function handleSelect(data: any) {
        setSelectedOptions(data)
    }
    // const onchang_imgurl_sow = (data: any) => {
    //   SetDataimg(data);
    //   SetRemove_show(true);
    // };
    const handleChanges = (newStartDate: any) => {
        console.log(newStartDate)
    }
    // console.log(startDate);
    const validationContactForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            userId: '',
            amount: '',
            create_time: '',
            remark: '',
            img_url: [],
        },
        validationSchema: Yup.object({
            amount: Yup.string().required(t("Please specify the amount you wish to deposit")),

        }),
        onSubmit: (values) => {
            const data = new FormData()
            data.append('userId', selectedOptions.value.userId)
            data.append('amount', values.amount)
            data.append('create_time', values.create_time)
            data.append('remark', values.remark)
            setIsWaiting(true)
            // console.log(values)
            setLoadding(true)
            Apibank.create_Manual(data)
                .then((res) => {
                    //console.log(res.data);
                    if (res.data.success) {
                        data.append('id', res.data.data.id)
                        data.append('img_url', selectedFiles[0])
                        Apibank.upload_Manual(data)
                            .then((ress) => {
                                //console.log(ress.data);
                                if (ress.data.success) {
                                    success(ress.data.message)
                                    setLoadding(false)
                                    setTimeout(() => {
                                        setIsWaiting(false)
                                    }, 3000)
                                } else {
                                    error(ress.data.message)
                                    setLoadding(false)
                                    setTimeout(() => {
                                        setIsWaiting(false)
                                    }, 3000)

                                }
                            })
                            .catch((err) => {
                                setLoadding(false)
                                error(err.message)
                                setTimeout(() => {
                                    setIsWaiting(false)
                                }, 3000)
                                console.log(err)
                            })
                    } else {
                        error(res.data.message)
                        setIsWaiting(false)
                        setLoadding(false)
                    }
                })
                .catch((err) => {
                    setLoadding(false)
                    setIsWaiting(false)
                    error(err.message)
                    console.log(err)
                })
        },
    })
    //console.log(filesaa)
    return (
        <>
            {contextHolder}

            <AddLoadding status={loadding} />
            <CRow>
                <CCol xs={12}>
                    <CCol xs>
                        <CForm
                            onSubmit={(e) => {
                                e.preventDefault()
                                validationContactForm.handleSubmit()
                                return false
                            }}
                        >
                            <CCard className="row flex-column flex-md-row align-items-md-center">
                                <CCardHeader><h5><b>{t("Create a list Manual")}</b></h5></CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol sm={12} md={6} lg={6}>
                                            <CCol className="mb-3 mb-sm-0 my-1" sm={8} lg={8}>
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    <b>{t('Member name')}</b>{' '}
                                                </CFormLabel>
                                                <Select
                                                    options={optionList}
                                                    name="user_to"
                                                    placeholder={t('Search for the name you want to deposit')}
                                                    className="my-2"
                                                    value={selectedOptions}
                                                    onChange={handleSelect}
                                                    required
                                                />
                                            </CCol>

                                            <CCol className="mb-3 mb-sm-0 my-5" sm={8} lg={8}>
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    <b>{t('Deposit amount')}</b>{' '}
                                                </CFormLabel>
                                                <CFormInput
                                                    type="number"
                                                    name="amount"
                                                    onChange={validationContactForm.handleChange}
                                                    onBlur={validationContactForm.handleChange}
                                                    value={validationContactForm.values.amount}
                                                    defaultValue={t('Deposit amount')}
                                                    required
                                                    placeholder='Enter Deposit Amount'
                                                //readOnly
                                                // plainText
                                                />
                                                {validationContactForm.errors.amount ? (
                                                    <>
                                                        <p className="text-danger">{validationContactForm.errors.amount}</p>
                                                    </>
                                                ) : null}
                                            </CCol>
                                            <CCol className="mb-3 mb-sm-0 my-5" sm={8} lg={8}>
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    <b>{t('Time of making the deposit transaction')}</b>
                                                </CFormLabel>
                                                <CFormInput
                                                    type="datetime-local"
                                                    required
                                                    name="create_time"
                                                    onChange={validationContactForm.handleChange}
                                                    onBlur={validationContactForm.handleChange}
                                                    value={validationContactForm.values.create_time}
                                                    defaultValue="create_time"
                                                //readOnly
                                                // plainText
                                                />
                                                <div
                                                    className="panel-body tabs-menu-body main-content-body-right "
                                                    id="tab5"
                                                >
                                                    <Dropzone
                                                        onDrop={(acceptedFiles) => {
                                                            handleAcceptedFiles(acceptedFiles)
                                                        }}
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div
                                                                className="dz-message needsclick mt-2 mx-auto"
                                                                {...getRootProps()}
                                                            >
                                                                <div className="mx-auto">
                                                                    {' '}
                                                                    <div className="">
                                                                        <div className="product-image mx-auto">
                                                                            {selectedFiles ? (
                                                                                <img

                                                                                    data-dz-thumbnail=""
                                                                                    height="80"
                                                                                    className="avatar-sm rounded bg-light"
                                                                                    alt={selectedFiles[0].name}
                                                                                    src={selectedFiles[0].preview}
                                                                                />
                                                                            ) : (
                                                                                <Upload
                                                                                    name="img_url"
                                                                                    accept={'image/*'}
                                                                                    showUploadList={false}
                                                                                    beforeUpload={(file) => {
                                                                                        // Use beforeUpload to handle the file
                                                                                        const reader = new FileReader()
                                                                                        reader.onload = (e: any) => {
                                                                                            const previewImage = e.target.result
                                                                                            // Create a "fake" file object with the preview URL
                                                                                            const previewFile = new File([file], file.name, {
                                                                                                type: file.type,
                                                                                            })
                                                                                                ; (previewFile as any).preview = previewImage
                                                                                            setselectedFiles([previewFile]) // Wrap in an array since setselectedFiles expects an array
                                                                                            setFilesaa(previewImage) // Set filesaa to preview url
                                                                                        }
                                                                                        reader.readAsDataURL(file)
                                                                                        return false // Prevent automatic upload
                                                                                    }}
                                                                                    maxCount={1}
                                                                                >
                                                                                    <p className="btn btn-success mt-3" style={{ color: "#fff" }}>{t("Upload Slip")}</p>
                                                                                </Upload>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                </div>
                                            </CCol>
                                            <CCol className="mb-3 my-3" sm={8} lg={8}>
                                                <CFormLabel htmlFor="exampleFormControlInput1"><b>{t('note')}</b></CFormLabel>
                                                <CFormTextarea
                                                    id="floatingTextarea"
                                                    floatingLabel={`${t("Comments")}`}
                                                    name="remark"
                                                    onChange={validationContactForm.handleChange}
                                                    onBlur={validationContactForm.handleChange}
                                                    value={validationContactForm.values.remark}
                                                    //  defaultValue="จำนวนเงินที่ฝาก"
                                                    placeholder="remark"
                                                ></CFormTextarea>
                                            </CCol>
                                        </CCol>
                                        <CCol sm={12} md={6} lg={6} style={{ display: "grid", alignItems: "center" }}>
                                            {selectedOptions?.value && (
                                                <>
                                                    <CCard className="text-center">
                                                        <CCardHeader><b>{t("Verify information")}</b></CCardHeader>
                                                        <CCardBody>
                                                            <CCardTitle>{selectedOptions?.value?.Bank?.bankNameTh}</CCardTitle>
                                                            <div data-v-50f6d2a0 className="result-container">
                                                                <img
                                                                    data-v-50f6d2a0
                                                                    src={selectedOptions?.value?.Bank?.imageUrl}
                                                                    width={80}
                                                                    className="bank-logo"
                                                                />{' '}
                                                                <br data-v-50f6d2a0 />{' '}
                                                                <label data-v-50f6d2a0 className="account-number">
                                                                    {t('Account number')}{' '}
                                                                    <strong data-v-50f6d2a0>
                                                                        :{' '}{selectedOptions?.value?.bankAccountNumber}
                                                                    </strong>
                                                                </label>{' '}
                                                                {/* <br data-v-50f6d2a0 /> <label data-v-50f6d2a0>ธนาคารกสิกรไทย</label>{' '} */}
                                                                <br data-v-50f6d2a0 />{' '}
                                                                <label data-v-50f6d2a0>
                                                                    {t('Account name')}{' '}
                                                                    <strong>:{' '}{selectedOptions?.value?.bankAccountName}</strong>
                                                                </label>{' '}
                                                                <br data-v-50f6d2a0 />{' '}
                                                                <label data-v-50f6d2a0>
                                                                    {t("Telephone Number")}<strong>{' '}
                                                                        :{' '}{selectedOptions?.value?.telephoneNumber
                                                                            ? selectedOptions?.value?.telephoneNumber
                                                                            : `${t("No Data")}`}</strong>
                                                                </label>
                                                                <div data-v-50f6d2a0 className="amount-container">
                                                                    <label data-v-50f6d2a0>{t("Amount")} : {' '} <b> {!validationContactForm.values.amount ? `0` : parseFloat(validationContactForm.values.amount).toFixed(2)}</b></label>

                                                                    <br data-v-50f6d2a0 /> {/**/}
                                                                </div>{' '}
                                                                <br data-v-50f6d2a0 />{' '}
                                                                <br data-v-50f6d2a0 />{' '}
                                                                <label data-v-50f6d2a0 className="amount">
                                                                    <b>{t("Transaction time")} :</b> <span style={{ color: "#88888880" }}>{validationContactForm.values.create_time}</span>{' '}
                                                                </label>{' '}
                                                                <br data-v-50f6d2a0 />{' '}

                                                            </div>
                                                            <CButton disabled={isWaiting} color="primary" type="submit" className="mt-3" style={{ color: "#fff" }}>
                                                                {!isWaiting ? t('Confirm transaction') : t("Waiting for verification")}
                                                            </CButton>
                                                        </CCardBody>
                                                    </CCard>
                                                </>
                                            )}
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CForm>
                    </CCol>
                </CCol>
            </CRow>
        </>
    )
}

export default Manual
