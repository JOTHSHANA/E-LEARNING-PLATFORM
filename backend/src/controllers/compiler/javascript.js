const { Questions } = require('../../models');
const { VM } = require('vm2'); // Use vm2 for safe code execution

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

    const testCaseResults = [];
    let allTestsPassed = true;

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const vm = new VM({
        timeout: 1000,
        sandbox: {}
      });

      try {
        const script = `
          const inputs = [${testCase.inputs.map(x => `'${x}'`).join(',')}];
          let inputIndex = 0;
          const input = () => inputs[inputIndex++];
          ${code}
        `;

        const result = vm.run(script);
        const actualOutput = result !== undefined ? result.toString().trim() : 'No Output';

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

      } catch (error) {
        allTestsPassed = false;
        testCaseResults.push({
          testCase: i + 1,
          input: testCase.inputs,
          expected: testCase.expected,
          actual: 'Runtime Error: ' + error.message,
          status: 'Failed'
        });
      }
    }

    return { 
      status: allTestsPassed ? 'Passed' : 'Failed', 
      testCaseResults 
    };

  } catch (error) {
    console.log({ error: 'Error during compilation or execution', err: error });
    return { status: 'Error', message: error.message };
  }
};
