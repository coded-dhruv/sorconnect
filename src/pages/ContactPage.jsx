import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <main className="contact-page-main">
      
      {/* Page Hero */}
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / Contact</div>
          <span className="eyebrow on-dark">Let's Power Your Future</span>
          <h1>Ready to make the switch to solar?</h1>
          <p>Tell us about your site and energy needs — our engineering team will get back to you with a feasibility assessment within one business day.</p>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="contact-card-wrap">
            <ContactForm 
              formId="contact-page-form"
              title="Request a Customized Solar Quote"
              subtitle="Fill out the details below to receive your customized solar assessment &amp; subsidy calculation."
              buttonText="Get Free Proposal"
              subject="Contact Page Lead - Sor Connect"
            />
          </div>
        </div>
      </section>

      {/* Office Locations Grid */}
      <section className="section office-locations-section section-sage">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">✦ CONTACT US ✦</span>
            <h2>Our Offices</h2>
            <p>Visit our engineering centers or get in touch directly.</p>
          </div>

          <div className="offices-grid mt-48">
            
            {/* Office 1: Jaipur Head Office */}
            <div className="office-col-card">
              <div className="office-badge">HEAD OFFICE</div>
              <h3>Jaipur</h3>
              <div className="office-details-list">
                <div className="office-detail-row">
                  <span className="icon-circle">📍</span>
                  <span>F-02, P.No. 3/410, Sector 3, Chitrakoot, Vaishali Nagar, Jaipur, Rajasthan 302021</span>
                </div>
                <div className="office-detail-row">
                  <span className="icon-circle">📞</span>
                  <span><a href="tel:9116992229">91169 92229</a></span>
                </div>
              </div>
              <div className="office-map-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3557.8563419264037!2d75.74240107543929!3d26.908053976649846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDU0JzI5LjAiTiA3NcKwNDQnNDEuOSJF!5e0!3m2!1sen!2sin!4v1784372841722!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Sor Connect Jaipur Head Office"
                ></iframe>
              </div>
            </div>

            {/* Office 2: Agra Branch Office */}
            <div className="office-col-card">
              <div className="office-badge">BRANCH OFFICE</div>
              <h3>Agra</h3>
              <div className="office-details-list">
                <div className="office-detail-row">
                  <span className="icon-circle">📍</span>
                  <span>163, Jaipur House Complex, Opp. Bhanu Media, Jaipur House, Agra, Uttar Pradesh 282002</span>
                </div>
                <div className="office-detail-row">
                  <span className="icon-circle">📞</span>
                  <span><a href="tel:9116992229">91169 92229</a></span>
                </div>
              </div>
              <div className="office-map-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.9685361471707!2d77.98615857586081!3d27.18872567648373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974773cc052faf5%3A0x7317bf6d70e7ad98!2sSor%20Connect!5e0!3m2!1sen!2sin!4v1784372875732!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Sor Connect Agra Branch Office"
                ></iframe>
              </div>
            </div>

            {/* Office 3: Direct Founder Contact */}
            <div className="office-col-card">
              <div className="office-badge">DIRECT CONTACT</div>
              <h3>Vivek Jain</h3>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--leaf)', marginTop: '-14px', marginBottom: '20px' }}>
                Founder &amp; Managing Director
              </div>
              <div className="office-details-list">
                <div className="office-detail-row">
                  <span className="icon-circle">📞</span>
                  <span><a href="tel:9928993000">99289 93000</a></span>
                </div>
                <div className="office-detail-row">
                  <span className="icon-circle">🏢</span>
                  <span>Jaipur &amp; Agra Central Operations</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Before You Reach Out Info Strip */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Before You Reach Out</span>
            <h2>What to have ready for a faster quote</h2>
          </div>
          <div className="card-grid cols-3 mt-48">
            <div className="card">
              <div className="icon-wrap">📄</div>
              <h3>Recent Electricity Bill</h3>
              <p>Helps us estimate your load profile, sanctioned load, and right-size the plant for maximum savings.</p>
            </div>
            <div className="card">
              <div className="icon-wrap">🏠</div>
              <h3>Rooftop or Land Details</h3>
              <p>Approximate area (sq ft / acres), orientation, and shading helps our team gauge feasibility quickly.</p>
            </div>
            <div className="card">
              <div className="icon-wrap">⏱️</div>
              <h3>Your Target Timeline</h3>
              <p>Let us know your target commissioning window so we can plan procurement and DISCOM approvals accordingly.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
