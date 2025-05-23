import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  CAvatar,
  CCloseButton,
  CFormSwitch,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CListGroup,
  CListGroupItem,
  CProgress,
  CSidebar,
  CSidebarHeader,
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import config from 'src/config/app.config';
import { cilSettings, cibAndroidAlt } from '@coreui/icons';
import { Divider } from "antd";
import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';
import avatar3 from 'src/assets/images/avatars/3.jpg';
import avatar4 from 'src/assets/images/avatars/4.jpg';
import avatar5 from 'src/assets/images/avatars/5.jpg';
import avatar6 from 'src/assets/images/avatars/6.jpg';
import avatar7 from 'src/assets/images/avatars/7.jpg';
import avatar8 from 'src/assets/images/avatars/8.jpg';
import { Input, Radio, Tooltip, Flex } from 'antd';
import type { TooltipProps } from 'antd';
import type { State } from './../store';
import type { InputNumberProps } from 'antd';
import { Col, InputNumber, Row, Slider, Alert } from 'antd';
import BotSetting from './BotSetting';
import { AndroidOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import formSettingBot from './formSetupBot/formSettingBot';

interface UseMuteNotificationToggleResult {
  isMuted: boolean;
  showNotification: boolean;
  onChange: (o: string) => boolean;
  minAmount: string;
  handleMoreRadioChange: (event: any) => void;
  handleMoreRadioInputChange: (event: any) => void;
  customMinAmount: string;
  showCustomInput: boolean;
  statusBot: boolean;
}

const useMuteNotificationToggle = (): UseMuteNotificationToggleResult => {
  const initialMuteState = localStorage.getItem("mute");
  const initialStatusBot = localStorage.getItem("statusBot");
  const [isMuted, setIsMuted] = useState<boolean>(initialMuteState === "true");
  const [statusBot, setStatusBot] = useState<boolean>(initialStatusBot === "true");
  const initialNotificationState = localStorage.getItem("showNotification");
  const initialCustomMinAmount: any = localStorage.getItem("customMinAmount");
  const initialMinAmountState = localStorage.getItem("minAmount") || "2000";
  const [showNotification, setShowNotification] = useState<boolean>(initialNotificationState === "true");
  const [minAmount, setMinAmount] = useState<string>(initialMinAmountState);
  const [customMinAmount, setCustomMinAmount] = useState<string>(localStorage.getItem("customMinAmount") || "");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(initialMinAmountState === "4");

  useEffect(() => {
    if (localStorage.getItem("mute") === null) {
      localStorage.setItem("mute", "true");
    }
    if (localStorage.getItem("showNotification") === null) {
      localStorage.setItem("showNotification", "true");
    }
    if (localStorage.getItem("minAmount") === null) {
      localStorage.setItem("minAmount", "2000");
    }
    if (localStorage.getItem("botOperation") === null) {
      localStorage.setItem("botOperation", "true");
    }
    if (localStorage.getItem("minAmount") === "4" && localStorage.getItem("customMinAmount")) {
      setShowCustomInput(true);
    }
  }, [initialCustomMinAmount, initialStatusBot, initialNotificationState, initialMuteState]);

  useEffect(() => {
    if (minAmount === "4") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
  }, [minAmount]);

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

  const handleMoreRadioInputChange = (event: any) => {
    setCustomMinAmount(event.target.value);
    localStorage.setItem("customMinAmount", event.target.value);
    localStorage.setItem("minAmount", event.target.value);

    onChange(event.target.value);
  };

  const handleMoreRadioChange = (event: any) => {
    setMinAmount(event.target.value);
    localStorage.setItem("minAmount", event.target.value);
    if (event.target.value !== "4") {
      setShowCustomInput(false);
    } else {
      setShowCustomInput(true);
    }
    if (event.target.value !== "4") {
      localStorage.removeItem("customMinAmount");
      setCustomMinAmount(""); // Clear custom amount when "กำหนดเอง..." is not selected
    }
  };

  const onChange = (o: string): boolean => {
    if (o === "mute") {
      toggleMute();
      return true;
    }
    if (o === "notification") {
      toggleNotification();
      return true;
    }

    if (!isNaN(parseInt(o)) && showCustomInput) {
      localStorage.setItem("customMinAmount", o);
      localStorage.setItem("minAmount", o);
      return true;
    }
    return false;
  };

  return { isMuted, showNotification, onChange, minAmount, handleMoreRadioChange, handleMoreRadioInputChange, customMinAmount, showCustomInput, statusBot };
};

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(1);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};


