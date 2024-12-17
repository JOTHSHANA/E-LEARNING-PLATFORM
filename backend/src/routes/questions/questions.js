const express = require('express');
const router = express.Router();

const {getQuestionTopic,getQuestions} = require('../../controllers/questions/questions')

router.get('/q-topics', async (req , res)=>{
    try{
        const questionsTopic = await getQuestionTopic()
        res.status(200).json(questionsTopic)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.post('/questions', async (req , res)=>{
    const {topic} = req.body
    if(!topic){
        return res.status(400).json({error:"Topic id is required..."})
    }
    try{
        const questions = await getQuestions(topic)
        res.status(200).json(questions)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports= router
