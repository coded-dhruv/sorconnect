import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    src: '/assets/award-hitachi.jpg',
    alt: 'Hitachi Energy Authorised Channel Partner Certificate',
    badge: 'Channel Partner',
    title: 'Hitachi Energy Authorised Partner',
    desc: 'Official Channel Partner Certificate for High-Voltage & Grid-Tied Solar Inverters'
  },
  {
    src: '/assets/award-reliance.jpg',
    alt: 'Reliance Authorised Channel Partner Certificate',
    badge: 'National Partner',
    title: 'Reliance Authorised Partner',
    desc: 'Trusted EPC Partner for Industrial & Commercial Solar Infrastructure'
  },
  {
    src: '/assets/award-jca-trophy.jpg',
    alt: 'Jaipur Choice Awards 2024 Trophy',
    badge: 'Excellence Award',
    title: 'Jaipur Choice Awards 2024',
    desc: 'Awardee of the Year — Recognized for Outstanding Contribution to Solar'
  },
  {
    src: '/assets/award-jca-guest.jpg',
    alt: 'Jaipur Choice Awards Certificate',
    badge: 'Special Guest of Honour',
    title: 'Jaipur Choice Awards 2024',
    desc: 'Awarded for Incredible Contribution to Society & Industry Leadership'
  }
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="cert-slideshow-wrapper">
      <div className="cert-slideshow">
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`cert-slide ${idx === currentIndex ? 'active' : ''}`}
          >
            <div className="cert-image-card">
              <img src={slide.src} alt={slide.alt} />
            </div>
            <div className="cert-caption">
              <div className="cert-badge">{slide.badge}</div>
              <h4>{slide.title}</h4>
              <p>{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cert-controls">
        <button
          className="cert-prev"
          aria-label="Previous Slide"
          type="button"
          onClick={goToPrev}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div className="cert-dots">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={`cert-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              role="button"
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          className="cert-next"
          aria-label="Next Slide"
          type="button"
          onClick={goToNext}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
