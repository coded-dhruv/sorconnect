import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import Slideshow from '../components/Slideshow';

const PROCESS_STEPS = [
  {
    id: 'tab-discovery',
    step: '01',
    num: '01',
    title: 'Discovery & Consultation',
    sub: 'Site Audit & Scheme Eligibility',
    heading: 'Understanding Your Site & Energy Goals',
    desc: 'We evaluate your rooftop or land feasibility, historical electricity bills, and state/central subsidy eligibility under PM-KUSUM and PM Surya Ghar schemes.',
    img: '/assets/process-1.jpg',
    points: [
      'Site & energy audit',
      'Feasibility & ROI analysis',
      'Govt subsidy assistance',
      'Customized plant sizing'
    ]
  },
  {
    id: 'tab-design',
    step: '02',
    num: '02',
    title: 'Design & Approvals',
    sub: '3D Simulation & Net Metering',
    heading: 'Precision Solar Engineering & Clearances',
    desc: 'Our engineering division creates high-yield 3D shade models, Staad Pro structural calculations, electrical single-line diagrams, and files DISCOM net-metering approvals.',
    img: '/assets/process-2.jpg',
    points: [
      '3D Shading & yield simulation',
      'Staad Pro structural check',
      'DISCOM liaisoning filings',
      'Net-metering clearance'
    ]
  },
  {
    id: 'tab-procurement',
    step: '03',
    num: '03',
    title: 'Procurement & Installation',
    sub: 'Tier-1 Hardware & Civil Work',
    heading: 'Tier-1 Materials & Turnkey Construction',
    desc: 'In-house installation teams erect hot-dip galvanized mounting structures, securely position Tier-1 ALMM modules, run UV-rated wiring, and install premium inverters.',
    img: '/assets/process-3.jpg',
    points: [
      'Tier-1 module sourcing',
      'Galvanized structure mounting',
      'Class-A DC cable dressing',
      'Dual chemical earthing'
    ]
  },
  {
    id: 'tab-commissioning',
    step: '04',
    num: '04',
    title: 'Commissioning & Handover',
    sub: 'Safety Testing & Grid Sync',
    heading: 'Safety Audits, Grid Sync & Testing',
    desc: 'CEIG electrical clearance inspection, comprehensive dual-earthing safety tests, DISCOM meter changeover and full plant sync into your main LT panel.',
    img: '/assets/process-4.jpg',
    points: [
      'CEIG safety approvals',
      'DISCOM bidirectional meter sync',
      'LT panel power evacuation',
      'Official commissioning cert'
    ]
  },
  {
    id: 'tab-asset',
    step: '05',
    num: '05',
    title: 'Asset Management',
    sub: '25-Yr SCADA & Scheduled O&M',
    heading: '25-Year Monitoring & Preventative AMC',
    desc: 'Continuous IoT cloud generation monitoring, 12 free on-site maintenance visits in Year 1, thermal drone scans, and fast breakdown response to guarantee uptime.',
    img: '/assets/process-5.jpg',
    points: [
      '24/7 Cloud IoT tracking',
      '12 Free visits in Year 1',
      'Scheduled panel cleaning',
      'Performance guarantee'
    ]
  }
];

