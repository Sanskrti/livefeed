import React from 'react';
import BoundingBoxCanvas from './boundingbox';

const EventCards = () => {
  const events = [
    { id: 1, src: '/cam1.jpg', label: 'Event 1', coordinates: [
        { x: 0.1, y: 0.1, width: 0.2, height: 0.4,  label: "apple", color: "green" },
        { x: 0.3, y: 0.3, width: 0.3, height: 0.25, label: "mango", color: "orange" }
      ]
    },
    { id: 2, src: '/cam2.jpg', label: 'Event 2', coordinates: [
        { x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" },
        { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }
      ]
    },
    { id: 3, src: '/cam3.jpg', label: 'Event 3', coordinates: [
        { x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" },
        { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }
      ]
    },{ id: 4, src: '/cam4.jpg', label: 'Event 4', coordinates: [
        { x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" },
        { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }
      ]
    },{ id: 5, src: '/cam5.jpg', label: 'Event 5', coordinates: [
        { x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" },
        { x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown" }
      ]
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '20px' }}>
      {events.map((event) => (
        <div key={event.id} style={{ position: 'relative', border: '1px solid #ccc', padding: '10px', width: '300px' }}>
          <BoundingBoxCanvas imgSrc={event.src} coordinates={event.coordinates} />
          <h3 style={{ textAlign: 'center' }}>{event.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default EventCards;
