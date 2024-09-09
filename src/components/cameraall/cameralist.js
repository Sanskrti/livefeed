import './camera.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CameraList = ({ cameras, onCameraSelect }) => {

  console.log('Cameras in CameraList:', cameras);

  if (!cameras || cameras.length === 0) {
    return <p>No cameras available</p>;
  }

  return (
    <div className="camera-list">
      <ul>
        {cameras.map((camera) => (
          <li key={camera.id} onClick={() => onCameraSelect(camera)}>
            <h4>{camera.name}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

function Camera() {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenAndCameras = async () => {
      try {
     
        const tokenResponse = await axios.post(
          'http://192.168.0.2:9001/hubapi/v1/user/token',
          new URLSearchParams({
            'grant_type': 'password',
            'username': 'eaglai',
            'password': 'senquire123',
            'scope': '',
            'client_id': '',
            'client_secret': ''
          }),
          {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        );
        
        console.log('Token response:', tokenResponse.data); 

        const token = tokenResponse.data.access_token;

        
        const cameraResponse = await axios.get('http://192.168.0.2:9001/hubapi/v1/camera/get_names', {
          headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });

        
        console.log('Camera response:', cameraResponse.data);

       
        const cameras = cameraResponse.data.cameras || [];
        console.log('Cameras:', cameras); 

        setCameras(cameras);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cameras or token:', error);
        setError('Failed to load cameras');
        setLoading(false);
      }
    };

    fetchTokenAndCameras();
  }, []);

  const handleCameraSelect = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div className="camera-container">
      <h2>Camera List</h2>
      {loading && <p>Loading cameras...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && cameras.length === 0 && <p>No cameras available</p>}
      {!loading && !error && cameras.length > 0 && (
        <CameraList cameras={cameras} onCameraSelect={handleCameraSelect} />
      )}
      {selectedCamera && (
        <div className="selected-camera">
          <h3>Selected Camera: {selectedCamera.name}</h3>
        </div>
      )}
    </div>
  );
}

export default Camera;
