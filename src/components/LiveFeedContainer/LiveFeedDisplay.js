import React, { useState, useEffect, createContext } from "react";
import EventList from "../EventContainer/EventsDisplay";
import Header from "../HeaderContainer/HeaderDisplay";
import ButtonBox from "../ButtonContainer/ButtonDisplay";
import CameraListDisplay from "../CameraContainer/CameraListDisplay";
import "./LiveFeedStyling.scss";
import { apiClient,cameraFetchEndpoint } from "../../api/apiClient";
import filterArrayByKeyValue from "../../utils/FilterArrayByKeyValue";

export const LiveFeedContext = createContext();

const LiveFeedPage = () => {
  const [liveStreamUrl, setLiveStreamUrl] = useState(null);
  const [cameraDetails, setCameraDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [batchData, setBatchData] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const baseImageUrl = process.env.REACT_APP_BASE_IMAGE_URL;
  
  const fetchLiveFeedData = async () => {
    try {
      const response = await apiClient.get("/livefeed/fetch-livefeed");
      return response.data;
    } catch (error) {
      console.error("Error fetching live feed data:", error);
      throw new Error("Error fetching live feed data");
    }
  };


  const fetchCameraNames = async () => {
    try {
      const response = await apiClient.get(cameraFetchEndpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching camera names:", error);
      throw new Error("Error fetching camera names");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const liveFeedResponse = await fetchLiveFeedData();
        setLiveStreamUrl(liveFeedResponse.liveStreamUrl);
        setBatchData(liveFeedResponse.data.batch_jobs);

        const cameraResponse = await fetchCameraNames();
        setCameraDetails(cameraResponse.data);
      } catch (error) {
        setError("Failed to load live feed or camera details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBatchData = filterArrayByKeyValue(batchData, "image_cam", selectedCamera)[0];

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
                <img src={liveStreamUrl} alt={filteredBatchData?.image_cam || "Live Feed"} />
              )}
              {filteredBatchData && (
                <>
                  <img
                    src={`${baseImageUrl}/${filteredBatchData.session_name}/${filteredBatchData.image_name}.jpg`}
                    alt={filteredBatchData.image_cam || "Selected Camera Image"}
                  />
                  <div className="camera-info">
                    <h3>Selected Camera: {filteredBatchData.image_cam}</h3>
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
