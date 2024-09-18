import React from 'react';
import './event.scss';
const EventList = () => {
  const events = [
    { id: 1, title: 'Event 1', className: 'event-card-1', image: 'cam1.jpg' },
    { id: 2, title: 'Event 2', className: 'event-card-2', image: 'cam2.jpg' },
    { id: 3, title: 'Event 3', className: 'event-card-3', image: 'cam3.jpg' },
    { id: 4, title: 'Event 4', className: 'event-card-4', image: 'cam4.jpg' },
    { id: 5, title: 'Event 5', className: 'event-card-5', image: 'cam5.jpg' },
  ];

  return (
    <div className="event-list-section">
      
      <div className="event-list">
    <h3 className="section-title">Events</h3>

        {events.map((event) => (
          <div key={event.id} className={`event-item ${event.className}`}>
            <img src={event.image} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p>{event.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default EventList;
