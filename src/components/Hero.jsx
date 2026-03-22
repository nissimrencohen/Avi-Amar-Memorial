import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 text-slate-50">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-12"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="mb-8 w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-[3px] border-slate-300/30 shadow-2xl bg-slate-800/40 p-1 md:p-2"
        >
          <img 
            src={t('personalInfo.portrait')} 
            alt={t('personalInfo.name')} 
            className="w-full h-full object-cover object-[center_15%] rounded-full transition-all duration-1000 ease-in-out"
          />
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-slate-100 mb-4 tracking-wide font-light">
          {t('personalInfo.name')}
        </h1>
        
        <div className="flex items-center space-x-4 text-slate-300 text-lg md:text-xl font-light mb-8 rtl:space-x-reverse">
          <span>{t('personalInfo.birthDate')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mx-4"></span>
          <span>{t('personalInfo.deathDate')}</span>
        </div>
        
        <blockquote className="text-xl md:text-2xl lg:text-3xl max-w-2xl font-serif italic text-slate-200 leading-relaxed font-light">
          "{t('personalInfo.quote')}"
        </blockquote>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
