import React from 'react';
import './App.css';
import InteractiveBackground from './components/InteractiveBackground';
import ThemeSwitcher from './components/ThemeSwitcher';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Minigames from './components/Minigames';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <InteractiveBackground />
      <ThemeSwitcher />
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
