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

const getCoursebyId = async(id)=>{
  try{
    const course = await Course.findOne({
      where: {
        id,
        status: '1' 
      }    })
    return course
  }
  catch(error){
    throw new Error('Error fetching Reg courses: ' + error.message);
  }
}


module.exports = {
  getCourses,
  getCoursebyId,
};
