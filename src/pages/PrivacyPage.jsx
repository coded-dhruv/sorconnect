import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <main className="legal-page-main">
      <section className="page-hero">
        <video autoPlay loop muted playsInline className="page-hero-video">
          <source src="/assets/covervideo.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay"></div>
        <div className="container">
          <div className="breadcrumb"><Link to="/home">Home</Link> / Privacy Policy</div>
          <span className="eyebrow on-dark">Transparency &amp; Trust</span>
          <h1>Privacy Policy</h1>
          <p>At Sor Connect, we treat your personal and site information with uncompromising security and confidentiality. Read below to understand how your data is collected, handled, and protected.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#fdfefe', padding: '70px 0 90px' }}>
        <div className="container" style={{ maxWidth: '920px' }}>
          <div className="legal-document-card">
            
            <div className="legal-meta-bar">
              <div><strong>Effective Date:</strong> January 1, 2024</div>
              <div><strong>Last Updated:</strong> September 2026</div>
              <div><strong>Data Controller:</strong> Sor Connect (Jaipur &amp; Agra)</div>
            </div>

            <div className="legal-prose">
              
              <h2>1. Our Commitment to Your Privacy</h2>
              <p>Sor Connect ("we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect when you visit our website, request a solar feasibility study, or submit quotation forms, and how we handle that information.</p>

              <h2>2. Information We Collect from Website Forms</h2>
              <p>When you use the quotation, contact, or assessment forms on our website, we collect only the necessary technical and contact data required to prepare an accurate solar engineering proposal:</p>
              
              <div className="highlight-privacy-box">
                <ul>
                  <li><strong>Full Name:</strong> Used to personalize your technical proposal and communication records.</li>
                  <li><strong>WhatsApp / Mobile Number:</strong> Used to share customized solar savings calculations, SLD layouts, and coordinate engineer site surveys.</li>
                  <li><strong>Monthly Electricity Bill:</strong> Used by our software to calculate your energy load profile, recommended kW capacity, and estimated annual rupee savings.</li>
                  <li><strong>PIN Code:</strong> Used to determine solar irradiance levels, DISCOM feeder zone, and applicable state nodal subsidy schemes (e.g., PM Surya Ghar / PM-KUSUM).</li>
                  <li><strong>Project Notes (Optional):</strong> Any rooftop dimensions, property type, or specific questions you choose to provide.</li>
                </ul>
              </div>

              <h2>3. How We Use Your Information</h2>
              <p>We use the data you provide strictly for legitimate business and engineering purposes:</p>
              <ul>
                <li>Preparing zero-cost solar feasibility reports and payback calculations.</li>
                <li>Verifying government subsidy eligibility under central and state renewable programs.</li>
                <li>Contacting you via phone call or WhatsApp to discuss your technical proposal and answer queries.</li>
                <li>Scheduling physical site audits and drone shadow mapping visits.</li>
                <li>Facilitating DISCOM net-metering applications upon execution of an EPC contract.</li>
              </ul>

              <h2>4. Zero Resale &amp; Anti-Spam Guarantee</h2>
              <p><strong>We never sell, rent, monetize, or trade your personal information</strong> with third-party advertisers, lead generation brokers, or unauthorized agencies. Your details are accessible solely by certified Sor Connect solar consultants and technical engineers.</p>

              <h2>5. Data Security &amp; Storage</h2>
              <p>We implement industry-standard administrative, technical, and physical security measures to safeguard your information:</p>
              <ul>
                <li><strong>SSL Encryption:</strong> All data transmissions through our website forms are encrypted using Secure Sockets Layer (SSL/TLS 256-bit) encryption.</li>
                <li><strong>Access Control:</strong> Access to customer inquiries is restricted strictly to authorized sales and engineering personnel under confidentiality agreements.</li>
              </ul>

              <h2>6. Your Rights Regarding Your Data</h2>
              <p>Under Indian Information Technology laws and global privacy standards, you have full rights over your data:</p>
              <ul>
                <li><strong>Right to Access:</strong> You can request a copy of the personal details stored with us.</li>
                <li><strong>Right to Correction:</strong> You can request immediate correction of any inaccurate details.</li>
                <li><strong>Right to Deletion:</strong> You can request that we delete your contact records from our active quotation system at any time by contacting us.</li>
              </ul>

              <h2>7. Grievance Officer Contact</h2>
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact our designated Grievance Officer:</p>
              <div className="legal-contact-box">
                <strong>Data Protection &amp; Grievance Officer</strong><br />
                Sor Connect Central Office<br />
                F-02, P.No. 3/410, Sector 3, Chitrakoot, Vaishali Nagar, Jaipur, Rajasthan 302021<br />
                Direct Helpline: <a href="tel:9116992229">+91 91169 92229</a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
