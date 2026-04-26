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
  const [currentTheme, setCurrentTheme] = useState('normal');
  const [isAudioOn, setIsAudioOn] = useState(false);
  
  const audioCtxRef = useRef(null);
  const oscillatorRefs = useRef([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'normal';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    return () => {
      stopAmbientSound();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const stopAmbientSound = () => {
    oscillatorRefs.current.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch (e) {}
    });
    oscillatorRefs.current = [];
  };

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
    masterGain.gain.value = 0.1; // Keep it quiet and ambient

    if (themeId === 'normal') {
      // Warm, relaxing chord
      [220, 277.18, 329.63].forEach(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq / 2;
        osc.connect(masterGain);
        osc.start();
        oscillatorRefs.current.push(osc);
      });
    } else if (themeId === 'harry-potter') {
      // Ethereal, high pitched shimmering
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        lfo.type = 'sine';
        lfo.frequency.value = 0.5 + (i * 0.2); // Shimmer effect
        lfoGain.gain.value = 10;
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        oscillatorRefs.current.push(lfo);
        
        osc.connect(masterGain);
        osc.start();
        oscillatorRefs.current.push(osc);
      });
      masterGain.gain.value = 0.05; // Make it softer
    } else if (themeId === 'dnd') {
      // Deep, hollow, wind-like drone
      const osc1 = ctx.createOscillator();
      osc1.type = 'square';
      osc1.frequency.value = 65.41; // C2
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;
      
      osc1.connect(filter);
      filter.connect(masterGain);
      osc1.start();
      oscillatorRefs.current.push(osc1);
      masterGain.gain.value = 0.03;
    } else if (themeId === 'sci-fi') {
      // Low rumbling cyberpunk drone
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = 55; // A1
      
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 2; // Fast rumble
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 15;
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      oscillatorRefs.current.push(lfo);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 300;
      
      osc.connect(filter);
      filter.connect(masterGain);
      osc.start();
      oscillatorRefs.current.push(osc);
      masterGain.gain.value = 0.05;
    }
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
