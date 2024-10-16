import React, { useState } from 'react';
import BoundingBoxCanvas from './boundingbox'; // Custom component that displays the image with bounding boxes
import CustomDialog from './CustomeDialog';  // Reusable dialog component for displaying images in a modal

// Main EventCards component to display events and show bounding boxes on images
const EventCards = () => {
  // State for showing/hiding bounding boxes on the images
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(false);

  // State to keep track of the selected image when an event card is clicked
  const [selectedImage, setSelectedImage] = useState(null);

  // State to keep track of the bounding box coordinates for the selected image
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);

  // State to control whether the dialog is open or closed
  const [open, setOpen] = useState(false);

  // Data array containing details of events, including the image src and coordinates of bounding boxes
  const events = [
    { id: 1, src: '/cam1.jpg', label: 'Event 1', coordinates: [{ x: 0.1, y: 0.1, width: 0.2, height: 0.4, label: "apple", color: "green"}]},
    { id: 2, src: '/cam2.jpg', label: 'Event 2', coordinates: [{ x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown"}]},
    { id: 3, src: '/cam3.jpg', label: 'Event 3', coordinates: [{ x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink"}]},
    { id: 4, src: '/cam4.jpg', label: 'Event 4', coordinates: [{ x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown"}]},
    { id: 5, src: '/cam5.jpg', label: 'Event 5', coordinates: [{ x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown"}]},
    { id: 6, src: '/cam1.jpg', label: 'Event 6', coordinates: [{ x: 0.3, y: 0.3, width: 0.3, height: 0.25,label: "mango", color: "orange"}]},
    { id: 7, src: '/cam2.jpg', label: 'Event 7', coordinates: [{ x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" }]},
    { id: 8, src: '/cam3.jpg', label: 'Event 8', coordinates: [{ x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown"}]},
    { id: 9, src: '/cam4.jpg', label: 'Event 9', coordinates: [{ x: 0.1, y: 0.1, width: 0.2, height: 0.4, label: "apple", color: "green"}]},
    { id: 10,src: '/cam1.jpg', label: 'Event 10',coordinates: [{ x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown"}]},
    { id: 11,src: '/cam3.jpg', label: 'Event 11',coordinates: [{ x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" }]},
    { id: 12,src: '/cam5.jpg', label: 'Event 12',coordinates: [{ x: 0.4, y: 0.5, width: 0.4, height: 0.2, label: "chiku", color: "brown"}]},
  ];

  // Event handler when an image is clicked: opens the dialog and sets the selected image and its bounding boxes
  const handleImageClick = (event) => {
    setSelectedImage(event.src); // Set the clicked image as the selected image
    setSelectedCoordinates(event.coordinates); // Set the bounding box coordinates for the selected image
    setOpen(true); // Open the dialog to display the image in a larger view
  };

  // Function to close the dialog and reset the selected image and bounding boxes
  const closeDialog = () => {
    setOpen(false); // Close the dialog
    setSelectedImage(null); // Reset the selected image
    setSelectedCoordinates([]); // Clear the bounding box coordinates
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Button to toggle showing/hiding bounding boxes */}
      <button 
        style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          zIndex: 1000, // Ensures the button stays on top of the page content
        }}
        onClick={() => setShowBoundingBoxes(prev => !prev)} // Toggles the showBoundingBoxes state
      >
        {showBoundingBoxes ? "Hide Bounding Boxes" : "Show Bounding Boxes"} {/* Button text based on state */}
      </button>
      
      {/* Container for event cards, flexbox used to display them in a grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '10px' }}>
        {/* Map through the events array and render each event card */}
        {events.map((event) => (
          <div key={event.id} style={{ 
              width: '290px', // Sets a fixed width for each event card
              height: '230px', // Sets a fixed height for each event card
              margin: '10px', // Adds space between cards
              border: '1px solid #ccc', // Border for visual separation
              padding: '10px', // Adds internal padding inside the card
              boxSizing: 'border-box', // Ensures padding is included in the card's width/height
              cursor: 'pointer' // Cursor changes to a pointer when hovering over the card
            }} onClick={() => handleImageClick(event)}> 
            
            {/* BoundingBoxCanvas component used to display the event image with optional bounding boxes */}
            <BoundingBoxCanvas imgSrc={event.src} coordinates={event.coordinates} showBoundingBoxes={showBoundingBoxes} />
            
            {/* Event label displayed below the image */}
            <h3 style={{ textAlign: 'center' }}>{event.label}</h3>
          </div>
        ))}
      </div>

      {/* CustomDialog component to show the selected image and its bounding boxes in a larger view */}
      <CustomDialog open={open} onClose={closeDialog}>
        {/* Inside the dialog, use the BoundingBoxCanvas to display the selected image with bounding boxes */}
        <BoundingBoxCanvas imgSrc={selectedImage} coordinates={selectedCoordinates} showBoundingBoxes={showBoundingBoxes} />
      </CustomDialog>
    </div>
  );
};

export default EventCards;
