import React from 'react';

const EventList = () => {
  const events = [
    { id: 1, title: 'Event 1', className: 'event-card-1' },
    { id: 2, title: 'Event 2', className: 'event-card-2' },
    { id: 3, title: 'Event 3', className: 'event-card-3' },
    { id: 4, title: 'Event 4',className: 'event-card-4' },
    { id: 5, title: 'Event 5', className: 'event-card-5' },
  ];

  return (
    <div className="event-list-section">
      <h2 className="section-title"></h2>
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className={`event-item ${event.className}`}>
            <h3>{event.title}</h3>
            <p>{event.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
