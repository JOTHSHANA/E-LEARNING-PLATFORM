const express = require('express');
const router = express.Router();
const { compileC_Cpp} = require('../../controllers/compiler/gcc');
const { compileJava } = require('../../controllers/compiler/java');
const { compilePython } = require('../../controllers/compiler/python');
const { compileJavaScript } = require('../../controllers/compiler/javascript');

router.post('/compile-c',async(req, res)=>{
    const {language, questionId, code} = req.body
    if(!language || !questionId || !code){
        return res.status(400).json({error:"language, question_id, code are required..."})
    }
    try{
        const compile = await compileC_Cpp(language, questionId, code)
        res.status(200).json(compile)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

router.post('/compile-java', async(req, res)=>{
    const {questionId, code} =req.body
    if(!questionId || !code){
        return res.status(400).json({error:" question_id, code are required..."})
    }
    try{
        const compile = await compileJava(questionId, code)
        res.status(200).json(compile)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

router.post('/compile-py', async(req, res)=>{
    const {questionId, code} =req.body
    if(!questionId || !code){
        return res.status(400).json({error:" question_id, code are required..."})
    }
    try{
        const compile = await compilePython(questionId, code)
        res.status(200).json(compile)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

router.post('/compile-js', async(req, res)=>{
    const {questionId, code} =req.body
    if(!questionId || !code){
        return res.status(400).json({error:" question_id, code are required..."})
    }
    try{
        const compile = await compileJavaScript(questionId, code)
        res.status(200).json(compile)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
module.exports = router