import React, { useContext, useRef } from "react";
import { AppContext } from "../../../context/AppContext";
import SignInButton from "../../officer/SignIn/SingInButton";
import SignUpButton from "../../officer/SignUp/SignUpButton";
const ResidentSideBar = () => {
  const { state, dispatch } = useContext(AppContext);
  const checkboxRef = useRef(null);
  const reportcheckboxRef = useRef(null);

  const handleClick = () => {
    dispatch({
      type: "SET_CHECK_URBANED_HIDE",
      payload: checkboxRef.current.checked,
    });
  };

  const handleReportClick = () => {
    console.log(reportcheckboxRef.current.checked);
    dispatch({
      type: "SET_CHECK_REPORT_HIDE",
      payload: reportcheckboxRef.current.checked,
    });
    dispatch({
      type: "SET_REPORT_BOARDS",
      payload: [],
    });
  };
  return (
    <div className="sidebar">
      <h2>Netizen Panel</h2>
      <div>
        <SignInButton />
        <SignUpButton />
      </div>
      <div className="row">
        <input
          type="checkbox"
          ref={checkboxRef}
          onClick={handleClick}
          defaultChecked={false}
          className="checkbox-input"
        />
        <label className="lable-content">Ẩn quy hoạch</label>
        <input
          type="checkbox"
          ref={reportcheckboxRef}
          onClick={handleReportClick}
          defaultChecked={false}
          className="checkbox-input"
        />
        <label className="lable-content">Ẩn báo cáo</label>
      </div>

      {state.reports}
    </div>
  );
};

export default ResidentSideBar;
