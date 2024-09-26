const express = require('express');
const router = express.Router();
const {getContent, postContent} = require('../../controllers/courses/content')

router.get('/c_content', async(req, res)=>{
    const topic = req.query.topic
    if(!topic){
        return res.status(400).json({error:"topic id is required..."})
    }
    try{
        const getCourseContent = await getContent(topic)
        res.status(200).json(getCourseContent)

    }
    catch(errpr){
        res.status(500).json({error:error.message})
    }
})

router.post('/c_content', async(req, res)=>{
    const {topic, document, image, order} = req.body
    if(!topic || !document  || !order){
        return res.status(400).json({error:"topic, document, order is required.."})
    }
    try{
        const PostCourseContent = await postContent(topic, document,image,order)
        res.status(200).json(PostCourseContent)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

module.exports = router
