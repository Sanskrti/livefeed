import React from 'react';
import './camera.css';
const CameraList = ({ cameras, onCameraSelect }) => {
  return (
    <div className="camera-list">
      <ul>
        {cameras.map((camera) => (
          <li key={camera.id} onClick={() => onCameraSelect(camera)}>
            <h4>{camera.name}</h4>
            {/* <img src={camera.thumbnail} alt={camera.name} height={100} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CameraList;
