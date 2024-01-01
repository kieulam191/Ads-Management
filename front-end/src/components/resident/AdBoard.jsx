import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdBoard.css";

const AdBoardInfo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("da click");
  };

  return (
    <div className="adboard">
      <div className="row">
        <div className="column-left">
          <h2>Trụ, cụm pano</h2>
          <p className="address">
            Đồng khởi-Nguyễn du, Phường Bến nghé, quận 1
          </p>
          <p>Kích thước: 2.5m x 10m</p>
          <p>
            Số lượng: <span>1 trụ/bảng</span>
          </p>
          <p>
            Hình thức: <span>Cổ động chính trị</span>
          </p>
          <p>
            Phận loại:{" "}
            <span>Đất công/Công viên/Hành lang an toàn giao thông</span>
          </p>
          <button type="submit" className="button" onClick={handleClick}>
            Báo cáo vi phạm
          </button>
        </div>
        <div className="column-right">
          <h2>Chi Tiết bảng báo cáo</h2>
          <p>
            Ngày hết hạn: <span>24/12/2024</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdBoardInfo;
