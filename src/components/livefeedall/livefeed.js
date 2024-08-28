import React from 'react';
import EventList from '../eventall/eventlist';
import Header from '../headerall/header';
import CameraList from '../cameraall/cameralist';
import './livefeed.css';

const LiveFeedPage = ({ liveStreamUrl, handleCameraClick, cameras, events, currentCameraName }) => (
  <div className="live-feed-page">
    <Header />
    <div className="content-container">
      <div className="live-feed-section">
        <h2 className="section-title">Live Feed</h2>
        <div className="video-stream">
          <div className="video-content">
            {liveStreamUrl ? (
              <img src={liveStreamUrl} alt={currentCameraName} />
            ) : (
              <p>Select a camera to view the live feed.</p>
            )}
          </div>
          {currentCameraName && (
            <div className="camera-name">{currentCameraName}</div>
          )}
        </div>
      </div>
      <div className="camera-list-section">
        <div>
          
        <h2 className="section-title">Camera List</h2>
        <CameraList cameras={cameras} onCameraSelect={handleCameraClick} />
        </div>
        
      <div className="buttons-box">
      <button className="camera-button">Multiple Camera Feeds</button>
      <button className="camera-button">Batch History</button>
      <button className="camera-button">My Images</button>
        </div>
      </div>
    </div>
    <div className="event-list-section">
      <h2 className="section-title">Event List</h2>
         
      {/* <EventCard events={events} /> */}
    </div>
    <EventList/>
  </div>
   
);

export default LiveFeedPage;
