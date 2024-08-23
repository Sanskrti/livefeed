import React from 'react';

const LiveFeedPage = ({ liveStreamUrl, handleCameraClick, cameras, events, currentCameraName }) => {
  return (
    <div className="live-feed-container">
      <div className="camera-video-section">
        <div className="video-stream">
          <div className="video-content">
            {liveStreamUrl ? (
              <div className="video-wrapper">
                <img src={liveStreamUrl} alt={currentCameraName} className="video-image" />
                {currentCameraName && (
                  <div className="camera-name">{currentCameraName}</div>
                )}
              </div>
            ) : (
              <p>Select a camera to view its feed</p>
            )}
          </div>
        </div>
        <div className="camera-list">
          <ul>
            {cameras.map(camera => (
              <li key={camera.id} onClick={() => handleCameraClick(camera)}>
                <h4>{camera.name}</h4>
                <img src={camera.thumbnail} alt={camera.name} className="camera-thumbnail" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="event-list-section">
        <div className="event-list">
          {events.map(event => (
            <div key={event.id} className="event-item">
              <h4>{event.title}</h4>
              <p>{event.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveFeedPage;
