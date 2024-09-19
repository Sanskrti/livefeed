import React, { useState, useEffect, createContext } from "react";
import EventList from "../EventContainer/EventsDisplay";
import Header from "../HeaderContainer/HeaderDisplay";
import ButtonBox from "../ButtonContainer/ButtonDisplay";
import CameraListDisplay from "../CameraContainer/CameraListDisplay";
import "./LiveFeedStyling.scss";
import SideBarDisplay from "../SideBarContainer/SideBarDisplay";
import { apiClient } from "../../api/apiClient";
import filterArrayByKeyValue from "../../utils/FilterArrayByKeyValue";

export const LiveFeedContext = createContext();
const liveFeedEndpoint = process.env.REACT_APP_LIVE_FEED_ENDPOINT;
const cameraNamesEndpoint = process.env.REACT_APP_CAMERA_NAMES_ENDPOINT;

const LiveFeedPage = () => {
  const [liveStreamUrl, setLiveStreamUrl] = useState(null);
  const [cameraDetails, setCameraDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [batchData, setBatchData] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const liveFeedResponse = await apiClient.get(liveFeedEndpoint);
        setLiveStreamUrl(liveFeedResponse.data.liveStreamUrl);
        setBatchData(liveFeedResponse.data.data.batch_jobs);

        const cameraResponse = await apiClient.get(cameraNamesEndpoint);
        setCameraDetails(cameraResponse.data.data);
      } catch (error) {
        setError("Failed to load live feed or camera details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Base URL for images from environment variable
  const baseImageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

  // Function to filter batch data
  const getFilteredBatchData = () => {
    if (!selectedCamera) return [];
    return filterArrayByKeyValue(batchData, 'session_name', selectedCamera.session_name)
      .filter(item => item.image_name === selectedCamera.image_name);
  };

  const filteredBatchData = getFilteredBatchData();

  return (
    <LiveFeedContext.Provider value={{ selectedCamera, setSelectedCamera }}>
      <div>
        <Header />
        <div className="live-feed-page">
          <div className="content-container">
            <div className="live-feed-section">
              <h2 className="section-title">Live Feed</h2>
              {loading && <p>Loading live feed and camera details...</p>}
              {error && <p>{error}</p>}
              {liveStreamUrl && (
                <img src={liveStreamUrl} alt={selectedCamera?.image_cam || "Live Feed"} />
              )}
              {selectedCamera && (
                <>
                  <img
                    src={`${baseImageUrl}/${selectedCamera.session_name}/${selectedCamera.image_name}.jpg`}
                    alt={selectedCamera.image_cam || "Selected Camera Image"}
                  />
                  <div className="camera-info">
                    <h3>Selected Camera: {selectedCamera.image_cam}</h3>
                  </div>
                </>
              )}
            </div>
            <CameraListDisplay cameraDetails={cameraDetails} />
          </div>
          <div className="event-list-container">
            <EventList batchData={filteredBatchData} />
            <ButtonBox />
          </div>
        </div>
      </div>
    </LiveFeedContext.Provider>
  );
};

export default LiveFeedPage;
