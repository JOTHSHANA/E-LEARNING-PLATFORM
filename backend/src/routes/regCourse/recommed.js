const express = require('express');
const router = express.Router();
const {getRecommendCourse, getReg_count} = require('../../controllers/regCourse/enrollments')


router.get('/rec-courses', async (req, res) => {
    const  user = req.query.user;
    if(!user){
      return res.status(400).json({error:"user id is required.."})
    }
    try {
      const recommendedCourses = await getRecommendCourse(user);
      res.status(200).json(recommendedCourses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/reg-count', async(req, res)=>{
    const course = req.query.course;
    if(!course){
      return res.status(400).json({error:"course id is required..."})
    }
    try{
      const registerCount = await getReg_count(course);
      res.status(200).json(registerCount)
    }catch(error){
      res.status(500).json({error:err.message})
    }
  })

  module.exports= router
  