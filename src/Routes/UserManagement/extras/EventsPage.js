import React, { useState } from 'react';
import BoundingBoxCanvas from './boundingbox';

const EventCards = () => {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(false); 

  const events = [
    { id: 1, src: '/cam1.jpg', label: 'Event 1', coordinates: [ { x: 0.1, y: 0.1, width: 0.2, height: 0.4, label: "apple", color: "green" }]},
    { id: 2, src: '/cam2.jpg', label: 'Event 2', coordinates: [ { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }]},
    { id: 3, src: '/cam3.jpg', label: 'Event 3', coordinates: [ { x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" }]},
    { id: 4, src: '/cam4.jpg', label: 'Event 4', coordinates: [ { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }]},
    { id: 5, src: '/cam5.jpg', label: 'Event 5', coordinates: [ { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }]},
    { id: 6, src: '/cam1.jpg', label: 'Event 6', coordinates: [ { x: 0.3, y: 0.3, width: 0.3, height: 0.25,label: "mango", color: "orange"}]},
    { id: 7, src: '/cam2.jpg', label: 'Event 7', coordinates: [ { x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" }]},
    { id: 8, src: '/cam3.jpg', label: 'Event 8', coordinates: [ { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }]},
    { id: 9, src: '/cam1.jpg', label: 'Event 9', coordinates: [ { x: 0.1, y: 0.1, width: 0.2, height: 0.4, label: "apple", color: "green" }]},
    { id: 10, src: '/cam2.jpg', label: 'Event 10', coordinates: [ { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }]},
    { id: 11, src: '/cam3.jpg', label: 'Event 11', coordinates: [ { x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" }]},
    { id: 12, src: '/cam2.jpg', label: 'Event 12', coordinates: [ { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }]},
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button 
        style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          zIndex: 1000,
        }}
        onClick={() => setShowBoundingBoxes(prev => !prev)}
      >
        {showBoundingBoxes ? "Hide Bounding Boxes" : "Show Bounding Boxes"}
      </button>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '10px' }}>
        {events.map((event) => (
          <div key={event.id} style={{ 
              width: '290px', 
              height: '230px', 
              margin: '10px', 
              border: '1px solid #ccc', 
              padding: '10px', 
              boxSizing: 'border-box', 
            }}>
            <BoundingBoxCanvas imgSrc={event.src} coordinates={event.coordinates} showBoundingBoxes={showBoundingBoxes} />
            <h3 style={{ textAlign: 'center' }}>{event.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCards;
