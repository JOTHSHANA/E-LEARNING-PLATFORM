const express = require('express');
const router = express.Router();
const {getContent, postContent} = require('../../controllers/courses/content')

router.get('/c_content', async(req, res)=>{
    const {course, topic} = req.body
    if(!course || !topic){
        return res.status(400).json({error:"course and topic id are required..."})
    }
    try{
        const getCourseContent = await getContent(course, topic)
        res.status(200).json(getCourseContent)

    }
    catch(errpr){
        res.status(500).json({error:error.message})
    }
})

router.post('/c_content', async(req, res)=>{
    const {course, topic, document, image, order} = req.body
    if(!course || !topic || !document  || !order){
        return res.status(400).json({error:"course id ,topic, document, order is required.."})
    }
    try{
        const PostCourseContent = await postContent(course, topic, document,image,order)
        res.status(200).json(PostCourseContent)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

module.exports = router
