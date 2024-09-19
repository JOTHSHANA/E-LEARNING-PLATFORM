import React from "react";
import "./about.css";

const About = React.forwardRef((props, ref) => (
  <section ref={ref} id="about" className="about-section">
    <div className="about-content">
      <div className="ribbon" >About Us</div>
      {/* <video autoPlay muted loop className="about-video" data-aos="fade-right" data-aos-delay="100">
        
        Your browser does not support the video tag.
      </video> */}
      <div className="text-container">
        
        <p className="about-p"data-aos="fade-left" data-aos-delay="300">
          Learn more about our mission and values. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed
          cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
          imperdiet. Duis sagittis ipsum.
        </p>
        <p className="about-p" data-aos="fade-left" data-aos-delay="500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla.
        </p>
        <p className="about-p" data-aos="fade-left" data-aos-delay="700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris.
        </p>
      </div>
    </div>
  </section>
));

export default About;
