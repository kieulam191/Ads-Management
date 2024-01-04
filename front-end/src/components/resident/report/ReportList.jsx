import React, { useEffect, useState } from "react";
import "./Report.css";

const ReportBoard = (props) => {
  const [reportDetail, setReportDetail] = useState([]);

  useEffect(() => {
    setReportDetail(props.report);
    console.log(reportDetail.processed);
  }, []);

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="board">
      <p>Ngày gửi: {getFormattedDate(reportDetail.created)}</p>
      <p>Người gửi: {reportDetail.fullname}</p>
      <p>
        Địa điểm: {reportDetail.wards_fullname},{" "}
        {reportDetail.districts_fullname}, {reportDetail.provinces_fullname}
      </p>
      <p>Tình trạng: {reportDetail.processed ? "Đã xử lý" : "Chưa xử lý"}</p>
    </div>
  );
};

export default ReportBoard;
