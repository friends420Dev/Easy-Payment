import { useState, useEffect, useReducer } from 'react';
import usersData from './data'
import Apiauth from 'src/api/Apiauth';

const Addpermission = () => {
    const [data, setData]: any = useState<any>({
        // ... ข้อมูลเริ่มต้น
    });

    useEffect(() => {
        usersData.getRole()
            .then(res => setStateRole({ data: res.data }))
            .catch(error => console.error(error));
    }, []);

    const [stateRole, setStateRole] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
        data: [],
    })
    const handleCheckboxChange = (event: any, data: any) => {
        // เรียกใช้ฟังก์ชันที่สร้างไว้ข้างต้น
        handleCheckboxChange(event, data);
        setData({ ...data }); // อัปเดตค่าของ data
    };
    console.log(stateRole?.data?.data?.length);
    function MainContainer(params: any) {
        console.log(params)

        return <>

            {/* {params?.length > 0 &&
                params?.map((item: any, id: any) => {
                    return <input
                        type="checkbox"
                        value={item.id}
                        checked={data.permission.includes(item.id)}
                        onChange={(e) => handleCheckboxChange(e, item)}
                    />
                })} */}
        </>
    }
    return (
        <div>
            {/* ... */}
            {MainContainer(stateRole?.data?.data)}


            {/* ... */}
        </div>
    );
}

export default Addpermission;