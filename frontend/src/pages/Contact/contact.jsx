import React from 'react';
import './contact.css';
import { Email, Phone } from '@mui/icons-material';

const Contact = React.forwardRef((props, ref) => (
  <section ref={ref} id="contact">

    <div className="footer" >
      <div className="footer-content">
        <h2 >Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item" >
            <Email className="icon" />
            <a href="mailto:example@example.com">sample@sample.com</a>
          </div>
          <div className="contact-item">
            <Phone className="icon" />
            <a href="tel:+1234567890">+1 234 567 890</a>
          </div>
        </div>
      </div>
    </div>
  </section>
));

export default Contact;
