
import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => (
  <div className="sidebar">
    <ul>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/live-feed">Live Feed</Link>
      </li>
      <li>
        <Link to="/admin-panel">Admin Panel</Link>
      </li>
      <li>
        <Link to="/configuration">Configuration</Link>
      </li>
    </ul>
    <div className="settings">
      <p>Settings</p>
      <p>Logout</p>
    </div>
  </div>
);

export default Sidebar;
