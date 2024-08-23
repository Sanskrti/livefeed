// src/components/EventCard.js
import React from 'react';


const EventCard = ({ title, details }) => (
  <div className="event-item">
    <h4>{title}</h4>
    <p>{details}</p>
  </div>
);

export default EventCard;
