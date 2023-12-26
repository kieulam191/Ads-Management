import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";

const AdvertisingList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchAdType = async () => {
      const response = await axios.get("/ads/types", {
        headers: {
          Authorization: "Bearer " + "admin",
        },
      });
      dispatch({ type: "SET_AD_TYPES", payload: response.data.data });
    };

    fetchAdType();
  }, [dispatch]);

  async function handleClick(id) {
    // Xử lý logic của bạn ở đây
    console.log(`da remove item: ${id}`);
    // Sử dụng confirm() để hiển thị thông báo với button "Yes" và "NO"
    var confirmed = confirm("are you sure?");
    // Kiểm tra kết quả
    if (confirmed) {
      await axios.delete(`/ads/types/${id}`, {
        headers: {
          Authorization: "Bearer " + "admin",
        },
      });

      const response = await axios.get("/ads/types");
      dispatch({ type: "SET_AD_TYPES", payload: response.data.data });
    }
  }

  return (
    <div>
      <h2>Ads Type List</h2>
      <Link to="/advertisings/add">Add ads type</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.adtypes.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.name}</td>
              <td>
                <Link to={`/Advertisings/${ad.id}`}>Edit</Link>
                <Link to={`/Advertisings`} onClick={() => handleClick(ad.id)}>
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

export default AdvertisingList;
