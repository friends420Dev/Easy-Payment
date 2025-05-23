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
    CCardText,
    CCardHeader
} from '@coreui/react-pro'
import moment from 'moment'
import 'moment/locale/th'
import React from 'react';
import { Tabs, message } from 'antd';
import type { TabsProps } from 'antd';
import config from 'src/config/app.config';
type Props = {
    setVisible?: any
    visible?: any
    data_itmsms?: any
    setLoadding?: any
    transferconfirmation?: any
    t?: any
}
const ModelDetailsVerifyWithdraw = ({ setVisible, visible, data_itmsms, t, transferconfirmation }: Props) => {
    //console.log(data_itmsms)
    const onChange = (key: string) => {
        console.log(key);
    };
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
    const handleCopy = (text: any) => {
        navigator?.clipboard?.writeText(text)
          .then(() => {
            success('Copied : '+ text );
          })
          .catch(() => {
            error('Copied Something went wrong.');
          });
      };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("Verify information"),
            children: <CRow>
                <CCol sm={12} md={12} lg={12} style={{ display: "grid", alignItems: "center" }}>
                    <CCard className="text-center">
                        <CCardHeader><b>{t("Verify information")}</b></CCardHeader>
                        <CCardBody>
                            <CCardTitle></CCardTitle>
                            <div data-v-50f6d2a0 className="result-container">
                                <img
                                    data-v-50f6d2a0
                                    src={`/src/assets/images/bank3/${data_itmsms?.data_api?.accto?.bank?.bank_id}.png`}
                                    width={80}
                                    className="bank-logo"
                                />{' '}
                                <label data-v-50f6d2a0 className="account-number mt-3 mb-2 d-block">
                                    {t('Account number')}{' '}
                                    <strong data-v-50f6d2a0>
                                        :{' '}{data_itmsms?.data_api?.accto?.accountNumber}
                                    </strong>
                                </label>{' '}
                                <label data-v-50f6d2a0 className='mb-2 d-block'>
                                    {t('Account name')}{' '}
                                    <strong>:{' '}{data_itmsms?.data_api?.accto?.name}</strong>
                                </label>{' '}
                                <label data-v-50f6d2a0 className='mb-2  d-block'>
                                    {t("Telephone Number")}<strong>{' '}
                                        :{' '}{data_itmsms?.value?.telephoneNumber
                                            ? data_itmsms?.value?.telephoneNumber
                                            : <span style={{ color: "#88888880" }}>{t("No Data")}</span>}</strong>
                                </label>
                                <div data-v-50f6d2a0 className="amount-container mb-3  d-block">
                                    <label data-v-50f6d2a0>{t("Amount")} : {' '} <b> {!data_itmsms?.data_req?.amount ? `0.-` : parseFloat(data_itmsms?.data_req?.amount).toFixed(2) + '.-'}</b></label>
                                </div>{' '}
                                <label data-v-50f6d2a0 className="amount  d-block" >
                                    <b>{t("Transaction time")}</b> : <span style={{ color: "#88888880" }}>{moment(data_itmsms?.data_req?.created_at).format("YYYY/MM/DD HH:mm:ss")}</span>{' '}
                                </label>{' '}

                            </div>
                            <br />

                            <CCardText className=''>
                                <b className='d-block text-start'>หมายเหตุ : <u>{data_itmsms?.data_api?.dataapi?.data?.warningHeader}</u></b>
                                <br />
                                <b className='text-danger text-center'>!! {data_itmsms?.data_api?.dataapi?.data?.warningMsg}</b>
                            </CCardText>
                        </CCardBody>
                        <CModalFooter>
                            <CButton color="primary" style={{ color: "#fff" }} onClick={() => transferconfirmation(data_itmsms)}>
                                {t('Confirm transaction')}
                            </CButton>
                        </CModalFooter>
                    </CCard>
                </CCol>
            </CRow>,
        },
        {
            key: '2',
            label: t('Bank Account From'),
            children: <CRow>
                <CCol sm={12} md={12} lg={12} style={{ display: "grid", alignItems: "center" }}>
                    <CCard className="text-center">
                        <CCardHeader><b>{t("Account From")}</b></CCardHeader>
                        <CCardBody>
                            <CCardTitle></CCardTitle>
                            <div data-v-50f6d2a0 className="result-container">
                                <img
                                    data-v-50f6d2a0
                                    src={`/src/assets/images/bank3/${data_itmsms?.data_api?.accfrom?.bank?.bank_id}.png`}
                                    width={80}
                                    className="bank-logo"
                                />{' '}
                                <label data-v-50f6d2a0 className='mt-2  d-block'>
                                    {t("Telephone Number")}<strong>{' '}
                                        :{" "}{t(data_itmsms?.data_api?.accfrom?.bank?.bank_id)}</strong>
                                </label>
                                <label data-v-50f6d2a0 className="account-number  mb-2 d-block">
                                    {t('Account number')}{' '}
                                    <strong data-v-50f6d2a0 style={{ cursor:"copy" }} onClick={() => handleCopy(data_itmsms?.data_api?.accto?.accountNumber)}>
                                        :{' '}{data_itmsms?.data_api?.accfrom?.accountNumber}
                                    </strong>
                                </label>{' '}
                                <label data-v-50f6d2a0 className='mb-2 d-block'>
                                    {t('Account name')}{' '}
                                    <strong>:{' '}{data_itmsms?.data_api?.accfrom?.name}</strong>
                                </label>{' '}
                               
                                
                                

                            </div>

                           
                        </CCardBody>
                        
                    </CCard>
                </CCol>
            </CRow>,
        },
        {
            key: '3',
            label: t('Bank Account To'),
            children: <CRow>
            <CCol sm={12} md={12} lg={12} style={{ display: "grid", alignItems: "center" }}>
                <CCard className="text-center">
                    <CCardHeader><b>{t("Bank Account To")}</b></CCardHeader>
                    <CCardBody>
                        <CCardTitle></CCardTitle>
                        <div data-v-50f6d2a0 className="result-container">
                            <img
                                data-v-50f6d2a0
                                src={`/src/assets/images/bank3/${data_itmsms?.data_api?.accto?.bank?.bank_id}.png`}
                                width={80}
                                className="bank-logo"
                            />{' '}
                            
                            <label data-v-50f6d2a0 className="account-number mt-3 mb-2 d-block">
                                {t('Account number')}{' '}
                                <strong style={{ cursor:"copy" }} data-v-50f6d2a0 onClick={() => handleCopy(data_itmsms?.data_api?.accto?.accountNumber)}>
                                    :{' '}{data_itmsms?.data_api?.accto?.accountNumber}
                                </strong>
                            </label>{' '}
                            <label data-v-50f6d2a0 className='mb-2 d-block'>
                                {t('Account name')}{' '}
                                <strong>:{' '}{data_itmsms?.data_api?.accto?.name}</strong>
                            </label>{' '}
                            <label data-v-50f6d2a0 className='mb-2  d-block'>
                                {t("Telephone Number")}<strong>{' '}
                                    :{' '}{data_itmsms?.data_req?.members?.telephoneNumber
                                        ? data_itmsms?.data_req?.members?.telephoneNumber
                                        : <span style={{ color: "#88888880" }}>{t("No Data")}</span>}</strong>
                            </label>
                            <label data-v-50f6d2a0 className="amount  d-block mt-3" >
                                <b>{t("User ID")}</b> : <span style={{ color: "#888", cursor:"copy" }} onClick={() => handleCopy(data_itmsms?.data_req?.members?.userId)}>{data_itmsms?.data_req?.members?.userId}</span>{' '}
                            </label>{' '}
                            <div data-v-50f6d2a0 className="amount-container mb-3  d-block">
                                <label data-v-50f6d2a0>{t("merchantId")} : {' '} <b> {data_itmsms?.data_req?.members?.merchantId}</b></label>
                            </div>{' '}
                            

                        </div>

                       
                    </CCardBody>
                    
                </CCard>
            </CCol>
        </CRow>,
        },
    ];
    return (
        <>
      {contextHolder}

            <CModal
                alignment="top"
                // size=""
                visible={visible}
                onClose={() => setVisible(!visible)}
                aria-labelledby="VerticallyCenteredExample"
            >

                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">ยืนยันการโอนเงิน</CModalTitle>
                </CModalHeader>
                <div className='container'> </div>
                <CModalBody>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

                    <p className='text-center mb-0 mt-3' style={{color:"#888"}}>{t("version")} : {config?.version}</p>
                </CModalBody>

            </CModal>
        </>
    );
}

export default ModelDetailsVerifyWithdraw;