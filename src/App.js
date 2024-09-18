import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import LiveFeedPage from "./components/LiveFeedContainer/LiveFeedDisplay";
import Sidebar from "./components/SideBarContainer/SideBarDisplay";
import CameraContext from "./components/CameraContainer/CameraContext";


const App = () => {
  const [liveStreamUrl, setLiveStreamUrl] = useState(null);
  const [currentCameraName, setCurrentCameraName] = useState("");
  const [selectedCamera, setSelectedCamera] = useState(null);

  const cameraList = [];

const events = [];

  const handleCameraClick = (camera) => {
    setLiveStreamUrl(camera.thumbnail);
    setCurrentCameraName(camera.name);
    setSelectedCamera(camera);
  };

  return (

    <CameraContext.Provider value={{ selectedCamera, setSelectedCamera }}>
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
                <Route
                  path="/live-feed"
                  element={
                    <LiveFeedPage
                      liveStreamUrl={liveStreamUrl}
                      handleCameraClick={handleCameraClick}
                      cameras={cameraList}
                      events={events}
                      currentCameraName={currentCameraName}
                    />
                  }
                />
                <Route
                  path="/admin-panel"
                  element={<div className="blank-page">Admin Panel</div>}
                />
                <Route
                  path="/configuration"
                  element={<div className="blank-page">Configuration</div>}
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </CameraContext.Provider>
  );
};

export default App;
 