import React from 'react';
import './BlankPageStyling.scss'; 
import EventCards from '../../Routes/UserManagement/extras/EventsPage';

const BlankPage = ({ page }) => (
  <>
    <div className="blank-page">{page}</div>
    <div>
      <h1>Events Page</h1>
      <EventCards />
    </div>
  </>
);

export default BlankPage;
