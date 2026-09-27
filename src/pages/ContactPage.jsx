import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <main>
      
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / Contact</div>
          <span className="eyebrow on-dark">Let's Power Your Future</span>
          <h1>Ready to make the switch to solar?</h1>
          <p>
            Tell us about your site and energy needs — our engineering team will get back to you with a feasibility assessment within one business day.
          </p>
        </div>
      </section>

      {/* ============ CONTACT FORM ============ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '660px' }}>
          <ContactForm 
            formId="contact-page-form"
            title="Request a Customized Solar Quote"
            subtitle="Fill out the details below to receive your customized solar assessment & subsidy calculation."
            buttonText="Get Free Proposal"
          />
        </div>
      </section>

      {/* ============ OFFICE LOCATIONS SECTION ============ */}
      <section className="section office-locations-section">
        <div className="container">
          <div className="section-head center" style={{ textAlign: 'center' }}>
            <span className="eyebrow" style={{ background: 'var(--leaf)', color: 'var(--white)', padding: '5px 12px', borderRadius: '3px', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>✦ CONTACT US ✦</span>
            <h2 style={{ fontFamily: 'var(--heading)', fontWeight: 700, color: 'var(--forest-deep)', fontSize: 'clamp(24px, 3.5vw, 32px)', marginTop: '16px', marginBottom: '50px' }}>Our Offices</h2>
          </div>

          <div className="offices-grid">
            
            {/* Office 1: Head Office Jaipur */}
            <div className="office-col-card">
              <div className="office-badge">HEAD OFFICE</div>
              <h3>Jaipur</h3>
              <div className="office-details-list">
                <div className="office-detail-row">
                  <span className="icon-circle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span>F – 02, P.No. – 3/410, Sector 3, Chitrakoot, Vaishali Nagar, Jaipur, Rajasthan 302021</span>
                </div>

                <div className="office-detail-row">
                  <span className="icon-circle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span><a href="tel:9116992229">91169 92229</a></span>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="office-map-wrapper" style={{ width: '100%', height: '200px', marginTop: '24px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--sage-line)' }}>
                <iframe 
                  title="Sor Connect Jaipur Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3557.8563419264037!2d75.74240107543929!3d26.908053976649846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDU0JzI5LjAiTiA3NcKwNDQnNDEuOSJF!5e0!3m2!1sen!2sin!4v1784372841722!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            {/* Office 2: Branch Office Agra */}
            <div className="office-col-card">
              <div className="office-badge">BRANCH OFFICE</div>
              <h3>Agra</h3>
              <div className="office-details-list">
                <div className="office-detail-row">
                  <span className="icon-circle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span>163, Jaipur House Complex, Opp. Bhanu Media, Jaipur House, Agra, Uttar Pradesh 282002</span>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="office-map-wrapper" style={{ width: '100%', height: '200px', marginTop: '24px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--sage-line)' }}>
                <iframe 
                  title="Sor Connect Agra Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.9685361471707!2d77.98615857586081!3d27.18872567648373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974773cc052faf5%3A0x7317bf6d70e7ad98!2sSor%20Connect!5e0!3m2!1sen!2sin!4v1784372875732!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            {/* Office 3: Direct Contact Vivek Jain */}
            <div className="office-col-card">
              <div className="office-badge">DIRECT CONTACT</div>
              <h3>Vivek Jain</h3>
              <div style={{ fontFamily: 'var(--label)', fontSize: '13px', fontWeight: 700, color: 'var(--leaf)', marginTop: '-18px', marginBottom: '22px' }}>
                Founder &amp; Managing Director
              </div>
              <div className="office-details-list">
                <div className="office-detail-row">
                  <span className="icon-circle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span><a href="tel:9928993000">99289 93000</a></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ FAQ PREPARATION CARDS ============ */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Before You Reach Out</span>
            <h2>What to have ready for a faster quote</h2>
          </div>
          <div className="card-grid cols-3">
            <div className="card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/>
                </svg>
              </div>
              <h3>Recent Electricity Bill</h3>
              <p>Helps us estimate your load profile and right-size the plant for maximum savings.</p>
            </div>
            <div className="card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <h3>Rooftop or Land Details</h3>
              <p>Approximate area, orientation, and any shading helps our team gauge feasibility quickly.</p>
            </div>
            <div className="card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
                </svg>
              </div>
              <h3>Your Timeline</h3>
              <p>Let us know your target commissioning window so we can plan procurement accordingly.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
