import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Minigames from './components/Minigames';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Minigames />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
