import React, { useEffect, useState } from "react";
import AdBoardInfo from "./AdBoard";
import { useLocation } from "react-router-dom";
import axios from "../../services/api";
import "./AdboardLocation.css";

const AdBoardListLocation = () => {
  const location = useLocation();
  const [adBoard, setAdBoard] = useState([]);
  useEffect(() => {
    const wards = location.state.ward;
    const districts_fullname = location.state.district;

    const body = { wards: [wards], districts_fullname };
    axios.post("/advertisinglocations", body).then((res) => {
      setAdBoard(res.data);
    });
  }, []);
  return (
    <div>
      <div>
        {adBoard.map((ad) => (
          <AdBoardInfo key={ad.location_id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default AdBoardListLocation;
