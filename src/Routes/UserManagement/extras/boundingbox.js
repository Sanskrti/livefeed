import { useRef, useEffect } from "react";

const BoundingBoxCanvas = ({
  // Props passed to the component: 
  // imgSrc: the image source URL to be drawn on the canvas,
  // coordinates: an array of bounding boxes with their position, size, label, and color,
  // showBoundingBoxes: a boolean flag to control whether bounding boxes should be displayed.
  imgSrc,
  coordinates = [
    { x: 0.1, y: 0.1, width: 0.2, height: 0.4, label: "apple", color: "green" },
    { x: 0.3, y: 0.3, width: 0.3, height: 0.25, label: "mango", color: "orange" },
    { x: 0.2, y: 0.2, width: 0.2, height: 0.2, label: "lichi", color: "pink" },
    { x: 0.4, y: 0.5, width: 0.4, height: 0.20, label: "chiku", color: "brown" },
  ],
  showBoundingBoxes,
}) => {
  // useRef creates a mutable reference to hold a reference to the canvas element
  const canvasRef = useRef(null);
  const imgRef = useRef(null); // another ref to hold the image element

  // useEffect hook runs whenever imgSrc or showBoundingBoxes change, 
  // and calls drawOnCanvas to update the canvas
  useEffect(() => {
    if (imgSrc) {
      drawOnCanvas(); // draws the image and bounding boxes when imgSrc is provided
    }
  }, [imgSrc, showBoundingBoxes]); // dependencies: re-runs the effect when imgSrc or showBoundingBoxes changes

  // Function to clear the canvas before drawing
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d"); // get 2D drawing context
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the entire canvas
    }
  };

  // Function to handle drawing the image and bounding boxes on the canvas
  const drawOnCanvas = () => {
    const canvas = canvasRef.current; // reference to the canvas element
    const ctx = canvas.getContext("2d"); // get the 2D rendering context
    const img = imgRef.current; // reference to the image element

    clearCanvas(); // clear canvas before drawing new image and boxes

    // Wait for the image to load before drawing it on the canvas
    img.onload = () => {
      const desiredWidth = 400; // Set the canvas to a fixed width of 400px
      const scaleFactor = desiredWidth / img.width; // Calculate the scale factor to maintain the image aspect ratio
      const desiredHeight = img.height * scaleFactor; // Scale height accordingly

      canvas.width = desiredWidth; // Set canvas width
      canvas.height = desiredHeight; // Set canvas height

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);

      // If bounding boxes are enabled, loop through each and draw them on the canvas
      if (showBoundingBoxes) {
        for (let i = 0; i < coordinates.length; i++) {
          ctx.fillStyle = coordinates[i].color; // Set the box color
          ctx.strokeStyle = coordinates[i].color; // Set the border color for the box
          ctx.globalAlpha = 0.5; // Set transparency for the fill color
          
          // Draw the filled rectangle (bounding box) on the canvas
          ctx.fillRect(
            coordinates[i].x * desiredWidth, // x position (relative to image width)
            coordinates[i].y * desiredHeight, // y position (relative to image height)
            coordinates[i].width * desiredWidth, // box width (relative to image width)
            coordinates[i].height * desiredHeight // box height (relative to image height)
          );

          ctx.globalAlpha = 1.0; // Reset alpha for the label text and border
          ctx.fillStyle = "black"; // Set text color for the label
          ctx.font = "14px Arial"; // Set font style for the label text

          // Draw the label text near the top-left corner of the bounding box
          ctx.fillText(
            coordinates[i].label,
            coordinates[i].x * desiredWidth + 5, // x position for the label
            coordinates[i].y * desiredHeight + 20 // y position for the label
          );

          ctx.lineWidth = 2; // Set the border width for the box
          
          // Draw the border around the bounding box
          ctx.strokeRect(
            coordinates[i].x * desiredWidth, 
            coordinates[i].y * desiredHeight, 
            coordinates[i].width * desiredWidth, 
            coordinates[i].height * desiredHeight
          );
        }
      }
    };

    // If the image is already loaded (not waiting for `onload` event), trigger drawing
    if (img.complete) {
      img.onload(); // manually trigger the image load handler
    }
  };

  // The JSX structure:
  // An image element is used to load the source image but is hidden, as it's only needed for drawing.
  // A canvas element where the image and bounding boxes will be rendered.
  return (
    <div>
      {/* The image element is hidden (display:none) and used only for drawing the image on the canvas */}
      <img ref={imgRef} src={imgSrc} alt="User Background" style={{ display: "none" }} />
      
      {/* Canvas where the image and bounding boxes will be drawn */}
      <canvas ref={canvasRef} style={{ border: "1px solid black", width: "100%", height: "auto" }} />
    </div>
  );
};

export default BoundingBoxCanvas;
