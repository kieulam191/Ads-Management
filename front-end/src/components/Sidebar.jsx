import React from 'react';
import { Link } from 'react-router-dom';

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
      </ul>
    </div>
  );
};

export default Sidebar;
