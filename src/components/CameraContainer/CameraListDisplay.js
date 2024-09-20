import React, { useContext } from "react";
import { LiveFeedContext } from "../LiveFeedContainer/LiveFeedDisplay";
import "./CameraStyling.scss";

const CameraListDisplay = ({ cameraDetails }) => {
  const { setSelectedCamera } = useContext(LiveFeedContext);

  return (
    <div className="camera-list-section">
      <h2>Camera List</h2>
      {cameraDetails.length > 0 ? (
        cameraDetails.map((camera, index) => (
          <div
            key={index}
            className="camera-item"
            onClick={() => setSelectedCamera(camera)}
            style={{ cursor: "pointer" }}
          >
            <h4>{camera}</h4>
          </div>
        ))
      ) : (
        <p>No cameras available</p>
      )}
    </div>
  );
};

export default CameraListDisplay;
