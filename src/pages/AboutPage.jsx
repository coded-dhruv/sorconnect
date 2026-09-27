import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage({ onOpenQuoteModal }) {
  return (
    <main>
      
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / About Us</div>
          <span className="eyebrow on-dark">Who We Are</span>
          <h1>Powering progress through renewable energy.</h1>
          <p>
            Founded in 2020 by Mr. Vivek Jain, Sor Connect was born from a vision to make renewable energy more accessible, efficient and sustainable for businesses and communities alike.
          </p>
        </div>
      </section>

      {/* ============ OUR STORY ============ */}
      <section className="section">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'flex-start' }}>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 style={{ fontSize: 'clamp(26px,3vw,32px)', lineHeight: 1.25 }}>
                From 2 MW in Rajasthan to a pan-India operation.
              </h2>
            </div>
            <div>
              <p style={{ fontSize: '16.5px', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                Founded by like-minded professionals with 5+ years of cumulative experience in renewable energy design, implementation and operations, Sor Connect set out to revolutionise India's renewable energy industry by creating affordable, dependable and world-class solar-powered systems nationwide.
              </p>
              <p style={{ fontSize: '16.5px', color: 'var(--ink-soft)', lineHeight: 1.8, marginTop: '16px' }}>
                What began as a modest solar maintenance project — managing just 2 MW in Rajasthan — has evolved into a recognised name in the renewable energy space. Today, Sor Connect manages over 150 MW of solar projects across 13 states in India, backed by a team of 130+ skilled professionals delivering comprehensive end-to-end services: EPC, Operation &amp; Maintenance, PM-KUSUM Yojana consultation, Installation &amp; Commissioning, and Solar Designing.
              </p>
              <p style={{ fontSize: '16.5px', color: 'var(--ink-soft)', lineHeight: 1.8, marginTop: '16px' }}>
                Through distributed generation, individuals and industries can break free from expensive, low-quality power with custom-engineered solar solutions — backed by a sharp focus on quality, safety and long-term performance.
              </p>
            </div>
          </div>

          <div className="history-timeline mt-64">
            <div className="history-row">
              <div className="history-year">2020</div>
              <div className="history-content">
                <h4>Founded in Rajasthan</h4>
                <p>Mr. Vivek Jain establishes Sor Connect, starting with 2 MW of EPC &amp; solar plant maintenance work in Rajasthan.</p>
              </div>
            </div>
            <div className="history-row">
              <div className="history-year">2021–23</div>
              <div className="history-content">
                <h4>Building the foundation</h4>
                <p>Growing the in-house team to 100+ skilled professionals and expanding EPC and O&amp;M operations beyond Rajasthan.</p>
              </div>
            </div>
            <div className="history-row">
              <div className="history-year">2024</div>
              <div className="history-content">
                <h4>Strategic partnerships</h4>
                <p>Becomes a Reliance New Energy Channel Partner and Hitachi Authorized Distributor, strengthening technology and supply reliability.</p>
              </div>
            </div>
            <div className="history-row">
              <div className="history-year">Today</div>
              <div className="history-content">
                <h4>150+ MW across 13 states</h4>
                <p>130+ professionals, 500+ EPC projects, 150+ I&amp;C/O&amp;M projects, and a growing footprint with offices in Jaipur and Agra.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIRECTOR'S MESSAGE ============ */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Vision Board</span>
            <h2>Director's Message</h2>
          </div>
          <div className="director-block">
            <div className="director-photo">
              <img src="/assets/director.jpeg" alt="Vivek Jain, Founder & Managing Director of Sor Connect" />
            </div>
            <div>
              <blockquote>
                "As the Director of Sor Connect, I am thrilled to share our journey and vision with you. Since our inception, our primary goal has been to empower communities and businesses by making renewable energy accessible, efficient, and sustainable."
              </blockquote>
              <p style={{ marginTop: '18px', fontSize: '16px', color: 'var(--ink-soft)', lineHeight: 1.75 }}>
                "We offer end-to-end solar solutions — from installation to asset management and O&amp;M — backed by a skilled team and a strong commitment to quality, safety, and innovation. As we continue to expand globally, our vision remains clear: to lead the shift toward sustainable energy and contribute meaningfully to a greener planet. We invite you to join us in building a brighter, more sustainable future."
              </p>
              <div className="attribution">
                <b>Vivek Jain</b>
                Founder &amp; Managing Director, Sor Connect
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VISION / MISSION ============ */}
      <section className="section">
        <div className="container">
          <div className="card-grid cols-2">
            <div className="card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.7" fill="currentColor"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>To be globally acclaimed as the foremost name in renewable energy — setting new standards in performance, sustainability and technological integration, and building a future where clean energy empowers every corner of the world, in India and across international markets.</p>
            </div>
            <div className="card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M13 2 3 14h7l-1 8 11-12h-7l1-8z"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>To redefine excellence in solar — ensuring every plant, rooftop or utility-scale, operates at peak performance with minimal downtime and maximum returns, through cutting-edge digital technologies, precision operations and a proactive service culture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Core Values</span>
            <h2>What we build on, just like the plants we manage.</h2>
            <p>At the heart of Sor Connect lies a value system built to last. Our work culture is deeply rooted in responsibility, precision, and an unwavering passion for clean energy.</p>
          </div>
          <div className="pillars">
            <div className="pillar">
              <div className="pillar-num">01</div>
              <h4>Trust</h4>
              <p>Long-term partnerships built on transparency with every client, contractor and DISCOM we work with.</p>
            </div>
            <div className="pillar">
              <div className="pillar-num">02</div>
              <h4>Quality</h4>
              <p>Tier-1 materials and rigorous testing at every phase — no shortcuts, on any project size.</p>
            </div>
            <div className="pillar">
              <div className="pillar-num">03</div>
              <h4>Safety</h4>
              <p>Site protocols and compliance standards that protect our teams and your investment alike.</p>
            </div>
            <div className="pillar">
              <div className="pillar-num">04</div>
              <h4>Innovation</h4>
              <p>Digital monitoring, precision engineering, and a proactive service culture that keeps plants ahead.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Sor Connect</span>
            <h2>A trusted solar partner, by the numbers.</h2>
          </div>
          <div className="stats-strip">
            <div className="stat-block">
              <div className="num">150<span>+</span></div>
              <div className="cap">MW Portfolio</div>
              <div className="sub">From 2 MW in 2020 to 150+ MW today.</div>
            </div>
            <div className="stat-block">
              <div className="num">100<span>%</span></div>
              <div className="cap">Client Satisfaction</div>
              <div className="sub">Earned through consistent, accountable delivery.</div>
            </div>
            <div className="stat-block">
              <div className="num">10k<span>+</span></div>
              <div className="cap">Installations</div>
              <div className="sub">Delivering consistent, reliable solar solutions since 2020.</div>
            </div>
          </div>

          <div className="card-grid cols-2 mt-48">
            <div className="card">
              <h3 style={{ fontSize: '16px' }}>Awards &amp; Recognition</h3>
              <ul style={{ marginTop: '12px', paddingLeft: '18px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}>Best Solar EPC Company Award</li>
                <li>Innovation in Solar Technology Award</li>
              </ul>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '16px' }}>Certified Quality</h3>
              <p style={{ marginTop: '12px' }}>
                All installations strictly follow MNRE, CEA, and IEC specifications with complete documentation and warranty support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AUTHORIZED ALLIANCES ============ */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Equipment &amp; Technology</span>
            <h2>Authorized Channel &amp; Distribution Alliances</h2>
            <p>Direct manufacturer relationships ensure Tier-1 hardware warranties and zero supply delays.</p>
          </div>

          <div className="card-grid cols-3 mt-48">
            <div className="card">
              <div className="partner-logo-box" style={{ marginBottom: '16px' }}>
                <img src="/assets/reliance-logo.jpeg" alt="Reliance New Energy" style={{ maxHeight: '42px', objectFit: 'contain' }} />
              </div>
              <h3>Reliance Authorised Partner</h3>
              <p>Authorised channel partner for rooftop and industrial solar installations across India.</p>
            </div>

            <div className="card">
              <div className="partner-logo-box" style={{ marginBottom: '16px' }}>
                <img src="/assets/hitachi-logo.jpeg" alt="Hitachi Energy" style={{ maxHeight: '42px', objectFit: 'contain' }} />
              </div>
              <h3>Hitachi Energy Distributor</h3>
              <p>Authorised sub-distributor of high-efficiency string and central grid-tied solar inverters.</p>
            </div>

            <div className="card">
              <div className="partner-logo-box" style={{ marginBottom: '16px' }}>
                <img src="/assets/sungrow-logo.png" alt="Sungrow Power" style={{ maxHeight: '42px', objectFit: 'contain' }} />
              </div>
              <h3>Sungrow Power Partner</h3>
              <p>Leading commercial &amp; utility-scale inverters with smart SCADA IoT monitoring integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="section section-tight">
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
                onClick={() => onOpenQuoteModal(
                  "Schedule Site Audit",
                  "Speak with our senior solar engineers for a free site audit and feasibility report."
                )}
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
