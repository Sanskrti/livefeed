import React, { useState } from 'react';
import './livefeed.css'; // Make sure to add this import for the new CSS

const CameraList = ({ onSelectCamera }) => {
    const cameras = [
        { id: 1, name: 'Camera 1', imgSrc: '/path-to-your-images/image1.png' },
        { id: 2, name: 'Camera 2', imgSrc: '/path-to-your-images/image2.png' },
        { id: 3, name: 'Camera 3', imgSrc: '/path-to-your-images/image3.png' },
        { id: 4, name: 'Camera 4', imgSrc: '/path-to-your-images/image4.png' },
        { id: 5, name: 'Camera 5', imgSrc: '/path-to-your-images/image5.png' },
    ];

    return (
        <div className="camera-list-container">
            {cameras.map(camera => (
                <div
                    key={camera.id}
                    className="camera-card"
                    onClick={() => onSelectCamera(camera.id)}
                >
                    <img src={camera.imgSrc} alt={camera.name} className="camera-image" />
                    <div className="camera-name">{camera.name}</div>
                </div>
            ))}
        </div>
    );
};

export default CameraList;
