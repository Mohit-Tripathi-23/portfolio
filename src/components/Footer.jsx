import React from 'react';
import { Code, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-container">
        <div className="footer-content">
          <p className="footer-text">
            Built with <Heart size={16} className="heart-icon" /> by Mohit Tripathi
          </p>
          <div className="footer-social">
            <a href="https://github.com/Mohit-Tripathi-23" target="_blank" rel="noopener noreferrer">
              <Code size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
