import React, { useState, useEffect, useContext, createContext } from "react";
import {
  apiClient,
  liveFeedEndpoint,
  cameraNamesEndpoint,
} from "../../api/apiclient";
// import { apiClient } from '../../api/apiclient';
import EventList from "../EventContainer/EventsDisplay";
import Header from "../HeaderContainer/HeaderDisplay";
import ButtonBox from "../ButtonContainer/ButtonDisplay";
import "./LiveFeedStyling.scss";
import SideBarContainer from "../SideBarContainer/SideBarDisplay";

export const LiveFeedContext = createContext();

const LiveFeedPage = () => {
  // const { selectedCamera, setSelectedCamera } = useContext(CameraContext);
  const [liveStreamUrl, setLiveStreamUrl] = useState(null);
  const [cameraDetails, setCameraDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [batchData, setBatchData] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const liveFeedResponse = await apiClient.get(liveFeedEndpoint);
        setLiveStreamUrl(liveFeedResponse.data.liveStreamUrl);
        setBatchData(liveFeedResponse.data.data.batch_jobs);
      } catch (error) {
        setError("Failed to load live feed");
      }

      try {
        const cameraResponse = await apiClient.get(cameraNamesEndpoint);
        setCameraDetails(cameraResponse.data.data);
      } catch (error) {
        setError((prevError) =>
          prevError
            ? `${prevError}. Failed to load camera details`
            : "Failed to load camera details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                <img
                  src={liveStreamUrl}
                  alt={selectedCamera?.image_cam || "Live Feed"}
                />
              )}
              {selectedCamera && (
                <>
                  <img
                    src={`http://192.168.0.2:9001/serving-static-files-for-download/res/${selectedCamera.session_name}/${selectedCamera.image_name}.jpg`}
                    alt={selectedCamera.image_cam || "Selected Camera Image"}
                  />
                  <div className="camera-info">
                    <h3>
                      Selected Camera: {selectedCamera.name || "Camera-1"}
                    </h3>
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
                    onClick={() => setSelectedCamera(camera)}
                    style={{ cursor: "pointer" }}
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
    </LiveFeedContext.Provider>
  );
};

export default LiveFeedPage;
 