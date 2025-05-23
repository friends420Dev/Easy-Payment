import {
    CCard, CCardBody, CCardHeader, CCol, CDateRangePicker, CRow, CWidgetStatsB,
    CWidgetStatsC,
    CWidgetStatsE,
    CWidgetStatsF,
    CCardGroup
} from '@coreui/react-pro'
import { UpdateBtn } from 'src/components/updateBtn/updateBtn'
import React, { useEffect, useReducer, useState, useContext } from 'react'
import SmartTableDownloadableExample from '../smart-table/SmartTableDownloadableExample'
import {
    cilArrowRight,
    cilBasket,
    cilBell,
    cilChartPie,
    cilMoon,
    cilLaptop,
    cilPeople,
    cilSettings,
    cilSpeech,
    cilSpeedometer,
    cilUser,
    cilUserFollow,
    cilSwapHorizontal,
    cilTransfer,
    cilVerticalAlignBottom,
    cilVerticalAlignTop
} from '@coreui/icons'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import Moment from 'moment'
import 'moment/locale/th'
import Api from 'src/api/Api'
import { AddLoadding } from '../../components/index'
import { Button, message, Space } from 'antd';
import { useTranslation } from 'react-i18next'
import { DataContext } from 'src/layout/DefaultLayout';

const DashboardReport = () => {
    const calendarDate = Moment().format()
    const [startDate2, setStartDate2]: any = React.useState(Moment().subtract(1, 'days').format("YYYY-MM-DD"));
    const [endtDate2, setEndDate2]: any = React.useState(Moment().format("YYYY-MM-DD"));
    const [onShow2, setOnShow]: any = React.useState("");
    const [loadding, setLoadding]: any = useState(false)
    const [messageApi, contextHolder]: any = message.useMessage();

    const { t } = useTranslation()

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
    useEffect(() => {
        // itemContext?.getAllMembers()
    }, [])
    const itemContext: any = useContext<any>(DataContext)

    const handleSelectStartDate = (e: any) => {
        setStartDate2(Moment(e.target.value).format("YYYY-MM-DD"))
    };
    const handleSelectEndDate = (e: any) => {
        // console.log(e.target.value)
        setEndDate2(Moment(e.target.value).format("YYYY-MM-DD"))
    };
    const postOverviewReports = ({ startDate2, endtDate2 }: any) => {
        let date: any = {
            startDate: startDate2,
            endDate: endtDate2
        }
        // console.log(date)
        if (date?.startDate == "Invalid date" || date?.endDate == "Invalid date") {
            error("ตรวจสอบวันที่ให้ถูกต้อง")
            return false
        }
        setLoadding(true)
        Api.postOverviewReports(date)
            .then((res) => {
                if (res?.data?.success) {
                    setStateReport(res?.data)
                    setLoadding(false)
                    success(res?.data?.message)
                } else {
                    setLoadding(false)
                    error(res?.data?.message)
                }
            }).catch((err) => {
                setLoadding(false)
                error(err?.message)
                console.log(err)
            })
    }
    const [stateReport, setStateReport]: any = useReducer(
        (stateReport: any, newStateReport: any) => ({ ...stateReport, ...newStateReport }),
        {
            data: [],
        },
    )
    // console.log(stateReport)
    const CustomRangesExample = () => {
        return (
            <div className="row">

                <div className="col-lg-5 d-md-flex w-100" style={{ alignItems: "center" }}>
                    <i data-v-22915f7f aria-label="icon: filter" className="anticon anticon-filter">
                        <svg
                            viewBox="64 64 896 896"
                            data-icon="filter"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false">
                            <path d="M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 597.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V597.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V642h182.9v156zm9.6-236.6l-9.5 16.6h-183l-9.5-16.6L212.7 226h598.6L613 561.4z" />
                        </svg>
                    </i>
                    <label className='' style={{ marginLeft: 10, marginRight: 30 }}>{t('Select date')}: </label>

                    <div className="date-picker">
                        <div className="date-picker-input-group" >
                            <input autoComplete="off" type='date' value={startDate2} onChange={(e) => handleSelectStartDate(e)} className="date-picker-input" placeholder="Start date" />
                            <div className="date-picker-separator" />
                            <input autoComplete="off" type='date' value={endtDate2} onChange={(e) => handleSelectEndDate(e)} className="date-picker-input" placeholder="End date" />
                            <div className="text-truncate btn btn-secondary" tabIndex={0} onClick={() => postOverviewReports({ startDate2, endtDate2 })} > {t('confirm')}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (<>
        <AddLoadding status={loadding} />
        {contextHolder}
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-2">
                    <CCardHeader>
                        {/* <strong>CoreUI React Date Range Picker</strong> <small>Custom ranges</small> */}
                        <CustomRangesExample />
                    </CCardHeader>
                    <CCardBody>
                        {/* <CustomRangesExample /> */}
                        <SmartTableDownloadableExample itemContext={itemContext} startDate2={startDate2} endtDate2={endtDate2} Moment={Moment} stateReport={stateReport} t={t} loadding={loadding} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </>);
}

export default DashboardReport;