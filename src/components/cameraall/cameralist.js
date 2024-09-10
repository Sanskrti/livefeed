import './camera.css';
import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';


const CameraContext = createContext();

const CameraList = ({ cameras, onCameraSelect }) => {
  if (!cameras || cameras.length === 0) {
    return <p>No cameras available</p>;
  }

  return (
    <div className="camera-list">
      <ul>
        {cameras.map((camera) => (
          <li key={camera.id} onClick={() => onCameraSelect(camera)}>
            <h4>{cameras ['Camera-1']}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

function Camera() {
  const { selectedCamera, setSelectedCamera } = useContext(CameraContext);
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
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

        const token = tokenResponse.data.access_token;

        const cameraResponse = await axios.get(
          'http://192.168.0.2:9001/hubapi/v1/camera/get_names',
          {
            headers: {
              'accept': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cameraResponse.data && Array.isArray(cameraResponse.data.data)) {
          setCameras(cameraResponse.data.data);
        } else {
          setCameras([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cameras or token:', error);
        setError('Failed to load cameras');
        setLoading(false);
      }
    };

    fetchCameras(); 

    const interval = setInterval(() => {
      fetchCameras(); 
    }, 10000); 

    return () => clearInterval(interval); 
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
          <h3>Selected Camera: {selectedCamera.name || 'Camera-1'}</h3>
          <p>Camera ID: {selectedCamera.id}</p>
        </div>
      )}
    </div>
  );
}

const CameraProvider = ({ children }) => {
  const [selectedCamera, setSelectedCamera] = useState(null);

  return (
    <CameraContext.Provider value={{ selectedCamera, setSelectedCamera }}>
      {children}
    </CameraContext.Provider>
  );
};


export { CameraProvider, CameraList, Camera };