export default function HomePage({ onOpenQuoteModal }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = PROCESS_STEPS[activeStepIndex];

  return (
    <main>
      
      {/* ============ 1. HERO SECTION ============ */}
      <section className="hero">
        <div className="hero-overlay" aria-hidden="true"></div>

        <div className="container">
          <div className="hero-inner hero-inner-single">
            <div>
              <span className="eyebrow on-dark">Trusted Solar Solutions Since 2020</span>
              <h1>Engineering India's <em>shift to solar</em>, plant by plant.</h1>
              <p className="lede">
                Sor Connect designs, builds and operates solar power plants for industries, farms and communities — from first feasibility study to twenty-five years of after-care.
              </p>
              <div className="hero-actions">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => onOpenQuoteModal(
                    "Request a Site Assessment",
                    "Get an engineering assessment and feasibility report for your residential, commercial, or agricultural site."
                  )}
                >
                  Request a Site Assessment
                </button>
                <Link to="/services" className="btn btn-outline">
                  Explore Our Services →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Readout Bar */}
        <div className="readout-bar">
          <div className="container">
            <div className="readout-item">
              <div className="val">150<span style={{ fontSize: '15px' }}>+ MW</span></div>
              <div className="lbl">Solar capacity managed</div>
            </div>
            <div className="readout-item">
              <div className="val">13<span style={{ fontSize: '15px' }}>&nbsp;states</span></div>
              <div className="lbl">Pan-India operations</div>
            </div>
            <div className="readout-item">
              <div className="val">130<span style={{ fontSize: '15px' }}>+</span></div>
              <div className="lbl">Skilled professionals</div>
            </div>
            <div className="readout-item">
              <div className="val">100<span style={{ fontSize: '15px' }}>%</span></div>
              <div className="lbl">Client satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. ABOUT SNAPSHOT ============ */}
      <section className="section">
        <div className="container">
          <div className="hero-inner" style={{ alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Who We Are</span>
              <h2 style={{ fontSize: 'clamp(24px,2.8vw,32px)', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
                Founded on a simple idea: clean power shouldn't be hard to get.
              </h2>
            </div>
            <div>
              <p style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: 1.75 }}>
                Established in 2020 by Mr. Vivek Jain, Sor Connect began as a 2 MW solar maintenance operation in Rajasthan. Six years on, we manage over 150 MW across 13 states, backed by 130+ in-house engineers, designers and field technicians.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: 1.75, marginTop: '14px' }}>
                We offer complete, end-to-end services — EPC, Operation &amp; Maintenance, PM-KUSUM Yojana consultation, installation &amp; commissioning, and solar plant design — under a single roof, for residential, commercial, industrial and agricultural clients alike.
              </p>
              <Link to="/about" className="btn btn-outline-dark mt-48">
                Learn Our Full Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. SERVICES PREVIEW ============ */}
      <section className="section svc-section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow on-dark">What We Do</span>
            <h2 style={{ color: '#fff' }}>One partner, every stage of the plant's life.</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)' }}>
              From the first feasibility study to twenty-five years of operation, Sor Connect's in-house teams handle design, procurement, construction and after-care.
            </p>
          </div>

          <div className="svc-grid">
            {/* Card 1 */}
            <Link to="/services#epc" className="svc-card">
              <div className="svc-img">
                <img src="/assets/svc-epc.jpg" alt="EPC Services" />
                <div className="svc-img-label">Coming soon</div>
              </div>
              <div className="svc-body">
                <h3>EPC Services</h3>
                <p>Engineering, Procurement &amp; Construction — Tier-1 modules, complete civil &amp; electrical execution, on schedule.</p>
              </div>
              <div className="svc-foot">
                <span className="svc-learn">
                  Learn more 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="/services#installation" className="svc-card">
              <div className="svc-img">
                <img src="/assets/svc-kusum.jpg" alt="Installation & Commissioning" />
                <div className="svc-img-label">Coming soon</div>
              </div>
              <div className="svc-body">
                <h3>Installation &amp; Commissioning</h3>
                <p>Safety testing, grid synchronisation, and evacuation of power into the client's LT panel — done right, first time.</p>
              </div>
              <div className="svc-foot">
                <span className="svc-learn">
                  Learn more 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Card 3 */}
            <Link to="/services#om" className="svc-card">
              <div className="svc-img">
                <img src="/assets/svc-om.jpg" alt="Operation & Maintenance" />
                <div className="svc-img-label">Coming soon</div>
              </div>
              <div className="svc-body">
                <h3>Operation &amp; Maintenance</h3>
                <p>24/7 monitoring, preventive servicing, and 12 free engineer visits in year one to protect your output.</p>
              </div>
              <div className="svc-foot">
                <span className="svc-learn">
                  Learn more 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Card 4 */}
            <Link to="/services#design" className="svc-card">
              <div className="svc-img">
                <img src="/assets/svc-liaison.jpg" alt="Solar Designing" />
                <div className="svc-img-label">Coming soon</div>
              </div>
              <div className="svc-body">
                <h3>Solar Designing</h3>
                <p>Yield analysis, electrical &amp; structural design, and full plant simulation before a single panel is ordered.</p>
              </div>
              <div className="svc-foot">
                <span className="svc-learn">
                  Learn more 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center" style={{ marginTop: '52px' }}>
            <Link to="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ============ 4. PROCESS / YOUR PROJECT, OUR EXPERTISE ============ */}
      <section className="section process-section">
        <div className="container">
          <div className="process-grid">

            {/* Left Column: Heading & 5-Step Milestone Roadmap */}
            <div className="process-left">
              <span className="eyebrow on-dark" style={{ color: 'var(--leaf-bright)' }}>Execution Roadmap</span>
              <h2 className="process-heading">Your Project,<br />Our Expertise</h2>
              
              <div className="process-nav">
                {PROCESS_STEPS.map((step, idx) => (
                  <button
                    key={step.id}
                    className={`process-nav-btn ${idx === activeStepIndex ? 'active' : ''}`}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                  >
                    <div className="step-num">{step.num}</div>
                    <div className="step-meta">
                      <span className="step-title">{step.title}</span>
                      <span className="step-sub">{step.sub}</span>
                    </div>
                    <div className="btn-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Showcase Card */}
            <div className="process-showcase-col">
              <div className="process-showcase-card">
                
                <div className="process-card-topbar">
                  <div className="stage-counter-badge">
                    <span className="stage-badge-indicator"></span>
                    <span>Phase {currentStep.num} of 05 • Key Deliverables</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ padding: '6px 16px', fontSize: '12.5px', borderRadius: '20px' }}
                    onClick={() => onOpenQuoteModal(
                      "Project Feasibility Consultation",
                      "Speak with our solar engineers about your custom site requirements."
                    )}
                  >
                    Talk to Engineer
                  </button>
                </div>

                <div className="process-card-body">
                  {/* Arched Image Preview */}
                  <div className="process-image-wrapper">
                    <div className="process-image-arch">
                      <img 
                        src={currentStep.img} 
                        alt={currentStep.title} 
                      />
                    </div>
                    {/* Rotating Seal Badge */}
                    <div className="process-seal-badge">
                      <svg viewBox="0 0 100 100" className="process-seal-spin">
                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                        <text fontFamily="Montserrat" fontSize="5.6" fontWeight="700" letterSpacing="1.1" fill="#3E8F5C">
                          <textPath href="#circlePath">SEAMLESS INTEGRATION • SOLAR INSTALLATIONS • SOLAR EXPERTS •</textPath>
                        </text>
                      </svg>
                      <div className="process-seal-logo">
                        <img src="/assets/logo.png" alt="Sor Connect Logo" />
                      </div>
                    </div>
                  </div>

                  {/* Right Detail Content */}
                  <div className="process-details-col">
                    <div className="process-tab-content active">
                      <h3>{currentStep.heading}</h3>
                      <p>{currentStep.desc}</p>
                      
                      <div className="process-checklist">
                        {currentStep.points.map((pt, pIdx) => (
                          <div key={pIdx} className="process-check-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      <div className="process-cta-action" style={{ marginTop: '24px' }}>
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          onClick={() => onOpenQuoteModal(
                            `Inquire about ${currentStep.title}`,
                            `Discuss phase ${currentStep.num} engineering requirements with our solar project team.`
                          )}
                        >
                          Request a Free Plant Feasibility Study
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ 5. STRATEGIC PARTNERSHIPS & DARK ASSESSMENT FORM ============ */}
      <section className="section showcase-section" id="interactive-showcase">
        <div className="container">
          <div className="showcase-2col-layout">

            {/* COLUMN 1 (Mobile Row 1): Auto-Sliding Certificate & Achievement Slideshow */}
            <div className="showcase-slider-col">
              <div className="slideshow-header">
                <span className="eyebrow">Strategic Partnerships &amp; Trust</span>
                <h2>Certified Excellence in Renewable Energy</h2>
                <p>
                  Backed by leading global manufacturers and recognized across state and national forums for excellence in EPC delivery, quality compliance, and rapid solar expansion.
                </p>
              </div>

              <Slideshow />
            </div>

            {/* COLUMN 2 (Mobile Row 2): Dark Background Contact & Assessment Form */}
            <div className="showcase-form-col">
              <div className="home-dark-form-card">
                <div className="form-card-header">
                  <span className="eyebrow on-dark">Ready to Start?</span>
                  <h3>Get a Free Solar Assessment &amp; Quote</h3>
                  <p>
                    Share your electricity details. Our engineers will verify your subsidy eligibility and deliver a custom zero-cost proposal within 24 hours.
                  </p>
                </div>

                <ContactForm 
                  formId="home-contact-form"
                  buttonText="Submit Free Assessment Request"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
