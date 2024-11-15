
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {

    // Initialize Fabric.js canvas only if not already initialized
    if (!fabricCanvasRef.current && canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        selection: true,
      });
    }

    const canvas = fabricCanvasRef.current;
    if (canvas && imageUrl) {
      // Clear existing canvas content before loading a new image
      canvas.clear();

      // Load image with crossOrigin to avoid tainting issues
      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          img.set({ crossOrigin: 'anonymous' });
          img.scaleToWidth(canvas.width);
          img.set({ selectable: false });
          canvas.add(img);
          canvas.sendToBack(img);
          setIsCanvasReady(true); // Mark canvas as ready after image loads
          
        },
        { crossOrigin: 'anonymous' }
      );
    }

    // Cleanup canvas on unmount
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [imageUrl]);

  // Adds a text box to the canvas
  const addText = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas && isCanvasReady) { // Check if canvas is ready
      const text = new fabric.Textbox("Your Caption", {
        left: 50,
        top: 50,
        fontSize: 24,
        fill: 'white',
        editable: true,
      });
      canvas.add(text);
      canvas.bringToFront(text);
    }
  };

  // Adds a shape to the canvas based on the shape type selected
  const addShape = (shapeType) => {
    const canvas = fabricCanvasRef.current;
    if (canvas && isCanvasReady) { // Ensure canvas is ready
      let shape;
      switch (shapeType) {
        case "circle":
          shape = new fabric.Circle({ radius: 50, fill: 'blue', left: 100, top: 100 });
          break;
        case "rectangle":
          shape = new fabric.Rect({ width: 100, height: 50, fill: 'green', left: 100, top: 100 });
          break;
        case "triangle":
          shape = new fabric.Triangle({ width: 100, height: 100, fill: 'red', left: 100, top: 100 });
          break;
        default:
          return;
      }
      canvas.add(shape);
      canvas.bringToFront(shape);
    }
  };

  // Converts the canvas content to an image and triggers download
  const downloadImage = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas && isCanvasReady) { // Ensure canvas is ready
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'edited-image.png';
      link.click();
    }
  };

  return (
    <div className="canvas-editor">
      <div className="canvas-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <canvas ref={canvasRef} width={600} height={400}></canvas>
      </div>

      <div className="controls" style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
};

export default CanvasEditor;