const AppAside: React.FC = () => {
  const dispatch = useDispatch();
  const asideShow = useSelector((state: State) => state.asideShow);
  const { t } = useTranslation();

  const [activeKey, setActiveKey] = useState(3);
  const { isMuted, showNotification, onChange, minAmount, handleMoreRadioChange, handleMoreRadioInputChange, customMinAmount, showCustomInput, statusBot } = useMuteNotificationToggle();
  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    cursor: "pointer"
  };

  function handleBotSetting() {

    return <>
      <Alert message="Notes: กำลังพัฒนาระบบ..." type="info" showIcon />
      <br />
      <BotSetting />
    </>;
  }
  function handleBotOperation() {

    return <>
      <Alert message="Notes: กำลังพัฒนาระบบ..." type="info" showIcon />
      <br />
    </>;
  }
  return (
    <CSidebar
      className="border-start"
      colorScheme="light"
      size="lg"
      overlaid
      placement="end"
      visible={asideShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', asideShow: visible });
      }}
    >
      <CSidebarHeader className="p-0 position-relative">
        <CNav className="w-100" variant="underline-border">
          <CNavItem>

            <Tooltip placement="topLeft" title={"ตั้งค่าแจ้งเตือน"} >
              <CNavLink
                href="#"
                active={activeKey === 3}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveKey(3);
                }}
              >
                <CIcon icon={cilSettings} />
              </CNavLink>
            </Tooltip>
          </CNavItem>
          <CNavItem>
            <Tooltip placement="topLeft" title={"ตั้งค่าบอทถอน"} >
              <CNavLink
                href="#"
                active={activeKey === 4}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveKey(4);
                }}
              >
                <CIcon icon={cibAndroidAlt} />
              </CNavLink>
            </Tooltip>
          </CNavItem>
        </CNav>
        <CCloseButton
          className="position-absolute top-50 end-0 translate-middle my-0"
          onClick={() => dispatch({ type: 'set', asideShow: false })}
        />
      </CSidebarHeader>
      <CTabContent>
        <CTabPane className="p-3" visible={activeKey === 3}>
          <h6>{t('settings')}</h6>
          <div>
            <div className="clearfix mt-4">
              <CFormSwitch size="lg" onChange={() => onChange("notification")} label="การแจ้งเตือน" id="notification" defaultChecked={showNotification} />
            </div>
            <div>
              <small className="text-body-secondary">
                <Radio.Group
                  className="mt-3"
                  style={style}
                  onChange={handleMoreRadioChange}
                  value={minAmount}
                  disabled={!showNotification}
                  name="minAmount"
                  options={[
                    { value: "2000", label: 'แจ้งเตือนเมื่อยอดเงิน < 2,000.-' },
                    { value: "1500", label: 'แจ้งเตือนเมื่อยอดเงิน < 1,500.-' },
                    { value: "1000", label: 'แจ้งเตือนเมื่อยอดเงิน < 1,000.-' },
                    { value: "500", label: 'แจ้งเตือนเมื่อยอดเงิน < 500.-' },
                    { value: customMinAmount, label: `แจ้งเตือนเมื่อยอดเงิน < ${customMinAmount}.-`, style: { display: `${!customMinAmount ? 'none' : ''}` } },
                    {
                      value: "4",
                      label: (
                        <>
                          กำหนดเอง...
                          {showCustomInput && (
                            <Input
                              variant="filled"
                              type="number"
                              disabled={!showNotification}
                              onChange={(e) => handleMoreRadioInputChange(e)}
                              value={customMinAmount}
                              placeholder="จำนวนเงินที่ต้องการ"
                              style={{ width: 160, marginInlineStart: 12 }}
                            />
                          )}
                        </>
                      ),
                    },
                  ]}
                />
              </small>
            </div>
          </div>
          <div>
            <div className="clearfix mt-3">
              <CFormSwitch size="lg" disabled={!showNotification} defaultChecked={isMuted} onChange={() => onChange("mute")} label="เสียงแจ้งเตือน" id="mute" />
            </div>
          </div>
        </CTabPane>
        <CTabPane className="p-3" visible={activeKey === 4}>
          <Tabs
            defaultActiveKey="2"
            items={[SettingOutlined, AndroidOutlined].map((Icon, i) => {
              const id = String(i + 1);
              return {
                key: id,
                label: `${id === '1' ? "Bot Setting" : "Bot Operation"}`,
                children: id === '1' ? handleBotSetting() : handleBotOperation(),
                icon: <Icon />,
              };
            })}
          />
          <div className="clearfix mt-2"></div>
        </CTabPane>
        <Divider orientation="center" children={<small>{`${t("version")} : ${config?.version}`}</small>} plain />
      </CTabContent>
    </CSidebar>
  );
};

export default AppAside;