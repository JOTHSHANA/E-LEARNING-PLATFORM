const {Content} = require('../../models')

exports.getContent = async(course, topic)=>{
    try{
        const getCourseContent = await Content.findAll({
            where:{
                course:course,
                topic:topic,
                status:'1'
            }
        })
        return getCourseContent
    }catch(error){
        throw new Error('Error fetching course contents:'+ error.message)
    }
}


exports.postContent = async(course, topic, document,image, order)=>{
    try{
        const postCourseContent = await Content.create({
            course:course,
            topic:topic,
            document:document, 
            image:image,
            order:order
        })
        return{
            success:true,
            data:postCourseContent
        }
    }catch(error){
        throw new Error('Error Inserting course content:'+ error.message
        )
    }
}