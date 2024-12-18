import React from 'react';
import './contact.css';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const Contact = React.forwardRef((props, ref) => (
  <footer ref={ref} id="contact">
    <div className="footer">
      <div className="footer-content">
        {/* Contact Section */}
        <div className="footer-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <Email className="icon" />
              <a href="mailto:support@techlehren.com">support@techlehren.com</a>
            </div>
            <div className="contact-item">
              <Phone className="icon" />
              <a href="tel:+11234567890">+1 123 456 7890</a>
            </div>
            <div className="contact-item">
              <LocationOn className="icon" />
              <span>123 Tech Street, Innovation City, USA</span>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="footer-section">
          <h2>Our Vision</h2>
          <p className="quote">
            "Empowering learners with the tools and knowledge to build a brighter future."
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TechLehren. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
));

export default Contact;
