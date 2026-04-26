import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="nav-logo">
          <span className="text-gradient">MT</span>.
        </a>

        <div className="nav-links desktop-links">
          <a href="#hero">Home</a>
          <a href="#projects">Projects</a>
          <a href="#minigames">Games</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-social desktop-links">
          <a href="https://github.com/Mohit-Tripathi-23" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            <Code size={20} />
            <span>GitHub</span>
          </a>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu glass animate-fade-in">
          <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
          <a href="#minigames" onClick={() => setIsOpen(false)}>Games</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
          <a href="https://github.com/Mohit-Tripathi-23" target="_blank" rel="noopener noreferrer" className="mobile-social">
            <Code size={20} /> GitHub
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
