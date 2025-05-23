import React, { useState } from 'react'
import { CBadge, CButton, CCardBody, CCollapse, CSmartTable, CFormSelect } from '@coreui/react-pro'

import type { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { DownloadUtils } from '../downloadUtils'
import CIcon from '@coreui/icons-react'
import {
  cilChartLine, cilViewModule
} from '@coreui/icons'
interface ResultItem {
  id?: number;
  totalBalance?: any;
  withdraw?: any;
  deposit?: any
}
type Props = {
  Moment?: any
  t?: any
  loadding?: boolean
  stateReport?: any
  startDate?: any
  endDate?: any
}
const SmartTableBasicExample = (props: Props) => {
  //console.log(props?.stateReport?.data)
  const [details, setDetails] = useState<number[]>([])
  const item: any[] = props?.stateReport?.data
  //console.log(item)
  function calculateTotal(data: any) {
    let totalDeposit = 0;
    let totalWithdraw = 0;

    data.forEach((item: any) => {
      totalDeposit += item.data.deposit;
      totalWithdraw += item.data.withdraw;
    });

    return {
      totalDeposit,
      totalWithdraw,
      totalBalance: totalDeposit - totalWithdraw
    };
  }
  const result: any = calculateTotal(item);
  //console.log(result)


  const columns = [
    {
      key: 'Date',
      _style: { width: '10%' },
      label: `${props?.t("Date")}`,
    },
    { key: 'deposit', _style: { width: '20%' }, label: `${props?.t("Deposit")}`, },
    { key: 'withdraw', _style: { width: '20%' }, label: `${props?.t("Withdrawal")}`, },
    { key: 'total', _style: { width: '20%' }, label: `${props?.t("ProfitLoss")}`, },
  ]
  const footer = [

    { _style: { fontWeight: '700' }, _props: { color: `${result?.totalBalance > 0 && 'success' || result?.totalBalance < 0 && 'danger' || result?.totalBalance == 0 && 'warning'}`, align: 'middle' }, label: `${props?.t("Total")}`, },
    { _props: { color: `${result?.totalBalance > 0 && 'success' || result?.totalBalance < 0 && 'danger' || result?.totalBalance == 0 && 'warning'}`, align: 'middle' }, label: `${Intl.NumberFormat().format(result?.totalDeposit || 0)}.-`, },
    { _props: { color: `${result?.totalBalance > 0 && 'success' || result?.totalBalance < 0 && 'danger' || result?.totalBalance == 0 && 'warning'}`, align: 'middle' }, label: `${Intl.NumberFormat().format(result?.totalWithdraw || 0)}.-`, },
    { _props: { color: `${result?.totalBalance > 0 && 'success' || result?.totalBalance < 0 && 'danger' || result?.totalBalance == 0 && 'warning'}`, align: 'middle' }, label: `${Intl.NumberFormat().format(result?.totalBalance || 0)}.-`, },

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
  //const result2: ResultItem[] = [result];
  // let d: ResultItem[] = [...result2, ...props?.stateReport?.data];
  let d: ResultItem[] = [...props?.stateReport?.data];
  return (
    <div>
      <div className="table-card__header  d-md-flex" style={{ alignItems: "center" }}>
        <div className="left ">

          <label className="anticon header-title">
            <b><CIcon className='anticon' icon={cilViewModule} /> {props?.t("Deposit-Withdrawal Report", { startDate: props?.startDate, endDate: props?.endDate})}</b>
          </label>
        </div>
        <DownloadUtils t={props?.t} value={d} Moment={props?.Moment} type={"xlsx"} />
      </div>
      <CSmartTable
        sorterValue={{ column: 'name', state: 'asc' }}
        clickableRows
        loading={props?.loadding}
        footer={footer}
        items={item}
        columns={columns}
        // columnFilter
        // tableFilter
        // cleaner
        itemsPerPageSelect
        itemsPerPage={50}
        columnSorter={false}
        pagination
        scopedColumns={{
          total: (item: Item) => (
            <td>
              <b className={`${item?.data?.total >= 0 ? "text-success" : "text-danger"}`} style={{ fontWeight: "700", fontSize: "16px" }}>{Intl.NumberFormat().format(item?.data?.total || 0)}.-</b>
            </td>
          ),
          Date: (item: Item) => (
            // (console.log(item))
            <td>
              <b style={{ fontWeight: "700", fontSize: "16px" }}>{item?.data?.label}</b>
            </td>
          ),
          deposit: (item: Item) => (
            <td>
              <span>{Intl.NumberFormat().format(item?.data?.deposit || 0)}.-</span>
            </td>
          ),
          withdraw: (item: Item) => (
            <td>
              <span>{Intl.NumberFormat().format(item?.data?.withdraw || 0)}.-</span>
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

    </div>
  )
}

export default SmartTableBasicExample
