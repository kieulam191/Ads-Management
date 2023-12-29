import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Report from "./resident/report/ReportList";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  // const { state, dispatch } = useContext(AppContext);
  // const checkboxRef = useRef(null);
  // const reportcheckboxRef = useRef(null);

  // const handleClick = () => {
  //   dispatch({
  //     type: "SET_CHECK_REPORT",
  //     payload: checkboxRef.current.checked,
  //   });
  // };

  // const handleReportClick = () => {
  //   console.log(reportcheckboxRef.current.checked);
  //   dispatch({
  //     type: "SET_CHECK_REPORT_HIDE",
  //     payload: reportcheckboxRef.current.checked,
  //   });
  //   dispatch({
  //     type: "SET_REPORT_BOARDS",
  //     payload: [],
  //   });
  // };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/districts">Districts</Link>
        </li>
        <li>
          <Link to="/adpoints">Ad Points</Link>
        </li>
        <li>
          <Link to="/adboards">Ad Boards</Link>
        </li>
      </ul>
    </div>
    // <div className="sidebar">
    //   <h2>Netizen Panel</h2>

    //   <div className="row">
    //     <input
    //       type="checkbox"
    //       ref={checkboxRef}
    //       onClick={handleClick}
    //       defaultChecked={false}
    //       className="checkbox-input"
    //     />
    //     <label className="lable-content"> ẩn báo cáo</label>
    //     <input
    //       type="checkbox"
    //       ref={reportcheckboxRef}
    //       onClick={handleReportClick}
    //       defaultChecked={false}
    //       className="checkbox-input"
    //     />
    //     <label className="lable-content">ẩn quy hoạch</label>
    //   </div>

    //   {state.reports}
    // </div>
  );
};

export default Sidebar;
