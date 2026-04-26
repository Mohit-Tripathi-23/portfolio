import React, { useState, useEffect, useRef } from 'react';
import { Palette, X, Volume2, VolumeX } from 'lucide-react';
import './ThemeSwitcher.css';

const themes = [
  { id: 'normal', name: 'Normal', icon: '🌌', audio: 'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg' },
  { id: 'harry-potter', name: 'Harry Potter', icon: '⚡', audio: 'https://actions.google.com/sounds/v1/magic/wind_chimes.ogg' },
  { id: 'dnd', name: 'D&D', icon: '🐉', audio: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg' },
  { id: 'sci-fi', name: 'Sci-Fi', icon: '🤖', audio: 'https://actions.google.com/sounds/v1/science_fiction/space_room.ogg' }
];

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('normal');
  const [isAudioOn, setIsAudioOn] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'normal';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set up audio looping
    audioRef.current.loop = true;
    
    return () => {
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    const activeTheme = themes.find(t => t.id === currentTheme);
    if (activeTheme) {
      audioRef.current.src = activeTheme.audio;
      if (isAudioOn) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  }, [currentTheme, isAudioOn]);

  const toggleAudio = () => {
    if (isAudioOn) {
      audioRef.current.pause();
      setIsAudioOn(false);
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      setIsAudioOn(true);
    }
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
