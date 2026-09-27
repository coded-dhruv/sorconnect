import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <div className="footer-brand">
              <img src="/assets/logo.png" alt="Sor Connect logo" width="34" height="34" />
              <span className="name">Sor Connect</span>
            </div>
            <p>
              A step towards free electricity. End-to-end solar EPC and O&amp;M solutions for industries, farms and communities across India, since 2020.
            </p>
          </div>

          <div className="footer-col">
            <h5>Sitemap</h5>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link to="/services#design">Solar Designing</Link></li>
              <li><Link to="/services#epc">EPC Services</Link></li>
              <li><Link to="/services#installation">Installation &amp; Commissioning</Link></li>
              <li><Link to="/services#om">Operation &amp; Maintenance</Link></li>
              <li><Link to="/services#kusum">PM-KUSUM Consultation</Link></li>
              <li><Link to="/services#surya-ghar">PM Surya Ghar Yojana</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Reach Us</h5>
            <span className="office-name">Jaipur — Head Office</span>
            <span className="office-detail">
              F-02, P.No. 3/410, Sector 3, Chitrakoot, Vaishali Nagar, Jaipur, Rajasthan 302021
              <br />
              <a href="tel:9116992229">91169 92229</a>
            </span>
            <span className="office-name">Agra — Branch Office</span>
            <span className="office-detail">
              163, Jaipur House Complex, Opp. Bhanu Media, Jaipur House, Agra, Uttar Pradesh 282002
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Sor Connect. All rights reserved.</span>
          <span>
            <Link to="/terms">Terms of Use</Link> · 
            <Link to="/privacy">Privacy Policy</Link> · 
            <Link to="/contact">Careers — Apply Now</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
