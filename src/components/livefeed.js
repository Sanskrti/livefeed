import React from "react";
import EventCard from "./eventlist";
import Header from "./header";

const LiveFeedPage = ({
  liveStreamUrl,
  handleCameraClick,
  cameras,
  events,
  currentCameraName,
}) => (
  <div className="live-feed-page">
    <Header />
    <div className="content-container">
      <div className="live-feed-section">
        <h2 className="section-title">Live Feed</h2>
        <div className="video-stream">
          <div
            className="video-content"
            style={{ width: "100px", height: "100px", overflow: "hidden" }}
          >
            {liveStreamUrl ? (
              <img src={liveStreamUrl} />
            ) : (
              <p>Select a camera to view the live feed.</p>
            )}
          </div>
          {currentCameraName && (
            <div className="camera-name">{currentCameraName}</div>
          )}
        </div>
      </div>

      <div className="camera-list-section">
        <h2 className="section-title">Camera List</h2>
        <div className="camera-list">
          <ul>
            {cameras.map((camera) => (
              <li key={camera.id} onClick={() => handleCameraClick(camera)}>
                <h4>{camera.name}</h4>
                <img src={camera.thumbnail} height={100} /> 
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div className="event-list-section">
      <h2 className="section-title">Event List</h2>
      <div className="event-list">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            details={event.details}
          />
        ))}
      </div>
    </div>
  </div>
);

export default LiveFeedPage;
 