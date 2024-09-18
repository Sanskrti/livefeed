import React from 'react';
import { Link } from 'react-router-dom';
import './SideBarStyling.scss';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/live-feed">
            <span>Live Feed</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-panel">
            <span>Admin Panel</span>
          </Link>
        </li>
        <li>
          <Link to="/configuration">
            <span>Configuration</span>
          </Link>
        </li>
      </ul>
      <div className="settings">
        <p>
          <span>Settings</span>
        </p>
        <p>
          <span>Logout</span>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
