const { Questions } = require('../../models');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.compileJavaScript = async (questionId, code) => {
  try {
    const questions = await Questions.findAll({
      where: { id: questionId, status: '1' }
    });

    if (!questions || questions.length === 0) {
      return { status: 'Error', message: 'Question not found or inactive.' };
    }

    const question = questions[0];

    const testCases = [
      { inputs: question.t_case1.split(' '), expected: question.t_output1 },
      { inputs: question.t_case2.split(' '), expected: question.t_output2 },
      { inputs: question.t_case3.split(' '), expected: question.t_output3 },
      { inputs: question.t_case4.split(' '), expected: question.t_output4 },
      { inputs: question.t_case5.split(' '), expected: question.t_output5 }
    ];

    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const sourceFile = path.join(tempDir, `code_${questionId}.js`);

    fs.writeFileSync(sourceFile, code, 'utf8');

    let allTestsPassed = true;
    const testCaseResults = [];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const inputString = testCase.inputs.join(' ');

      const executeCommand = `node "${sourceFile}" ${inputString}`;

      const executionResult = await executeCommandWithInput(executeCommand);
      let actualOutput = executionResult.stdout ? executionResult.stdout.trim() : 'No Output';

      if (executionResult.error) {
        allTestsPassed = false;
        testCaseResults.push({
          testCase: i + 1,
          input: testCase.inputs,
          expected: testCase.expected,
          actual: 'Error: ' + executionResult.stderr,
          status: 'Failed'
        });
      } else {
        const expectedOutput = testCase.expected.trim();

        const status = (actualOutput === expectedOutput) ? 'Passed' : 'Failed';
        if (status === 'Failed') {
          allTestsPassed = false;
        }

        testCaseResults.push({
          testCase: i + 1,
          input: testCase.inputs,
          expected: expectedOutput,
          actual: actualOutput,
          status: status
        });
      }
    }

    // Ensure that the file is deleted after use
    try {
      fs.unlinkSync(sourceFile);
      console.log('Temporary file deleted:', sourceFile);
    } catch (error) {
      console.error('Error deleting temporary file:', error);
    }

    return {
      status: allTestsPassed ? 'Passed' : 'Failed',
      testCaseResults
    };

  } catch (error) {
    console.log({ error: 'Error during JavaScript execution', err: error });
    return { status: 'Error', message: error.message };
  }
};

function executeCommandWithInput(command) {
  return new Promise((resolve) => {
    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${stderr}`);
        resolve({ error: true, stdout, stderr });
      } else {
        resolve({ error: false, stdout, stderr });
      }
    });
  });
}
