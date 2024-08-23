 import React, { useState } from "react";

const CameraList = () => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  
  const cameras = {
    1: { name: "Camera 1", image: "/assets/cam1.jpg" },
    2: {
      name: "Camera 2",
      image: "/ assets/cam2.jpg",
    },
    3: {
      name: "Camera 3",
      image: "C:UsersLENOVOlive-feed-dashboardsrccam3.jpg",
    },
    4: {
      name: "Camera 4",
      image: "C:UsersLENOVOlive-feed-dashboardsrccam4.jpg",
    },
    5: {
      name: "Camera 5",
      image: "C:UsersLENOVOlive-feed-dashboardsrccam5.jpg",
    },
  };

  const handleCameraClick = (cameraId) => {
    setSelectedCamera(cameras[cameraId]);
  };

  return (
    <div>
      <div className="camera-list">
        {Object.keys(cameras).map((cameraId) => (
          <div key={cameraId} onClick={() => handleCameraClick(cameraId)}>
            {cameras[cameraId].name}
          </div>
        ))}
      </div>
      <div className="live-feed">
        {selectedCamera ? (
          <>
            <img src="../cam1.jpg" alt={selectedCamera.name} />
            <p>{selectedCamera.name}hello</p>
          </>
        ) : (
          <p>Select a camera to view</p>
        )}
      </div>
    </div>
  );
};

export default CameraList;
 