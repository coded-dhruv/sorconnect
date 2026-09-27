import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const SERVICES_DATA = [
  {
    id: 'epc',
    name: 'EPC Services',
    title: 'EPC Services',
    subtitle: 'End-to-End Engineering, Procurement & Construction',
    desc: 'Our turnkey EPC solutions cover the entire spectrum of solar power plant development — from initial site analysis and engineering design to procurement of Tier-1 equipment, civil construction, electrical integration, and commissioning. We deliver high-performing solar plants for industrial, commercial, and utility-scale clients.',
    imgs: ['/assets/svc-epc-1.jpg', '/assets/svc-epc-2.jpg'],
    offers: [
      'Comprehensive site survey, shadow analysis & feasibility',
      'Civil, structural and electrical engineering design (SLD)',
      'Procurement of Tier-1 BIS-certified modules & inverters',
      'End-to-end DISCOM liaisoning & net-metering approval',
      'CEIG clearance, safety audits & grid synchronisation',
      'Rooftop and ground-mount utility plant installation'
    ],
    standouts: [
      { num: '01', title: 'Tier-1 Component Procurement', desc: 'Direct relationships with leading tier-1 module makers and inverter manufacturers guarantee authentic hardware and manufacturer warranties.' },
      { num: '02', title: 'Zero Operational Downtime', desc: 'Carefully phased installation ensures your existing factory or building operations continue without interruption.' },
      { num: '03', title: 'Full Regulatory Approvals', desc: 'We take complete responsibility for DISCOM clearances, CEIG inspections, and subsidy paperwork.' },
      { num: '04', title: 'Optimised Yield Engineering', desc: 'Custom DC-to-AC sizing ratios that maximize energy generation during morning and low-light hours.' }
    ],
    faqs: [
      { q: 'What size solar plant does my facility need?', a: 'Plant sizing depends on your connected load, average monthly energy consumption, and available rooftop or land area. Our engineering team conducts a free initial load profile assessment.' },
      { q: 'How long does a typical industrial EPC project take?', a: 'Commercial and industrial rooftop installations typically take 4 to 8 weeks from contract signing to grid synchronisation.' },
      { q: 'What warranties are provided on EPC projects?', a: 'We provide 25-year performance warranties on solar modules, 5 to 10 years on string inverters, and a 5-year comprehensive workmanship warranty.' }
    ],
    formTag: 'EPC Inquiry',
    formTitle: 'Request an EPC Proposal',
    formSubtitle: 'Share your facility location and monthly electricity bill. Our engineers will share a custom technical and financial proposal within 24 hours.'
  },
  {
    id: 'installation',
    name: 'Installation & Commissioning',
    title: 'Installation & Commissioning (I&C)',
    subtitle: 'Safety testing, grid synchronisation, and power evacuation.',
    desc: 'Precision mechanical and electrical installation is essential for plant safety and long-term yield. Sor Connect provides specialised installation teams equipped with calibrated tools, fall protection gear, and deep technical expertise for both rooftop and ground-mounted solar installations.',
    imgs: ['/assets/svc-inst-1.jpg', '/assets/svc-inst-2.jpg'],
    offers: [
      'Hot-dip galvanized structural module mounting',
      'Torque-calibrated module clamping and alignment',
      'Dual chemical earthing & lightning protection system',
      'DC cable management with UV-resistant conduit routing',
      'Inverter synchronisation, protection testing & calibration',
      'DISCOM bidirectional meter commissioning & testing'
    ],
    standouts: [
      { num: '01', title: '130+ In-House Technicians', desc: 'Experienced in-house workforce following strict MNRE and IEEE installation guidelines.' },
      { num: '02', title: 'Rigorous Quality Audits', desc: 'Every cable crimp, string voltage, and torque value is documented and verified prior to commissioning.' },
      { num: '03', title: 'Safety-First Protocol', desc: 'Full adherence to HSE protocols with safety harnesses, lifelines, and certified electrical isolators.' },
      { num: '04', title: 'Rapid Commissioning', desc: 'Pre-assembled structural components and parallel string testing speed up grid sync times.' }
    ],
    faqs: [
      { q: 'Can you install systems using third-party equipment?', a: 'Yes, we provide pure Installation & Commissioning (I&C) services for developers and contractors who procure their own panels and inverters.' },
      { q: 'What safety standards do you comply with?', a: 'We comply with IS 3043 earthing standards, IEC 62446 commissioning tests, and CEA safety regulations.' }
    ],
    formTag: 'I&C Inquiry',
    formTitle: 'Request Installation Support',
    formSubtitle: 'Tell us about your upcoming solar project capacity, site location, and timeline.'
  },
  {
    id: 'om',
    name: 'Operation & Maintenance',
    title: 'Operation & Maintenance (O&M)',
    subtitle: '24/7 Monitoring, Preventive Servicing & 25-Year Asset Protection.',
    desc: 'Dust, environmental pollution, and component degradation can cause up to 25% yield loss if not properly maintained. Sor Connect provides comprehensive Operation and Maintenance contracts backed by digital IoT monitoring and rapid on-ground response to ensure your solar asset delivers maximum ROI.',
    imgs: ['/assets/svc-om-1.jpg', '/assets/svc-om-2.jpg'],
    offers: [
      'Scheduled pressurized & robotic panel cleaning',
      'Thermographic drone scans for hotspot and micro-crack detection',
      'Inverter servicing, parameter tuning & firmware updates',
      '24/7 Cloud IoT remote generation monitoring & alerts',
      'Guaranteed on-site breakdown response within 4 hours',
      'Monthly generation reports and DISCOM bill auditing'
    ],
    standouts: [
      { num: '01', title: 'Thermographic Drone Audits', desc: 'High-resolution infrared scanning identifies malfunctioning cells, diodes, and string anomalies before they cause generation loss.' },
      { num: '02', title: 'Cloud IoT Dashboard', desc: 'Real-time telemetry showing live power, performance ratio (PR), and automated alert notifications.' },
      { num: '03', title: 'Guaranteed 98.5% Uptime', desc: 'Proactive maintenance routines ensure maximum system uptime during peak generation months.' },
      { num: '04', title: '12 Free Visits in Year 1', desc: 'All EPC installations include 12 complimentary preventive maintenance visits in the first operational year.' }
    ],
    faqs: [
      { q: 'How often should solar panels be cleaned?', a: 'In dusty industrial areas or arid regions, panel cleaning every 10 to 15 days is recommended to prevent soiling losses.' },
      { q: 'Do you offer AMC for third-party installed plants?', a: 'Yes, we take over existing third-party solar plants under comprehensive Annual Maintenance Contracts (AMC).' }
    ],
    formTag: 'O&M AMC',
    formTitle: 'Schedule an O&M Audit',
    formSubtitle: 'Share your current plant capacity and location to receive a custom AMC proposal.'
  },
  {
    id: 'design',
    name: 'Solar Designing',
    title: 'Solar Designing & Simulation',
    subtitle: 'Precision CAD Blueprints, Shading Simulation & Bankable PVsyst Reports.',
    desc: 'Good engineering begins before the first bolt is turned. Our solar design division creates bankable PVsyst simulation models, 3D shadow models, electrical Single Line Diagrams (SLD), and structural load analysis that maximize kilowatt-hour generation and satisfy financial lenders.',
    imgs: ['/assets/svc-design-1.jpg', '/assets/svc-design-2.jpg'],
    offers: [
      '3D Drone photogrammetry and shadow obstacle mapping',
      'Bankable PVsyst yield forecast and loss analysis reports',
      'Detailed electrical Single Line Diagrams (SLD) and BOM',
      'Structural load analysis and wind-speed calculations (180 km/h)',
      'Optimized tilt angle and string configuration layouts',
      'CEIG & DISCOM blueprint clearance documentation'
    ],
    standouts: [
      { num: '01', title: 'Bank-Approved PVsyst Models', desc: 'Generation reports accepted by leading nationalised and private banks for debt syndication.' },
      { num: '02', title: 'Optimized String Layouts', desc: 'Careful stringing and inverter MPPT allocation minimize mismatch and clipping losses.' },
      { num: '03', title: 'Wind Load Engineering', desc: 'Mounting structures engineered and certified to withstand extreme weather conditions and wind loads.' },
      { num: '04', title: 'Rapid CAD Turnaround', desc: 'Complete detailed project reports (DPR) delivered within 48 to 72 hours of site survey.' }
    ],
    faqs: [
      { q: 'What data is needed to generate a PVsyst report?', a: 'GPS coordinates of the site, available rooftop/land drawings, transformer capacity, and historical weather data.' }
    ],
    formTag: 'Design Inquiry',
    formTitle: 'Get a Solar Plant Design',
    formSubtitle: 'Share your site coordinates and capacity requirements for custom CAD and PVsyst proposals.'
  },
  {
    id: 'kusum',
    name: 'PM-KUSUM Consultation',
    title: 'PM-KUSUM Yojana Consultation',
    subtitle: 'Government Subsidies for Solar Pumps and Feeder Solarisation.',
    desc: 'The Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) scheme empowers farmers and agricultural enterprises to install solar irrigation pumps and generate grid-connected solar revenue on uncultivated land. Sor Connect guides farmers through portal registrations, DISCOM agreements, and EPC execution.',
    imgs: ['/assets/svc-kusum-1.jpg', '/assets/svc-kusum-2.jpg'],
    offers: [
      'Component A: 500 kW to 2 MW ground-mounted solar plants on barren land',
      'Component B: Standalone solar agriculture pumps with up to 60% subsidy',
      'Component C: Solarisation of grid-connected agricultural pump feeders',
      'DISCOM Power Purchase Agreement (PPA) documentation support',
      'State renewable energy development agency liaisoning',
      'Turnkey installation and 5-year comprehensive maintenance'
    ],
    standouts: [
      { num: '01', title: 'Empanelled Consultant', desc: 'Recognized advisory track record helping farmers secure central and state subsidies.' },
      { num: '02', title: 'Assured 25-Yr Revenue', desc: 'Generate regular tariff income by selling surplus solar energy directly back to the DISCOM.' },
      { num: '03', title: 'Complete Documentation', desc: 'We handle land verification, feeder mapping, portal filings, and PPA execution.' },
      { num: '04', title: 'Heavy-Duty Hardware', desc: 'Agricultural-grade galvanized structures and high-head solar VFD pump controllers.' }
    ],
    faqs: [
      { q: 'Who is eligible for PM-KUSUM Component A?', a: 'Individual farmers, cooperatives, farmer producer organisations (FPOs), and developers with land located within 5 km of an electrical sub-station.' }
    ],
    formTag: 'PM-KUSUM',
    formTitle: 'Check PM-KUSUM Eligibility',
    formSubtitle: 'Enter your agricultural land details and nearby substation distance for a free feasibility check.'
  },
  {
    id: 'surya-ghar',
    name: 'PM Surya Ghar Yojana',
    title: 'PM Surya Ghar Yojana',
    subtitle: 'Government-Backed Rooftop Solar Subsidy for Residential Consumers.',
    desc: 'PM Surya Ghar: Muft Bijli Yojana is the Government of India flagship rooftop solar initiative, targeting 1 crore households with free solar power. Under this scheme, eligible residential consumers can install rooftop solar panels and receive direct central subsidies of up to ₹78,000, making solar energy dramatically more affordable. Sor Connect is an empanelled EPC installer authorised to execute PM Surya Ghar projects — we handle the entire process from application to commissioning, at zero hassle to the homeowner.',
    imgs: ['/assets/svc-kusum-1.jpg', '/assets/svc-design-1.jpg'],
    offers: [
      'Up to 2 kW: ₹30,000 per kW — max ₹60,000 subsidy',
      '2 kW to 3 kW: ₹18,000 per additional kW',
      'Above 3 kW: Maximum total subsidy capped at ₹78,000',
      'State Top-Up: Additional state-level subsidies where applicable',
      'Net Metering: Export surplus power to DISCOM and earn bill credits',
      'Loan Facility: Collateral-free loans up to ₹2 lakh at reduced rates via nationalised banks'
    ],
    standouts: [
      { num: '01', title: 'MNRE Empanelled EPC', desc: 'We are an officially empanelled installer under the National Portal for Rooftop Solar — every installation we do qualifies for subsidy disbursement.' },
      { num: '02', title: 'Complete Documentation Handled', desc: 'Our team prepares and submits your national portal application, DISCOM net-metering paperwork, and subsidy disbursement forms — you sign, we do the rest.' },
      { num: '03', title: 'Quality MNRE-Approved Components', desc: 'We supply only BIS/ALMM-listed solar modules and DCR-compliant inverters that pass department inspection and qualify for subsidy release.' },
      { num: '04', title: 'Post-Installation AMC Support', desc: 'After commissioning, we offer Annual Maintenance Contracts to keep your rooftop plant producing at peak efficiency for its entire 25-year life.' }
    ],
    faqs: [
      { q: 'Who is eligible for PM Surya Ghar Yojana?', a: 'Any residential electricity consumer in India with a valid DISCOM connection can apply, provided they own the property and have a suitable rooftop area. Tenants may also apply with landlord consent.' },
      { q: 'How long does the subsidy take to arrive?', a: 'After successful net-meter installation and DISCOM approval, the central government disburses the subsidy directly into your bank account within 30 days.' },
      { q: 'What system size should I install?', a: 'A 2 kW system covers most Indian households consuming 200-300 units per month. A 3 kW system maximises the central subsidy while powering heavier loads like ACs.' },
      { q: 'Can I combine Surya Ghar with state-level subsidies?', a: 'Yes. Several states like Rajasthan and UP offer additional subsidies on top of the central scheme. Our consultants apply for every applicable incentive.' }
    ],
    formTag: 'PM Surya Ghar',
    formTitle: 'Check Your Eligibility & Get a Free Quote',
    formSubtitle: 'Share your rooftop details and electricity bill. Our team will verify your eligibility, calculate your subsidy amount, and share a zero-cost proposal within 24 hours.'
  }
];

