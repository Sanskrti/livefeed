import React, { useContext } from "react";
import { LiveFeedContext } from "../LiveFeedContainer/LiveFeedDisplay";
import "./CameraListDisplay.scss";

const CameraListDisplay = () => {
  const { setSelectedCamera } = useContext(LiveFeedContext);

  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div>
      <button onClick={() => handleCameraClick("Camera1")}>
        Select Camera 1
      </button>
    </div>
  );
};

export default CameraListDisplay;
 