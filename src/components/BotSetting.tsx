import React, { useEffect, useState } from 'react';
import { cilSettings, cibAndroidAlt } from '@coreui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    CFormSwitch,
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import config from 'src/config/app.config';
import { Divider } from "antd";
import formSettingBot from './formSetupBot/formSettingBot';
interface TypeBot {
    onChange: (o: string) => boolean;
    statusBot: boolean;
}
const BotSetting = () => {
    const initialStatusBot: any = localStorage.getItem("botOperation");
    const [statusBot, setStatusBot] = useState<boolean>(initialStatusBot === "true");
    const [minute, setMinute] = useState(1);
    const [botRunning, setBotRunning] = useState(false);

    async function onChangeStatusBot(event: any) {

        try {
            if (event) {
                console.log("Bot Running");
                setBotRunning(true);
                setTimeout(async () => {
                    await botOperationAPI()
                }, 1000)
            } else {
                setBotRunning(false);
            }
        } catch (error) {
            console.log(error)
        }
    };
    let updateInterval: NodeJS.Timeout | null = null; // เปลี่ยนเป็น NodeJS.Timeout
    async function startBot() {
        if (!updateInterval) {
            updateInterval = setInterval(async () => {
                await getBot();
            }, minute * 60 * 1000); // 3 นาที = 3 * 60 * 1000 มิลลิวินาที
        }
    }
    async function stopBot() {
        console.log("Bot stop.");
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }
    async function getBot() {
        setTimeout(async () => {
            await botOperationAPI()
            await startBot();
        }, 1000)
    }
    useEffect(() => {
        if (botRunning) {
            startBot();
        }
        return () => {
            stopBot();
        };
    }, [botRunning, initialStatusBot]);
    async function botOperationAPI(): Promise<void> {
        try {
            console.log(`บอททำงาน`);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการทำงานของบอท:', error);
        }
    }
    const toggleBot = () => {
        const newStateBot = !statusBot;
        setStatusBot(newStateBot);
        onChangeStatusBot(newStateBot);
        localStorage.setItem("botOperation", newStateBot.toString());
    };
    const onChange = (o: string): boolean => {
        if (o === "statusBot") {
            toggleBot();
            return true;
        }
        return false;
    };
    return (
        <div className="flex flex-col gap-2">
            {/* <h6 className='mb-3'>{'Bot Setting'}</h6> */}
            {/* <CFormSwitch size="lg" style={{ color: `${statusBot ? 'green' : 'red'}` }} checked={statusBot} onChange={() => onChange("statusBot")} label={statusBot ? <span style={{ color: `green` }}>{"เปิดใช้งานบอท"}</span> : <span style={{ color: `red` }}>{"ปิดใช้งานบอท"}</span>} id="mute" /> */}
            {formSettingBot()}
        </div>
    )
}

export default BotSetting;