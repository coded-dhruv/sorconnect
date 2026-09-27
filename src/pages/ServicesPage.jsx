import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const SERVICES_DATA = [
  {
    id: 'epc',
    name: 'EPC Services',
    tag: 'Turnkey Solutions',
    title: 'End-to-End Solar EPC Solutions',
    subtitle: 'From Concept to Grid Synchronisation — Built for Decades of Peak Performance.',
    desc: 'Our turnkey Engineering, Procurement, and Construction (EPC) services cover every phase of solar deployment. From feasibility audits and engineering design to procurement of Tier-1 equipment and civil installation, Sor Connect delivers bankable solar assets that perform reliably for 25+ years.',
    imgs: ['/assets/svc-epc-1.jpg', '/assets/svc-epc-2.jpg'],
    offers: [
      'Comprehensive Site Survey & 3D Shadow Analysis',
      'Civil, Mechanical & Electrical Engineering (SLD)',
      'Tier-1 Solar Modules & BIS-Certified Inverters',
      'Complete DISCOM Liaisoning & Net-Metering Clearances',
      'CEIG Inspection Approval & Grid Synchronisation',
      'Commercial Ground-Mount & Industrial Rooftop EPC'
    ],
    standout: [
      { icon: '🛡️', title: 'Tier-1 Procurement', desc: 'Direct sourcing from top global Tier-1 module manufacturers and leading inverter brands.' },
      { icon: '⚡', title: 'Zero Downtime', desc: 'Pre-planned scheduled shutdowns to integrate solar power without disturbing your manufacturing output.' },
      { icon: '📋', title: 'Guaranteed Approvals', desc: 'We handle 100% of DISCOM approvals, CEIG clearances, and tariff filings on your behalf.' },
      { icon: '📈', title: 'Higher Generation Yields', desc: 'Optimized DC/AC inverter sizing ensuring higher output during mornings and cloudy conditions.' }
    ],
    formTitle: 'Request an EPC Quotation',
    formSubtitle: 'Share your site location and electricity bill. Our engineers will provide a customized technical proposal.'
  },
  {
    id: 'installation',
    name: 'Installation & Commissioning',
    tag: 'Precision Engineering',
    title: 'Installation & Commissioning (I&C)',
    subtitle: 'Safe, Compliant, and High-Precision Mechanical & Electrical Deployment.',
    desc: 'Whether you need support installing third-party procured panels or full balance-of-system deployment, Sor Connect provides experienced electrical and mechanical teams equipped with calibrated torque tools and safety harnesses.',
    imgs: ['/assets/svc-inst-1.jpg', '/assets/svc-inst-2.jpg'],
    offers: [
      'High-Strength Hot-Dip Galvanized Mounting Racks',
      'Torque-Calibrated Module Clamping & Cable Dressing',
      'Dual Chemical Earthing & Class-A Lightning Protection',
      'Inverter Parameter Calibration & Grid Sync Testing',
      'Full DISCOM Bidirectional Meter Testing & Commissioning',
      'String Voltage, Open Circuit & Short Circuit Validation'
    ],
    standout: [
      { icon: '🏗️', title: '130+ In-House Technicians', desc: 'Our trained in-house installation workforce adheres strictly to MNRE and IEEE installation standards.' },
      { icon: '🔍', title: 'Rigorous Quality Checks', desc: 'Every cable connection, crimp, and torque bolt is tested and logged before commissioning.' },
      { icon: '⏱️', title: 'Rapid Deployment', desc: 'Fast-track installation schedules ensuring timely grid synchronisation and tariff savings.' },
      { icon: '⚡', title: 'Comprehensive Safety', desc: 'Strict HSE safety protocols, harnesses, and isolators installed across all roofs.' }
    ],
    formTitle: 'Inquire About I&C Services',
    formSubtitle: 'Tell us about your upcoming solar plant capacity and commissioning timeline.'
  },
  {
    id: 'om',
    name: 'Operation & Maintenance',
    tag: 'Asset Protection',
    title: '25-Year Operation & Maintenance (O&M)',
    subtitle: 'Protect Your Investment. Maximize Uptime. Optimize Generation Daily.',
    desc: 'Solar panels lose up to 25% of their generating capacity if not cleaned and maintained properly. Sor Connect provides comprehensive AMC contracts, thermographic drone inspections, and rapid breakdown response across India.',
    imgs: ['/assets/svc-om-1.jpg', '/assets/svc-om-2.jpg'],
    offers: [
      'Scheduled Pressurized & De-Ionized Panel Cleaning',
      'Drone-Based Infrared Thermography for Hotspot Detection',
      'Inverter Health Checks, Firmware Updates & Component Servicing',
      '24/7 Remote IoT SCADA Monitoring & Alert Systems',
      'Guaranteed 4-Hour On-Site Breakdown Support',
      'Monthly Generation Analytics & Tariff Savings Reports'
    ],
    standout: [
      { icon: '🚁', title: 'Drone Thermal Audits', desc: 'Advanced FLIR infrared imaging to identify micro-cracks and hot-spots invisible to naked eyes.' },
      { icon: '📱', title: 'Smart IoT Tracking', desc: 'Real-time monitoring platform showing exact generation, performance ratio, and alerts on your phone.' },
      { icon: '🛠️', title: 'Guaranteed 98.5% Uptime', desc: 'Pre-emptive maintenance contracts that keep inverters running at peak efficiency all year.' },
      { icon: '💧', title: 'Robotic Cleaning Available', desc: 'Waterless robotic cleaners for large rooftop and ground-mount arrays in arid regions.' }
    ],
    formTitle: 'Schedule an O&M Audit',
    formSubtitle: 'Share your existing solar capacity to get an Annual Maintenance Contract (AMC) proposal.'
  },
  {
    id: 'design',
    name: 'Solar Designing',
    tag: 'Digital Simulation',
    title: 'Solar Designing & Technical Simulation',
    subtitle: 'Engineering Blueprints Built for Optimum Irradiation and Bankability.',
    desc: 'Our certified solar engineers create detailed AutoCAD engineering layouts, string sizing configurations, and bankable PVsyst simulation models to ensure your solar installation is structurally resilient and electrically optimized.',
    imgs: ['/assets/svc-design-1.jpg', '/assets/svc-design-2.jpg'],
    offers: [
      '3D Drone Photogrammetry & Obstacle Shadow Mapping',
      'Bankable PVsyst Hourly Yield & Degradation Reports',
      'Detailed Electrical Single Line Diagrams (SLD)',
      'Structural Load Analysis & Wind Speed Simulation (180 km/h)',
      'BOM (Bill of Materials) Optimization & Specification Lists',
      'DISCOM & CEIG Clearance Blueprint Documentation'
    ],
    standout: [
      { icon: '📊', title: 'Bank-Approved PVsyst Models', desc: 'Bankable generation forecasts recognized by national and private banks for project loans.' },
      { icon: '📐', title: 'Precision CAD Layouts', desc: 'Optimized tilt angles and azimuth configurations maximizing kilowatt-hour yield per sq ft.' },
      { icon: '🌪️', title: 'Wind Load Certified', desc: 'Structural designs engineered to withstand extreme cyclones and gale winds up to 180 km/h.' },
      { icon: '⚡', title: 'DC/AC Loss Minimization', desc: 'Optimized cable routing and inverter placement minimizing ohmic transmission losses.' }
    ],
    formTitle: 'Order a Solar Design Proposal',
    formSubtitle: 'Upload or specify your rooftop dimensions for a detailed PVsyst simulation and SLD layout.'
  },
  {
    id: 'kusum',
    name: 'PM-KUSUM Consultation',
    tag: 'Govt Agriculture Scheme',
    title: 'PM-KUSUM Yojana Consultation',
    subtitle: 'Empowering Farmers & Landowners with Solar Water Pumps & Grid-Connected Income.',
    desc: 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) enables farmers to replace diesel pumps with subsidized solar pumps and monetize barren land by establishing decentralized solar power plants.',
    imgs: ['/assets/svc-kusum-1.jpg', '/assets/svc-kusum-2.jpg'],
    offers: [
      'Component A: 0.5 MW to 2 MW Solar Plants on Barren Land',
      'Component B: Up to 60% Subsidy on Standalone Solar Pumps (3-10 HP)',
      'Component C: Solarization of Existing Grid-Connected Agriculture Pumps',
      'DISCOM Power Purchase Agreement (PPA) Facilitation',
      'Farmer Loan Assistance via Nationalized Banks',
      'End-to-End State Nodal Agency (RREC, UPNEDA) Filing'
    ],
    standout: [
      { icon: '🌾', title: 'Guaranteed 25-Yr Lease Income', desc: 'Landowners can earn stable rental income per acre/year under Component A PPA agreements.' },
      { icon: '🚜', title: 'Up to 90% Cost Covered', desc: 'Combination of 30% Central + 30% State subsidies and 30% bank loans — farmers pay only 10%.' },
      { icon: '📑', title: '100% Documentation Handled', desc: 'We prepare your Khasra/Khatauni land files, DISCOM feeder maps, and portal applications.' },
      { icon: '💧', title: 'Zero Diesel Fuel Costs', desc: 'Reliable daytime irrigation for 300+ sunny days a year without relying on erratic rural power grids.' }
    ],
    formTitle: 'Check PM-KUSUM Eligibility',
    formSubtitle: 'Share your land district, pump HP requirement, or barren land details for subsidy verification.'
  },
  {
    id: 'surya-ghar',
    name: 'PM Surya Ghar Yojana',
    tag: 'Residential Rooftop Scheme',
    title: 'PM Surya Ghar: Muft Bijli Yojana',
    subtitle: 'Direct Central Government Subsidy up to ₹78,000 for Residential Rooftops.',
    desc: 'PM Surya Ghar is the Government of India flagship initiative targeting 1 crore households with free solar power. Sor Connect is an empanelled EPC installer authorized to execute PM Surya Ghar installations from portal registration to subsidy disbursement.',
    imgs: ['/assets/svc-kusum-1.jpg', '/assets/svc-design-1.jpg'],
    offers: [
      'Up to 2 kW: ₹30,000 per kW (₹60,000 max subsidy)',
      '2 kW to 3 kW: ₹18,000 per additional kW',
      '3 kW & Above: Maximum capped central subsidy of ₹78,000',
      'Additional State Top-Up Subsidies (Rajasthan & UP)',
      'DISCOM Net-Metering & Bi-Directional Meter Setup',
      'Collateral-Free Bank Loans up to ₹2 Lakh at Reduced Interest'
    ],
    standout: [
      { icon: '✅', title: 'MNRE Empanelled EPC', desc: 'Authorized installer under the National Portal for Rooftop Solar — every plant qualifies for DBT subsidy.' },
      { icon: '📋', title: 'Complete Paperwork Handled', desc: 'We handle national portal registration, DISCOM net-metering approval, and subsidy disbursement.' },
      { icon: '⚡', title: 'BIS & ALMM Listed Modules', desc: 'DCR-compliant monocrystalline PERC panels and high-efficiency string inverters.' },
      { icon: '🔧', title: 'Long-Term Warranty & AMC', desc: '25-year module performance warranty backed by Sor Connect local engineering support.' }
    ],
    formTitle: 'Check PM Surya Ghar Subsidy',
    formSubtitle: 'Enter your monthly electricity bill and PIN code. We calculate your subsidy and payback timeframe.'
  }
];

