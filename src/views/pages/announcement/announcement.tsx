import React, { useEffect, useReducer, useState, createContext } from 'react'
import { AppAside, AppContent, AppSidebar, AppFooter, AppHeader, AddLoadding } from '../../../components/index'
// import Apisetting from '../api/Apisetting'
// import Api from '../api/Api'
import { Button, message, Space, Alert } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import { Logout, getUserID } from 'src/Token';
// import routes from '../routes'
// import type { Route } from '../routes'
// import _nav from '../../../_nav'
import type { NavItem } from '../../../_nav'

import { Translation } from 'react-i18next'
import { t } from 'i18next';
const Announcement = () => {
  const [spinIcon, setSpinIcon] = useState(false);
  const [updateTxt, setUpdateTxt] = useState("อัปเดตข้อมูล");


  return (
    <>
      {" "}
      <AppSidebar />
      {/* {contextHolder} */}
      <div className="wrapper d-flex flex-column min-vh-100">
        {/* <AddLoadding status={loadding} /> */}
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="main-containt">

            <div className="main-container">
              <div data-v-4598fc0e style={{ margin: 20 }}>
                <div data-v-4598fc0e>

                  <div data-v-4598fc0e>
                    <div data-v-4598fc0e style={{ marginTop: 0 }}>

                      <div data-show="true" className="ant-alert ant-alert-error ant-alert-with-description css-dev-only-do-not-override-1wwf28x" role="alert">
                        <span role="img" aria-label="close-circle" className="anticon anticon-close-circle ant-alert-icon">
                          <i
                            data-v-4598fc0e
                            aria-label="icon: alert"
                            className="anticon anticon-alert"
                            style={{ marginRight: 10 }}
                          >

                            <h3 className="anticon" data-v-4598fc0e> <svg
                              viewBox="64 64 896 896"
                              data-icon="alert"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                              focusable="false"
                              className=""
                            >
                              <path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233zm72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zm-48.1-252.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9a8.03 8.03 0 0 0-11.3 0l-39.6 39.6a8.03 8.03 0 0 0 0 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zm669.6-79.2l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-67.9 67.9a8.03 8.03 0 0 0 0 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z" />
                            </svg> ประกาศสำคัญ</h3>
                          </i>
                        </span>
                        <br />
                        <div className="ant-alert-content">
                          <div className="ant-alert-message" >
                            <b>แจ้งบัญชีที่ยกเลิกใช้งาน : </b>
                            ขอความร่วมมือ
                            แจ้งบัญชีที่ยกเลิกใช้งาน
                            เพื่อให้ระบบคืนเครื่องไว้รองรับกับบัญชีที่เพิ่มมาใหม่
                          </div>
                          <div className="ant-alert-description"><em> <b>Report canceled accounts:</b> Please report canceled accounts so that the system can return the device to support the newly added accounts.</em></div>
                        </div>
                      </div>

                    </div>
                  </div>{" "}
                  <div
                    data-v-4598fc0e
                    role="separator"
                    className="ant-divider ant-divider-horizontal"
                  />
                </div>{" "}
                <br />
                <div data-show="true" className="d-none  ant-alert ant-alert-info ant-alert-with-description css-dev-only-do-not-override-1wwf28x" role="alert">
                  <span role="img" aria-label="info-circle" className="anticon anticon-info-circle ant-alert-icon">
                  <span role="img" aria-label="close-circle" className="anticon anticon-close-circle ant-alert-icon">
                          <i
                            data-v-4598fc0e
                            aria-label="icon: alert"
                            className="anticon anticon-alert "
                            style={{ marginRight: 10 }}
                          >

                            <h3 className="anticon " data-v-4598fc0e>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" className='me-1' aria-hidden="true">
                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" /></svg>
                            
                            ประกาศทั่วไป</h3>
                          </i>
                        </span>
                    
                  </span>
                  <div className="ant-alert-content">
                    <div className="ant-alert-message">Informational Notes</div>
                    <div className="ant-alert-description">Additional description and information about copywriting.</div>
                  </div>
                </div>

              </div>
            </div>{" "}

          </div>
        </div>
        <AppFooter />
      </div>
      <AppAside />

    </>
  );
};

export default Announcement;
