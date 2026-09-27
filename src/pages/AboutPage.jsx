import React from 'react';
import { Link } from 'react-router-dom';

const TIMELINE = [
  {
    year: '2020',
    title: 'The Inception',
    desc: 'Founded by Mr. Vivek Jain with a mission to deliver honest, uncompromising solar engineering. Began managing initial 2 MW solar maintenance portfolio in Rajasthan.'
  },
  {
    year: '2021',
    title: 'First 25 MW Milestone',
    desc: 'Expanded into full-scale industrial EPC across textile and stone processing hubs in Kishangarh, Ajmer, and Bhilwara.'
  },
  {
    year: '2022',
    title: 'Multi-State Expansion',
    desc: 'Opened Agra regional branch office to support Uttar Pradesh and Haryana. Crossed 50 MW under active EPC and O&M management.'
  },
  {
    year: '2023',
    title: 'Hitachi & Sungrow Partnerships',
    desc: 'Secured official authorized sub-distributorship for Hitachi Energy inverters and strategic tie-up with Sungrow Power Supply.'
  },
  {
    year: '2024',
    title: 'PM-KUSUM & 100+ MW Milestone',
    desc: 'Empanelled for PM-KUSUM solar agricultural schemes and reached 100+ MW total managed capacity across 9 states.'
  },
  {
    year: '2026',
    title: '150+ MW & PM Surya Ghar Leader',
    desc: 'Over 150 MW managed across 13 states, 130+ engineering professionals, and authorized turnkey installer for PM Surya Ghar rooftop solar.'
  }
];

export default function AboutPage({ onOpenQuoteModal }) {
  return (
    <main className="about-page-main">
      
      {/* Page Hero */}
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / About Us</div>
          <span className="eyebrow on-dark">Engineering Excellence Since 2020</span>
          <h1>Empowering India with Clean, Free Electricity</h1>
          <p>Over 150 MW of solar projects delivered across 13 Indian states, powered by a dedicated team of 130+ engineers and renewable energy specialists.</p>
        </div>
      </section>

      {/* Founder & Mission Section */}
      <section className="section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-text">
              <span className="eyebrow">Our Journey</span>
              <h2>From a 2 MW Maintenance Team to 150+ MW Nationwide Leader</h2>
              <p>
                What began in 2020 as a modest solar maintenance initiative managing just 2 MW in Rajasthan has evolved into one of the most reliable and recognized EPC brands in the Indian renewable energy space.
              </p>
              <p>
                Founded by <strong>Mr. Vivek Jain</strong>, Sor Connect was built on a single core principle: solar systems should produce maximum kilowatt-hours not just on day one, but for 25 continuous years.
              </p>
              <p>
                Today, Sor Connect manages over <strong>150 MW</strong> of solar assets across 13 states in India. Our in-house team of 130+ professionals handles every step under one roof: Engineering &amp; PVsyst Designing, Procurement, Civil Construction, DISCOM Liaisoning, Net Metering, and 25-Year Asset Maintenance.
              </p>

              <div className="about-stats-mini-grid mt-32">
                <div>
                  <h4 style={{ fontSize: '28px', color: 'var(--leaf)', margin: '0 0 4px 0' }}>150+ MW</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-soft)' }}>Managed Capacity</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '28px', color: 'var(--leaf)', margin: '0 0 4px 0' }}>130+</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-soft)' }}>Full-Time Staff</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '28px', color: 'var(--leaf)', margin: '0 0 4px 0' }}>13</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-soft)' }}>States Deployed</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '28px', color: 'var(--leaf)', margin: '0 0 4px 0' }}>650+</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-soft)' }}>Total Projects</p>
                </div>
              </div>
            </div>

            <div className="about-story-image-wrap">
              <img src="/assets/director.jpeg" alt="Vivek Jain - Founder & Managing Director" className="about-director-img" />
              <div className="director-caption-card">
                <h4>Vivek Jain</h4>
                <span>Founder &amp; Managing Director</span>
                <p>"Solar is not just equipment on a roof; it is a 25-year promise of energy independence and clean air for future generations."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Milestones</span>
            <h2>Our Growth &amp; Key Achievements</h2>
            <p>A consistent track record of rapid scaling, engineering innovation, and customer trust.</p>
          </div>

          <div className="timeline-wrapper mt-48">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-badge">{item.year}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authorized Equipment Alliances */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Equipment &amp; Technology</span>
            <h2>Official Distribution &amp; Channel Alliances</h2>
            <p>Direct manufacturer backing ensures rock-solid warranties, genuine components, and zero supply delays.</p>
          </div>

          <div className="card-grid cols-3 mt-48">
            <div className="card">
              <div className="partner-logo-box" style={{ marginBottom: '16px' }}>
                <img src="/assets/reliance-logo.jpeg" alt="Tata Power Solar logo" style={{ maxHeight: '42px', objectFit: 'contain' }} />
              </div>
              <h3>Tata Power Solar</h3>
              <p>Authorised partner for rooftop solar deployments, delivering high-efficiency panels and certified components across India.</p>
            </div>

            <div className="card">
              <div className="partner-logo-box" style={{ marginBottom: '16px' }}>
                <img src="/assets/hitachi-logo.jpeg" alt="Hitachi logo" style={{ maxHeight: '42px', objectFit: 'contain' }} />
              </div>
              <h3>Hitachi Energy</h3>
              <p>Authorised sub-distributor of high-performance string and central inverters with direct factory service backing.</p>
            </div>

            <div className="card">
              <div className="partner-logo-box" style={{ marginBottom: '16px' }}>
                <img src="/assets/sungrow-logo.png" alt="Sungrow logo" style={{ maxHeight: '42px', objectFit: 'contain' }} />
              </div>
              <h3>Sungrow Power Supply</h3>
              <p>World leader in commercial and utility inverters, delivering maximum uptime, smart grid compatibility, and remote monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-tight section-sage">
        <div className="container">
          <div className="cta-band">
            <div>
              <h3>Work with a team that values your 25-year energy yield.</h3>
              <p>Get in touch with our engineering team for a zero-cost feasibility assessment.</p>
            </div>
            <div className="cta-band-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenQuoteModal}
              >
                Schedule Site Audit
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
