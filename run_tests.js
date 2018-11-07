const Mocha = require('mocha');
const glob = require('glob');

module.exports = function runTests(moduleName, taskName, options) {
  if (!moduleName) {
    throw new Error('Required parameter `moduleName` is missing. Example: `npm test 0-module 1-task`');
  }
  
  if (!taskName) {
    throw new Error('Required parameter `taskName` is missing. Example: `npm test 0-module 1-task`');
  }

  const tests = glob.sync(`${moduleName}/${taskName}/src/test/**/**.test.js`);
  
  if (tests.length === 0) {
    throw new Error(`There are no test files in ${moduleName}/${taskName}. Please check your command.`);
  }
  
  const mocha = new Mocha(options);
  
  tests.forEach(test => mocha.addFile(test));
  
  mocha.run(failures => {
    process.exitCode = (failures ? 1 : 0);
  });
};