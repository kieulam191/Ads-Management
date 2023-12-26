import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";
import { AppContext } from "../../context/AppContext";

const AreaList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchAreas = async () => {
      const response = await axios.get("/areas");
      console.log(response.data.data);
      dispatch({ type: "SET_AREAS", payload: response.data.data });
    };

    // const fetchDistrict = async () => {
    //   const response = await axios.get("/districts");
    //   console.log(response.data.data);
    //   dispatch({ type: "SET_AREAS", payload: response.data.data });
    // };

    fetchAreas();
  }, [dispatch]);

  return (
    <div>
      <h2>Areas List</h2>
      <Link to="/areas/add">Add areas</Link>
      {/* <div className="ward">
        <select name="cars" id="cars" className="district">
          <option value="volvo">Quan 1</option>
          <option value="saab">quan 2</option>
          <option value="opel">Quan 3</option>
          <option value="audi">Quan 4</option>
        </select>
        <select name="cars" id="cars" className="ward">
          <option value="volvo">phuong 1</option>
        </select>
      </div> */}
      <table>
        <thead>
          <tr>
            <th>Province code</th>
            <th>Province</th>
            <th>District code</th>
            <th>District</th>
            <th>Ward code</th>
            <th>Ward</th>
            <th>assigned</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {state.areas.map((area) => (
            <tr key={area.area_id}>
              <td>{area.province_code}</td>
              <td>{area.province_name}</td>
              <td>{area.district_code}</td>
              <td>{area.district_name}</td>
              <td>{area.ward_code}</td>
              <td>{area.ward_name}</td>
              <td>{area.username}</td>
              <td>
                <Link to={`/districts/${area.area_id}`}>Edit</Link>
                <Link to={`/districts/${area.area_id}`}>remove</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AreaList;