export default function ServicesPage() {
  const location = useLocation();
  const [activeTabId, setActiveTabId] = useState('epc');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && SERVICES_DATA.some(s => s.id === hash)) {
      setActiveTabId(hash);
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const activeService = SERVICES_DATA.find(s => s.id === activeTabId) || SERVICES_DATA[0];

  const handleTabClick = (id) => {
    setActiveTabId(id);
    window.location.hash = id;
    setOpenFaqIndex(null);
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(prev => prev === idx ? null : idx);
  };

  return (
    <main>
      
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / Services</div>
          <span className="eyebrow on-dark">Full Lifecycle Solar Capabilities</span>
          <h1>Our Solar Engineering &amp; EPC Services</h1>
          <p>
            From the first feasibility study to twenty-five years of operation, Sor Connect's in-house teams handle design, procurement, construction and after-care.
          </p>
        </div>
      </section>

      {/* ============ MAIN SERVICES SIDEBAR LAYOUT ============ */}
      <section className="section">
        <div className="container services-layout-container">
          
          {/* Left Sticky Sidebar Menu */}
          <aside className="services-sidebar">
            <nav className="sidebar-nav-menu">
              {SERVICES_DATA.map(svc => (
                <a
                  key={svc.id}
                  href={`#${svc.id}`}
                  className={svc.id === activeTabId ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(svc.id);
                  }}
                >
                  <span>{svc.name}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </a>
              ))}
            </nav>

            <div className="sidebar-contact-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h4>Need Quick Advice?</h4>
              <p>Speak directly with our technical engineering desk.</p>
              <a href="tel:9116992229" className="phone-num">91169 92229</a>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <div className="services-content-main">
            
            <div id={activeService.id} className="svc-tab-content active">
              <h2 className="svc-content-title">{activeService.title}</h2>
              <div className="svc-content-subtitle">{activeService.subtitle}</div>
              <p className="svc-content-desc">{activeService.desc}</p>

              {/* Images Duo Row */}
              <div className="svc-img-row">
                {activeService.imgs.map((imgSrc, idx) => (
                  <div key={idx} className="svc-img-item">
                    <img src={imgSrc} alt={`${activeService.title} preview ${idx + 1}`} />
                  </div>
                ))}
              </div>

              {/* What We Offer Checklist Box */}
              <div className="svc-offer-box">
                <h3>What We Offer</h3>
                <div className="svc-offer-grid">
                  {activeService.offers.map((offer, idx) => (
                    <div key={idx} className="svc-offer-item">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{offer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Stand Out Box */}
              <div className="svc-standout-box">
                <h3>Why Stand Out with Sor Connect</h3>
                <div className="svc-index-list">
                  {activeService.standouts.map((st, idx) => (
                    <div key={idx} className="svc-index-item">
                      <div className="svc-index-num">{st.num}</div>
                      <div className="svc-index-content">
                        <h4>{st.title}</h4>
                        <p>{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion */}
              {activeService.faqs && activeService.faqs.length > 0 && (
                <div className="svc-faq-box">
                  <h3>Frequently Asked Questions</h3>
                  <div className="faq-accordion">
                    {activeService.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                          <button 
                            type="button" 
                            className="faq-trigger"
                            onClick={() => toggleFaq(idx)}
                          >
                            <span>{faq.q}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                          <div 
                            className="faq-content" 
                            style={{ maxHeight: isOpen ? '200px' : '0px' }}
                          >
                            <div className="faq-content-inner">
                              {faq.a}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Inline In-Page Request Form */}
              <div className="svc-form-box">
                <div className="svc-form-info">
                  <span className="sub">{activeService.formTag}</span>
                  <h3>{activeService.formTitle}</h3>
                  <p>{activeService.formSubtitle}</p>
                </div>
                <div className="svc-form-inputs">
                  <ContactForm 
                    formId={`svc-${activeService.id}-form`}
                    subject={`Service Inquiry: ${activeService.name} - Sor Connect`}
                    buttonText="Submit In-Page Request"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
