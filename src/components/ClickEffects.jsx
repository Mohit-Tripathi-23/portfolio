import React, { useState, useEffect } from 'react';
import './ClickEffects.css';

const ClickEffects = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Get current theme to determine sound type
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'normal';
      
      // Play Synthesized Sound
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        let startFreq, endFreq, type, duration;

        switch(currentTheme) {
          case 'harry-potter':
            type = 'sine';
            startFreq = 1200;
            endFreq = 2000;
            duration = 0.15;
            break;
          case 'sci-fi':
            type = 'sawtooth';
            startFreq = 600;
            endFreq = 100;
            duration = 0.1;
            break;
          case 'dnd':
            type = 'square';
            startFreq = 150;
            endFreq = 50;
            duration = 0.12;
            break;
          default: // normal
            type = 'sine';
            startFreq = 800;
            endFreq = 300;
            duration = 0.1;
            break;
        }

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);
        
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
      } catch (err) {
        // Audio context might be blocked on first click, or unsupported. Safe to ignore.
      }

      // Render Visual Light Ripple
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="click-effects-container">
      {ripples.map(ripple => (
        <div 
          key={ripple.id} 
          className="click-ripple"
          style={{ left: ripple.x, top: ripple.y }}
        ></div>
      ))}
    </div>
  );
};

export default ClickEffects;
