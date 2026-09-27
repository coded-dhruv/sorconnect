import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import Slideshow from '../components/Slideshow';

const PROCESS_STEPS = [
  {
    id: 'tab-consult',
    step: '01',
    name: 'Site Audit & Feasibility',
    title: 'Precision Site Survey & Shadow Analysis',
    desc: 'Our senior solar engineers visit your facility or rooftop, map available surface area, perform 3D drone shadow simulation, and analyze your last 12 months electricity tariffs to determine your ideal generation capacity.',
    img: '/assets/process-1.jpg',
    points: ['3D Shadow & Irradiance Analysis', 'Roof Structural Integrity Check', 'DISCOM Load Sanction Audit']
  },
  {
    id: 'tab-design',
    step: '02',
    name: 'Engineering & SLD Design',
    title: 'Custom Electrical Engineering & PVsyst Simulation',
    desc: 'We prepare detailed Single Line Diagrams (SLD), 3D module layout arrays, structural foundation calculations, and bankable PVsyst generation reports to maximize unit yields per square meter.',
    img: '/assets/process-2.jpg',
    points: ['Bankable PVsyst Yield Reports', 'Optimized DC/AC Inverter Ratios', 'Tier-1 Module Layout Optimization']
  },
  {
    id: 'tab-liaison',
    step: '03',
    name: 'DISCOM & Subsidy Approvals',
    title: 'End-to-End Government & DISCOM Liaisoning',
    desc: 'We manage complete regulatory documentation, net-metering approvals, CEIG electrical clearances, and national portal subsidy claims (PM Surya Ghar & PM-KUSUM) from start to finish.',
    img: '/assets/process-3.jpg',
    points: ['DISCOM Feasibility Clearances', 'Direct DBT Central Subsidy Filing', 'CEIG / Electrical Inspectorate Approvals']
  },
  {
    id: 'tab-install',
    step: '04',
    name: 'Procurement & Installation',
    title: 'Industrial Standard Turnkey Deployment',
    desc: 'Execution by our trained in-house EPC crew using hot-dip galvanized mounting structures, Tier-1 ALMM modules, German DC switchgear, and dedicated safety protocols.',
    img: '/assets/process-4.jpg',
    points: ['Class-A Hot-Dip Galvanized Racks', 'Dual Earthing & Lightning Protection', 'Zero Operational Downtime Guarantee']
  },
  {
    id: 'tab-om',
    step: '05',
    name: 'Commissioning & 25-Yr O&M',
    title: 'Net Meter Testing & Remote IoT Monitoring',
    desc: 'Joint DISCOM inspection, bidirectional meter commissioning, remote IoT SCADA setup, and warranty-backed proactive Annual Maintenance Contracts (AMC) for 25 continuous years.',
    img: '/assets/process-5.jpg',
    points: ['Bidirectional Meter Sync', 'Real-Time Mobile Generation Tracking', 'Scheduled Robotic & Pressurized Cleaning']
  }
];

