import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import EventList from "../eventall/eventlist";
import Header from "../headerall/header";
import CameraList from "../cameraall/cameralist";
import ButtonBox from "../buttonsall/buttons";
import CameraContext from "../cameraall/cameracontext";
import "./livefeed.css";

const LiveFeedPage = () => {
  const { selectedCamera } = useContext(CameraContext);
  const [liveStreamUrl, setLiveStreamUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveFeed = async () => {
      try {
        const response = await axios.get('http://192.168.0.2:9001/hubapi/v1/livefeed/fetch-livefeed', {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVhZ2xhaSIsImV4cCI6MTc0Mzk2MDk2MSwic3ViIjoiYjk3ZDI2MzgtYWY4MS00MmI1LThmNGMtMTk1YjkxMzI5MWY1In0.VKpcF7b5SHpfY0xiQBAkRcd7v6HVH-7UpYPeGE4JEWk'
          }
        });

       
        setLiveStreamUrl(response.data.liveStreamUrl);
        setLoading(false);
      } catch (error) {
        setError("Failed to load live feed");
        setLoading(false);
      }
    };

    fetchLiveFeed();
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
                {loading && <p>Loading live feed...</p>}
                {error && <p>{error}</p>}
                {!loading && liveStreamUrl && (
                  <img
                    src={liveStreamUrl}
                    alt={selectedCamera?.name || "Live Feed"}
                  />
                )}
                {!loading && !liveStreamUrl && !error && (
                  <p>Select a camera to view the live feed.</p>
                )}
                {selectedCamera && (
                  <img src={imageUrl} alt={selectedCamera?.name || "Selected Camera Image"} />
                )}
              </div>
              {selectedCamera && (
                <div className="camera-info">
                  <h3>
                    Selected Camera: {selectedCamera.name || "Camera-1"}
                  </h3>
                  <p>Camera ID: {selectedCamera.id}</p>
                </div>
              )}
            </div>
          </div>
          <div className="camera-list-section">
            <h2 className="section-title"></h2>
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
