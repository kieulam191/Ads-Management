import React from "react";
import "./Report.css";

const ReportBoard = () => {
  const handleClick = () => {};
  return (
    <div className="board">
      <p>Ngày gửi: 24/12/2024</p>
      <p>Địa điểm: Đất công viên, nguyễn du, Phường Bến Nghé, Quận 1</p>
      <p>Tình trạng: Đang xử lý</p>
      <button type="submit" className="button" onClick={handleClick}>
        Xem chi tiết
      </button>
    </div>
  );
};

export default ReportBoard;
