import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Memories = () => {
  const { t } = useTranslation();
  const memories = t('memories.items', { returnObjects: true });

  if (!Array.isArray(memories)) return null;

  return (
    <section id="memories" className="py-20 md:py-32 bg-slate-100 text-slate-800 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-slate-900 mb-12 md:mb-16 text-center font-light tracking-wide"
        >
          {t('memories.title')}
        </motion.h2>
        
        <div className="masonry gap-6">
          {memories.map((memory, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="break-inside p-8 mb-6 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-300 ease-in-out group relative overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between space-y-4">
                <svg className="w-8 h-8 text-slate-200 mb-4 transform -translate-x-2 -translate-y-2 group-hover:text-slate-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <p className="text-slate-600 font-serif leading-relaxed text-lg md:text-xl italic font-light z-10 relative">
                  {memory.story}
                </p>
                
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between z-10 relative">
                  <div>
                    <h4 className="text-slate-800 font-medium text-lg tracking-wide">{memory.author}</h4>
                    <span className="text-slate-400 text-xs md:text-sm tracking-widest uppercase">{memory.relation}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-serif shrink-0">
                    {memory.author.charAt(0)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memories;
