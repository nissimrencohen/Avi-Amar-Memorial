import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Timeline = () => {
  const { t } = useTranslation();
  const events = t('timeline.events', { returnObjects: true });

  if (!Array.isArray(events)) return null;

  return (
    <section id="timeline" className="py-20 md:py-32 px-6 bg-slate-50 text-slate-800 flex justify-center w-full relative overflow-hidden">
      <div className="max-w-4xl w-full mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-slate-900 mb-16 md:mb-24 text-center font-light tracking-wide"
        >
          {t('timeline.title')}
        </motion.h2>
        {/* Timeline Line with Elegant Fade Out */}
        <div className="absolute left-1/2 top-32 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-12 md:space-y-24 relative">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex flex-col md:flex-row items-center md:items-start justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-5/12 hidden md:block"></div>

              <div className="z-10 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-slate-900 border-4 border-slate-50 shadow-lg shrink-0 mb-6 md:mb-0 md:mt-6">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-slate-200 rounded-full"></div>
              </div>

              <div className="w-full md:w-5/12 bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 relative group hover:shadow-2xl transition-shadow duration-300">
                <span className="text-sm font-bold tracking-widest text-slate-400 mb-2 block uppercase">{event.year}</span>
                <h3 className="text-xl md:text-2xl font-serif text-slate-800 mb-2 md:mb-4 group-hover:text-slate-900 transition-colors">{event.title}</h3>
                <p className="text-slate-600 font-sans leading-relaxed font-light">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Final Photo Special Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-32 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative bg-slate-900 border border-slate-700/50 group flex flex-col md:flex-row items-stretch"
        >
          {/* Image Container */}
          <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-[70vh] relative bg-[#0a0f18] p-4 md:p-8 flex items-center justify-center">
            <img
              src="/assets/images/last-photo.jpeg"
              alt="The Final Photo"
              className="w-full h-full object-contain opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000 md:group-hover:scale-105 drop-shadow-2xl rounded-xl"
            />
          </div>

          {/* Text Container */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center md:text-start rtl:md:text-right">
            <div className="md:border-r-4 md:border-slate-700 md:pr-8 rtl:md:border-r-0 rtl:md:border-l-4 rtl:md:pl-8">
              <h3 className="text-2xl md:text-3xl font-serif text-slate-100 mb-6 font-medium tracking-wide">
                {t('timeline.lastPhoto.title')}
              </h3>
              <p className="text-lg md:text-xl text-slate-300 font-sans leading-relaxed md:leading-loose whitespace-pre-line font-light italic">
                {t('timeline.lastPhoto.text')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Memorial Site Special Component */}
        <motion.div
          id="memorialSite"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 md:mt-24 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative bg-slate-800 border border-slate-700/50 p-8 md:p-12 text-center"
        >
          {/* Nature / Wadi subtle background mapping */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

          <div className="relative z-10">
            <div className="flex justify-center mb-6 text-emerald-400">
              <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif text-slate-100 mb-6 font-medium tracking-wide">
              {t('timeline.memorialSite.title')}
            </h3>
            <p className="text-lg md:text-xl text-slate-300 font-sans leading-relaxed md:leading-loose whitespace-pre-line max-w-3xl mx-auto mb-10">
              {t('timeline.memorialSite.text')}
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
              <img
                src="/assets/images/gallery/memorial/מפגש הרוכבים ראשי.jpeg"
                alt="מפגש הרוכבים ראשי"
                className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-2xl shadow-xl border border-slate-700/50"
              />
              <img
                src="/assets/images/gallery/memorial/מפגש הרוכבים 5.jpeg"
                alt="מפגש הרוכבים"
                className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-2xl shadow-xl border border-slate-700/50"
              />
            </div>

            <div className="flex justify-center mt-4">
              <a
                href="https://www.google.com/maps?q=31.638589,34.7135269&z=17&hl=en"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-50 font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center space-x-3 rtl:space-x-reverse text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{t('timeline.memorialSite.btnNavigate')}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
