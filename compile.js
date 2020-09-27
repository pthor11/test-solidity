const path = require('path');
const fs = require('fs');
const solc = require('solc');

const helloPath = path.resolve(__dirname, 'contracts', 'hello.sol');
const source = fs.readFileSync(helloPath, 'utf-8');
const compiledSource = solc.compile(source, 1).contracts[':Hello'];

// console.log(compiledSource)

module.exports = compiledSource;