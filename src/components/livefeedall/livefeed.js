import React from "react";
import EventList from "../eventall/eventlist";
import Header from "../headerall/header";
import CameraList from "../cameraall/cameralist";
import "./livefeed.css";
import ButtonBox from "../buttonsall/buttons";

const LiveFeedPage = ({
  liveStreamUrl,
  handleCameraClick,
  cameras,
  currentCameraName,
}) => (
  <div>
    <Header />
    <div className="live-feed-page">
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
            <h2 className="section-title"></h2>
            <CameraList cameras={cameras} onCameraSelect={handleCameraClick} />
          </div>
        </div>
      </div>
      <div className="event-list-container">
        <EventList />
        <ButtonBox />
      </div>
    </div>
  </div>
);

export default LiveFeedPage;
 