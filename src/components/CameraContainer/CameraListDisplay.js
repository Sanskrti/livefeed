import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CameraContext from "./CameraContext";
// import "./CameraStyling.scss";

const CameraList = ({ cameras, onCameraSelect }) => {
  return (
    <div className="camera-list">
      <ul>
        {cameras.map((camera, index) => (
          <li key={index} onClick={() => onCameraSelect(camera)}>
            <h4>{cameras}</h4> 
          </li>
        ))}
      </ul>
    </div>
  );
};

const Camera = () => {
  const { setSelectedCamera } = useContext(CameraContext);
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenAndCameras = async () => {
      try {
        const tokenResponse = await axios.post(
          "http://192.168.0.2:9001/hubapi/v1/user/token",
          new URLSearchParams({
            grant_type: "password",
            username: "eaglai",
            password: "senquire123",
            scope: "",
            client_id: "",
            client_secret: "",
          }),
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            }
          }
        );

        const token = tokenResponse.data.access_token;

        const cameraResponse = await axios.get("http://192.168.0.2:9001/hubapi/v1/camera/get_names", {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        if (cameraResponse.data && Array.isArray(cameraResponse.data.data)) {
          setCameras(cameraResponse.data.data);
        } else {
          setCameras([]);
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to load cameras");
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
      {!loading && !error && cameras.length === 0 && (
        <p>No cameras available</p>
      )}
      {!loading && !error && cameras.length > 0 && (
        <CameraList cameras={cameras} onCameraSelect={handleCameraSelect} />
      )}
    </div>
  );
};

export default Camera;
