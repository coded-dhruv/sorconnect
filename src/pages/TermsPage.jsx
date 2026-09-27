import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <main className="legal-page-main">
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / Terms of Use</div>
          <span className="eyebrow on-dark">Legal &amp; Regulatory Framework</span>
          <h1>Terms of Use</h1>
          <p>Please read these Terms of Use carefully before using our website, submitting site assessment forms, or engaging Sor Connect for solar engineering services.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#fdfefe', padding: '70px 0 90px' }}>
        <div className="container" style={{ maxWidth: '920px' }}>
          <div className="legal-document-card">
            
            <div className="legal-meta-bar">
              <div><strong>Effective Date:</strong> January 1, 2024</div>
              <div><strong>Last Revised:</strong> September 2026</div>
              <div><strong>Applicable Entity:</strong> Sor Connect (Jaipur &amp; Agra)</div>
            </div>

            <div className="legal-prose">
              
              <h2>1. Introduction and Scope of Agreement</h2>
              <p>Welcome to <strong>Sor Connect</strong> ("Company", "we", "us", or "our"). These Terms of Use govern your access to and use of the Sor Connect website, quotation request tools, feasibility calculators, and any related solar engineering, EPC, installation, testing, and operations &amp; maintenance (O&amp;M) consultation services.</p>
              <p>By accessing this website, requesting a site audit, or submitting information through our quotation or contact forms, you agree to be bound by these Terms. If you do not agree, please do not use our services or submit your details.</p>

              <h2>2. Nature of Solar Quotations &amp; Feasibility Estimates</h2>
              <p>All solar generation estimates, financial payback forecasts, tariff savings calculations, and rooftop capacity figures presented on this website or in preliminary email/WhatsApp proposals are indicative engineering estimates based on average solar irradiance data (MNRE/NASA meteorological models) and standard test conditions (STC).</p>
              <ul>
                <li><strong>Site-Specific Variations:</strong> Final plant capacity and actual energy yields depend on physical rooftop/ground surveys, actual shadow profiles, structural stability, grid voltage stability, and DISCOM sanctioned loads.</li>
                <li><strong>No Binding Commitment:</strong> An online quotation or feasibility assessment does not constitute a binding contract until a formal Engineering, Procurement &amp; Construction (EPC) agreement is mutually executed in writing.</li>
              </ul>

              <h2>3. User Submissions &amp; Communication Consent</h2>
              <p>When you submit your Name, WhatsApp number, Monthly Electricity Bill bracket, PIN Code, or notes on our website:</p>
              <ul>
                <li>You confirm that all provided details are accurate, current, and belong to you or an authorized representative of the premises.</li>
                <li>You provide express authorization for Sor Connect representatives and engineers to contact you via telephone call, WhatsApp message, or SMS to discuss your solar requirement, schedule site visits, and share technical documentation.</li>
                <li>We do not sell, rent, or trade your contact information to third-party marketing brokers.</li>
              </ul>

              <h2>4. Government Subsidies &amp; DISCOM Approvals</h2>
              <p>Sor Connect assists clients in preparing and submitting documentation for central and state government subsidy schemes (including <strong>PM Surya Ghar: Muft Bijli Yojana</strong> and <strong>PM-KUSUM Yojana</strong>), as well as DISCOM net-metering approvals.</p>
              <ul>
                <li><strong>Government Discretion:</strong> Subsidy disbursement, tariff approval, and net-meter provisioning remain subject to respective state DISCOM regulations, state nodal agency inspections, and central portal approvals.</li>
                <li><strong>Compliance:</strong> The client is responsible for providing valid property ownership documents, electricity connection receipts, and bank account details (for Direct Benefit Transfer).</li>
              </ul>

              <h2>5. Intellectual Property Rights</h2>
              <p>All content on this website — including text, engineering designs, single-line diagrams (SLDs), images, brand logos, code, calculators, and layout architectures — is the proprietary property of Sor Connect and protected by applicable copyright and trademark laws. You may not copy, reproduce, scrape, or distribute any part of this site without prior written consent.</p>

              <h2>6. Limitation of Liability</h2>
              <p>Sor Connect will not be liable for any indirect, incidental, or consequential damages resulting from website downtime, delayed internet form transmissions, or reliance on preliminary indicative figures prior to physical site inspection.</p>

              <h2>7. Governing Law &amp; Dispute Resolution</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of India. Any legal proceedings arising out of or related to website usage or quotation disputes shall be subject to the exclusive jurisdiction of the competent courts in <strong>Jaipur, Rajasthan</strong>.</p>

              <h2>8. Contact for Legal Notices</h2>
              <div className="legal-contact-box">
                <strong>Sor Connect Legal &amp; Compliance Cell</strong><br />
                F-02, P.No. 3/410, Sector 3, Chitrakoot, Vaishali Nagar, Jaipur, Rajasthan 302021<br />
                Phone: <a href="tel:9116992229">+91 91169 92229</a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
