import * as XLSX from 'xlsx'
import _dataDep from './smart-table/_dataDep'
import _dataWit from './smart-table/_dataWit'
type Props = {
    value?:any
    Moment?:any
    type?:any
    t?:any
}


export const DownloadUtils = ({ value, Moment, type, t }: Props) => {
    function downloadExcel(data: any[], fileName: string) {
        // สร้าง worksheet จากข้อมูล
        const worksheet = XLSX.utils.json_to_sheet(data);

        // สร้าง workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // สร้างไฟล์ Excel เป็น Blob
        const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        const blob = new Blob([s2ab(excelFile)], { type: 'application/octet-stream' });

        // สร้าง link เพื่อดาวน์โหลด
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName + '.' + type;
        link.click();
    }
    // ฟังก์ชันแปลง string เป็น ArrayBuffer
    function s2ab(s: string) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    // console.log(value)
   
    return (
        <>


            <div data-v-22915f7f className="right anticon">
                <div className="right anticon d-flex" style={{ justifyContent: "flex-end" }}>
                    <button className="btn btn-primary d-lg-inline-block my-2 my-md-0 ms-md-3"
                        style={{ color: "#fff" }}
                        onClick={() => downloadExcel(value, `ExportFile_${Moment().format("yyyy-MM-DD")}`)}
                        disabled={value?.length <= 0 ? true : false}
                    >

                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="icon me-lg-2"
                            role="img"
                            aria-hidden="true">
                            <polygon
                                fill="var(--ci-primary-color, currentColor)"
                                points="272 434.744 272 209.176 240 209.176 240 434.744 188.118 382.862 165.49 405.489 256 496 346.51 405.489 323.882 382.862 272 434.744" className="ci-primary" />
                            <path fill="var(--ci-primary-color, currentColor)"
                                d="M400,161.176c0-79.4-64.6-144-144-144s-144,64.6-144,144a96,96,0,0,0,0,192h80v-32H112a64,64,0,0,1,0-128h32v-32a112,112,0,0,1,224,0v32h32a64,64,0,0,1,0,128H320v32h80a96,96,0,0,0,0-192Z"
                                className="ci-primary" />
                        </svg>
                        <span className="d-none d-lg-inline-block">{t("Download")}</span>
                    </button>

                </div>
            </div>

        </>
    );
}