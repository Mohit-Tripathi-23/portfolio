import React from 'react';
import './App.css';
import InteractiveBackground from './components/InteractiveBackground';
import ThemeSwitcher from './components/ThemeSwitcher';
import ClickEffects from './components/ClickEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Minigames from './components/Minigames';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Resume from './components/Resume';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  return (
    <div className="app-container">
      <ClickEffects />
      <InteractiveBackground />
      <ThemeSwitcher />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' ? (
        <main>
          <Hero />
          <Projects />
          <Minigames />
          <Contact />
        </main>
      ) : (
        <main>
          <Resume />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
