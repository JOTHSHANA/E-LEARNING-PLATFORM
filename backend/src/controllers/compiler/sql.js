const mysql = require('mysql2/promise'); 
const { Questions } = require('../../models');

exports.compileSQL = async (questionId, userQuery) => {
  try {
    const questions = await Questions.findAll({
      where: { id: questionId, status: '1' }
    });

    if (!questions || questions.length === 0) {
      return { status: 'Error', message: 'Question not found or inactive.' };
    }

    const question = questions[0];

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root', 
      database: 'mysql' 
    });

    try {
      await connection.query('CREATE DATABASE IF NOT EXISTS test_db;');
      await connection.query('USE test_db;');
    } catch (error) {
      console.log('Error while setting up test database:', error.message);
      return { status: 'Error', message: 'Failed to set up the test database.' };
    }

    try {
      const questionQuery = question.question_query;

      const queries = questionQuery.split(';').map(query => query.trim()).filter(query => query.length > 0);

      for (let query of queries) {
        await connection.query(query);
      }
    } catch (error) {
      console.log('Error while running question setup query:', error.message);
      return { status: 'Error', message: 'Failed to set up the question environment.' };
    }

    let outputData = [];

    const userQueries = userQuery.split(';').map(query => query.trim()).filter(query => query.length > 0);

    for (let query of userQueries) {
      if (query.startsWith('SELECT')) {
        try {
          const [rows] = await connection.query(query);

          const formattedResult = convertRowsToTable(rows);
          outputData.push(formattedResult); 
        } catch (error) {
          outputData.push('Error executing query: ' + error.message);
        }
      } else {
        try {
          await connection.query(query);
        } catch (error) {
          outputData.push('Error executing query: ' + error.message);
        }
      }
    }

    await connection.query('DROP DATABASE test_db;');
    await connection.end();

    const testCaseOutputs = [
      question.t_output1,
      question.t_output2,
      question.t_output3,
      question.t_output4,
      question.t_output5
    ];

    const testCaseResults = compareResults(outputData, testCaseOutputs);

    return {
      status: testCaseResults.status,
      testCaseResults: testCaseResults.testCaseResults
    };

  } catch (error) {
    console.log('Error during compilation or execution', error);
    return { status: 'Error', message: error.message };
  }
};

/**
 * Helper function to convert MySQL rows into a formatted table string.
 * @param {Array} rows - The rows returned by MySQL query.
 * @return {String} The formatted table as a string.
 */
function convertRowsToTable(rows) {
  if (!rows || rows.length === 0) return '';

  const headers = Object.keys(rows[0]);
  const table = [headers.join(' | ')];

  rows.forEach(row => {
    const rowData = headers.map(header => row[header] !== null ? row[header] : 'NULL');
    table.push(rowData.join(' | '));
  });

  return table.join('\r\n').trim();
}

/**
 * Helper function to compare the actual results with the expected test case outputs.
 * @param {Array} results - The actual results from user queries.
 * @param {Array} testCaseOutputs - The expected test case outputs.
 * @return {Object} The comparison results for each test case.
 */
function compareResults(results, testCaseOutputs) {
  const testCaseResults = [];

  for (let i = 0; i < testCaseOutputs.length; i++) {
    const actual = results[i] ? results[i].trim() : '';
    const expected = testCaseOutputs[i] ? testCaseOutputs[i].trim() : '';

    const status = actual === expected ? 'Passed' : 'Failed';

    testCaseResults.push({
      testCase: i + 1,
      input: actual[i] === '' ? [null] : [0],  // Input can be null or 0 depending on the actual result
      expected: [expected] , // Expected can be null or 0 depending on the expected result
      actual: [actual],  // Actual can be null or 0
      status: status
    });
  }

  const finalStatus = testCaseResults.every(result => result.status === 'Passed') ? 'Passed' : 'Failed';

  return {
    status: finalStatus,
    testCaseResults: testCaseResults
  };
}
