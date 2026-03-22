import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

const CandleWall = () => {
  const { t, i18n } = useTranslation();
  const [candles, setCandles] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  
  useEffect(() => {
    const q = query(collection(db, 'candles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCandles(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'candles'), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp()
      });
      setName('');
      setMessage('');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <section id="candleWall" className="py-20 md:py-32 bg-slate-800 text-slate-100 px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-flex items-center justify-center p-4 bg-slate-900 rounded-full mb-6 border border-slate-700/50 shadow-2xl shadow-amber-500/10"
          >
            <Flame className="w-8 h-8 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-50 mb-4 font-light tracking-wide">{t('candleWall.title')}</h2>
          <p className="text-slate-400 font-light text-lg">{t('candleWall.subtitle')}</p>
        </div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl max-w-2xl mx-auto mb-20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('candleWall.form.nameLabel')}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('candleWall.form.namePlaceholder')}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t('candleWall.form.messageLabel')}</label>
              <textarea
                required
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('candleWall.form.messagePlaceholder')}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-500 font-medium py-4 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              <Flame className="w-5 h-5" />
              <span>{status === 'submitting' ? t('candleWall.form.submitting') : t('candleWall.form.submit')}</span>
            </button>
            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 text-sm text-center pt-2">
                Candle lit successfully
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Lit Candles Grid */}
        <div className="mb-8">
          <p className="text-slate-400 font-medium tracking-wide text-sm mb-6 border-b border-slate-700/50 pb-4">
            {t('candleWall.candlesCount', { count: candles.length })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {candles.map((candle, idx) => (
                <motion.div
                  key={candle.id || idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-serif text-lg text-slate-200">{candle.name}</h4>
                      {candle.createdAt && (
                        <span className="text-xs text-slate-500 font-sans tracking-wide block mt-1">
                          {candle.createdAt.toDate ? new Intl.DateTimeFormat(i18n.language, { dateStyle: 'medium' }).format(candle.createdAt.toDate()) : ''}
                        </span>
                      )}
                    </div>
                    <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2 + (idx % 3), delay: (idx % 5) * 0.2 }}>
                      <Flame className="w-5 h-5 text-amber-500/80 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    </motion.div>
                  </div>
                  <p className="text-slate-400 font-light leading-relaxed italic flex-grow">"{candle.message}"</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandleWall;
