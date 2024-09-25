const {Content} = require('../../models')

exports.getContent = async(topic)=>{
    try{
        const getCourseContent = await Content.findAll({
            where:{
                topic:topic,
                status:'1'
            }
        })
        return getCourseContent
    }catch(error){
        throw new Error('Error fetching course contents:'+ error.message)
    }
}


exports.postContent = async(topic, document,image, order)=>{
    try{
        const postCourseContent = await Content.create({
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