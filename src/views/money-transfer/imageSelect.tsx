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
    onChange: any;
    t: any
    statusResult: any
}

const ImageSelectFromBankaccount: React.FC<ImageSelectProps> = ({ options, value, onChange, t, isOpen, setIsOpen, statusResult }) => {
    const selectRef = useRef<HTMLDivElement>(null);
    function hideLastName(fullName: any) {
        let formatName: any = removeTitle(fullName)
        const names: any = formatName?.split(' ');
        if (names.length >= 2) {
            const firstName: any = names[0];
            const firstName2: any = names[1];
            const lastName: any = names[2];
            return firstName == "" ? firstName2 + " " + '****' : firstName + " " + '****';
        } else {
            return formatName;
        }
    }
    function removeTitle(fullName: any) {
        //console.log(fullName?.slice(3))
        if (fullName?.startsWith('นาย ')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('นาย')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('นางสาว')) {
            return fullName?.slice(6);
        } else if (fullName?.startsWith('นาง ')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('น.ส.')) {
            return fullName?.slice(4);
        } else if (fullName?.startsWith('น.ส. ')) {
            return fullName?.slice(4);
        } else {
            return fullName;
        }
    }
    function formatAccnumID(numberAcc: any) {
        //console.log(numberAcc)
        if (numberAcc?.length < 9) {
            return `xxx ${numberAcc}`;
        }
        let length: any = numberAcc?.length;
        const middleFour: any = numberAcc?.slice(6, length);
        return `xxx ${middleFour} `;
    }
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
    const selectedOption: any = options?.find((option: any) => option?.id === value);
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
                                color: `${selectedOption?.accountType == "withdrawal" ? 'rgb(224, 6, 6)' : selectedOption?.accountType == "deposit" ? 'rgb(82, 196, 26)' : '#888'}`,
                                fontWeight: "700"
                            }}>
                            {`[ ${t(selectedOption?.accountType)} ]`}
                        </span> <b className='me-2'>{" - "}</b> <img src={selectedOption?.bank?.imageUrl} alt={selectedOption?.accountName} style={{ width: '20px', height: '20px', marginRight: '8px' }} />

                        <span>{formatAccnumID(selectedOption?.accountNumber)}, {hideLastName(selectedOption?.accountName)}</span>
                    </>
                ) : (
                    <span>{t("Select")}</span>
                )}
                {/* <span>{isOpen ? '▲' : '▼'}</span> */}
            </button>
            <label className="form-label" htmlFor="FormAccountNumber">{t("Form Bank Account")}</label>
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
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        zIndex: 1000,
                        overflowX: "auto",
                        maxHeight: "350px",
                    }}
                >
                    <p></p>
                    {options?.length > 0 ? (
                        options.map((option: any, index: any) => {
                            if (option?.accountType === "deposit" || option?.accountType === "withdrawal") {
                                if (option?.channel !== "PayoneX" && option?.channel !== "Wealth" && (option?.status_bank === "Active" || option?.status_bank === "Inactive")) {
                                    return (
                                        <li
                                            key={index}
                                            id={index}
                                            onClick={(e) => {
                                                onChange(e, option);
                                            }}
                                            className="hover-color"
                                            style={{
                                                padding: '8px 12px',
                                                display: 'flex-block',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                fontWeight: "600",
                                                backgroundColor: option?.id === value ? '#9e9e9e5c' : 'transparent',
                                            }}
                                        >
                                            <span
                                                id='main-data-accForm'
                                                className='me-2'
                                                style={{
                                                    color:
                                                        option?.accountType === "withdrawal"
                                                            ? 'rgb(224, 6, 6)'
                                                            : option?.accountType === "deposit"
                                                                ? 'rgb(82, 196, 26)'
                                                                : '#888',
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {`[ ${t(option?.accountType)} ]`}
                                            </span>
                                            <b className='me-2'>{" - "}</b>
                                            <img
                                                src={option?.bank?.imageUrl}
                                                alt={option?.accountName}
                                                style={{ width: '30px', height: '30px', marginRight: '8px' }}
                                            />
                                            <span>{formatAccnumID(option?.accountNumber)}, {hideLastName(option?.accountName)}</span>
                                        </li>
                                    );
                                }
                            }
                            return null; // Render nothing if conditions are not met
                        })
                    ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                    <Divider plain className='' ><span style={{ color: "#888" }}>{t("version")} : {config.version}</span></Divider>
                </ul>
            )
            }
        </div >
    );
};
export default ImageSelectFromBankaccount;


