import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdBoard.css";

const AdBoardInfo = (props) => {
  const navigte = useNavigate();
  const [adDetail, setAdDetail] = useState([]);

  const handleClick = () => {
    navigte("/reports", { state: { ad: props.ad } });
  };

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    setAdDetail(props.ad);
    console.log(adDetail);
  });

  return (
    <div className="adboard">
      <div className="row">
        <div className="column-left">
          <h2>{adDetail.adstabletype_name}</h2>
          <p className="address">{adDetail.address}</p>
          <p>
            Kích thước:
            <span>
              {adDetail.width}m x {adDetail.height}m
            </span>
          </p>
          <p>
            Số lượng: <span>1 trụ/bảng</span>
          </p>
          <p>
            Hình thức: <span>{adDetail.advertising_methods_name}</span>
          </p>
          <p>
            Phận loại: <span>{adDetail.positiontype_name}</span>
          </p>
          <button type="submit" className="button" onClick={handleClick}>
            Báo cáo vi phạm
          </button>
        </div>
        <div className="column-right">
          <h2>Chi Tiết bảng báo cáo</h2>
          <p>
            Ngày hết hạn: <span>{getFormattedDate(adDetail.expried)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdBoardInfo;
