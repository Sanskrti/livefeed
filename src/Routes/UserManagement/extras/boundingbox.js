import { useRef, useEffect } from "react";

const BoundingBoxCanvas = ({
  imgSrc,
  coordinates = [
    { x: 0.1, y: 0.1, width: 0.2, height: 0.4,  label: "apple", color: "green"},
    { x: 0.3, y: 0.3, width: 0.3, height: 0.25, label: "mango", color: "orange"},
    { x: 0.2, y: 0.2, width: 0.2, height: 0.2,  label: "lichi", color: "pink"},
    { x: 0.4, y: 0.5, width: 0.4, height: 0.20, label: "chiku", color: "brown"},
  ],
}) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgSrc) {
      drawOnCanvas();
    }
  }, [imgSrc]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    clearCanvas();

    img.onload = () => {
      const desiredWidth = 400;
      const scaleFactor = desiredWidth / img.width;
      const desiredHeight = img.height * scaleFactor;

      canvas.width = desiredWidth;
      canvas.height = desiredHeight;

      ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);

      for (let i = 0; i < coordinates.length; i++) {

        ctx.fillStyle = coordinates[i].color; 
        ctx.strokeStyle = coordinates[i].color;
        ctx.globalAlpha = 0.5; 
        ctx.fillRect(
          coordinates[i].x * desiredWidth,
          coordinates[i].y * desiredHeight,
          coordinates[i].width * desiredWidth,
          coordinates[i].height * desiredHeight
        );

        ctx.globalAlpha = 1.0; 
        ctx.fillStyle = "black"; 
        ctx.font = "14px Arial";

        ctx.fillText(
          coordinates[i].label,
          coordinates[i].x * desiredWidth + 5,
          coordinates[i].y * desiredHeight + 20
        );
        ctx.lineWidth = 2;
        ctx.strokeRect(
          coordinates[i].x * desiredWidth,
          coordinates[i].y * desiredHeight,
          coordinates[i].width * desiredWidth,
          coordinates[i].height * desiredHeight
        );
      }
    };

    if (img.complete) {
      img.onload();
    }
  };

  return (
    <div>
      <img ref={imgRef} src={imgSrc} alt="User Background" style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ border: "1px solid black", width: "100%", height: "auto" }} />
    </div>
  );
};

export default BoundingBoxCanvas;
