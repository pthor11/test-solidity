import { readFileSync } from "fs";
import { join } from "path";
import { compile } from "solc";

const source = readFileSync(join(__dirname, '../contracts/hello.sol'), 'utf-8')
// console.log(source);

const compiledSource = compile(source, 1).contracts[':Hello']
// console.log(compiledSource);

export {
    compiledSource
}
