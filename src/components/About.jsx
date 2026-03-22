import React from 'react';

const About = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-20 md:py-32 px-6 bg-slate-50 text-slate-800 flex justify-center w-full">
      <div className="max-w-3xl lg:max-w-4xl w-full mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-12 md:mb-16 text-center font-light tracking-wide">
          Life Story
        </h2>
        
        <div className="space-y-6 md:space-y-8 text-lg md:text-xl font-sans text-slate-600 leading-relaxed font-light">
          {data.map((paragraph, index) => (
            <p key={index} className="text-justify md:text-left drop-shadow-sm">
              {index === 0 ? (
                <span className="first-letter:text-6xl md:first-letter:text-7xl first-letter:font-serif first-letter:text-slate-800 first-letter:mr-2 float-left leading-[0.8]">
                  {paragraph.charAt(0)}
                </span>
              ) : null}
              {index === 0 ? paragraph.substring(1) : paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
