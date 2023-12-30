import {React, useState} from 'react'
import { Card } from 'antd';

import './popup.css'

const { Meta } = Card;

const Popup = ({data, handleOpen}) => {
    const [status, setStatus] = useState({
        PROCESSING: true,
        SUCCESS: false
    });

    const btnExitClick = () => {
        handleOpen(false);
    }

    const handleStatus = () => {
        const update = {
            PROCESSING: !status.PROCESSING,
            SUCCESS: !status.SUCCESS
        };
        console.log("status: ", update)
        setStatus(update);
    }
    return (
    <div className='popup'>
        <div className="card-popup">
            <Card hoverable  cover={<img alt="ads.image" src="hình ảnh minh họa ads.image" />}>
                <div className="card-info">
                    <Meta title="Người gửi" description={data?.rp_person}/>
                    <div className="info">
                        <Meta title="Ngày gửi" description={data?.rp_time} />
                        <Meta title="Địa chỉ" description={data?.address} />
                    </div>
                    <Meta title="Nội dung báo cáo" 
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />
                    <div className="status-info">
                        <Meta title="Tình trạng" 
                            description={
                                <button onClick={handleStatus} className={`btnStatus ${status.PROCESSING ? 'PROCESSING' : 'SUCCESS'}`}>
                                    {status.PROCESSING ? 'PROCESSING' : 'SUCCESS'}
                                </button>
                            }
                        />
                    </div>
                    <button onClick={btnExitClick} className='btnExit'>Thoát</button>
                </div>
            </Card>
        </div>
    </div>
    )
}

export default Popup