export default function HomePage({ onOpenQuoteModal }) {
  const [activeProcessTab, setActiveProcessTab] = useState(0);

  return (
    <main className="home-page-main">
      
      {/* ============ 1. HERO SECTION ============ */}
      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video-bg">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>MNRE Authorised Solar EPC Partner</span>
          </div>

          <h1 className="hero-title">
            Engineering High-Yield Solar Power for India’s Future
          </h1>

          <p className="hero-desc">
            End-to-end turnkey solar EPC, solar designing, and 25-year O&amp;M solutions for industrial plants, residential rooftops, and PM Surya Ghar &amp; PM-KUSUM schemes.
          </p>

          <div className="hero-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onOpenQuoteModal}
            >
              Get a Free Feasibility Quote
            </button>
            <Link to="/projects" className="btn btn-outline-light">
              Explore 150+ MW Portfolio
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <span className="stat-num">150+</span>
              <span className="stat-unit">MW</span>
              <span className="stat-label">Capacity Deployed</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-num">10k+</span>
              <span className="stat-unit">Units</span>
              <span className="stat-label">Rooftops &amp; Farms</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-num">13</span>
              <span className="stat-unit">States</span>
              <span className="stat-label">Pan-India Reach</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-num">₹28Cr+</span>
              <span className="stat-unit">/yr</span>
              <span className="stat-label">Client Power Savings</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. WHAT WE DO SECTION ============ */}
      <section 
        className="section what-we-do-section"
        style={{
          backgroundImage: 'linear-gradient(rgba(23, 63, 49, 0.92), rgba(23, 63, 49, 0.95)), url(/assets/what-we-do-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF'
        }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow on-dark">Core Capabilities</span>
            <h2 style={{ color: '#FFFFFF' }}>Comprehensive Solar Solutions</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '680px', margin: '0 auto' }}>
              From engineering blueprint design to 25-year asset protection, Sor Connect provides full lifecycle solar energy engineering.
            </p>
          </div>

          <div className="card-grid cols-3 mt-48">
            <div className="card card-dark">
              <div className="icon-wrap">⚡</div>
              <h3>Solar EPC Services</h3>
              <p>Turnkey Engineering, Procurement &amp; Construction for industrial, commercial, and utility ground mounts.</p>
              <Link to="/services#epc" className="card-link">Learn about EPC →</Link>
            </div>

            <div className="card card-dark">
              <div className="icon-wrap">🏠</div>
              <h3>PM Surya Ghar Yojana</h3>
              <p>Direct central government subsidies up to ₹78,000 for residential rooftop solar with net metering.</p>
              <Link to="/services#surya-ghar" className="card-link">Check Subsidy →</Link>
            </div>

            <div className="card card-dark">
              <div className="icon-wrap">🌾</div>
              <h3>PM-KUSUM Solar Pumps</h3>
              <p>Agricultural solarization, grid-connected solar pumps, and decentralized solar power plants for farmers.</p>
              <Link to="/services#kusum" className="card-link">PM-KUSUM Advisory →</Link>
            </div>

            <div className="card card-dark">
              <div className="icon-wrap">📐</div>
              <h3>Solar Designing</h3>
              <p>3D PVsyst energy simulation, string sizing, shadow calculation, and DISCOM-compliant SLD engineering.</p>
              <Link to="/services#design" className="card-link">Design Services →</Link>
            </div>

            <div className="card card-dark">
              <div className="icon-wrap">🔧</div>
              <h3>Installation &amp; Commissioning</h3>
              <p>Structural alignment, German cabling, inverter commissioning, CEIG approvals, and DISCOM meter sync.</p>
              <Link to="/services#installation" className="card-link">Installation Details →</Link>
            </div>

            <div className="card card-dark">
              <div className="icon-wrap">🛡️</div>
              <h3>25-Yr Operation &amp; Maintenance</h3>
              <p>Proactive AMC, thermographic drone audits, robotic panel cleaning, and IoT generation monitoring.</p>
              <Link to="/services#om" className="card-link">O&amp;M Packages →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. TWO-COLUMN INTERACTIVE CONTACT & SLIDESHOW SECTION ============ */}
      <section className="section home-contact-interactive-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Direct Consultation</span>
            <h2>Request a Free Site Assessment &amp; Feasibility Study</h2>
            <p>Share your electricity bill bracket and details. Our engineers calculate your generation potential and payback period in 24 hours.</p>
          </div>

          <div className="home-interactive-2col">
            {/* Left Column: Dark Contact Form */}
            <div className="home-contact-card-dark">
              <div className="home-form-header">
                <span className="badge-pill">Zero Obligation</span>
                <h3>Custom Solar Quotation</h3>
                <p>Fill out the form below to receive customized DISCOM subsidy calculations &amp; system sizing.</p>
              </div>
              <ContactForm 
                formId="home-inline-form"
                buttonText="Get Free Solar Proposal"
                subject="Home Page Lead - Sor Connect"
              />
            </div>

            {/* Right Column: Auto-sliding Award & Project Slideshow */}
            <div className="home-slideshow-container">
              <Slideshow />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. STRATEGIC PARTNERSHIPS SECTION ============ */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Industry Trust &amp; Alliances</span>
            <h2>Strategic Authorized Partnerships</h2>
            <p>We work directly with world leaders in solar and inverter technology to ensure rock-solid equipment warranties and maximum generation.</p>
          </div>

          <div className="partners-redesign-grid">
            <div className="partner-card">
              <div className="partner-card-header">
                <div className="partner-logo-box">
                  <img src="/assets/reliance-logo.jpeg" alt="Tata Power Solar logo" />
                </div>
                <span className="partner-tier-badge">Channel Partner</span>
              </div>
              <div className="pname">Tata Power Solar</div>
              <p>Authorised partner for rooftop solar business, driving India's clean energy transition with world-class engineering standards.</p>
              <ul className="partner-features">
                <li><span>✓ Rooftop Solar Solutions</span></li>
                <li><span>✓ Net-Zero Carbon Deployments</span></li>
                <li><span>✓ Pan-India Residential &amp; C&amp;I</span></li>
              </ul>
            </div>

            <div className="partner-card">
              <div className="partner-card-header">
                <div className="partner-logo-box">
                  <img src="/assets/hitachi-logo.jpeg" alt="Hitachi logo" />
                </div>
                <span className="partner-tier-badge">Authorized Distributor</span>
              </div>
              <div className="pname">Hitachi Energy</div>
              <p>Authorised sub-distributor of high-efficiency on-grid string and central inverters, ensuring superior uptime and warranty support.</p>
              <ul className="partner-features">
                <li><span>✓ High Yield On-Grid Inverters</span></li>
                <li><span>✓ Direct Factory Regional Stock</span></li>
                <li><span>✓ Rapid Technical Commissioning</span></li>
              </ul>
            </div>

            <div className="partner-card">
              <div className="partner-card-header">
                <div className="partner-logo-box">
                  <img src="/assets/sungrow-logo.png" alt="Sungrow logo" />
                </div>
                <span className="partner-tier-badge">Value Added Partner</span>
              </div>
              <div className="pname">Sungrow Power Supply</div>
              <p>World-leading solar inverter and energy storage supplier, optimizing LCOE with smart monitoring and rugged field reliability.</p>
              <ul className="partner-features">
                <li><span>✓ Smart Commercial String Inverters</span></li>
                <li><span>✓ Utility Central Inverter Systems</span></li>
                <li><span>✓ Smart Cloud Monitoring</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. OUR 5-STEP ENGINEERING PROCESS ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Standardized Execution</span>
            <h2>Our 5-Step Turnkey Solar Process</h2>
            <p>Every Sor Connect installation adheres strictly to MNRE guidelines, CEIG protocols, and IEEE electrical safety standards.</p>
          </div>

          <div className="process-interactive-wrapper mt-48">
            <div className="process-nav-menu">
              {PROCESS_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  type="button"
                  className={`process-nav-btn ${idx === activeProcessTab ? 'active' : ''}`}
                  onClick={() => setActiveProcessTab(idx)}
                >
                  <span className="step-idx">{step.step}</span>
                  <span className="step-txt">{step.name}</span>
                </button>
              ))}
            </div>

            <div className="process-display-card">
              <div className="process-text-content">
                <span className="process-eyebrow">STEP {PROCESS_STEPS[activeProcessTab].step}</span>
                <h3>{PROCESS_STEPS[activeProcessTab].title}</h3>
                <p>{PROCESS_STEPS[activeProcessTab].desc}</p>
                <ul className="process-points-list">
                  {PROCESS_STEPS[activeProcessTab].points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <span className="check-icon">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="process-visual-content">
                <img 
                  src={PROCESS_STEPS[activeProcessTab].img} 
                  alt={PROCESS_STEPS[activeProcessTab].title} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. CTA BANNER ============ */}
      <section className="section section-tight">
        <div className="container">
          <div className="cta-band">
            <div>
              <h3>Ready to bring your electricity bill down to ₹0?</h3>
              <p>Speak directly with our senior solar engineers in Jaipur and Agra today.</p>
            </div>
            <div className="cta-band-actions">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenQuoteModal}
              >
                Request Free Site Assessment
              </button>
              <a href="tel:9116992229" className="btn btn-outline">
                Call 91169 92229
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
