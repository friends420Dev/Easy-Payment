import { SettingOutlined, SmileOutlined, FilterOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
type PropsPicker = {
    t: any
    fetchDatePicker: any
    startDate:any
    endDate:any
}
const smileIcon = <SmileOutlined />;
const Filter = <FilterOutlined style={{color:"#888", display:"inline-block"}}  />;
const { RangePicker } = DatePicker;

const PickerDate = ({ t, fetchDatePicker, endDate, startDate }: PropsPicker) => {
    const onChange = (date: Dayjs | (Dayjs | null)[] | null, dateString: string | string[]) => {
        let startDate = dateString[0];
        let endDate = dateString[1];
        let datePicker = {
            startDate: startDate,
            endDate: endDate,
        }
        if (datePicker?.startDate && datePicker?.startDate) {
            fetchDatePicker(datePicker);
            return
        }
    };
    const dateFormat = 'YYYY-MM-DD';
    return (<>
        {/* <FilterOutlined style={{ display: "inline-flex" }} /> */}
        <RangePicker readOnly disabled className='mb-3' defaultValue={[dayjs(startDate, dateFormat), dayjs(startDate, dateFormat)]} prefix={<>{Filter}</>}  onChange={onChange} />
    </>);
}

export default PickerDate;