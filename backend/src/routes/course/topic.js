const express = require('express');
const router = express.Router();
const {getTopic, postTopic} = require('../../controllers/courses/topic')

router.get('/c_topic', async(req, res)=>{
    const course = req.query.course
    if(!course){
        return res.status(400).json({error:"course id is required..."})
    }
    try{
        const getCourseTopic = await getTopic(course)
        res.status(200).json(getCourseTopic)

    }
    catch(errpr){
        res.status(500).json({error:error.message})
    }
})

router.post('/c_topic', async(req, res)=>{
    const {course, title, description, img, order} = req.body
    if(!course || !title || !description || !order){
        return res.status(400).json({error:"course, title, description, order required.."})
    }
    try{
        const PostCourseTopic = await postTopic(course, title,description,img,order)
        res.status(200).json(PostCourseTopic)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

module.exports = router;