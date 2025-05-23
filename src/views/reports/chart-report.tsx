import {
    CCard, CCardBody, CCardHeader, CCol, CDateRangePicker, CRow, CWidgetStatsB,
    CWidgetStatsC,
    CWidgetStatsE,
    CWidgetStatsF,
    CCardGroup,
    CButton,
    CFormSelect,
} from '@coreui/react-pro'
import { UpdateBtn } from 'src/components/updateBtn/updateBtn'
import React from 'react'
import {
    CChartBar,
    CChartDoughnut,
    CChartLine,
    CChartPie,
    CChartPolarArea,
    CChartRadar,
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
    cilChartLine,
    cilFilter,
    cilArrowRight
} from '@coreui/icons'
import Moment from 'moment'
import 'moment/locale/th'
import SmartTableBasixExample from '../smart-table/SmartTableBasixExample'
import { useTranslation } from 'react-i18next'
import Api from 'src/api/Api'
import { Button, message, Space } from 'antd';
import { format, parse } from 'date-fns'
import { es, th } from 'date-fns/locale'
import { func } from 'prop-types'
const Index = () => {
    const [messageApi, contextHolder]: any = message.useMessage();
    const success = (msg: any) => {
        messageApi?.open({
            type: 'success',
            content: `${msg}`,
        });
    };
    const error = (msg: any) => {
        messageApi?.open({
            type: 'error',
            content: `${msg}`,
        });
    };
    const { t } = useTranslation("")
    const CustomRangesExample = ({ hanndleChangDateReport, dateReportStart, dateReportEnd, cleanerDateReportStart, getSelectTimePeriod, sendToSelectDate }: any) => {
        const customRanges = {
            Today: [new Date(), new Date(), "today"],
            Yesterday: [
                new Date(new Date().setDate(new Date().getDate() - 1)),
                new Date(new Date().setDate(new Date().getDate() - 1)),
                "yesterday"
            ],
            'Last 7 Days': [new Date(new Date().setDate(new Date().getDate() - 6)), new Date(new Date()), "lastWeek"],
            'Last 30 Days': [
                new Date(new Date().setDate(new Date().getDate() - 29)),
                new Date(new Date()),
                "last 30 days"
            ],
            'This Month': [
                new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                "month"
            ],
            'Last Month': [
                new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                new Date(new Date().getFullYear(), new Date().getMonth(), 0),
                "lastMonth"
            ],
            'This Year': [
                new Date(new Date().getFullYear(), 0, 1),
                new Date(new Date().getFullYear(), 11, 31),
                "year"
            ],
            'Last Year': [
                new Date(new Date().getFullYear() - 1, 0, 1),
                new Date(new Date().getFullYear() - 1, 11, 31),
                "lastYear"
            ]
        };
        let bData = [{ ...customRanges }]
        return (
            <div className="row">
                <div className="col-lg-5 d-md-flex w-100" style={{ alignItems: "center" }}>
                    <label className='' style={{ marginLeft: 10, marginRight: 5 }}><CIcon className='anticon' icon={cilFilter} /> {t('Select date')} : </label>
                    <div className="date-picker ">
                        <div className="date-picker-input-group text-center" style={{ background: "#00000000", border: "none" }} id={'DateReport'}>
                            <div className="date-picker text-center show ">
                                <div className="date-picker-input-group">
                                    <input autoComplete="off" id='dateReportStart' type='date' value={dateReportStart} onChange={(e: any) => hanndleChangDateReport(e)} className="date-picker-input" placeholder="Start date" />
                                    <div className="date-picker-separator" />
                                    <input autoComplete="off" className="date-picker-input" value={dateReportEnd} type='date' onChange={(e: any) => hanndleChangDateReport(e)} id='dateReportEnd' placeholder="End date" />
                                    <div className="date-picker-indicator" tabIndex={0} />
                                    <div className="date-picker-cleaner" onClick={() => cleanerDateReportStart()} />
                                </div>
                            </div>
                            <button disabled={dateReportEnd == "" || dateReportStart == "" ? true : false} id='submitPost' type='button' className="text-truncate btn btn-secondary" tabIndex={0} onClick={() => sendToSelectDate(document.getElementById("dateReportStart"), document.getElementById("dateReportEnd"))}> {t('confirm')} </button>
                            <div className="date-picker-separator" />
                            {/* ช่วงเวลา */}
                            <button className="text-truncate btn btn-outline-secondary" tabIndex={0} onClick={() => getSelectTimePeriod(bData.map((item: any) => item["Today"]), "Today")}> {t('Today')} </button>
                            <button className="text-truncate btn btn-outline-secondary" tabIndex={0} onClick={() => getSelectTimePeriod(bData.map((item: any) => item["Yesterday"]))}> {t('Yesterday')} </button>
                            <button className="text-truncate btn btn-outline-secondary" tabIndex={0} onClick={() => getSelectTimePeriod(bData.map((item: any) => item["Last 7 Days"]))}> {t('Last 7 Days')} </button>
                            {/* <button className="text-truncate btn btn-outline-secondary" tabIndex={0} onClick={() => getSelectTimePeriod(bData.map((item: any) => item["Last 30 Days"]))}> {t('Last 30 Days')} </button> */}
                            <button className="text-truncate btn btn-outline-secondary" tabIndex={0} onClick={() => getSelectTimePeriod(bData.map((item: any) => item["This Month"]))}> {t('This Month')} </button>
                            <button className="text-truncate btn btn-outline-secondary" tabIndex={0} onClick={() => getSelectTimePeriod(bData.map((item: any) => item["Last Month"]))}> {t('Last Month')} </button>
                            <button className="text-truncate btn btn-outline-secondary" tabIndex={0} onClick={() => getSelectTimePeriod(bData.map((item: any) => item["This Year"]))}> {t('This Year')} </button>
                            <button className="text-truncate btn btn-outline-secondary" tabIndex={0} onClick={() => getSelectTimePeriod(bData.map((item: any) => item["Last Year"]))}> {t('Last Year')} </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const [dateReportStart, setDateReportStart]: any = React.useState("");
    const [dateReportEnd, setDateReportEnd]: any = React.useState("");
    const [typeDateReportEnd, setTypeDateReportEnd]: any = React.useState("");
    const [loadding, setLoadding]: any = React.useState(false);
    async function getSelectTimePeriod(params: any) {
        //console.log(params)
        let s = params[0]
        let start = s[0]
        let end = s[1]
        let type = s[2]
        let sendData = {
            start: start,
            end: end,
            type: type,
        }
        setDateReportStart(Moment(start).format("YYYY-MM-DD"))
        setDateReportEnd(Moment(end).format("YYYY-MM-DD"))
        let send = await sendTo(sendData)
    }
    async function sendTo(e: any) {
        let send = await postOverviewReportCharts(e)
    }
    async function sendToSelectDate(s: any, d: any) {
        let sendData = {
            start: s.value,
            end: d.value,
            type: "date",
        }
        if (sendData.end < sendData.start) {
            error("!! ล้มเหลว ช่วงเวลาไม่ถูกต้อง")
            return
        }
        if (sendData.end == "" || sendData.start == "") {
            error("!! ล้มเหลว ช่วงเวลาไม่ถูกต้อง")
            return
        }
        let send = await postOverviewReportCharts(sendData)
    }
    const cleanerDateReportStart = () => {
        setDateReportStart("")
        setDateReportEnd("")
    }
    async function hanndleChangDateReport(e: any) {
        let dateId = e.target.id;
        if (dateId == "dateReportStart") {
            setDateReportStart(e.target.value)
        } else if (dateId == "dateReportEnd") {
            setDateReportEnd(e.target.value)
        }
    }
    const [chartData, setChartData]: any = React.useState([]);
    const postOverviewReportCharts = (e: any) => {
        setLoadding(true)
        let params = {
            startDate: e.start,
            endDate: e.end,
            type: e.type
        }
        //console.log(params)
        Api.postOverviewReportChart(params)
            .then((res) => {
                //console.log(res?.data?.data)
                if (res.data.success) {
                    success(res.data.message)
                    setLoadding(false)
                    setStateReport(res?.data)
                    setChartData(res?.data?.data)
                } else {
                    setLoadding(false)
                    error(res.data.message)
                }
            }).catch((err) => {
                setLoadding(false)
                error(err.message)
                console.log(err)
            })
    }
    const [stateReport, setStateReport]: any = React.useReducer(
        (stateReport: any, newstateReport: any) => ({ ...stateReport, ...newstateReport }),
        {
            data: [],
        },
    )
    // console.log(dateReportStart)
    // console.log(dateReportEnd)
    return (
        <>
            <CRow>
                {contextHolder}
                <CCol xs={12}>
                    <CCard className="mb-2">
                        <CCardHeader>
                            <CustomRangesExample sendToSelectDate={sendToSelectDate} getSelectTimePeriod={getSelectTimePeriod} cleanerDateReportStart={cleanerDateReportStart} hanndleChangDateReport={hanndleChangDateReport} dateReportEnd={dateReportEnd} dateReportStart={dateReportStart} />
                        </CCardHeader>
                        <CCardBody>
                            {/* BTN DOWNLOAD */}
                            <SmartTableBasixExample t={t} Moment={Moment} loadding={loadding} stateReport={stateReport} startDate={dateReportStart} endDate={dateReportEnd} />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={12} style={{ display: stateReport?.data?.length > 0 ? "block" : "none" }}>
                    <CCard className="mb-4 ">
                        <CCardHeader className='p-3'><b><CIcon icon={cilChartLine} size="lg" /> {t("Summary graph", { startDate: dateReportStart, endDate: dateReportEnd })}</b></CCardHeader>
                        <CCardBody>
                            <CChartBar
                                data={{
                                    labels: chartData?.map((item: any) => item?.label),
                                    datasets: [
                                        {
                                            label: `${t('Deposit')}`,
                                            backgroundColor: '#51cc8a',
                                            data: chartData?.map((item: any) => item?.data?.deposit),
                                        },
                                        {
                                            label: `${t('Withdrawal')}`,
                                            backgroundColor: '#f87979',
                                            data: chartData?.map((item: any) => item?.data?.withdraw),
                                        },
                                    ],
                                }}
                            />
                        </CCardBody>
                    </CCard>
                    <p><b>หมายเหตุ :</b></p>
                    <ul>
                        <li>การคำนวณ สรุปภาพรวม จะคำนวณจาก Transaction <b>ฝาก</b> และ <b>ถอน</b> ที่มี <b>Status = <span className='text-success'>success</span></b> ตามวันเวลาที่กำหนด</li>
                    </ul>
                </CCol>
            </CRow >
            {/*  */}
        </>
    );
}
export default Index;