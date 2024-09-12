import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import EventList from "../eventall/eventlist";
import Header from "../headerall/header";
import ButtonBox from "../buttonsall/buttons";
import CameraContext from "../cameraall/cameracontext";
import "./livefeed.css";

const LiveFeedPage = () => {
  const { selectedCamera, setSelectedCamera } = useContext(CameraContext); 
  const [liveStreamUrl, setLiveStreamUrl] = useState(null);
  const [cameraDetails, setCameraDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveFeedResponse, cameraResponse] = await Promise.all([
          axios.get('http://192.168.0.2:9001/hubapi/v1/livefeed/fetch-livefeed', {
            headers: { 'accept': 'application/json',  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVhZ2xhaSIsImV4cCI6MTc0NDAzMzA3OSwic3ViIjoiMmNiMGFhODEtYTIzMy00ZjhhLWI1MzMtMmYzNmRkODA0OTZkIn0.TzGbHYrm6nVu5nOHSaNqcQk9rpc0I5tJTWy9Vick2EI'
            }
          }),
          axios.get('http://192.168.0.2:9001/hubapi/v1/camera/get_names', {
            headers: { 'accept': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVhZ2xhaSIsImV4cCI6MTc0NDAzMzA3OSwic3ViIjoiMmNiMGFhODEtYTIzMy00ZjhhLWI1MzMtMmYzNmRkODA0OTZkIn0.TzGbHYrm6nVu5nOHSaNqcQk9rpc0I5tJTWy9Vick2EI'
          }
          })
        ]);

        setLiveStreamUrl(liveFeedResponse.data.liveStreamUrl);
        setCameraDetails(cameraResponse.data.data); 
      } catch (error) {
        setError("Failed to load live feed or camera details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sessionName = selectedCamera?.sessionName || "dummy";
  const imageName = selectedCamera?.imageName || "1461";
  const imageUrl = `http://192.168.0.2:9001/serving-static-files-for-download/res/${sessionName}/${imageName}.jpg`;

  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div>
      <Header />
      <div className="live-feed-page">
        <div className="content-container">
          <div className="live-feed-section">
            <h2 className="section-title">Live Feed</h2>
            {loading && <p>Loading live feed and camera details...</p>}
            {error && <p>{error}</p>}
            {liveStreamUrl && (
              <img src={liveStreamUrl} alt={selectedCamera?.name || "Live Feed"} />
            )}
            {selectedCamera && (
              <>
                <img src={imageUrl} alt={selectedCamera.name || "Selected Camera Image"} />
                <div className="camera-info">
                  <h3>Selected Camera: {selectedCamera.name || "Camera-1"}</h3>
                </div>
              </>
            )}
          </div>

          <div className="camera-list-section">
            <h2>Camera List</h2>
            {cameraDetails.length > 0 ? (
              cameraDetails.map((camera, index) => (
                <div 
                  key={index} 
                  className="camera-item"
                  onClick={() => handleCameraClick(camera)} 
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{camera}</h3>
                </div>
              ))
            ) : (
              <p>No cameras available</p>
            )}
          </div>
        </div>

        <div className="event-list-container">
          <EventList />
          <ButtonBox />
        </div>
      </div>
    </div>
  );
};

export default LiveFeedPage;
