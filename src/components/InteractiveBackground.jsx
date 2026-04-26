import React, { useEffect, useState } from 'react';
import './InteractiveBackground.css';

const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="interactive-bg-container">
      {/* Animated background grid */}
      <div className="bg-grid"></div>

      {/* Floating decorative blobs */}
      <div className="floating-blob blob-1"></div>
      <div className="floating-blob blob-2"></div>
      <div className="floating-blob blob-3"></div>

      {/* Dynamic mouse glow effect */}
      <div 
        className="mouse-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      ></div>
    </div>
  );
};

export default InteractiveBackground;
