const { Course, RegCourse } = require('../../models'); 
const { Sequelize } = require('sequelize');

const getCourses = async () => {
  try {
    const courses = await Course.findAll({
        where: {
          status: '1'  
        },
        attributes:{
          include:[
            [
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM reg_course AS regCourse
                WHERE 
                RegCourse.course = Course.id
                AND RegCourse.status = '1'
                )`),
                'enrollments'
            ]
          ]
        }
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
      const count = await RegCourse.count({
        where:{
          course:id,
          status:'1'
        }
      })
    return {course, count}
  }
  catch(error){
    throw new Error('Error fetching Reg courses: ' + error.message);
  }
}


module.exports = {
  getCourses,
  getCoursebyId,
};
