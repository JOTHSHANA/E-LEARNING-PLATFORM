const { RegCourse, Course } = require('../../models');
const {Op} = require('sequelize')

exports.getRecommendCourse = async (userId) => {
  try {
    const registeredCourses = await RegCourse.findAll({
      attributes: ['course'],  
      where: { user: userId },
    });
    const registeredCourseIds = registeredCourses.map((reg) => reg.course);
    // console.log(registeredCourseIds)
    const recommendCourses = await Course.findAll({
      where: {
        id: {
          [Op.notIn]: registeredCourseIds.length > 0 ? registeredCourseIds : [0],
        },
        status: '1',
      },
    });
    // console.log(recommendCourses)
    return recommendCourses;

  } catch (err) {
    throw new Error('Error fetching recommended courses: ' + err.message);
  }
};

exports.getReg_count = async(courseId)=>{
    try{
        const regCourse_count = await RegCourse.count({
            where:{
                course: courseId,
                status:'1'
            }
        })
        return regCourse_count
    }catch(error){
        throw new Error('Error fetching registration count: ' + error.message);
    }
}
