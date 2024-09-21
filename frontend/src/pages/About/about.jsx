import React from "react";
import "./about.css";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import compiler from '../../assets/compiler.png';
import resources from '../../assets/resources.png';
import tracking from '../../assets/tracking.png';
import focusGroup from '../../assets/focus-group.png';

const About = React.forwardRef((props, ref) => (
  <section ref={ref} id="about" className="about-section">

    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="warning"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="each-about-card">
            <div className="about-card-image">
              <img src={tracking} alt="Performance Tracking" />
            </div>
            <div className="about-card-content">
              <h3>Performance Tracking</h3>
              <p>Keep track of your progress, consistency, and current skill level within our e-learning portal. This feature helps you monitor your performance and stay productive while learning.</p>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="each-about-card">
            <div className="about-card-image">
              <img src={resources} alt="Multiple Resources" />
            </div>
            <div className="about-card-content">
              <h3>Wide Range of Resources</h3>
              <p>We offer a variety of learning resources, including documentation, videos, and web links, all in one place. This ensures you have everything you need to master any topic.</p>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="each-about-card">
            <div className="about-card-content">
              <h3>Integrated Compilers</h3>
              <p>Practice what you learn with our integrated compilers, available within the platform. This feature allows you to code, test, and refine your skills in real-time.</p>
            </div>
            <div className="about-card-image">
              <img src={compiler} alt="Integrated Compilers" />
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="success"/>
        </TimelineSeparator>
        <TimelineContent>
          <div className="each-about-card">
            <div className="about-card-content">
              <h3>Collaborative Discussion Forum</h3>
              <p>Engage with other learners through our discussion forums, where you can ask questions and share insights on various programming languages and tech stacks.</p>
            </div>
            <div className="about-card-image">
              <img src={focusGroup} alt="Discussion Forum" />
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </section>
));

export default About;
