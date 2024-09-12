import React from 'react';
import { useNavigate } from 'react-router-dom';
import './course.css';

// const courseData = [
//     { id: 1, name: 'Course 1', image: course, description: 'learn c language for free' },
//     { id: 2, name: 'Course 2', image: course, description: 'learn c language for free' },
//     { id: 3, name: 'Course 3', image: course, description: 'learn c language for free' },
//     { id: 4, name: 'Course 4', image: course, description: 'learn c language for free' },
//     { id: 5, name: 'Course 5', image: course, description: 'learn c language for free' },
//     { id: 6, name: 'Course 6', image: course, description: 'learn c language for free' },
// ];

const Course = React.forwardRef((props, ref) => {
    const navigate = useNavigate();

    const handleCardClick = (courseId) => {
        if (courseId === 2) {
            navigate('/react-details');
        }
    };

    return (
        <section ref={ref} id="courses" data-aos="fade-up">
            <h1>Our Courses</h1>
            <div className='total-course'>
                <div className="courses-container">
                    {/* {courseData.map((course) => (
                        <div
                            key={course.id}
                            className="course-box"
                            data-aos="flip-right"
                            data-aos-delay="0"
                            onClick={() => handleCardClick(course.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={course.image} alt={course.name} className="course-image" />
                            <div className='course-info' data-aos="fade-right" data-aos-duration="5000" data-aos-delay="200">
                                <div className="course-name">{course.name}</div>
                                <div className='course-description'>{course.description}</div>
                            </div>
                        </div>
                    ))} */}
                </div>
                <div>
                    <button className='view-more' data-aos="zoom-out">
                        View More..
                    </button>
                </div>
            </div>
        </section>
    );
});

export default Course;
