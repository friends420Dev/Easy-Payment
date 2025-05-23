import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CBadge,
  CButton,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilListRich,
  cilBellExclamation,
  cilBell,
} from '@coreui/icons'
import { Tooltip, Divider } from "antd";
import { DataContext } from 'src/layout/DefaultLayout';
import config from 'src/config/app.config'
import { FormatTimeAgo } from 'src/helpers/formatTimeAgo';
import { UsergroupAddOutlined, CloseOutlined, SyncOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

const AppHeaderDropdownTasks = () => {
  const { t } = useTranslation("");
  const itemContext: any = useContext<any>(DataContext);
  let now = new Date()
  useEffect(() => {

  }, [itemContext, now]);

  const itemsCountPeddingWit = itemContext?.recordsPandingWithdraws;
  const itemsCountPeddingDep = itemContext?.nofPendingDep;
  const itemsCountNewMember = itemContext?.nofNewMember;
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  async function getCheckedRoleAdmin(role: any) {
    if (!role?.name) {
      setTimeout(() => {
        Toast?.fire({
          icon: "error",
          title: t(`ไม่สามารถทำรายการได้`),
        });
      }, 1500)
    }
    if (role?.name == "Owner" || role?.name == "Subowner") {
      window.location.assign('/#/members')
    } else {
      setTimeout(() => {
        Toast?.fire({
          icon: "error",
          title: t(`Role : ${role?.name} ดูข้อมูล Member ได้`),
        });
      }, 1500)

    }
  }
  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle caret={false}>
        <span className="d-inline-block my-1 mx-2 position-relative">
          <CIcon className={`${itemsCountPeddingWit > 0 || itemsCountPeddingDep > 0 ? 'bx-tada' : ''}`} size='lg' icon={cilBell} />
          <CBadge color="danger" position="top-end" shape="rounded-circle" className={`${itemsCountPeddingWit > 0 || itemsCountPeddingDep > 0 ? '' : 'd-none'} p-1`}>
            <span className="visually-hidden">{itemsCountPeddingWit} new alerts</span>
          </CBadge>
        </span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-body-secondary text-body-secondary fw-semibold rounded-top mb-2">
          {t('notifications')}
        </CDropdownHeader>
        <CDropdownItem className="d-block py-2" onClick={() => window.location.assign('/#/withdrawal/withdrawal_list')}>
          <div className="d-flex justify-content-between mb-1">
            <div className="small">{t('ถอนรอดำเนินการ', { counter: itemsCountPeddingWit })}</div>
          </div>
          <CProgress thin color="danger-gradient" value={itemsCountPeddingWit} />
        </CDropdownItem>
        <CDropdownItem className="d-block py-2" onClick={() => window.location.assign('/#/deposit/deposit_list')}>
          <div className="d-flex justify-content-between mb-1">
            <div className="small">{t('ฝากรอดำเนินการ', { counter: itemsCountPeddingDep })}</div>
          </div>
          <CProgress thin color="success-gradient" value={itemsCountPeddingDep} />
        </CDropdownItem>
        <CDropdownItem className="d-block py-2" onClick={() => getCheckedRoleAdmin(itemContext?.dataAdmin)}>
          <div className="d-flex justify-content-between mb-1">
            <div className="small"><UsergroupAddOutlined className='me-2 fs-16' />{t('สมาชิกใหม่', { counter: itemsCountNewMember })}</div>
          </div>
          <CProgress thin color="success-gradient" value={itemsCountNewMember} />
        </CDropdownItem>

        <div className="p-2 text-center mb-0">
          <Divider className='mb-2' />
          <small color="primary" className="w-100" style={{ color: "#888" }}>
            {t('version')} : {config?.version}
          </small>
        </div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownTasks
