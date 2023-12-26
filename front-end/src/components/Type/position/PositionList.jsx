import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";

const PositionList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchPos = async () => {
      const response = await axios.get("/pos", {
        headers: {
          Authorization: "Bearer " + "admin",
        },
      });

      console.log(response.data.data);

      dispatch({ type: "SET_POSITION_TYPES", payload: response.data.data });
    };

    fetchPos();
  }, [dispatch]);

  async function handleClick(id) {
    // Xử lý logic của bạn ở đây
    console.log(`da remove item: ${id}`);
    // Sử dụng confirm() để hiển thị thông báo với button "Yes" và "NO"
    var confirmed = confirm("are you sure?");
    // Kiểm tra kết quả
    if (confirmed) {
      await axios.delete(`/pos/${id}`, {
        headers: {
          Authorization: "Bearer " + "admin",
        },
      });

      const response = await axios.get("/pos");
      dispatch({ type: "SET_POSITION_TYPES", payload: response.data.data });
    }
  }

  return (
    <div>
      <h2>Position Type List</h2>
      <Link to="/positions/add">Add position type</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.positionType.map((pos) => (
            <tr key={pos.id}>
              <td>{pos.name}</td>
              <td>
                <Link to={`/positions/${pos.id}`}>Edit</Link>
                <Link to={`/positions`} onClick={() => handleClick(pos.id)}>
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

export default PositionList;