export default function ServicesPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('epc');

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && SERVICES_DATA.some(s => s.id === hash)) {
      setActiveTab(hash);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const currentService = SERVICES_DATA.find(s => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <main className="services-page-main">
      
      {/* Page Hero */}
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / Services</div>
          <span className="eyebrow on-dark">Full Lifecycle Solar Capabilities</span>
          <h1>Our Solar Engineering &amp; EPC Services</h1>
          <p>End-to-end solar designing, turnkey EPC, commissioning, 25-year O&amp;M, and government subsidy advisory.</p>
        </div>
      </section>

      {/* Main Services Container with Interactive Sidebar */}
      <section className="section">
        <div className="container services-layout-container">
          
          {/* Left Sticky Sidebar Menu */}
          <aside className="services-sidebar">
            <div className="sidebar-box">
              <span className="sidebar-tag">Our Capabilities</span>
              <nav className="sidebar-nav-menu">
                {SERVICES_DATA.map(svc => (
                  <button
                    key={svc.id}
                    type="button"
                    className={`sidebar-nav-item ${svc.id === activeTab ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(svc.id);
                      window.location.hash = svc.id;
                    }}
                  >
                    <span>{svc.name}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                ))}
              </nav>

              <div className="sidebar-helpline-box">
                <span className="helpline-label">Direct Engineering Helpline</span>
                <a href="tel:9116992229" className="helpline-phone">91169 92229</a>
                <p>Speak directly with an engineer in Jaipur or Agra.</p>
              </div>
            </div>
          </aside>

          {/* Right Main Service Detail Content */}
          <div className="services-main-content">
            <div id={currentService.id} className="svc-content-wrapper">
              <span className="svc-badge-tag">{currentService.tag}</span>
              <h2 className="svc-title">{currentService.title}</h2>
              <div className="svc-subtitle">{currentService.subtitle}</div>
              <p className="svc-description">{currentService.desc}</p>

              {/* Service Images Duo */}
              <div className="svc-image-duo">
                {currentService.imgs.map((imgSrc, idx) => (
                  <div key={idx} className="svc-img-item">
                    <img src={imgSrc} alt={currentService.title} />
                  </div>
                ))}
              </div>

              {/* What We Deliver Box */}
              <div className="svc-offer-box">
                <h3>⚡ What We Deliver</h3>
                <div className="svc-offer-grid">
                  {currentService.offers.map((item, idx) => (
                    <div key={idx} className="svc-offer-item">
                      <span className="check-mark">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us Grid */}
              <div className="svc-standout-box">
                <h3>🌟 Why Choose Sor Connect for {currentService.name}</h3>
                <div className="svc-standout-grid">
                  {currentService.standout.map((item, idx) => (
                    <div key={idx} className="svc-standout-item">
                      <div className="standout-icon">{item.icon}</div>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-Page Quotation Form */}
              <div className="svc-form-box mt-48">
                <div className="svc-form-info">
                  <span className="sub">{currentService.name}</span>
                  <h3>{currentService.formTitle}</h3>
                  <p>{currentService.formSubtitle}</p>
                </div>
                <div className="svc-form-inputs">
                  <ContactForm 
                    formId={`svc-${currentService.id}-form`}
                    buttonText={`Get ${currentService.name} Proposal`}
                    subject={`Service Inquiry [${currentService.name}] - Sor Connect`}
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
