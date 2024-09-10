const { Course } = require('../../models'); 

const getCourses = async () => {
  try {
    const courses = await Course.findAll({
        where: {
          status: '1'  
        },
      });
    return courses;
  } catch (error) {
    throw new Error('Error fetching courses: ' + error.message);
  }
};

module.exports = {
  getCourses,
};