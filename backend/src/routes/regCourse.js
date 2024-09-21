const express = require('express');
const router = express.Router();
const {getRegCourse, deleteRegistration, registerCourse} = require('../controllers/regCourse/regCourse')

router.get('/reg-course', async(req, res)=>{
    const user = req.query.user;
    try{
        const rCourses = await getRegCourse(user);
        res.status(200).json(rCourses)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.post('/reg-course', async(req, res)=>{
    const {user, course} = req.body;
    try{
        const rCourses = await registerCourse(user, course);
        res.status(200).json(rCourses)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.put('/reg-course', async(req, res)=>{
    const {user, course} = req.body;
    try{
        const rCourses = await deleteRegistration(user, course);
        res.status(200).json(rCourses)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports = router