import React from 'react';
import { ArrowRight } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge glass">
            <span className="pulse-dot"></span>
            Available for new opportunities
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <br />
            <span className="text-gradient">Mohit Tripathi</span>
          </h1>
          
          <p className="hero-subtitle">
            A passionate developer building modern, responsive, and engaging digital experiences. I turn complex problems into elegant solutions.
          </p>
          
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="hero-image-container glass">
            <img src={profileImg} alt="Mohit Tripathi" className="hero-profile-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
