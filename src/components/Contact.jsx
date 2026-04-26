import React from 'react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">
          Let's <span className="text-gradient">Connect</span>
        </h2>
        
        <div className="contact-container">
          <div className="contact-info glass">
            <h3>Get in Touch</h3>
            <p className="contact-desc">
              Whether you have a project in mind, a question, or just want to say hi, feel free to reach out. I'll try my best to get back to you!
            </p>
            
            <div className="contact-methods">
              <a href="mailto:mohit@example.com" className="contact-method"> {/* Update this email! */}
                <div className="icon-box">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Email Me</h4>
                  <p>Send a message directly</p>
                </div>
              </a>
              
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="contact-method"> {/* Update WhatsApp number! */}
                <div className="icon-box whatsapp">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>Chat with me instantly</p>
                </div>
              </a>
              
              <div className="contact-method">
                <div className="icon-box">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Available Worldwide</p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="contact-form glass" onSubmit={(e) => { e.preventDefault(); window.location.href='mailto:mohit@example.com'; }}>
            <h3>Send a Message</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="4" placeholder="How can I help you?" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary form-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
