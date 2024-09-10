import React, { useContext } from "react";
import EventList from "../eventall/eventlist";
import Header from "../headerall/header";
import CameraList from "../cameraall/cameralist";
import "./livefeed.css";
import ButtonBox from "../buttonsall/buttons";
import Sidebar from "../sidebarall/sidebar";
import CameraContext from "../cameraall/cameracontext";

const LiveFeedPage = () => {
  const { selectedCamera } = useContext(CameraContext);

  const sessionName = selectedCamera?.sessionName || "dummy";
  const imageName = selectedCamera?.imageName || "1461";
  const imageUrl = `http://192.168.0.2:9001/serving-static-files-for-download/res/${sessionName}/${imageName}.jpg`;

  return (
    <div>
      <Header />
      <div className="live-feed-page">
        <div className="content-container">
          <div className="live-feed-section">
            <h2 className="section-title">Live Feed</h2>
            <div className="video-stream">
              <div className="video-content">
                {selectedCamera ? (
                  <img
                    src={imageUrl}
                    alt={selectedCamera.name || "Live Feed"}
                  />
                ) : (
                  <p>Select a camera to view the live feed.</p>
                )}
              </div>
              {selectedCamera && (
                <div className="camera-info">
                  <h3>
                    Selected Camera: {selectedCamera.name || "Camera-1"}
                  </h3>
                  <p>Camera ID: {selectedCamera.id}</p>
                </div>
              )}
            </div>
          </div>
          <div className="camera-list-section">
            <h2 className="section-title"></h2>
            <CameraList />
          </div>
        </div>
        <div className="event-list-container">
          <EventList />
          <ButtonBox />
        </div>
      </div>
    </div>
  );
};

export default LiveFeedPage;
