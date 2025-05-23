import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    Space,
    Spin,
    Flex
} from 'antd';
import config from 'src/config/app.config';
import Swal from 'sweetalert2';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import type { FormProps } from 'antd';
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
type FieldType = {
    apiURL?: string;
    BotRunning?: any;
    active?: boolean;
    activeBot?: any;
};

const FormSettingBot = () => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const options = [
        {
            value: '5',
            label: 'ทุก 5 วินาที',
        },
        {
            value: '10',
            label: 'ทุก 10 วินาที',
        },
        {
            value: '20',
            label: 'ทุก 20 วินาที',
        },
        {
            value: '30',
            label: 'ทุก 30 วินาที',
        },
        {
            value: '40',
            label: 'ทุก 40 วินาที',
        },
        {
            value: '50',
            label: 'ทุก 50 วินาที',
        },
        {
            value: '60',
            label: 'ทุก 1 นาที',
        },
        {
            value: '120',
            label: 'ทุก 2 นาที',
        },
        {
            value: '180',
            label: 'ทุก 3 นาที',
        },
    ];
    const options2 = [
        {
            value: '1',
            label: 'เปิดใช้งาน 1 ตัว',
        },
        {
            value: '2',
            label: 'เปิดใช้งาน 2 ตัว',
        },
        {
            value: '3',
            label: 'เปิดใช้งาน 3 ตัว',
        },
        {
            value: '4',
            label: 'เปิดใช้งาน 4 ตัว',
        },
        {
            value: '5',
            label: 'เปิดใช้งาน 5 ตัว',
        },

    ];
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
      
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        let item = {
            apiURL: values.apiURL,
            BotRunning: parseInt(values.BotRunning),
            active: componentDisabled,
            activeBot: parseInt(values.activeBot),
        };

        if (item.active && item.apiURL && item.BotRunning && item.activeBot) {
            setLoading(true);
            console.log(item);
            setTimeout(() => {
                Toast.fire({
                    icon: "success",
                    title: "เปิดใช้งานบอทสำเร็จ",
                });
                setLoading(false);
            }, 1900);
        }
        
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Spin spinning={loading} tip="Loading...">
                <Checkbox
                    name={"active"}
                    className='d-flex'
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                >
                    Active
                </Checkbox>
                <Flex justify='flex-start'>

                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        layout="horizontal"
                        disabled={!componentDisabled}
                        style={{ maxWidth: "100%" }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ FtechURL: true }}
                        autoComplete="off"
                    >

                        <Form.Item<FieldType>
                            label="apiURL*"
                            name={"apiURL"}
                            rules={[{ required: true, message: 'Please input your apiURL!' }]}>
                            <TextArea defaultValue={config?.apiURL} rows={2} cols={60} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name={"BotRunning"}
                            label="BotRunning">
                            <Select defaultValue="1 นาที" options={options} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name={"activeBot"}
                            label="เลือกจำนวน Bot ที่ต้องการใช้งาน">
                            <Select defaultValue="เปิดใช้งาน 1 ตัว" options={options2} />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Run
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Spin>
        </>
    );
};

export default () => <FormSettingBot />;