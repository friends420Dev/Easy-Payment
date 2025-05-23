import React, { useState, useRef, useEffect } from 'react';
import { Alert, Upload, message, Spin, Select, Button, Divider, Flex, Radio, Space, Tooltip, Form, Input, notification, Empty, Result } from 'antd'
import { LogoutOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import config from 'src/config/app.config';
interface SelectOption {
    accountNumber: string;
    accountName: string;
    accountType: string;
    balance: string;
    bank: Bank[] | string;
    value: string;
}
interface Bank {
    imageUrl: string;
    bank_id: string;
}
interface ImageSelectProps {
    options: SelectOption[];
    value: string;
    setIsOpen: any;
    isOpen: any;
    handleSelectChange: any;
    t: any
    statusResult: any
}

const ImageSelectFromBankaccount: React.FC<ImageSelectProps> = ({ options, value, handleSelectChange, t, isOpen, setIsOpen, statusResult }) => {
    const selectRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef?.current && !selectRef?.current.contains(event?.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectRef]);
    const selectedOption: any = options?.find((option: any) => option?.banks?.bank_id === value);
    return (
        <div ref={selectRef} className="image-select form-floating" style={{ position: 'relative' }}>
            <button
                disabled={statusResult}
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className="form-select"
                style={{ display: 'flex' }}
            >
                {selectedOption ? (
                    <>
                        <span
                            className='me-2'
                            style={{
                                color: `#888`,
                                fontWeight: "700"
                            }}>
                        </span>
                        <img src={selectedOption?.banks?.imageUrl} alt={selectedOption?.banks?.bank_id} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        <span>{t(selectedOption?.banks?.bank_id)}</span>
                    </>
                ) : (
                    <span>{t("Select")}</span>
                )}
                {/* <span>{isOpen ? '▲' : '▼'}</span> */}
            </button>
            <label className="form-label" htmlFor="FormAccountNumber">{t("Bank Account")}</label>
            {isOpen && (
                <ul
                    id='FormAccountNumber'
                    className="select-dropdown "
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        // listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        zIndex: 10,
                        overflowX: "auto",
                        maxHeight: "350px",
                    }}
                >
                    {/* <hr /> */}
                    <p></p>
                    {options?.length > 0 ? options?.map((option: any, index: any) => {
                        return <>
                            {option?.banks?.bank_id != "PayoneX" && <>
                                <div   title="prompt text" children={<>
                                    <li
                                        key={index}
                                        id={option?.banks?.bank_id}
                                        onClick={(e) => handleSelectChange(e)} 
                                        className="hover-color"
                                        style={{
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            fontWeight: "600",
                                            backgroundColor: option?.banks?.bank_id === value ? '#9e9e9e5c' : 'transparent',
                                        }}
                                    >
                                        <span
                                            id='main-data-accForm'
                                            className='me-2'
                                            style={{
                                                color: `#252b36b0`,
                                                fontWeight: "700",

                                            }}>
                                            <img src={option?.banks?.imageUrl} alt={option?.banks?.bank_id} style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                            <>{t(option?.banks?.bank_id)}</>
                                        </span>
                                    </li>
                                </>} />


                            </>}

                        </>
                    }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    <Divider plain className='' ><span style={{ color: "#888" }}>{t("version")} : {config.version}</span></Divider>
                </ul>
            )
            }
        </div >
    );
};
export default ImageSelectFromBankaccount;
