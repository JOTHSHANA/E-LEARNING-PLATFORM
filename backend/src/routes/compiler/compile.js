const express = require('express');
const router = express.Router();
const { compileC_Cpp} = require('../../controllers/compiler/gcc')

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

module.exports = router