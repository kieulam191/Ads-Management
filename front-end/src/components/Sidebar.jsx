import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
        <li className="index">
          <h3>Area</h3>
        </li>
        <li>
          <Link to="/areas">Areas</Link>
        </li>
        <li className="index">
          <h3>Type</h3>
        </li>
        <li>
          <Link to="/advertisings">ad type</Link>
        </li>
        <li>
          <Link to="/adtables">ad table type</Link>
        </li>
        <li>
          <Link to="/positions">position type</Link>
        </li>
        <li>
          <Link to="/reports">report type</Link>
        </li>
        <li>
          <Link to="/accounts">account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
