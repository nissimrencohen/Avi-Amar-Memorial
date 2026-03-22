import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('family'); // 'family' | 'memorial'
  
  // Dynamically load ALL images from both directories
  const familyGlob = import.meta.glob('/public/assets/images/gallery/family/*');
  const memorialGlob = import.meta.glob('/public/assets/images/gallery/memorial/*');
  
  const familyImages = Object.keys(familyGlob).map(path => path.replace('/public', ''));
  const memorialImages = Object.keys(memorialGlob).map(path => path.replace('/public', ''));

  const videos = t('gallery.videos', { returnObjects: true });
  
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const displayImages = activeTab === 'family' ? familyImages : memorialImages;
  const slides = Array.isArray(displayImages) ? displayImages.map(img => ({ src: img })) : [];

  return (
    <section id="gallery" className="py-20 md:py-32 bg-slate-900 text-slate-50 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-serif text-slate-100 mb-8 text-center font-light tracking-wide">
          {t('gallery.title')}
        </h2>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-16 px-4">
          <div className="bg-slate-800 p-1 rounded-full inline-flex relative shadow-xl shadow-slate-950/50">
            <button
              onClick={() => setActiveTab('family')}
              className={`relative z-10 px-6 md:px-10 py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-300 ${
                activeTab === 'family' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('gallery.tabs.family')}
              {activeTab === 'family' && (
                <motion.div 
                  layoutId="active-tab"
                  className="absolute inset-0 bg-slate-100 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('memorial')}
              className={`relative z-10 px-6 md:px-10 py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-300 ${
                activeTab === 'memorial' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('gallery.tabs.memorial')}
              {activeTab === 'memorial' && (
                <motion.div 
                  layoutId="active-tab"
                  className="absolute inset-0 bg-slate-100 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image Grid */}
            {Array.isArray(displayImages) && displayImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px] mb-24">
                {displayImages.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => { setIndex(i); setOpen(true); }}
                    className={`relative group overflow-hidden rounded-2xl bg-slate-800 shadow-2xl shadow-slate-950/50 cursor-pointer ${
                      i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Gallery item`} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-10 h-10 text-white/80 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500 italic mb-24">No images available for this section yet.</p>
            )}
            
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              index={index}
              slides={slides}
            />
          </motion.div>
        </AnimatePresence>

        {/* Video Archive - Displayed independently at bottom of Gallery */}
        {Array.isArray(videos) && videos.length > 0 && (
          <div className="mt-16 border-t border-slate-800 pt-16">
            <h3 className="text-xl md:text-2xl font-sans text-slate-400 mb-8 uppercase tracking-widest text-center font-light pb-4 max-w-2xl mx-auto">
              {t('gallery.videoTitle')}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {videos.map((vid, i) => (
                <div key={i} className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-950/50 bg-slate-800/50 border border-slate-700/50 relative group">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={vid} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                  </iframe>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;
