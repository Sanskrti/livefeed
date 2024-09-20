import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import AppRoutes from "./Routes/Routes";

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/live-feed">Live Feed</Link></li>
            <li><Link to="/admin-panel">Admin Panel</Link></li>
            <li><Link to="/configuration">Configuration</Link></li>
          </ul>
          <div className="settings">
            <p>Settings</p>
            <p>Logout</p>
          </div>
        </div>
        <div className="main-content">
          <div className="header">
            <AppRoutes />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
