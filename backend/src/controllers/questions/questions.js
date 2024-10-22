const { QTopic, Language, sequelize, Questions } = require('../../models');

exports.getQuestionTopic = async () => {
  try {
    const query = `
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
    
    const gQuestions = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    });

    return gQuestions;
  } catch (err) {
    throw new Error('Error Fetching Question Topics ' + err.message);
  }
};


exports.getQuestions = async(topic) =>{
    try{
        const gQuestions = await Questions.findAll({
            where:{
                status:'1',
                topic,
            }
        })
        const topics = await QTopic.topics({
          where:{
            topic:topic
          }
        })
        return {gQuestions, topics}
    }catch(err){
        throw new Error('Error Fetching Question  ' + err.message);
    }
}