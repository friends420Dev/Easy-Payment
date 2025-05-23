import React, { useState } from 'react'
import { CButton, CSmartTable, CTableHead, CTableBody, CTableRow, CTableDataCell, CTable } from '@coreui/react-pro'
import {
  CCard, CCardBody, CCardHeader, CCol, CDateRangePicker, CRow, CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
  CBadge,
  CCardGroup,
  CCollapse,
  CLink
} from '@coreui/react-pro'
import type { Item } from '@coreui/react-pro/src/components/smart-table/types'

import data from './_data.js'
import dataDep from './_dataDep.js'
import dataWit from './_dataWit.js'
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

import { DownloadUtils } from '../downloadUtils'

type Props = {
  startDate2?: any
  endtDate2?: any
  Moment?: any
  stateReport?: any
  t?: any
  loadding?: boolean
  itemContext?: any
}

const SmartTableDownloadableExample = (props: Props) => {
  const startDate = new Date(props?.startDate2);
  const endDate = new Date(props?.endtDate2);
  let report: any = props?.stateReport?.data?.totalByDay?.length == 0 ? [] : props?.stateReport?.data?.totalByDay



  const [details, setDetails] = useState<number[]>([])
  const items: any[] = report
  const columns = [
    {
      key: 'date',
      _style: { width: '10%' },
      label: `${props?.t("Date")}`,
    },
    { key: 'deposit', _style: { width: '20%' }, label: `${props?.t("Deposit")}`, },
    { key: 'withdraw', _style: { width: '20%' }, label: `${props?.t("Withdrawal")}`, },
    { key: 'total', _style: { width: '20%' }, label: `${props?.t("ProfitLoss")}`, },
    // { key: 'profit_and_loss', _style: { width: '20%' }, label: 'profit_and_loss', },
    // 'total',
    // 'profit_and_loss',
    // { key: 'status', _style: { width: '20%' } },
    // {
    //   key: 'show_details',
    //   label: '',
    //   _style: { width: '1%' },
    //   filter: false,
    //   sorter: false,
    // },
  ]
  function getCheckNewMember(items: any) {
    const now = props?.Moment().format("YYYY-MM-DD");
    const lengthNew = items?.filter((item: any) => props?.Moment(item?.created_at).format("YYYY-MM-DD") == now);
    //console.log(lengthNew?.length)
    return lengthNew?.length
  }

  const footer = [
    `${props?.t("Total")}`,
    `${Intl.NumberFormat().format(props?.stateReport?.data?.totalDeposit || 0)}.-`,


    `${Intl.NumberFormat().format(props?.stateReport?.data?.totalWithdraw || 0)}.-`,
    `${Intl.NumberFormat().format(props?.stateReport?.data?.AllProfit_and_loss || 0)}.-`,
  ]
  const getBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }
  const toggleDetails = (index: number) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const showDetails = (params: any) => {
    //console.log(params)
  }

  let NewUser: any = 0
  //console.log(NewUser)
  return (
    <>
      <div className='row'>

        <CCardGroup className="mb-4 mt-4">
          <CWidgetStatsC
            icon={<CIcon icon={cilVerticalAlignBottom} height={36} />}
            value={`$ ${Intl.NumberFormat().format(props?.stateReport?.data?.totalDeposit || 0)}.-`}
            title={`${props?.t("Total deposits")} ( ${Intl.NumberFormat().format(props?.stateReport?.data?.length?.deposit || 0)} ${props?.t("items")} )`}
            progress={{ color: 'success', value: 100 }}
            style={{ fontWeight: "700", fontSize: "16px", color: "#51cc8a" }}
          />
          <CWidgetStatsC
            icon={<CIcon icon={cilVerticalAlignTop} height={36} />}
            value={`$ ${Intl.NumberFormat().format(props?.stateReport?.data?.totalWithdraw || 0)}.-`}
            title={`${props?.t("Total Withdrawal")} ( ${Intl.NumberFormat().format(props?.stateReport?.data?.length?.withdraw || 0)} ${props?.t("items")} )`}
            progress={{ color: 'danger', value: 100 }}
            style={{ fontWeight: "900", fontSize: "16px", color: "#ef376e" }}
          />
          <CWidgetStatsC
            icon={<CIcon icon={cilTransfer} height={36} />}
            value={`$ ${Intl.NumberFormat().format(props?.stateReport?.data?.AllProfit_and_loss || 0)}.-`}
            title={`${props?.t("Deposit-Withdrawal Summary")}`}
            onClick={() => showDetails(props?.stateReport?.data?.dataTransaction)}
            progress={{ color: `${props?.stateReport?.data?.AllProfit_and_loss >= 0 ? "success" : "danger"}`, value: 100 }}
            style={{ fontWeight: "700", fontSize: "16px", color: props?.stateReport?.data?.AllProfit_and_loss >= 0 ? "#51cc8a" : "#ef376e" }}
          />
          <CWidgetStatsC
            icon={<CIcon icon={cilUserFollow} height={36} />}
            value={`${NewUser < 0 ? 0 : Intl.NumberFormat().format(NewUser)} คน`}
            title={`${props?.t("newUserDepositToday")}`}
            style={{ fontWeight: "700", fontSize: "16px", cursor: "pointer" }}
            progress={{ color: 'primary', value: 100 }}
            onClick={(e) => showDetails(e)}
          />

        </CCardGroup>

      </div>
      <div data-v-22915f7f className="table-card__header anticon d-md-flex">
        <div data-v-22915f7f className="left ">
          <i data-v-22915f7f aria-label="icon: import" className="anticon anticon-import me-2">
            <svg
              viewBox="64 64 896 896"
              data-icon="import"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              focusable="false" >
              <path d="M888.3 757.4h-53.8c-4.2 0-7.7 3.5-7.7 7.7v61.8H197.1V197.1h629.8v61.8c0 4.2 3.5 7.7 7.7 7.7h53.8c4.2 0 7.7-3.4 7.7-7.7V158.7c0-17-13.7-30.7-30.7-30.7H158.7c-17 0-30.7 13.7-30.7 30.7v706.6c0 17 13.7 30.7 30.7 30.7h706.6c17 0 30.7-13.7 30.7-30.7V765.1c0-4.3-3.5-7.7-7.7-7.7zM902 476H588v-76c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-76h314c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
            </svg>
          </i>
          <label data-v-22915f7f className="anticon header-title">
            {props?.t("Deposit-Withdrawal Report")}
          </label>
        </div>
        <DownloadUtils t={props?.t} value={props?.stateReport?.data?.totalByDay} Moment={props?.Moment} type={"xlsx"} />
      </div>

      {/*  */}
      <CSmartTable
        // sorterValue={{ column: 'name', state: 'asc' }}
        clickableRows
        activePage={3}
        items={items}
        columns={columns}
        // columnFilter
        // tableFilter
        loading={props?.loadding}
        // cleaner
        itemsPerPageSelect
        itemsPerPage={10}
        // columnSorter
        footer={footer}
        pagination
        scopedColumns={{
          total: (item: Item) => (
            <td>
              <b className={`${item?.profit_and_loss >= 0 ? "text-success" : "text-danger"}`} style={{ fontWeight: "700", fontSize: "16px" }}>{Intl.NumberFormat().format(item?.profit_and_loss || 0)}</b>
            </td>
          ),
          deposit: (item: Item) => (
            <td>
              <span>{Intl.NumberFormat().format(item?.deposit || 0)}</span>
            </td>
          ),
          withdraw: (item: Item) => (
            <td>
              <span>{Intl.NumberFormat().format(item?.withdraw || 0)}</span>
            </td>
          ),

          profit_and_loss: (item: Item) => (
            <td>
              <b>{Intl.NumberFormat().format(item?.profit_and_loss || 0)}</b>
            </td>
          ),

        }}
        tableBodyProps={{
          className: 'align-middle text-truncate text-center  font-500',
        }}
        tableProps={{
          className: 'add-this-class text-truncate text-center',
          responsive: true,
          striped: false,
          hover: true,
          bordered: true,
          borderless: false,
        }}
      />

      {/*  */}



    </>
  )
}

export default SmartTableDownloadableExample
