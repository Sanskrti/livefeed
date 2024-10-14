import { useRef, useEffect } from "react";

const BoundingBoxCanvas = ({ imgSrc }) => {
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

     
      const rect1 = { x: 0.1, y: 0.1, width: 0.2, height: 0.4 };
      const rect2 = { x: 0.4, y: 0.3, width: 0.3, height: 0.25 };

      
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.fillRect(
        rect1.x * desiredWidth,
        rect1.y * desiredHeight,
        rect1.width * desiredWidth,
        rect1.height * desiredHeight
      );
   
      ctx.fillStyle = "black"; 
      ctx.font = "16px Arial";
      ctx.fillText("Label 1", rect1.x * desiredWidth + 5, rect1.y * desiredHeight + 20); 

     
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        rect2.x * desiredWidth,
        rect2.y * desiredHeight,
        rect2.width * desiredWidth,
        rect2.height * desiredHeight
      );
     
      ctx.fillStyle = "black"; 
      ctx.fillText("Label 2", rect2.x * desiredWidth + 5, rect2.y * desiredHeight + 20); 
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
