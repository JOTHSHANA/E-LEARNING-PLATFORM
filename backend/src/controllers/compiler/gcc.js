const { Questions } = require('../../models');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.compileC_Cpp = async (language, questionId, code) => {
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

    const sourceFile = path.join(tempDir, `code_${questionId}.c`);
    const executableFile = path.join(tempDir, `code_${questionId}.exe`);

    fs.writeFileSync(sourceFile, code, 'utf8');

    let compileCommand = '';
    if (language === 'C') {
      compileCommand = `gcc "${sourceFile}" -o "${executableFile}"`;
    } else if (language === 'C++') {
      compileCommand = `g++ "${sourceFile}" -o "${executableFile}"`;
    } else {
      return { status: 'Error', message: 'Unsupported language. Use C or C++.' };
    }

    const compileResult = await executeCommand(compileCommand);
    if (compileResult.error) {
      return { status: 'Failed', message: 'Compilation error', error: compileResult.stderr };
    }

    let allTestsPassed = true;
    const testCaseResults = [];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const inputString = testCase.inputs.join(' ');

      const executeCommand = process.platform === 'win32' 
        ? `cmd /c "echo ${inputString} | ${executableFile}"`
        : `echo "${inputString}" | "${executableFile}"`;

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

    fs.unlinkSync(sourceFile);
    fs.unlinkSync(executableFile);

    return { 
      status: allTestsPassed ? 'Passed' : 'Failed', 
      testCaseResults 
    };

  } catch (error) {
    console.log({ error: 'Error during compilation or execution', err: error });
    return { status: 'Error', message: error.message };
  }
};

/**
 * Executes a shell command.
 * @param {string} command - The command to execute.
 * @returns {Promise<{error: boolean, stdout: string, stderr: string}>}
 */
function executeCommand(command) {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve({ error: true, stdout, stderr });
      } else {
        resolve({ error: false, stdout, stderr });
      }
    });
  });
}

/**
 * Executes a command with input data.
 * @param {string} command - The command to execute.
 * @returns {Promise<{error: boolean, stdout: string, stderr: string}>}
 */
function executeCommandWithInput(command) {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve({ error: true, stdout, stderr });
      } else {
        resolve({ error: false, stdout, stderr });
      }
    });
  });
}
