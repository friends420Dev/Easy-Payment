import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilBellExclamation,
  cilBell,
  cilVolumeOff,
  cilUserFollow,
  cilVolumeHigh,
  cilArrowRight,
  cilArrowLeft,
  cilPlus
} from '@coreui/icons'
import Link from 'antd/es/typography/Link'
import { Tooltip } from "antd";


const useMuteNotificationToggle = () => {
  // Initialize mute state from localStorage
  const initialMuteState = localStorage.getItem("mute");
  const [isMuted, setIsMuted] = useState<boolean>(initialMuteState === "true");

  // Initialize notification state from localStorage
  const initialNotificationState = localStorage.getItem("showNotification");
  const [showNotification, setShowNotification] = useState<boolean>(initialNotificationState === "true");

  // Set default values in localStorage if they don't exist on mount
  useEffect(() => {
    if (localStorage.getItem("mute") === null) {
      localStorage.setItem("mute", "true");
    }
    if (localStorage.getItem("showNotification") === null) {
      localStorage.setItem("showNotification", "true");
    }
  }, []);

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem("mute", newMuteState.toString());
  };

  const toggleNotification = () => {
    const newNotificationState = !showNotification;
    setShowNotification(newNotificationState);
    localStorage.setItem("showNotification", newNotificationState.toString());
  };

  // Unified onChange handler (optional, if you prefer separate toggles)
  const onChange = (o: string): boolean => {
    if (o === "mute") {
      toggleMute();
      return true;
    }
    if (o === "notification") {
      toggleNotification();
      return true;
    }
    return false;
  };

  return { isMuted, toggleMute, showNotification, toggleNotification, onChange };
};
const AppHeaderDropdownNotif = () => {
  const { t } = useTranslation("");

  const { isMuted, toggleMute, showNotification, toggleNotification, onChange } = useMuteNotificationToggle();
  const itemsCount = 5
  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle caret={false}>
        
        <span className="d-flex  position-relative" style={{ alignItems: "center" }}>
          <Tooltip placement="topLeft" title={`${isMuted ? "Unmute" : "Mute"}`} >
            <CIcon className=' me-3' size='lg' icon={isMuted ? cilVolumeHigh : cilVolumeOff} onClick={() => onChange("mute")} />
          </Tooltip>
          <Tooltip className='' title={`การแจ้งเตือน : ${showNotification ? "เปิด" : "ปิด"}`}>
            <CIcon size='lg' icon={showNotification ? cilBell : cilBellExclamation} onClick={() => onChange("notification")} />
          </Tooltip>
        </span>
      </CDropdownToggle>

    </CDropdown>
  )
}

export default AppHeaderDropdownNotif
