import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (section === 'resume') {
      setCurrentPage('resume');
      window.scrollTo(0, 0);
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          if (section === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' });
          else {
            const el = document.getElementById(section);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // Wait for react to mount home components
      } else {
        if (section === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' });
        else {
          const el = document.getElementById(section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <span className="text-gradient">MT</span>.
        </a>

        <div className="nav-links desktop-links">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          <a href="#resume" onClick={(e) => handleNavClick(e, 'resume')} className={currentPage === 'resume' ? 'text-gradient' : ''}>Resume</a>
          <a href="#minigames" onClick={(e) => handleNavClick(e, 'minigames')}>Games</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
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
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          <a href="#resume" onClick={(e) => handleNavClick(e, 'resume')} className={currentPage === 'resume' ? 'text-gradient' : ''}>Resume</a>
          <a href="#minigames" onClick={(e) => handleNavClick(e, 'minigames')}>Games</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <a href="https://github.com/Mohit-Tripathi-23" target="_blank" rel="noopener noreferrer" className="mobile-social">
            <Code size={20} /> GitHub
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
