const {Topic} = require('../../models')

exports.getTopic = async(course)=>{
    try{
        const getCourseTopic = await Topic.findAll({
            where:{
                course:course,
                status:'1'
            }
        })
        return getCourseTopic
    }catch(error){
        throw new Error('Error fetching course topics:'+ error.message)
    }
}

exports.postTopic = async(course, title, description,img, order)=>{
    try{
        const postCourseTopic = await Topic.create({
            course:course,
            title:title, 
            description:description,
            img:img,
            order:order
        })
        return{
            success:true,
            data:postCourseTopic
        }
    }catch(error){
        throw new Error('Error Inserting course topic:'+ error.message
        )
    }
}