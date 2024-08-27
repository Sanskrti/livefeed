import React from 'react';
import './button.css';

const ButtonBox = () => {
  return (
    <div className="buttons-box">
      <button className="camera-button">Multiple Camera Feeds</button>
      <button className="camera-button">Batch History</button>
      <button className="camera-button">My Images</button>
    </div>
  );
};

export default ButtonBox;
