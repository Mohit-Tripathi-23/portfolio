import React, { useState, useEffect } from 'react';
import { Palette, X } from 'lucide-react';
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

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'normal';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

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
          <h4>Select Theme</h4>
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
