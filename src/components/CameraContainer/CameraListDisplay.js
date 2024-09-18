import React, { useContext } from 'react';
import CameraContext from './CameraContext';
import './CameraListDisplay.scss';

const CameraListDisplay = () => {
  const { setSelectedCamera } = useContext(CameraContext); 

  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div>
      <button onClick={() => handleCameraClick('Camera1')}>Select Camera 1</button>
    </div>
  );
};

export default CameraListDisplay;
