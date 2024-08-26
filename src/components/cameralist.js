import React, { useState } from "react";

const CameraList = () => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  const cameras = [
    { id: 1, name: "Camera 1" },
    { id: 2, name: "Camera 2" },
    { id: 3, name: "Camera 3" },
    { id: 4, name: "Camera 4" },
    { id: 5, name: "Camera 5" },
  ];

  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div className="camera-list-section">
      <h2 className="section-title">Camera List</h2>
      <div className="camera-list">
        <ul>
          {cameras.map((camera) => (
            <li key={camera.id} onClick={() => handleCameraClick(camera)}>
              <h4>{camera.name}</h4>
            </li>
          ))}
        </ul>
      </div>
      <div className="live-feed">
        {selectedCamera ? (
          <>
            <p className="camera-name">{selectedCamera.name}</p>
          </>
        ) : (
          <p>Select a camera to view</p>
        )}
      </div>
    </div>
  );
};

export default CameraList;
