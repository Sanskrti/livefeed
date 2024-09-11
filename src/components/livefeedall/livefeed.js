import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import EventList from "../eventall/eventlist";
import Header from "../headerall/header";
import CameraList from "../cameraall/cameralist";
import ButtonBox from "../buttonsall/buttons";
import CameraContext from "../cameraall/cameracontext";
import "./livefeed.css";

const transformArray = (arr, key) => Object.fromEntries(arr.map(obj => [obj[key], obj]));

const LiveFeedPage = () => {
  const { selectedCamera } = useContext(CameraContext);
  const [liveStreamUrl, setLiveStreamUrl] = useState(null);
  const [cameraDetails, setCameraDetails] = useState(null);
  const [cameraMappedData, setCameraMappedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state hooks for liveFeedResponse and cameraResponse
  const [liveFeedResponse, setLiveFeedResponse] = useState(null);
  const [cameraResponse, setCameraResponse] = useState(null);

  useEffect(() => {
    const fetchLiveFeedAndCameraDetails = async () => {
      try {
        const liveFeedResponse = await axios.get('http://192.168.0.2:9001/hubapi/v1/livefeed/fetch-livefeed', {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVhZ2xhaSIsImV4cCI6MTc0NDAzMzA3OSwic3ViIjoiMmNiMGFhODEtYTIzMy00ZjhhLWI1MzMtMmYzNmRkODA0OTZkIn0.TzGbHYrm6nVu5nOHSaNqcQk9rpc0I5tJTWy9Vick2EI'
          }
        });
        setLiveFeedResponse(liveFeedResponse.data);
        setLiveStreamUrl(liveFeedResponse.data.liveStreamUrl);

        const cameraResponse = await axios.get('http://192.168.0.2:9001/hubapi/v1/camera/get_names', {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVhZ2xhaSIsImV4cCI6MTc0NDAzMzA3OSwic3ViIjoiMmNiMGFhODEtYTIzMy00ZjhhLWI1MzMtMmYzNmRkODA0OTZkIn0.TzGbHYrm6nVu5nOHSaNqcQk9rpc0I5tJTWy9Vick2EI'
          }
        });
        setCameraResponse(cameraResponse.data);
        setCameraDetails(cameraResponse.data);
        
        const mappedData = transformArray(cameraResponse.data, 'image_cam');
        setCameraMappedData(mappedData);

        setLoading(false);
      } catch (error) {
        setError("Failed to load live feed or camera details");
        setLoading(false);
      }
    };

    fetchLiveFeedAndCameraDetails();
  }, []);

  const sessionName = selectedCamera?.sessionName || "dummy";
  const imageName = selectedCamera?.imageName || "1461";
  const imageUrl = `http://192.168.0.2:9001/serving-static-files-for-download/res/${sessionName}/${imageName}.jpg`;

  return (
    <div>
      <Header />
      <div className="live-feed-page">
        <div className="content-container">
          <div className="live-feed-section">
            <h2 className="section-title">Live Feed</h2>
            <div className="video-stream">
              <div className="video-content">
                {loading && <p>Loading live feed and camera details...</p>}
                {error && <p>{error}</p>}
                {!loading && liveFeedResponse && (
                  <img
                    src={liveStreamUrl}
                    alt={selectedCamera?.name || "Live Feed"}
                  />
                )}
                {!loading && !liveStreamUrl && !error && (
                  <p>Select a camera to view the live feed.</p>
                )}
                {selectedCamera && cameraResponse && (
                  <img src={imageUrl} alt={selectedCamera?.name || "Selected Camera Image"} />
                )}
              </div>
              {selectedCamera && cameraMappedData && (
                <div className="camera-info">
                  <h3>
                    Selected Camera: {selectedCamera.name || "Camera-1"}
                  </h3>
                </div>
              )}
            </div>
          </div>
          <div className="camera-list-section">
            <CameraList />
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
