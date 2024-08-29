import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import LiveFeedPage from './components/livefeedall/livefeed';
import Sidebar from './components/sidebarall/sidebar';
// import EventList from './components/eventall/eventlist';

function App() {
  const [liveStreamUrl, setLiveStreamUrl] = useState(null);
  const [currentCameraName, setCurrentCameraName] = useState('');

  const cameraList = [
    { id: 1, name: 'Camera 1', thumbnail: 'cam1.jpg' },
    { id: 2, name: 'Camera 2', thumbnail: 'cam2.jpg' },
    { id: 3, name: 'Camera 3', thumbnail: 'cam3.jpg' },
    { id: 4, name: 'Camera 4', thumbnail: 'cam4.jpg' },
    { id: 5, name: 'Camera 5', thumbnail: 'cam5.jpg' },
  ];

  const events = [
    
  ];

  const handleCameraClick = (camera) => {
    setLiveStreamUrl(camera.thumbnail);
    setCurrentCameraName(camera.name);
  };

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
              <Route path="/admin-panel" element={<div className="blank-page">Admin Panel</div>} />
              <Route path="/configuration" element={<div className="blank-page">Configuration</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
