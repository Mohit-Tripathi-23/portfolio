import React, { useState, useEffect, useRef } from 'react';
import { Palette, X, Volume2, VolumeX } from 'lucide-react';
import './ThemeSwitcher.css';

const themes = [
  { id: 'normal', name: 'Normal', icon: '🌌' },
  { id: 'harry-potter', name: 'Harry Potter', icon: '⚡' },
  { id: 'dnd', name: 'D&D', icon: '🐉' },
  { id: 'sci-fi', name: 'Sci-Fi', icon: '🤖' }
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'normal';
  });
  const [isAudioOn, setIsAudioOn] = useState(false);
  
  const audioCtxRef = useRef(null);
  const oscillatorRefs = useRef([]);
  const intervalRef = useRef(null);

  const stopAmbientSound = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    oscillatorRefs.current.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch (e) {}
    });
    oscillatorRefs.current = [];
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    return () => {
      stopAmbientSound();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const playAmbientSound = (themeId) => {
    stopAmbientSound();
    
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.value = 0.2; // Soft master volume

    // Define relaxing piano/music-box scales for each theme
    const scales = {
      'normal': [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj7 (Calm, relaxing)
      'harry-potter': [329.63, 392.00, 493.88, 587.33, 659.25, 783.99], // Em (Magical, mysterious)
      'dnd': [146.83, 220.00, 293.66, 349.23, 440.00], // Dm (Deep, tavern acoustic)
      'sci-fi': [277.18, 349.23, 415.30, 523.25, 622.25] // Dbmaj7#11 (Dreamy space piano)
    };
    
    const speeds = {
      'normal': 600,
      'harry-potter': 400,
      'dnd': 800,
      'sci-fi': 700
    };

    const notes = scales[themeId] || scales['normal'];
    const speed = speeds[themeId] || 600;

    let noteIndex = 0;
    
    const playNextNote = () => {
      // Generative random walk up and down the scale
      if (Math.random() > 0.4) {
        noteIndex = (noteIndex + 1) % notes.length;
      } else {
        noteIndex = (noteIndex - 1 + notes.length) % notes.length;
      }
      
      const freq = notes[noteIndex];
      const time = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      // Use pure sine wave for extremely soft, round piano/bell tone
      osc.type = themeId === 'sci-fi' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, time);
      
      // Piano-like ADSR Envelope
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.4, time + 0.05); // Soft attack
      gainNode.gain.exponentialRampToValueAtTime(0.1, time + 1.0); // Decay
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 3.0); // Long release fade
      
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      
      osc.start(time);
      osc.stop(time + 3.5);
      
      oscillatorRefs.current.push(osc);
      
      // Clean up memory
      if (oscillatorRefs.current.length > 15) {
        oscillatorRefs.current.shift();
      }
    };

    playNextNote(); // Play first note immediately
    intervalRef.current = setInterval(playNextNote, speed);
  };

  useEffect(() => {
    if (isAudioOn) {
      playAmbientSound(currentTheme);
    } else {
      stopAmbientSound();
    }
  }, [currentTheme, isAudioOn]);

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('portfolio-theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher-container">
      {isOpen && (
        <div className="theme-menu glass animate-fade-in">
          <div className="theme-menu-header">
            <h4>Select Theme</h4>
            <button className="audio-toggle-btn" onClick={toggleAudio} title="Toggle Theme Audio">
              {isAudioOn ? <Volume2 size={20} className="text-gradient" /> : <VolumeX size={20} />}
            </button>
          </div>
          <div className="theme-options">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
              >
                <span className="theme-icon">{theme.icon}</span>
                <span className="theme-name">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button 
        className="theme-toggle-btn glass" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle themes"
      >
        {isOpen ? <X size={24} /> : <Palette size={24} />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
