import React, { useState, useEffect } from 'react';

const SLIDE_IMAGES = [
  {
    src: '/assets/award-hitachi.jpg',
    title: 'Authorised Partner Award — Hitachi Energy',
    tag: 'Recognised Excellence'
  },
  {
    src: '/assets/award-reliance.jpg',
    title: 'Industrial Project Delivery — Reliance Brand Partner',
    tag: 'Industrial EPC'
  },
  {
    src: '/assets/award-jca-guest.jpg',
    title: 'Solar Industry Leadership Award — JCA Rajasthan',
    tag: 'Clean Energy Leadership'
  },
  {
    src: '/assets/award-jca-trophy.jpg',
    title: 'Statewide Excellence Trophy — 150+ MW Milestone',
    tag: '150+ MW Delivered'
  }
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % SLIDE_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-slideshow-wrap">
      {SLIDE_IMAGES.map((img, idx) => (
        <div 
          key={idx} 
          className={`home-slide ${idx === currentIndex ? 'active' : ''}`}
        >
          <img src={img.src} alt={img.title} />
          <div className="home-slide-caption">
            <span className="home-slide-tag">{img.tag}</span>
            <h4>{img.title}</h4>
          </div>
        </div>
      ))}
      <div className="home-slide-dots">
        {SLIDE_IMAGES.map((_, idx) => (
          <button 
            key={idx} 
            type="button"
            className={`home-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
