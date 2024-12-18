const { QTopic, Language, Questions } = require('../../models');
const sequelize  = require('../../config/database');
const { QueryTypes } = require('sequelize'); 
const { Op, fn, col } = require('sequelize');


exports.getQuestionTopic = async () => {
  try {
    const tquery = `
      SELECT 
        qt.id, 
        qt.name, 
        GROUP_CONCAT(l.language) AS languages
      FROM 
        question_topic qt
      JOIN 
        language l 
      ON 
        FIND_IN_SET(l.id, qt.languages) > 0
        AND (l.id != 5  OR l.language != 'SQL')
      WHERE 
        qt.status = '1'
      GROUP BY 
        qt.id, qt.name;
    `;
    
    const gQuestions = await sequelize.query(tquery, {
      type: QueryTypes.SELECT 
    });

    return gQuestions;
  } catch (err) {
    throw new Error('Error Fetching Question Topics ' + err.message);
  }
};

exports.getQuestionTopicSQL = async () => {
  try {
    const tquery = `
      SELECT 
    qt.id, 
    qt.name, 
    GROUP_CONCAT(l.language) AS languages
FROM 
    question_topic qt
JOIN 
    LANGUAGE l 
ON 
    FIND_IN_SET(l.id, qt.languages) > 0
    AND (l.id = 5 OR l.language = 'SQL')  
WHERE 
    qt.status = '1'
GROUP BY 
    qt.id, qt.name;
    `;
    
    const gQuestions = await sequelize.query(tquery, {
      type: QueryTypes.SELECT 
    });

    return gQuestions;
  } catch (err) {
    throw new Error('Error Fetching Question Topics ' + err.message);
  }
};

exports.getQuestions = async (topic) => {
  try {
    // Get questions related to the given topic
    const gQuestions = await Questions.findAll({
      where: {
        topic: topic,
        status: '1'
      }
    });

    // Get the topic details and the associated languages
    const tquery = `
      SELECT 
        qt.id, 
        qt.name, 
        GROUP_CONCAT(l.language) AS languages
      FROM 
        question_topic qt
      JOIN 
        language l 
      ON 
        FIND_IN_SET(l.id, qt.languages) > 0
      WHERE 
        qt.status = '1' AND
        qt.id = ?
      GROUP BY 
        qt.id, qt.name;
    `;
    
    const topicQuery = await sequelize.query(tquery, {
      type: QueryTypes.SELECT ,
      replacements: [topic]
    });

    return { gQuestions, topicQuery };
  } catch (err) {
    throw new Error('Error Fetching Questions: ' + err.message);
  }
};

exports.getQuestionsById = async(id) => {
  try{
    const questions = await Questions.findAll({
      where:{
        id : id,
        status: '1'
      }
    })
    const tquery = `
      SELECT 
        qt.id, 
        qt.name, 
        GROUP_CONCAT(l.language) AS languages
      FROM 
        question_topic qt
      JOIN 
        language l 
      ON 
        FIND_IN_SET(l.id, qt.languages) > 0
      WHERE 
        qt.status = '1' 
      GROUP BY 
        qt.id, qt.name;
    `;
    
    const topicQuery = await sequelize.query(tquery, {
      type: QueryTypes.SELECT 
    });
    return {questions,topicQuery}
  }catch(err){
    console.log({error:"error to fetch questions by id", err})
  }
}