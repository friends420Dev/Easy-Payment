import {
    CCard, CCardBody, CCardHeader, CCol, CDateRangePicker, CRow, CWidgetStatsB,
    CWidgetStatsC,
    CWidgetStatsE,
    CWidgetStatsF,
    CCardGroup,
    CButton
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
import Moment from 'moment'
import 'moment/locale/th'
import SmartTableBasixExample from '../smart-table/SmartTableBasixExample'
import data from '../smart-table/_data'
import * as XLSX from 'xlsx'
import { useTranslation } from 'react-i18next' 

const Index = () => {

    const calendarDate = Moment().format()
    const [startDate2, setStartDate2]: any = React.useState(false);

    const [endtDate2, setEndDate2]: any = React.useState(false);
    const [onShow2, setOnShow]: any = React.useState("");
    const handleSelectStartDate = (e: any) => {
        setStartDate2(Moment(e.target.value).format("yyyy-MM-DD"))
    };
    const handleSelectEndDate = (e: any) => {
        // console.log(e.target.value)
        setEndDate2(Moment(e.target.value).format("yyyy-MM-DD"))


    };
    const CustomRangesExample = () => {

        return (
            <div className="row">

                <div className="col-lg-5 d-md-flex w-100" >
                    <i data-v-22915f7f aria-label="icon: filter" className=" anticon-filter">
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
                    <label className='' style={{ marginLeft: 10, marginRight: 30 }}>เลือกวันที่: </label>

                    <div className="date-picker">
                        <div className="date-picker-input-group" >
                            <input autoComplete="off" type='date' value={startDate2} onChange={(e) => handleSelectStartDate(e)} className="date-picker-input" placeholder="Start date" />
                            <div className="date-picker-separator" />
                            <input autoComplete="off" type='date' value={endtDate2} onChange={(e) => handleSelectEndDate(e)} className="date-picker-input" placeholder="End date" />
                            <div className="date-picker-indicator" tabIndex={0} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    const { t } = useTranslation()

    return (<>

        <CRow>
            <CCol xs={12}>
                <CCard className="mb-2">
                    <CCardHeader>
                        {/* <strong>CoreUI React Date Range Picker</strong> <small>Custom ranges</small> */}
                        <CustomRangesExample />
                    </CCardHeader>
                    <CCardBody>
                        {/* <CustomRangesExample /> */}
                        
                        {/* <SmartTableBasixExample  t={t} Moment={Moment} /> */}
                    </CCardBody>
                </CCard>
            </CCol>



        </CRow>

    </>);
}

export default Index;