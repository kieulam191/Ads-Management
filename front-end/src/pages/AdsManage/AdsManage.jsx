import React, { useState } from 'react'
import { Table } from 'antd'

import './adsmanage.css'

const AdsManages = () => {
    const [listAds, setList] = useState([
        { key: 1, address: '227 Đ. Nguyễn Văn Cừ, P4, Quận 5', area: 'Quận 5', advertising_type: 'Cổ động chính trị 1'},
        { key: 2, address: '227 Đ. Nguyễn Văn Cừ, P4, Quận 5', area: 'Quận 5', advertising_type: 'Cổ động chính trị 2'},
        { key: 3, address: '227 Đ. Nguyễn Văn Cừ, P4, Quận 5', area: 'Quận 5', advertising_type: 'Cổ động chính trị 3'},
        { key: 4, address: '227 Đ. Nguyễn Văn Cừ, P4, Quận 5', area: 'Quận 5', advertising_type: 'Cổ động chính trị 4'},
        { key: 5, address: '227 Đ. Nguyễn Văn Cừ, P4, Quận 5', area: 'Quận 5', advertising_type: 'Cổ động chính trị 5'},
    ])

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
            title: 'Khu vực',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title: 'Hình thức quảng cáo',
            dataIndex: 'advertising_type',
            key: 'advertising_type',
        },
    ];
    return (
    <div className='ads-manage'>
        <h1>Danh sách bảng quảng cáo</h1>
        <Table columns={columns} dataSource={listAds} />
    </div>
    )
}

export default AdsManages