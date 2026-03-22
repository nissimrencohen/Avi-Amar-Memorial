import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import LanguageToggle from './components/LanguageToggle';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Memories from './components/Memories';
import Gallery from './components/Gallery';
import CandleWall from './components/CandleWall';

function App() {
  const { t } = useTranslation();

  return (
    <div className="font-sans min-h-screen bg-slate-50 relative selection:bg-slate-300 selection:text-slate-900">
      <Navbar />
      <Hero />
      <Timeline />
      <Memories />
      <Gallery />
      <CandleWall />
      
      <footer className="bg-slate-950 py-12 px-6 text-center border-t border-slate-900">
        <p className="text-slate-500 font-serif mb-2 italic tracking-wide text-sm md:text-base">
          {t('footer.inMemory', { name: t('personalInfo.name') })}
        </p>
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-slate-600 text-xs md:text-sm font-light">
          <span>{t('personalInfo.birthDate').split(' ').pop()}</span>
          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
          <span>{t('personalInfo.deathDate').split(' ').pop()}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
