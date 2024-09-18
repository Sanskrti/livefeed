import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import LiveFeedPage from "./components/LiveFeedContainer/LiveFeedDisplay";


const App = () => {
  return (
    <Router>
      <div className="App">
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
        <div className="main-content">
          <div className="header">
            <Routes>
              <Route path="/" element={<div>Dashboard</div>} />
              <Route path="/live-feed" element={<LiveFeedPage />} />
              <Route path="/admin-panel" element={<div className="blank-page">Admin Panel</div>} />
              <Route path="/configuration" element={<div className="blank-page">Configuration</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
