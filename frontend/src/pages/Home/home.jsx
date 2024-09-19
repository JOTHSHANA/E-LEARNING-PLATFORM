import React from "react";
import "./home.css";

const Home = React.forwardRef((props, ref) => (
  <section
    ref={ref}
    id="home"
    className="home-section"
    
  >
    <div className="total-home">
      <div className="content" >
        <h1 className="home-h1" data-aos="fade-down">Learn Beyond Boundaries, gain <span  data-aos="fade-up" style={{ color: 'var(--text-1)', fontWeight: '400' }}>knowledge</span> Without Limits!</h1>
        <p className="home-p" >Empower your learning journey with us.</p>
      </div>
      {/* <div className="video-container">
        <video
          autoPlay
          muted
          loop
          className="home-video"
          data-aos="zoom-in"
          data-aos-delay="500"
        >  
          <source src={home} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
    </div>
  </section>
));

export default Home;
