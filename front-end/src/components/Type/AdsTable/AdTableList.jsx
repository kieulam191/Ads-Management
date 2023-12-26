import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";

const AdTableList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchAdTables = async () => {
      const response = await axios.get("/ads/table-types", {
        headers: {
          Authorization: "Bearer " + "admin",
        },
      });

      console.log(response.data.data);

      dispatch({ type: "SET_AD_TABLE_TYPES", payload: response.data.data });
    };

    fetchAdTables();
  }, [dispatch]);

  async function handleClick(id) {
    // Xử lý logic của bạn ở đây
    console.log(`da remove item: ${id}`);
    // Sử dụng confirm() để hiển thị thông báo với button "Yes" và "NO"
    var confirmed = confirm("are you sure?");
    // Kiểm tra kết quả
    if (confirmed) {
      await axios.delete(`/ads/table-types/${id}`, {
        headers: {
          Authorization: "Bearer " + "admin",
        },
      });

      const response = await axios.get("/ads/table-types");
      dispatch({ type: "SET_AD_TABLE_TYPES", payload: response.data.data });
    }
  }

  return (
    <div>
      <h2>Table Type List</h2>
      <Link to="/adtables/add">Add ads table type</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.adTableType.map((adtable) => (
            <tr key={adtable.id}>
              <td>{adtable.name}</td>
              <td>
                <Link to={`/adtables/${adtable.id}`}>Edit</Link>
                <Link to={`/adtables`} onClick={() => handleClick(adtables.id)}>
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

export default AdTableList;
