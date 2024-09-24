const { RegCourse, Course } = require('../../models'); // Ensure this path is correct

exports.getRegCourse = async (user) => {
    try {
        const rCourses = await RegCourse.findAll({
            where: {
                user: user,
                status: '1'
            },
            include: [
                {
                    model: Course,
                    attributes: ['name', 'img', 's_description','f_description', 'rating']
                }
            ]
        });
        // const courseDetails = rCourses.map((regCourse) => regCourse.Course);
        // return courseDetails;
        return rCourses
    } catch (error) {
        throw new Error('Error fetching Reg courses: ' + error.message);
    }
};

exports.registerCourse = async (user, course) => {
    try {
        const newRegistration = await RegCourse.create({
            user: user,
            course: course,
            status: '1'
        });

        return newRegistration;
    } catch (error) {
        throw new Error('Error registering for course: ' + error.message);
    }
};


exports.deleteRegistration = async (user, course) => {
    try {
        const result = await RegCourse.update(
            { status: '0' },
            {
                where: {
                    user: user,
                    course: course
                }
            }
        );

        if (result[0] > 0) {
            return { message: 'Registration Course is deleted' };
        } else {
            return { message: 'Registration not found' };
        }
    } catch (error) {
        throw new Error('Error updating registration course status: ' + error.message);
    }
};
