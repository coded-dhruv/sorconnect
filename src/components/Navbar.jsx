import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenQuoteModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    return location.pathname === path;
  };

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <span><b>150+ MW</b> managed</span>
            <span><b>13</b> states</span>
            <span><b>130+</b> professionals</span>
          </div>
          <div className="topbar-right">
            <a href="tel:9116992229">Call: 91169 92229</a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-row">
          <Link to="/home" className="brand" onClick={() => setMobileMenuOpen(false)}>
            <img src="/assets/logo.png" alt="Sor Connect logo" className="brand-mark" />
            <span className="brand-text">
              <span className="name">Sor Connect</span>
              <span className="tag">A Step Towards Free Electricity</span>
            </span>
          </Link>

          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <Link 
              to="/home" 
              className={isActive('/home') ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div className="nav-item-dropdown">
              <Link 
                to="/services" 
                className={`dropdown-trigger ${isActive('/services') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services 
                <svg className="chevron-down" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </Link>
              <div className="dropdown-menu">
                <Link to="/services#epc" onClick={() => setMobileMenuOpen(false)}>EPC Services</Link>
                <Link to="/services#installation" onClick={() => setMobileMenuOpen(false)}>Installation &amp; Commissioning</Link>
                <Link to="/services#om" onClick={() => setMobileMenuOpen(false)}>Operation &amp; Maintenance</Link>
                <Link to="/services#design" onClick={() => setMobileMenuOpen(false)}>Solar Designing</Link>
                <Link to="/services#kusum" onClick={() => setMobileMenuOpen(false)}>PM-KUSUM Consultation</Link>
                <Link to="/services#surya-ghar" onClick={() => setMobileMenuOpen(false)}>PM Surya Ghar Yojana</Link>
              </div>
            </div>

            <Link 
              to="/projects" 
              className={isActive('/projects') ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>

            <Link 
              to="/about" 
              className={isActive('/about') ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            <Link 
              to="/contact" 
              className={isActive('/contact') ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <button 
              type="button" 
              className="nav-cta" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuoteModal) onOpenQuoteModal();
              }}
            >
              Get a Free Quote
            </button>
          </nav>

          <button 
            type="button"
            className="nav-toggle" 
            aria-label="Toggle menu" 
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
}