// 
interface TypeOption {
    accountNumber: string;
    accountName: string;
    accountType: string;
    balance: string;
    bank: TypeBank[] | string;
    value: string;
}
interface TypeBank {
    imageUrl: string;
    bank_id: string;
}
interface TypeImageSelect {
    options: TypeOption[];
    value: string;
    setIsOpen: any;
    isOpen: any;
    onChange: any;
    t: any;
    postData: any;
    statusResult: any
}
export const ImageSelectToBankaccount: React.FC<TypeImageSelect> = ({ options, value, onChange, t, isOpen, setIsOpen, postData, statusResult }) => {
    const selectRef = useRef<HTMLDivElement>(null);
    function hideLastName(fullName: any) {
        let formatName: any = removeTitle(fullName)
        const names: any = formatName?.split(' ');
        if (names.length >= 2) {
            const firstName: any = names[0];
            const firstName2: any = names[1];
            const lastName: any = names[2];
            return firstName == "" ? firstName2 + " " + '****' : firstName + " " + '****';
        } else {
            return formatName;
        }
    }
    function removeTitle(fullName: any) {
        //console.log(fullName?.slice(3))
        if (fullName?.startsWith('นาย ')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('นาย')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('นางสาว')) {
            return fullName?.slice(6);
        } else if (fullName?.startsWith('นาง ')) {
            return fullName?.slice(3);
        } else if (fullName?.startsWith('น.ส.')) {
            return fullName?.slice(4);
        } else if (fullName?.startsWith('น.ส. ')) {
            return fullName?.slice(4);
        } else {
            return fullName;
        }
    }
    function formatAccnumID(numberAcc: any) {
        //console.log(numberAcc)
        if (numberAcc?.length < 9) {
            return `xxx ${numberAcc}`;
        }

        let length: any = numberAcc?.length;

        const middleFour: any = numberAcc?.slice(6, length);

        return `xxx ${middleFour} `;
    }
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
    const selectedOption: any = options?.find((option: any) => option?.id === value);
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
                                color: `${selectedOption?.accountType == "withdrawal" ? 'rgb(224, 6, 6)' : selectedOption?.accountType == "deposit" ? 'rgb(82, 196, 26)' : '#888'}`,
                                fontWeight: "700"
                            }}>
                            {`[ ${t(selectedOption?.accountType)} ]`}
                        </span> <b className='me-2'>{" - "}</b> <img src={selectedOption?.bank?.imageUrl} alt={selectedOption?.accountName} style={{ width: '20px', height: '20px', marginRight: '8px' }} />

                        <span>{formatAccnumID(selectedOption?.accountNumber)}, {hideLastName(selectedOption?.accountName)}</span>
                    </>
                ) : (
                    <span>{t("Select")}</span>
                )}
                {/* <span>{isOpen ? '▲' : '▼'}</span> */}
            </button>
            <label className="form-label" htmlFor="FormAccountNumber">{t("To Bank Account")}</label>

            {isOpen && (
                <ul
                    className="select-dropdown "
                    id='ToAccount'
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        zIndex: 1000,
                        overflowX: "auto",
                        maxHeight: "350px",
                    }}
                >
                    <p></p>
                    {options?.length > 0 ? (
                        options.map((option: any, index: any) => {
                            const isDepositOrWithdrawal = option?.accountType === 'deposit' || option?.accountType === 'withdrawal';
                            const isNotGateWay = option?.channel !== 'PayoneX' && option?.channel !== 'Wealth';
                            const isActiveOrInactive = option?.status_bank === 'Active' || option?.status_bank === 'Inactive';

                            if (isDepositOrWithdrawal && isNotGateWay && isActiveOrInactive) {
                                return (
                                    <li
                                        key={option.id || index} // Use option.id if available, otherwise fallback to index
                                        id={option.id || index}
                                        onClick={(e) => {
                                            onChange(e, option);
                                        }}
                                        className="hover-color"
                                        style={{
                                            padding: '8px 12px',
                                            display: 'flex', // Changed to flex for better alignment
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            backgroundColor: option?.id === value ? '#9e9e9e5c' : 'transparent',
                                        }}
                                    >
                                        <span
                                            id="main-data-accForm"
                                            className="me-2"
                                            style={{
                                                color:
                                                    option?.accountType === 'withdrawal'
                                                        ? 'rgb(224, 6, 6)'
                                                        : option?.accountType === 'deposit'
                                                            ? 'rgb(82, 196, 26)'
                                                            : '#888',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {`[ ${t(option?.accountType)} ]`}
                                        </span>
                                        <b className="me-2"> - </b>
                                        {option?.bank?.imageUrl && (
                                            <img
                                                src={option.bank.imageUrl}
                                                alt={option.accountName}
                                                style={{ width: '30px', height: '30px', marginRight: '8px' }}
                                            />
                                        )}
                                        <span>
                                            {formatAccnumID(option?.accountNumber)}, {hideLastName(option?.accountName)}
                                        </span>
                                    </li>
                                );
                            }
                            return null; 
                        })
                    ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                    <Divider plain className='' ><span style={{ color: "#888" }}>{t("version")} : {config.version}</span></Divider>
                </ul>
            )
            }
        </div >
    );
}