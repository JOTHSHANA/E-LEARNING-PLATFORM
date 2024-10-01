import React from 'react';
import './contact.css';
import { Email, Phone, Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Contact = React.forwardRef((props, ref) => (
  <footer ref={ref} id="contact">
    <div className="footer">
      <div className="footer-content">
        {/* Contact Us Section */}
        <div className="footer-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <Email className="icon" />
              <a href="mailto:sample@sample.com">sample@sample.com</a>
            </div>
            <div className="contact-item">
              <Phone className="icon" />
              <a href="tel:+1234567890">+1 234 567 890</a>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul className="quick-links">
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Support</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook className="icon" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><Twitter className="icon" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><LinkedIn className="icon" /></a>
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="footer-section">
          <h2>Email us</h2>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your message" required />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Learning Platform. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
));

export default Contact;
