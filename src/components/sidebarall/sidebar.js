import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/live-feed">
            <FontAwesomeIcon icon={faCamera} /> <span>Live Feed</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-panel">
            <FontAwesomeIcon icon={faCog} /> <span>Admin Panel</span>
          </Link>
        </li>
        <li>
          <Link to="/configuration">
            <FontAwesomeIcon icon={faCog} /> <span>Configuration</span>
          </Link>
        </li>
      </ul>
      <div className="settings">
        <p>
          <FontAwesomeIcon icon={faCog} /> <span>Settings</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
        </p>
      </div>
    </div>
  );
}



export default Sidebar;
