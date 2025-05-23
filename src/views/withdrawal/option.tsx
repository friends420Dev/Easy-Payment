import { UpdateBtn } from '../../components/updateBtn/updateBtn'
import { Tabs, Switch, message } from 'antd'
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
} from '@coreui/react-pro'
import { CIcon } from '@coreui/icons-react'
import { cilPlus, cilMediaRecord, cilLayers } from '@coreui/icons'
import { AddLoadding } from '../../components'
import React, { useEffect, useRef, useContext, Fragment, useState } from 'react'
import Moment from 'moment'
import 'moment/locale/th'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { socket } from 'src/utils/socket'
import { DataContext } from 'src/layout/DefaultLayout'
import Apibank from 'src/api/Apibank'

type Props = {
  setVisiblem?: any
  visiblem2?: any
  data_itmsms: any
  t?: any


}

export const Model_Detailwit = ({ setVisiblem, visiblem2, data_itmsms, t }: Props) => {
  //console.log(data_itmsms)

  const transferconfirmation = (data: any) => {

    Apibank.transferconfirmation(data)
      .then((res) => {
        if (res.data.success) {
          setVisiblem(false)

          Swal.fire({
            icon: 'success',
            title: 'success...',
            text: 'success',
            // footer: '<a href="#">Why do I have this issue?</a>',
          })
        }
        //
      })
      .catch((err: any) => { })
    // console.log(data)
  }

  return (
    <>
      <CModal
        alignment="top"
        size="lg"
        visible={visiblem2}
        onClose={() => setVisiblem(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample"> {t("Withdrawal Details")}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>

            <CCol sm={12}>
              <div className="headerprocess text-center" ><i className="fas fa-user"></i> ข้อมูลส่วนตัว</div>
              <div className="containprocess" style={{ padding: "0 20px" }}>
                <table align="center" className="accountofuser">
                  <tbody><tr className="trofaccount">
                    <td className="headeraccount"><i className="fal fa-user"></i> คุณ:</td>
                    <td>ทดสอบ ทดสอบระบบ</td>
                  </tr>
                    <tr className="trofaccount">
                      <td className="headeraccount"><i className="fal fa-user-circle"></i> ยูสเซอร์:</td>
                      <td>AC168001</td>
                    </tr>
                    <tr className="trofaccount">
                      <td className="headeraccount"><i className="fal fa-lock"></i> รหัสผ่าน:</td>
                      <td>1234567890</td>
                    </tr>
                    <tr className="trofaccount">
                      <td className="headeraccount"><i className="fal fa-university"></i> ธนาคารของคุณ:</td>
                      <td><img src="images/bank/kbank.svg?v=1" width="25px" /> กสิกรไทย</td>
                    </tr>
                    <tr className="trofaccount">
                      <td className="headeraccount"><i className="fal fa-gift"></i> โปรโมชั่นของคุณ:</td>
                      <td>ไม่รับโปรโมชั่น</td>
                    </tr>
                    <tr className="trofaccount">
                      <td className="headeraccount"><i className="fal fa-users"></i> ยอดแนะนำเพื่อน:</td>
                      <td>949.00 บาท</td>
                    </tr>

                    <tr className="trofaccount">
                      <td className="headeraccount"><i className="fal fa-sack-dollar"></i> ยอดคอมมิชชั่น:</td>
                      <td>478.00 บาท</td>
                    </tr>
                  </tbody></table>
              </div>
              {/* <CCard>
               <CCardBody className="card text-center">
                 <CCardTitle>{"userId"} {data_itmsms?.members?.userId}</CCardTitle>
                 <CCardTitle>{data_itmsms?.bank?.bankNameTh}</CCardTitle>
                 <CCardText>{data_itmsms?.members?.bankAccountNumber}</CCardText>
                 <CCardText>{data_itmsms?.members?.bankAccountName}</CCardText>
                 <CCardText>{data_itmsms?.amount}</CCardText>
                 <CCardText>{data_itmsms?.ref}</CCardText>
                 <CCardText>{data_itmsms?.status}</CCardText>
                 <CCardText>{data_itmsms?.created_at}</CCardText>
               </CCardBody>
             </CCard> */}
            </CCol>

          </CRow>
          <CCol sm={12} className="text-center">
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <span className="text-succss">
                    {data_itmsms?.data_api?.dataapi?.status?.description}
                  </span>
                </CCardTitle>
                <CCardText>
                  <p>จำนวนเงิน : {data_itmsms?.data_req?.amount}</p>
                </CCardText>
                <CCardText>
                  <p>หมายเหตุ :{data_itmsms?.data_api?.dataapi?.data?.warningHeader}</p>
                  <p>{data_itmsms?.data_api?.dataapi?.data?.warningMsg}</p>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => transferconfirmation(data_itmsms)}>
            ยืนยันการโอนเงิน
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
