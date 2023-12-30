import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import Popup from '../../components/Popup/Popup'

import './reports.css'

const ReportsManage = () => {
    const [listReports, setList] = useState([
        { key: 1, address: '227 Đ. Nguyễn Văn Cừ, P4, Quận 5', rp_person: 'Nguyễn Trung Hiếu', rp_time: '30/12/2023' , advertising_type: 'Cổ động chính trị 1'},
        { key: 2, address: '227 Đ. Nguyễn Văn Cừ, P4, Quận 5', rp_person: 'Nguyễn Trung Hiếu', rp_time: '30/12/2023' , advertising_type: 'Cổ động chính trị 2'},
        { key: 3, address: '227 Đ. Nguyễn Văn Cừ, P4, Quận 5', rp_person: 'Nguyễn Trung Hiếu', rp_time: '30/12/2023' , advertising_type: 'Cổ động chính trị 3'},
    ]);
    const [dataRow, setDataRow] = useState();
    const [isOpen, setOpen] = useState(false);

    const handleRowClick = (row) => {
        console.log("row: ", row);
        setDataRow(row);
        handleOpen(true);
    }

    const handleOpen = (value) => {
        setOpen(value);
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'stt',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Người gửi',
            dataIndex: 'rp_person',
            key: 'rp_person',
        },
        {
            title: 'Thời gian gửi',
            dataIndex: 'rp_time',
            key: 'rp_time',
        },
        {
            title: 'Loại hình báo cáo',
            dataIndex: 'advertising_type',
            key: 'advertising_type',
        },
    ];

    return (
        <>
        { isOpen && <Popup data={dataRow} handleOpen={handleOpen} /> }
            <div className={`reports-manage  ${isOpen ? 'overlay' : ''}`}>
                <h1>Danh sách báo cáo</h1>
                <Table columns={columns} dataSource={listReports} 
                    onRow={(row) => ({
                        onClick: () => {handleRowClick(row)}
                    })} 
                />
            </div>
        </>
        
    )
}

export default ReportsManage