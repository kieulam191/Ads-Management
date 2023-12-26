import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";

const RepostList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get("/reports/types", {
        headers: {
          Authorization: "Bearer " + "admin",
        },
      });

      console.log(response.data.data);

      dispatch({ type: "SET_REPORT_TYPES", payload: response.data.data });
    };

    fetchReports();
  }, [dispatch]);

  async function handleClick(id) {
    // Xử lý logic của bạn ở đây
    console.log(`da remove item: ${id}`);
    // Sử dụng confirm() để hiển thị thông báo với button "Yes" và "NO"
    var confirmed = confirm("are you sure?");
    // Kiểm tra kết quả
    if (confirmed) {
      await axios.delete(`/reports/types/${id}`, {
        headers: {
          Authorization: "Bearer " + "admin",
        },
      });

      const response = await axios.get("/reports/types");
      dispatch({ type: "SET_REPORT_TYPES", payload: response.data.data });
    }
  }

  return (
    <div>
      <h2>Report Type List</h2>
      <Link to="/reports/add">Add report type</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.reportType.map((report) => (
            <tr key={report.id}>
              <td>{report.name}</td>
              <td>
                <Link to={`/reports/${report.id}`}>Edit</Link>
                <Link to={`/reports`} onClick={() => handleClick(report.id)}>
                  Remove
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RepostList;
